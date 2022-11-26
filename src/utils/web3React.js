import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'

import { hexlify } from '@ethersproject/bytes'
import { toUtf8Bytes } from '@ethersproject/strings'
import { Web3Provider } from '@ethersproject/providers'

import { CHAIN_ID } from '../config/constants/networks'
import { ConnectorNames } from '../config';

import getNodeUrl from './getRpcUrl'

const POLLING_INTERVAL = 12000
const rpcUrl = getNodeUrl()
const chainId = parseInt(CHAIN_ID, 10)

const injected = new InjectedConnector({ supportedChainIds: [chainId] })

const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

export const connectorsByName = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.BSC]: bscConnector,
}

export const getLibrary = provider => {
    const library = new Web3Provider(provider)
    library.pollingInterval = POLLING_INTERVAL
    return library
}

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (connector, provider, account, message) => {
    if (window.BinanceChain && connector instanceof BscConnector) {
        const { signature } = await window.BinanceChain.bnbSign(account, message)
        return signature
    }

    /**
     * Wallet Connect does not sign the message correctly unless you use their method
     * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
     */
    if (provider.provider?.wc) {
        const wcMessage = hexlify(toUtf8Bytes(message))
        const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
        return signature
    }

    return provider.getSigner(account).signMessage(message)
}
