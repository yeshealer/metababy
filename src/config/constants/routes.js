import React from "react";

import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TourIcon from '@mui/icons-material/Tour';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';
import ChildCareRoundedIcon from '@mui/icons-material/ChildCareRounded';

// import { ReactComponent as PsaleIcon } from "../../assets/img/icon/drawer/psale.svg";
// import { ReactComponent as NFTIcon } from "../../assets/img/icon/drawer/nft.svg";
import { ReactComponent as StakeNFTIcon } from "../../assets/img/icon/drawer/stake_nft.svg";
import { ReactComponent as StakeMBabyIcon } from "../../assets/img/icon/drawer/stake_mbaby.svg";

import Home from "../../pages/Home";
// import PrivateSale from "../../pages/PrivateSale";
import BabyBoard from "../../pages/BabyBoard";
import ComingSoon from "../../pages/ComingSoon";
import NFB from "../../pages/NFB";
import Babyverse from "../../pages/Babyverse";
import Games from "../../pages/Games";

const Routes = {
    "home": {
        id: "home",
        order: 0,
        child: null,
        icon: {
            svg: false,
            component: <CottageRoundedIcon />
        },
        // link: "https://themetababy.io",
        label: "Home",
        layout: "wl",
        element: <Home />
    },
    "babyboard": {
        id: "babyboard",
        order: 1,
        child: null,
        icon: {
            svg: false,
            component: <DashboardIcon />
        },
        label: "BabyBoard",
        layout: "wl",
        element: <BabyBoard />
    },
    // "private-sale": {
    //     id: "private-sale",
    //     order: 2,
    //     child: null,
    //     icon: {
    //         svg: true,
    //         component: PsaleIcon
    //     },
    //     label: "Privatesale",
    //     layout: "wl",
    //     element: <PrivateSale />
    // },
    "nfbs": {
        id: "nfbs",
        order: 3,
        child: null,
        icon: {
            svg: false,
            component: <ChildCareRoundedIcon />
        },
        label: "NFBs",
        layout: "wl",
        element: <NFB />
    },
    "stake-nft": {
        id: "stake-nft",
        order: 4,
        child: null,
        icon: {
            svg: true,
            component: StakeNFTIcon
        },
        label: "Stake NFB",
        layout: "wl",
        element: <ComingSoon />
    },
    "baby-pool": {
        id: "baby-pool",
        order: 5,
        child: null,
        icon: {
            svg: true,
            component: StakeMBabyIcon
        },
        label: "Baby Pool",
        layout: "wl",
        element: <ComingSoon />
    },
    "games": {
        id: "games",
        order: 6,
        child: null,
        icon: {
            svg: false,
            component: <SportsEsportsIcon />
        },
        label: "Games Aggregator",
        layout: "wl",
        element: <Games />
    },
    "tournaments": {
        id: "tournaments",
        order: 7,
        child: null,
        icon: {
            svg: false,
            component: <TourIcon />
        },
        label: "Tournaments",
        layout: "wl",
        element: <ComingSoon />
    },
    "audit": {
        id: "audit",
        order: 8,
        child: [
            {
                id: "audit",
                label: "Audit",
                link: "https://github.com/AuditRateTech/Smart-Contract-Audits/blob/main/Meta_Baby_0xE7921a12c03dA02072Beae87d76477602ec2857e.pdf"
            },
            {
                id: "kyc",
                label: "KYC(Pinksale)",
                link: "https://www.pinksale.finance/#/launchpad/0x844e64aEFe5a883eC38F25A4a51BfFc2ABf174B7?chain=BSC"
            }
        ],
        icon: {
            svg: false,
            component: <VerifiedUserIcon />
        },
        label: "Audit / KYC",
        layout: "wl",
        element: <ComingSoon />
    },
    "babyverse": {
        id: "babyverse",
        order: 9,
        child: null,
        icon: {
            svg: false,
            component: <BedroomBabyIcon />
        },
        label: "Babyverse",
        layout: "wl",
        element: <Babyverse />
    },
    "more": {
        id: "more",
        order: 10,
        child: [
            {
                id: "docs",
                label: "Docs",
                link: "https://docs.themetababy.io"
            },
            {
                id: "Whitepaper",
                label: "Whitepaper",
                link: "https://www.themetababy.io/assets/docs/metababy-whitepaper.pdf"
            },
            {
                id: "github",
                label: "Github",
                link: "https://github.com/themetababy"
            },
            {
                id: "cmc",
                label: "CoinMarketCap"
            },
        ],
        icon: {
            svg: false,
            component: <PlaylistAddIcon />
        },
        label: "More",
        layout: "wl",
        element: <ComingSoon />
    },
}

export default Routes;
