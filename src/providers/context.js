import React, { useEffect, useState } from "react";

import Web3 from "web3";

import { tokensList } from "../config";

import {
    ThemeContext,
    Web3Context,
    WalletContext,
    DrawerContext,
    APIContext
} from "../hooks/context";

import useActiveWeb3React from "../hooks/useActiveWeb3React";
import useApi from "../hooks/useApi";

const ContextProvider = ({ children }) => {
    const api = useApi();

    const [mode, setMode] = useState("dark");

    const [web3, setWeb3] = useState({});

    const [isOpenWallet, setIsOpenWallet] = useState(false);

    const [tokens, setTokens] = useState({});

    const { library } = useActiveWeb3React();

    const [isOpenDrawer, setIsOpenDrawer] = useState(true);

    const toggleDrawer = () => {
        setIsOpenDrawer(!isOpenDrawer);
    }

    const updateTokens = async () => {
        try {
            const temp = {};
            for (let i in tokensList) {
                const tokenId = tokensList[i];
                const tokenData = await api.getTokenInfo(tokenId);
                const tokenMarket = await api.getTokenMarket(tokenId);  
                temp[tokenId] = tokenData;
                temp[tokenId]["market"] = tokenMarket;
            }
            console.log(temp);
            setTokens(temp);
        } catch (e) {
            setTimeout(() => {
                updateTokens();
            }, 1000 * 30);
            console.log(e.toString());
        }
    };

    useState(() => {
        updateTokens();
    }, []);

    useEffect(() => {
        if (library) {
            const web3 = new Web3(library.provider || library.connection.url);
            setWeb3(web3);
        }
    }, [library])

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            <Web3Context.Provider value={web3}>
                <WalletContext.Provider value={{ isOpenWallet, setIsOpenWallet }}>
                    <DrawerContext.Provider value={{ isOpenDrawer, toggleDrawer }}>
                        <APIContext.Provider value={{ tokens }}>
                            {children}
                        </APIContext.Provider>
                    </DrawerContext.Provider>
                </WalletContext.Provider>
            </Web3Context.Provider>
        </ThemeContext.Provider >
    )
}

export default ContextProvider;