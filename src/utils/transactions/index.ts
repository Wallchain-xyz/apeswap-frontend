import { BigNumber, Contract } from "ethers";
import isZero from "utils/isZero";

export interface Call {
  contract: Contract
  parameters: {
    methodName: string
    args: any[]
    value: string
  }
}

export interface SuccessfulCall {
  call: Call
  gasEstimate: BigNumber
}

export interface FailedCall {
  call: Call
  error: Error
}

/**
 * Estimates gas for given swap calls
 * @param {Call[]} calls - Swap calls for which gas needs to be estimated
 * @returns {Promise<Array<SuccessfulCall | FailedCall>>} - Returns a promise resolving to an array of successful or failed calls with their gas estimates or errors
 */
export async function estimateGasForCalls(calls: Call[]): Promise<Array<SuccessfulCall | FailedCall>> {
    return Promise.all(
      calls.map((call) => {
        const {
          parameters: { methodName, args, value },
          contract,
        } = call;
        const options = !value || isZero(value) ? {} : { value };
  
        return contract.estimateGas[methodName](...args, options)
          .then((gasEstimate) => {
            return {
              call,
              gasEstimate,
            };
          })
          .catch((gasError) => {
            console.error('Gas estimate failed, trying eth_call to extract error', call);
  
            return contract.callStatic[methodName](...args, options)
              .then((result) => {
                console.error('Unexpected successful call after failed estimate gas', call, gasError, result);
                return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') };
              })
              .catch((callError) => {
                console.error('Call threw error', call, callError);
                const reason: string = callError.reason || callError.data?.message || callError.message;
                const errorMessage = `The transaction cannot succeed due to error: ${
                  `${reason}. This is probably an issue with one of the tokens you are swapping` ??
                  'Unknown error, check the logs'
                }.`;
  
                return { call, error: new Error(errorMessage) };
              });
          });
      }),
    );
  }
  