import type { Web3Provider } from '@ethersproject/providers'

// We define a variable to store the Web3Provider instance.
// This variable is scoped to the module, so it will be shared by all consumers of the module.
let web3Provider: Web3Provider | null = null;

// This function allows us to set the Web3Provider instance.
// We would typically call this function from a React component, where the Web3Provider instance is created.
// The provider is then stored in the `web3Provider` variable, where it can be accessed later.
export function setWeb3Provider(provider: Web3Provider | null) {
  web3Provider = provider;
}

// This function allows us to get the current Web3Provider instance.
// We can call this function from anywhere in our code to access the provider.
// This is particularly useful in Redux thunks, where we can't use the `useWeb3React` hook to access the provider.
// By calling this function from a thunk, we can perform Web3 operations like sending transactions or querying contract state.
export function getWeb3Provider() {
  return web3Provider;
}