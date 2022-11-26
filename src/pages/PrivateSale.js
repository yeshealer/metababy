import React, { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import useTheme from '@mui/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import useActiveWeb3React from "../hooks/useActiveWeb3React";

import useStyles from "../assets/styles";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useConfirm } from "material-ui-confirm";
import { WalletContext, Web3Context } from "../hooks/context";
import {
    PRIVATE_SALE_ABI,
    PRIVATE_SALE_CONTRACT,
    META_BABY_ABI,
    BASE_BSC_SCAN_URL
} from "../config";

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

const PrivateSale = () => {
    const classes = useStyles();
    const theme = useTheme();
    const confirm = useConfirm();

    const [amount, setAmount] = useState("");
    const [isWL, setWL] = useState(false);
    const [max, setMax] = useState(100);
    const [filled, setFilled] = useState(0);
    const [purchased, setPurchased] = useState({
        bnb: 0,
        mbaby: 0
    })
    const [isApproved, setIsApproved] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    const { active, account } = useActiveWeb3React();

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const web3 = useContext(Web3Context);

    const { isOpenWallet, setIsOpenWallet } = useContext(WalletContext);

    const buy = () => {
        setIsProcessing(true);
        if (amount < 0 || amount > 2) {
            alert("Incorrect Amount...", "error");
            setIsProcessing(false);
            return;
        } else {
            const amountAsWei = new web3.utils.BN((amount * 10 ** 18).toString());
            const pSale = new web3.eth.Contract(PRIVATE_SALE_ABI, PRIVATE_SALE_CONTRACT);
            pSale.methods.deposit().send({ value: amountAsWei, from: account }).then((result) => {
                dialog(result, true);
                setIsProcessing(false);
                update();
            }).catch(e => {
                e.message ? alert(e.message, "error") : alert(`${(e.toString()).slice(0, 50)}...`, "error");
                setIsProcessing(false);
            });
        }
    }

    const approve = () => {
        setIsProcessing(true);
        const pSale = new web3.eth.Contract(PRIVATE_SALE_ABI, PRIVATE_SALE_CONTRACT);
        pSale.methods.metaBaby().call().then(_address => {
            const amount = new web3.utils.BN((2 * 10 ** 18).toString());
            const metaBaby = new web3.eth.Contract(META_BABY_ABI, _address);
            metaBaby.methods.approve(PRIVATE_SALE_CONTRACT, amount).send({ from: account }).then((result) => {
                dialog(result, true);
                setIsProcessing(false);
                setIsApproved(true);
            }).catch(e => {
                e.message ? alert(e.message, "error") : alert(`${(e.toString()).slice(0, 50)}...`, "error");
                setIsProcessing(false);
            });
        });
    };

    const update = () => {
        if (web3.eth) {
            const pSale = new web3.eth.Contract(PRIVATE_SALE_ABI, PRIVATE_SALE_CONTRACT);
            pSale.methods.hardCapInWei().call().then(result => {
                setMax(result / 10 ** 18 + 20);
            }).catch(() => { });
            pSale.methods.totalCollectedWei().call().then(result => {
                setFilled(result / 10 ** 18);
            }).catch(() => { });
            if (account && active) {
                pSale.methods.whitelistedAddresses(account).call().then(result => {
                    setWL(result);
                }).catch(() => { });
                pSale.methods.recipients(account).call().then(({ amountDepositedWei, amountMetaBaby }) => {
                    setPurchased({
                        bnb: Number(Number(amountDepositedWei / 10 ** 18).toFixed(2)),
                        mbaby: Number(Number(amountMetaBaby / 10 ** 18).toFixed(2))
                    });
                }).catch(() => { });
                pSale.methods.metaBaby().call().then(_address => {
                    const metaBaby = new web3.eth.Contract(META_BABY_ABI, _address);
                    metaBaby.methods.allowance(account, PRIVATE_SALE_CONTRACT).call({ from: account }).then(result => {
                        const allowance = new web3.utils.BN(result);
                        const amount = new web3.utils.BN((2 * 10 ** 18).toString());
                        if (allowance.lt(amount)) {
                            setIsApproved(false);
                        } else {
                            setIsApproved(true);
                        }
                    }).catch(() => { });
                }).catch(() => { });
            }
        }
    };

    useEffect(() => {
        update();
    }, [web3, account, active]);

    const dialog = (result, flag) => {
        const { transactionHash } = result;
        console.log(flag);
        confirm({
            title: "",
            content: (() => {
                return (
                    <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ pt: 4 }}>
                        <TaskAltIcon sx={{
                            width: theme => theme.spacing(8),
                            height: theme => theme.spacing(8),
                            mb: 1
                        }} color="success" />
                        <Typography sx={{ fontSize: theme => theme.spacing(2.25) }}>
                            Transaction Submitted Successfully
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                            <Link target="_blank" color="inherit" href={`${BASE_BSC_SCAN_URL}/tx/${transactionHash}`}>
                                <Typography component="span" sx={{ lineHeight: 0 }}>
                                    {transactionHash.substring(0, 8)}...{transactionHash.substring(transactionHash.length - 8, transactionHash.length)}
                                </Typography>
                            </Link>
                            <CopyToClipboard
                                text={transactionHash}
                            >
                                <IconButton size="small">
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </CopyToClipboard>
                        </Stack>
                    </Stack>
                )
            })(),
            confirmationText: (() => (
                <IconButton component="div" sx={{
                    background: "rgba(255, 255, 255, .05)"
                }}>
                    <CloseIcon />
                </IconButton>
            ))(),
            confirmationButtonProps: {
                sx: {
                    position: "absolute",
                    top: 16,
                    right: 16,
                }
            },
            cancellationText: "",
            dialogProps: {
                maxWidth: "xs"
            }
        }).then(() => {
        }).catch(() => { });
    }

    return (
        <Box className={classes.psale}>
            <Stack direction="column" justifyContent="center" alignItems="center">
                <Container maxWidth="sm">
                    <Stack direction={"row"} sx={{ pt: 2, pb: 4 }} alignItems="center" justifyContent="space-between">
                        <Box component="img" sx={{
                            height: 80,
                            [theme.breakpoints.down("sm")]: {
                                height: 60
                            }
                        }} src={require("../assets/img/badge/kyc.png")} alt="kyc" />
                        <Box component="img" sx={{
                            height: 80,
                            [theme.breakpoints.down("sm")]: {
                                height: 60
                            }
                        }} src={require("../assets/img/badge/rugdoc.png")} alt="kyc" />
                        <Box component="img" sx={{
                            height: 80,
                            [theme.breakpoints.down("sm")]: {
                                height: 60
                            }
                        }} src={require("../assets/img/badge/audit.png")} alt="kyc" />
                    </Stack>
                </Container>
                <Typography variant="h3" sx={{
                    textAlign: "center",
                    [theme.breakpoints.down("sm")]: {
                        fontSize: theme.spacing(4)
                    }
                }}>
                    META BABY {isMobile && <br />} PRIVATE SALE
                </Typography>
                <Typography variant="h5" sx={{
                    padding: theme => theme.spacing(1, 0),
                    WebkitTextStroke: theme => `1px ${theme.palette.secondary.main}`,
                    [theme.breakpoints.down("sm")]: {
                        fontSize: theme.spacing(2.5)
                    }
                }}>
                    Price: 1 BNB = 32,000,000 MBABY
                </Typography>
                <Container maxWidth="sm">
                    <Table sx={{
                        marginTop: 2,
                        background: "rgba(255, 255, 255, .05)",
                        borderRadius: theme => theme.shape.borderRadius / 8
                    }}>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    Raising : {isMobile && <br />} 100 BNB
                                </TableCell>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    Tokens for Sale: {isMobile && <br />} 3,200,000,000 MBABY
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    Min: 0.1 BNB
                                </TableCell>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    Max: 2 BNB
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    *Whitelisted Wallets only
                                </TableCell>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    *Tokens will be airdropped to respective wallets at launch block
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Stack sx={{
                        mt: 2,
                        mb: 2,
                        background: "rgba(255, 255, 255, .05)",
                        borderRadius: theme => theme.shape.borderRadius / 8,
                        padding: 2,
                        borderWidth: 1,
                        borderColor: theme => theme.palette.background.paper,
                        borderStyle: "solid",
                        position: "relative"
                    }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                                padding: 0,
                                zIndex: 1
                            }}
                        >
                            <LinearProgress
                                variant="determinate"
                                value={((filled + 23.5) / max) * 100}
                                sx={{
                                    height: 32,
                                    width: "100%",
                                    background: "transparent",
                                    borderRadius: 1,
                                    ["& > span"]: {
                                        background: "#F45FA3"
                                    }
                                }}
                            />
                            <Typography sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "none",
                                color: "#fff",
                                fontWeight: 300
                            }}>
                                Filled {(filled + 23.5)} / {max} BNB
                            </Typography>
                        </Button>
                        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 300,
                                    textAlign: "center",
                                    pt: 4,
                                    [theme.breakpoints.down("sm")]: {
                                        fontSize: theme.spacing(1.75)
                                    }
                                }}
                            >
                                Enter the amount of BNB you wish to invest
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={amount}
                                size="small"
                                onChange={e => {
                                    const { value } = e.target;
                                    setAmount((value >= 0.1 && value <= 2) ? value : 0);
                                }}
                                type="number"
                                sx={{
                                    ["& input"]: {
                                        textAlign: "right",
                                        ["&::-webkit-outer-spin-button, &::-webkit-inner-spin-button"]: {
                                            WebkitAppearance: "none",
                                            margin: 0
                                        }
                                    }
                                }}
                                inputProps={{
                                    placeholder: "0.0"
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Box
                                                component="img"
                                                src={require("../assets/img/bnb.png")}
                                                alt="BNB"
                                                sx={{
                                                    height: theme => theme.spacing(3)
                                                }}
                                            />
                                            <Typography
                                                color="text.secondary"
                                            >
                                                BNB
                                            </Typography>
                                        </Stack>
                                    </InputAdornment>,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontWeight: 300,
                                    textAlign: "center",
                                    pt: 1
                                }}
                            >
                                You will get {(amount * 32000000).toLocaleString()} MBABY Tokens
                            </Typography>
                            <Stack direction="row" justifyContent="center">
                                {(() => {
                                    if (account && active) {
                                        if (filled >= 100) {
                                            return (
                                                <LoadingButton
                                                    variant="contained"
                                                    loading={false}
                                                    color="secondary"
                                                    disabled={true}
                                                    sx={{
                                                        mt: 2
                                                    }}
                                                >
                                                    CLOSED
                                                </LoadingButton>
                                            )
                                        }
                                        if (!isWL) {
                                            return (
                                                <Link href="https://t.me/c/1559592040/5680" underline="none" color="inherit" target={"_blank"}>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        sx={{
                                                            mt: 2
                                                        }}
                                                    >
                                                        Get Whitelisted
                                                    </Button>
                                                </Link>
                                            )
                                        }
                                        if (!isApproved) {
                                            return (
                                                <LoadingButton
                                                    variant="contained"
                                                    onClick={approve}
                                                    color="secondary"
                                                    loading={isProcessing}
                                                    sx={{
                                                        mt: 2
                                                    }}
                                                >
                                                    Approve BNB
                                                </LoadingButton>
                                            )
                                        }
                                        return (
                                            <LoadingButton
                                                variant="contained"
                                                loading={isProcessing}
                                                onClick={buy}
                                                color="secondary"
                                                disabled={(amount > 2 || amount < 0.1) || purchased.bnb > 1}
                                                sx={{
                                                    mt: 2
                                                }}
                                            >
                                                {purchased.bnb > 1 ? "Your Max Limit Reached." : "BUY"}
                                            </LoadingButton>
                                        )
                                    } else {
                                        return (
                                            <Button
                                                variant="contained"
                                                onClick={() => setIsOpenWallet(!isOpenWallet)}
                                                color="secondary"
                                                sx={{
                                                    mt: 2
                                                }}
                                            >
                                                Connect Wallet
                                            </Button>
                                        )
                                    }
                                })()}
                            </Stack>
                        </Box>
                        <Box sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            right: 0,
                            background: "rgba(0, 0, 0, .25)",
                            backdropFilter: "blur(2px)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Typography color={"error"} variant="h2" sx={{ fontWeight: "600" }}>
                                CLOSED
                            </Typography>
                        </Box>
                    </Stack>
                    {(purchased.bnb > 0 && purchased.mbaby > 0) && (
                        <Table sx={{
                            marginTop: 2,
                            background: "rgba(255, 255, 255, .05)",
                            borderRadius: theme => theme.shape.borderRadius / 8
                        }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{
                                        borderWidth: 1,
                                        borderColor: theme => theme.palette.background.paper,
                                        borderStyle: "solid",
                                        textAlign: "center"
                                    }}>
                                        My Tokens
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{
                                        borderWidth: 1,
                                        borderColor: theme => theme.palette.background.paper,
                                        borderStyle: "solid",
                                        textAlign: "center"
                                    }}>
                                        Pledged
                                    </TableCell>
                                    <TableCell sx={{
                                        borderWidth: 1,
                                        borderColor: theme => theme.palette.background.paper,
                                        borderStyle: "solid",
                                        textAlign: "center"
                                    }}>
                                        You will receive
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{
                                        borderWidth: 1,
                                        borderColor: theme => theme.palette.background.paper,
                                        borderStyle: "solid",
                                        textAlign: "center"
                                    }}>
                                        {purchased.bnb.toLocaleString()} BNB
                                    </TableCell>
                                    <TableCell sx={{
                                        borderWidth: 1,
                                        borderColor: theme => theme.palette.background.paper,
                                        borderStyle: "solid",
                                        textAlign: "center"
                                    }}>
                                        {purchased.mbaby.toLocaleString()} MBABY
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    )}
                    <Stack>
                        <Typography variant="h5" sx={{ textAlign: "center", pt: 4 }}>
                            Presale Details
                        </Typography>
                        <Typography variant="h6" sx={{
                            textAlign: "center",
                            WebkitTextStroke: theme => `1px ${theme.palette.secondary.main}`
                        }}>
                            Price: Fair Launch
                        </Typography>
                    </Stack>
                    <Table sx={{
                        marginTop: 2,
                        background: "rgba(255, 255, 255, .05)",
                        borderRadius: theme => theme.shape.borderRadius / 8
                    }}>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    Soft Cap : 50 BNB
                                </TableCell>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    No Hard Cap
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    Min: 0.1 BNB
                                </TableCell>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    Max: No limit
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    Launchpad: Pinksale
                                </TableCell>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }}>
                                    Date: 7th April, 2022
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center"
                                }} colSpan={2}>
                                    Token will be launched on BISWAP after the presale on 11th April, 2022.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{
                                    borderWidth: 1,
                                    borderColor: theme => theme.palette.background.paper,
                                    borderStyle: "solid",
                                    textAlign: "center",
                                    padding: 0
                                }} colSpan={2}>
                                    <Link href="https://t.me/metababyofficial" underline="none" target="_blank">
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                borderRadius: 0.5
                                            }}
                                        >
                                            Join Community
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>
            </Stack>
        </Box>
    )
}

export default PrivateSale;
