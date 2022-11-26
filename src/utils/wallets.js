// Set of helper functions to facilitate wallet setup

import { BASE_BSC_SCAN_URL, BASE_URL } from '../config'
import { nodes } from './getRpcUrl'

const setupNetwork = async () => {
    const provider = window.ethereum;
    if (provider) {
        const chainId = parseInt(process.env.REACT_APP_PUBLIC_CHAIN_ID, 10)
        try {
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: `0x${chainId.toString(16)}`,
                        chainName: 'BNB Smart Chain Mainnet',
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'bnb',
                            decimals: 18,
                        },
                        rpcUrls: nodes,
                        blockExplorerUrls: [`${BASE_BSC_SCAN_URL}/`],
                    },
                ],
            })
            return true
        } catch (error) {
            console.error('Failed to setup the network in Metamask:', error)
            return false
        }
    } else {
        console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
        return false
    }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
const registerToken = async (tokenAddress, tokenSymbol, tokenDecimals) => {
    const tokenAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
            type: 'ERC20',
            options: {
                address: tokenAddress,
                symbol: tokenSymbol,
                decimals: tokenDecimals,
                image: `${BASE_URL}/images/tokens/${tokenAddress}.png`,
            },
        },
    })

    return tokenAdded
}

export { setupNetwork, registerToken };
