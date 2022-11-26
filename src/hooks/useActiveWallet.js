import { useWeb3React } from "@web3-react/core";

import useWallet from "./useWallet";

const useActiveWallet = () => {
    const { connector } = useWeb3React();
    const wallets = useWallet();
    const cwallet = wallets.find(item => item.connector === connector);
    return cwallet;
};

export default useActiveWallet;