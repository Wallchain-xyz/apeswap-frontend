import { useEffect, useState } from "react"
import Wallchain from "@wallchain/sdk";
import { Route, LifiStep } from '@lifi/sdk';
import { useWeb3React } from "@web3-react/core";
import type { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";


import { WallchainKeys } from "config/constants/wallchainKeys";
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 250,
    highWater: 1,
})


export type TWallchainStatus = 'pending' | 'found' | 'not_found';

const normalizeNative = (token?: string) => {
    if (token === '0x0000000000000000000000000000000000000000') return '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    return token
}

let personalizeStep: (signer: JsonRpcSigner, step: LifiStep) => Promise<LifiStep>
let ApiService: typeof import('@lifi/sdk/dist/services/ApiService').default

const prepareTxn = async (
    signer: JsonRpcSigner,
    step: LifiStep,
) => {
    if (!personalizeStep) {
        personalizeStep = (await import('@lifi/sdk/dist/utils/utils')).personalizeStep
        ApiService = (await import('@lifi/sdk/dist/services/ApiService')).default
    }
    const personalizedStep = await personalizeStep(signer, step)
    const updatedStep = await ApiService.getStepTransaction(personalizedStep)

    return {
        from: updatedStep?.transactionRequest?.from,
        to: updatedStep?.transactionRequest?.to,
        data: updatedStep?.transactionRequest?.data,
        value: updatedStep?.transactionRequest?.value,
    } as {
        from: string;
        to: string;
        data: string;
        value: string;
    }
}

const loadApiResponse = async (
    sdk: Wallchain, 
    txn: {
        from: string;
        to: string;
        data: string;
        value: string;
    },
    swapInfo: {
        tokenIn: `0x${string}`;
        tokenOut: `0x${string}`;
        amountIn: string;
    }
) => {
    return await sdk.checkForMEV(txn, swapInfo)
}

const wrappedPrepareTxn = limiter.wrap(prepareTxn)
const wrappedApiResponse = limiter.wrap(loadApiResponse)

export const useWallchainApi = (selectedRoute?: Route) => {
    const [status, setStatus] = useState<TWallchainStatus>('pending')
    const [approvalAddress, setApprovalAddress] = useState<string | undefined>(undefined)
    const { provider } = useWeb3React()

    const srcToken = normalizeNative(selectedRoute?.fromToken.address)
    const dstToken = normalizeNative(selectedRoute?.toToken.address)
    const amount = selectedRoute?.fromAmount;

    useEffect(() => {
        (async () => {
            try {
                if (!selectedRoute) return
                if (!provider || !selectedRoute.steps.length) return
                if (!srcToken || !dstToken || !amount) return selectedRoute

                setStatus('pending')
                const sdk = new Wallchain({ keys: WallchainKeys, provider: provider.provider })
                const txn = await wrappedPrepareTxn(provider.getSigner(), selectedRoute.steps[0])
                
                const response = await wrappedApiResponse(sdk, txn, { 
                    tokenIn: srcToken as `0x${string}`,
                    tokenOut: dstToken as `0x${string}`,
                    amountIn: amount
                })

                if (response.MEVFound) {
                    setApprovalAddress((await sdk.getSpenderForAllowance()) as `0x${string}`)
                    setStatus('found')
                } else {
                    setStatus('not_found')
                }
            } catch (e) {
                setStatus('not_found')
            }

        })()

    }, [selectedRoute, provider, srcToken, dstToken, amount])

    return [status, approvalAddress] as [TWallchainStatus, string | undefined]
}

export const getWallchainRoute = async (provider: Web3Provider, selectedRoute: Route, wallchainStatus?: TWallchainStatus):
    Promise<Route> => {
    if (!provider || wallchainStatus !== 'found') return selectedRoute
    const account = (await provider.listAccounts())[0]
    const sdk = new Wallchain({ keys: WallchainKeys, provider: provider.provider })
    const srcToken = normalizeNative(selectedRoute?.fromToken.address)
    const dstToken = normalizeNative(selectedRoute?.toToken.address)
    const amount = selectedRoute?.fromAmount

    if (!srcToken || !dstToken || !amount) return selectedRoute

    const txn = await prepareTxn(provider.getSigner(), selectedRoute.steps[0])

    const response = await sdk.checkForMEV(txn, {
        tokenIn: srcToken as `0x${string}`,
        tokenOut: dstToken as `0x${string}`,
        amountIn: amount
    })




    if (response.MEVFound) {
        const spender = (await sdk.getSpender()) as `0x${string}`
        const needPermit = srcToken !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        let witness: false | Awaited<ReturnType<typeof sdk.signPermit>> = false

        if (needPermit) {
            witness = await sdk.signPermit(srcToken as `0x${string}`, account, spender, amount)
        }

        const data = await sdk.createNewTransaction(
            selectedRoute.steps[0].estimate.approvalAddress,
            needPermit,
            txn.data,
            amount,
            txn.value,
            srcToken,
            dstToken,
            response.searcherSignature,
            response.searcherRequest,
            witness,
        )


        return {
            ...selectedRoute,
            steps: [
                {
                    ...selectedRoute.steps[0],
                    transactionRequest: {
                        ...txn,
                        data: data.data,
                        to: spender,
                        gasLimit: response.suggestedGas
                    }
                }
            ]
        }
    } else {
        throw new Error('WallchainError: oppurtunity lost')
    }
}
