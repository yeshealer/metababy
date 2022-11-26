import React, { useState, useEffect, useContext } from 'react';

// ** Import Material UI Components ** // 
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Import Material UI Icons ** // 
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

// ** Import Hooks ** //
import useWallet from '../hooks/useWallet';
import useActiveWallet from '../hooks/useActiveWallet';
import useInactiveListener from '../hooks/useInactiveListener';
import useEagerConnect from "../hooks/useEagerConnect";
import { CopyToClipboard } from "react-copy-to-clipboard";

import useStyles from "../assets/styles";

import { DrawerContext, WalletContext, Web3Context } from '../hooks/context';

import { connectorsByName } from '../utils/web3React';

import {
    PRIVATE_SALE_CONTRACT,
    PRIVATE_SALE_ABI,
    META_BABY_ABI
} from '../config';

import useAuth from '../hooks/useAuth';

import { useWeb3React } from '@web3-react/core';

const GlobalHooks = () => {
    useEagerConnect()
    useInactiveListener()
    return <></>
}

const Header = () => {
    const { login, logout } = useAuth();
    const classes = useStyles();
    const wallets = useWallet();
    const web3 = useContext(Web3Context);
    const { chainId, active, account, connector, library } =
        useWeb3React();
    const cWallet = useActiveWallet();

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const { isOpenDrawer, toggleDrawer } = useContext(DrawerContext);
    const { isOpenWallet, setIsOpenWallet } = useContext(WalletContext);

    const [activatingConnector, setActivatingConnector] = useState({});

    const [balance, setBalance] = useState(0);
    const [mBalance, setMBalance] = useState(0);

    // ** Effect ** //
    useEffect(() => {
        if (cWallet) {
            const { id } = cWallet;
            if (activatingConnector[id] && connectorsByName[activatingConnector[id]] === connector) {
                setActivatingConnector({});
            }
        }
    }, [activatingConnector, connector, cWallet]);

    useEffect(() => {
        if (web3.eth && active && account && library) {
            web3.eth.getBalance(account).then(result => {
                setBalance(Number(Number(result / 10 ** 18).toFixed(2)));
            });
            const pSale = new web3.eth.Contract(PRIVATE_SALE_ABI, PRIVATE_SALE_CONTRACT);
            pSale.methods.metaBaby().call().then(_address => {
                const metaBaby = new web3.eth.Contract(META_BABY_ABI, _address);
                metaBaby.methods.balanceOf(account).call().then(result => {
                    setMBalance(Number(Number(result / 10 ** 18).toFixed(2)));
                });
            });
        };
    }, [account, web3, active, library]);

    console.log("Mbaby Balance:", mBalance);

    const toggleWallet = () => {
        setIsOpenWallet(!isOpenWallet);
    }
    const onConnectWallet = async (item) => {
        setActivatingConnector({
            [item.id]: item.connector
        });
        await login(item.connector);
        setActivatingConnector({});
    };

    const onDeactiveWallet = () => {
        logout();
    };

    return (
        <>
            <GlobalHooks />
            <AppBar position="fixed" color="primary" className={classes.appbar} sx={{
                marginLeft: isMobile ? 0 : isOpenDrawer ? "280px" : "80px",
                transition: ".5s",
                width: isMobile ? "100%" : isOpenDrawer ? "calc(100% - 280px)" : "calc(100% - 80px)",
                padding: isMobile ? "0px 16px" : "0px 24px",
                bgcolor: "transparent"
            }}>
                <Toolbar className={classes.toolbar} sx={{
                    pl: 0, pr: 0
                }}>
                    {isOpenDrawer && isMobile && (
                        <IconButton onClick={toggleDrawer}>
                            <MenuRoundedIcon />
                        </IconButton>
                    )}
                    <Box
                        component="img"
                        alt="logo"
                        src={isMobile ? require("../assets/img/f-logo.png") : require("../assets/img/d-logo.png")}
                        sx={{
                            height: isMobile ? "100%" : "72px",
                        }}
                    />
                    <Box className="space" />
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ m: 2, mt: 0, mb: 0 }}>
                        <IconButton sx={{ background: "rgba(255,255, 255, .075)" }}>
                            <Badge color="secondary" variant="dot" invisible={false}>
                                <NotificationsNoneRoundedIcon />
                            </Badge>
                        </IconButton>
                        <IconButton sx={{ background: "rgba(255,255, 255, .075)" }}>
                            <TuneRoundedIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={4}>
                        {account ? (
                            <>
                                {isMobile ? (
                                    <IconButton
                                        className='connect-button'
                                        onClick={toggleWallet}
                                        color="secondary"
                                        style={{
                                            background: "rgba(0, 80, 225, 0.5)"
                                        }}
                                    >
                                        <Box component="img" className='cwallet-logo' src={require("../assets/img/wallets/wallet.svg").default} alt={"Wallet"} />
                                    </IconButton>
                                ) : (
                                    <Button
                                        className='connect-button'
                                        onClick={toggleWallet}
                                        startIcon={
                                            <Box component="img" className='cwallet-logo' src={require("../assets/img/wallets/wallet.svg").default} alt={"Wallet"} />
                                        }
                                        size="large"
                                        color="secondary"
                                        variant='contained'
                                        sx={{
                                            textTransform: "none",
                                        }}
                                    >
                                        {account.substring(
                                            0,
                                            6
                                        )} ... {account.substring(
                                            account.length - 4
                                        )}
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                {isMobile ? (
                                    <IconButton
                                        className='connect-button'
                                        onClick={toggleWallet}
                                        color="secondary"
                                        style={{
                                            background: "rgba(0, 80, 225, 0.5)"
                                        }}
                                    >
                                        <Box component="img" className='cwallet-logo' src={require("../assets/img/wallets/wallet.svg").default} alt={"Wallet"} />
                                    </IconButton>
                                ) : (
                                    <Button
                                        startIcon={
                                            <Box component="img" className='cwallet-logo' src={require("../assets/img/wallets/wallet.svg").default} alt={"Wallet"} />
                                        }
                                        className='connect-button'
                                        onClick={toggleWallet}
                                        size="large"
                                        color="secondary"
                                        variant='contained'
                                    >
                                        Connect Wallet
                                    </Button>
                                )}
                            </>
                        )}

                    </Stack>
                </Toolbar>
            </AppBar>
            <Dialog
                open={isOpenWallet}
                className={classes.wallet}
                onClose={toggleWallet}
                maxWidth="xs"
                sx={{
                    ["& .MuiPaper-root"]: {
                        overflow: "visible"
                    }
                }}
            >
                {(active && account) ? (
                    <>
                        <IconButton onClick={toggleWallet} sx={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            transform: "translate(-50%, -50%)",
                            backgroundColor: theme => theme.palette.background.default,
                            transition: ".25s",
                            ["&:hover"]: {
                                transform: "translate(-50%, -50%) scale(1.1)",
                                backgroundColor: theme => theme.palette.background.default,
                            }
                        }}>
                            <CloseIcon />
                        </IconButton>
                        <Box className="account" style={{ paddingTop: 24 }}>
                            <Stack className='address' direction="row" justifyContent="space-between" alignItems="center">
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <IconButton size='small'>
                                        <AccountBalanceWalletRoundedIcon />
                                    </IconButton>
                                    <Typography variant="body2" color="textSecondary">
                                        {account
                                            && `${account.substring(
                                                0,
                                                isMobile ? 6 : 8
                                            )} ... ${account.substring(
                                                account.length - (isMobile ? 4 : 8)
                                            )}`}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <CopyToClipboard
                                        text={account}
                                    >
                                        <IconButton size='small'>
                                            <ContentCopyRoundedIcon />
                                        </IconButton>
                                    </CopyToClipboard>
                                    {chainId === 97 ? (
                                        <Link underline='none' target="_blank" href={`https://testnet.bscscan.com/address/${account}`}>
                                            <IconButton size='small'>
                                                <TravelExploreRoundedIcon />
                                            </IconButton>
                                        </Link>
                                    ) : (
                                        <Link underline='none' target="_blank" href={`https://bscscan.com/address/${account}`}>
                                            <IconButton size='small'>
                                                <TravelExploreRoundedIcon />
                                            </IconButton>
                                        </Link>
                                    )}
                                </Stack>
                            </Stack>
                            <ButtonGroup fullWidth className='action' variant="outlined" aria-label="outlined button group">
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={onDeactiveWallet}
                                    startIcon={
                                        <LogoutRoundedIcon />
                                    }
                                >
                                    Disconnect
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    startIcon={
                                        <RestartAltRoundedIcon />
                                    }
                                >
                                    Refresh
                                </Button>
                            </ButtonGroup>
                            <List className="top-token-list">
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Box component="img" src={require("../assets/img/bnb.png")} alt="BNB" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="BNB"
                                            secondary="BNB"
                                        />
                                        {balance}
                                    </ListItemButton>
                                </ListItem>
                                {/* <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Box component="img" src={require("../assets/img/mbaby.png")} alt="MBABY" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="METABABY"
                                            secondary="Binance Smart Chain"
                                        />
                                        {mBalance}
                                    </ListItemButton>
                                </ListItem> */}
                            </List>
                        </Box>
                    </>
                ) : (
                    <Box className='wallet-connect'>
                        <List>
                            {wallets.map((item) => {
                                const activating =
                                    item.connector === activatingConnector[item.id];
                                return (
                                    <ListItem key={item.id} disablePadding={isMobile} sx={{
                                        margin: theme => isMobile ? theme.spacing(1, 0) : 0
                                    }}>
                                        <ListItemButton onClick={() => onConnectWallet(item)}>
                                            <ListItemIcon>
                                                <Box component="img" src={item.logo} alt={item.title} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.title}
                                                secondary={
                                                    activating
                                                        ? "Initializing..."
                                                        : item.description
                                                }
                                            />
                                            {activating && <CircularProgress size={24} color='info' />}
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                )}
            </Dialog>
        </>
    )
}

export default Header;