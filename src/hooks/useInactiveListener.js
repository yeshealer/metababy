import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { connectorsByName } from '../utils/web3React'
import { connectorLocalStorageKey } from '../config';

const useInactiveListener = () => {
    const { account, chainId, connector } = useWeb3React();

    useEffect(() => {
        if (account && connector) {
            const handleDeactivate = () => {
                if (window.localStorage.getItem('walletconnect')) {
                    connectorsByName.walletconnect.close()
                    connectorsByName.walletconnect.walletConnectProvider = null
                }
                window.localStorage.removeItem(connectorLocalStorageKey)
            }

            connector.addListener('Web3ReactDeactivate', handleDeactivate)

            return () => {
                connector.removeListener('Web3ReactDeactivate', handleDeactivate)
            }
        }
        return undefined
    }, [account, chainId, connector])
}

export default useInactiveListener;