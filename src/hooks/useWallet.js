// ** Import Web3 Modules ** //
import { ConnectorNames } from '../config';

// ** Import Wallet Icons ** //
import MetaMask from "../assets/img/wallets/meta-mask.svg";
import WalletConnect from "../assets/img/wallets/wallet-connect.svg";
import Binance from "../assets/img/wallets/binance.svg";
import Math from "../assets/img/wallets/math.svg";
import Trust from "../assets/img/wallets/trust.svg";
import TokenPocket from "../assets/img/wallets/token-pocket.svg";
import SafePal from "../assets/img/wallets/safepal.svg";

const useWallet = () => {
    return [
        {
            id: "metamask",
            title: "MetaMask",
            description: "Connect to your MetaMask Wallet",
            logo: MetaMask,
            connector: ConnectorNames.Injected,
        },
        {
            id: "walletconnect",
            title: "WalletConnect",
            description: "Connect to your WalletConnect Wallet",
            logo: WalletConnect,
            connector: ConnectorNames.WalletConnect,
        },
        {
            id: "binance",
            title: "Binance",
            description: "Connect to your Binance Wallet",
            logo: Binance,
            connector: ConnectorNames.BSC,
        },
        {
            id: "math-wallet",
            title: "Math Wallet",
            description: "Connect to your Math Wallet",
            logo: Math,
            connector: ConnectorNames.Injected,
        },
        {
            id: "trust-wallet",
            title: "Trust Wallet",
            description: "Connect to your Trust Wallet",
            logo: Trust,
            connector: ConnectorNames.Injected,
        },
        {
            id: "token-pocket",
            title: "Token Pocket",
            description: "Connect to your Token Pocket Wallet",
            logo: TokenPocket,
            connector: ConnectorNames.Injected,
        },
        {
            id: "safepal",
            title: "SafePal",
            description: "Connect to your SafePal Wallet",
            logo: SafePal,
            connector: ConnectorNames.Injected,
        },
    ];
}

export default useWallet;