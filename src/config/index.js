import { API_ENDPOINT } from "./constants/api";
import { CHAIN_ID } from "./constants/networks";

const CIDS = {
    MAINNET: 56,
    TESTNET: 97
}

export const BASE_BSC_SCAN_URLS = {
    [CIDS.MAINNET]: 'https://bscscan.com',
    [CIDS.TESTNET]: 'https://testnet.bscscan.com',
}

export const BASE_URL = 'https://pancakeswap.finance';
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[CHAIN_ID];

export const ConnectorNames = {
    Injected: "injected",
    WalletConnect: "walletconnect",
    BSC: "bsc"
}

export const API = {
    ENDPOINT: API_ENDPOINT
}

export const connectorLocalStorageKey = "mbaby-connectorIdv2";
export const walletLocalStorageKey = "wallet";

export const PRIVATE_SALE_ABI = require("./abi/psale.json");
// export const PRIVATE_SALE_CONTRACT = "0x47837911502de0b279383fdAa2993b797ADfde14"; // Testnet
export const PRIVATE_SALE_CONTRACT = "0x732ECC7641E622067600E8fC58aE70cd860d2e46"; // Mainnet
export const META_BABY_ABI = require("./abi/metababy.json");
export const MBABY_CONTRACT = "0xaB177822154543aaBE9887D49720Cd7dC2FC38cC";
export const BEP20_ABI = require("./abi/bep20.json");

export const tokensList = [
    "x-world-games",
    "starsharks",
    "mobox",
    "bomber-coin",
    "biswap"
]

export const Games = [
    {
        id: "xworldgames",
        name: "X World Games (XWG)",
        dev: "developer",
        users: 0,
        banner: require("../assets/img/games/xworldgames/banner.png"),
        logo: require("../assets/img/games/xworldgames/logo.png"),
        media: "https://metababy.in/videos/xworldgames.mp4",
        token: "x-world-games"
    },
    {
        id: "starsharks",
        name: "StarSharks (SSS)",
        dev: "developer",
        users: 0,
        banner: require("../assets/img/games/starsharks/banner.png"),
        logo: require("../assets/img/games/starsharks/logo.png"),
        media: "https://metababy.in/videos/starsharks.mp4",
        token: "starsharks"
    },
    {
        id: "squidnftworld",
        name: "Squid NFT World",
        dev: "developer",
        users: 0,
        banner: require("../assets/img/games/squidnftworld/banner.png"),
        logo: require("../assets/img/games/squidnftworld/logo.png"),
        media: "https://metababy.in/videos/squidnftworld.mp4",
        token: "biswap"
    },
    {
        id: "mobox",
        name: "Mobox (MBOX)",
        dev: "developer",
        users: 0,
        banner: require("../assets/img/games/mobox/banner.png"),
        logo: require("../assets/img/games/mobox/logo.png"),
        media: "https://metababy.in/videos/mobox.mp4",
        token: "mobox"
    },
    {
        id: "bombcrypto",
        name: "Bombcrypto (BCOIN)",
        dev: "developer",
        users: 0,
        banner: require("../assets/img/games/bombcrypto/banner.png"),
        logo: require("../assets/img/games/bombcrypto/logo.png"),
        media: "https://metababy.in/videos/bombcrypto.mp4",
        token: "bomber-coin"
    }
]