import axiosRetry from 'axios-retry'
import axios from 'axios'
import { apiV2BaseUrl } from 'config/constants/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from 'config/constants/queryKeys'
import { useWeb3React } from '@web3-react/core'

export interface BillReferenceData {
  chainId: number
  transactionHash: string
  referenceId: string
}

export interface BillReferenceResponse {
  chainId: number;
  transactionHash: string;
  referenceId: string;
  createdAt: number;
}

export const postBillReference = async (data: BillReferenceData): Promise<BillReferenceResponse> => {
  try {
    axiosRetry(axios, {
      retries: 2,
      retryCondition: () => true,
    })
    const response = await axios.post(`${apiV2BaseUrl}/bills/widget`, data)
    const billReferenceResp = await response.data

    if(response.status !== 201) {
      if(response.status === 409) {
        throw new Error(`postBillReference: 409 tx-hash already exists for data ${data}`)
      }
      throw new Error(`postBillReference: Status not 201 for data ${data}. Status: ${response.status}`)
    }
    
    return billReferenceResp
  } catch (error) {
    throw new Error(`postBillReference: error posting data ${data}`)
  }
}

export const usePostBillReference = () => {
  const queryClient = useQueryClient();
  const { chainId: currentChainId } = useWeb3React()

  return useMutation({
    mutationFn: ({ chainId, transactionHash, referenceId }: Partial<BillReferenceData>) => {
      chainId = chainId || currentChainId
      if (!chainId || !transactionHash || !referenceId) {
        throw new Error('usePostBillReference: Missing required keys in data')
      }
      return postBillReference({ chainId, transactionHash, referenceId })
    },
    onError: (error, variables, context) => {
      console.error(`usePostBillReference: error posting data ${variables}, context: ${context} error: ${error}`)
    },
    onSuccess: () => {
      // will wait for query invalidation to finish,
      // mutation state will stay loading while related queries update
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOND_POST_REFERENCE],
      })
    },
  })
};

