
import React from "react";

import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';

import { ReactComponent as MediumIcon } from "../assets/img/icon/social/medium.svg";

import useTheme from '@mui/styles/useTheme';

const SocialLinks = () => {
    const theme = useTheme();

    return (
        <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
            <Link href="https://t.me/themetababy" underline="none" target="_blank">
                <IconButton sx={{
                    borderRadius: "50%",
                    background: "#fff",
                    color: theme => theme.palette.background.default,
                    padding: 1.25,
                    borderWidth: 2,
                    transition: ".5s",
                    borderStyle: "solid",
                    borderColor: "#fff",
                    ["& svg"]: {
                        fontSize: 22
                    },
                    [theme.breakpoints.down("sm")]: {
                        padding: 0.85,
                    },
                    ["&:hover"]: {
                        transform: "scale(1.125)",
                        background: theme => theme.palette.background.default,
                        color: "#fff",
                    }
                }}>
                    <TelegramIcon />
                </IconButton>
            </Link>
            <Link href="https://instagram.com/themetababy" underline="none" target="_blank">
                <IconButton sx={{
                    borderRadius: "50%",
                    background: "#fff",
                    color: theme => theme.palette.background.default,
                    padding: 1.25,
                    borderWidth: 2,
                    transition: ".5s",
                    borderStyle: "solid",
                    borderColor: "#fff",
                    ["& svg"]: {
                        fontSize: 22
                    },
                    [theme.breakpoints.down("sm")]: {
                        padding: 0.85,
                    },
                    ["&:hover"]: {
                        transform: "scale(1.125)",
                        background: theme => theme.palette.background.default,
                        color: "#fff",
                    }
                }}>
                    <InstagramIcon />
                </IconButton>
            </Link>
            <Link href="https://github.com/themetababy" underline="none" target="_blank">
                <IconButton sx={{
                    borderRadius: "50%",
                    background: "#fff",
                    color: theme => theme.palette.background.default,
                    padding: 1.25,
                    borderWidth: 2,
                    transition: ".5s",
                    borderStyle: "solid",
                    borderColor: "#fff",
                    ["& svg"]: {
                        fontSize: 22
                    },
                    [theme.breakpoints.down("sm")]: {
                        padding: 0.85,
                    },
                    ["&:hover"]: {
                        transform: "scale(1.125)",
                        background: theme => theme.palette.background.default,
                        color: "#fff",
                    }
                }}>
                    <GitHubIcon />
                </IconButton>
            </Link>
            <Link href="https://metababy.medium.com" underline="none" target="_blank">
                <IconButton sx={{
                    borderRadius: "50%",
                    background: "#fff",
                    color: theme => theme.palette.background.default,
                    padding: 1.25,
                    borderWidth: 2,
                    transition: ".5s",
                    borderStyle: "solid",
                    borderColor: "#fff",
                    ["& svg"]: {
                        fontSize: 22
                    },
                    [theme.breakpoints.down("sm")]: {
                        padding: 0.85,
                    },
                    ["&:hover"]: {
                        transform: "scale(1.125)",
                        background: theme => theme.palette.background.default,
                        color: "#fff",
                    }
                }}>
                    <SvgIcon style={{ fontSize: 20 }} component={MediumIcon} inheritViewBox />
                </IconButton>
            </Link>
            <Link href="https://reddit.com/r/metababy" underline="none" target="_blank">
                <IconButton sx={{
                    borderRadius: "50%",
                    background: "#fff",
                    color: theme => theme.palette.background.default,
                    padding: 1.25,
                    borderWidth: 2,
                    transition: ".5s",
                    borderStyle: "solid",
                    borderColor: "#fff",
                    ["& svg"]: {
                        fontSize: 22
                    },
                    [theme.breakpoints.down("sm")]: {
                        padding: 0.85,
                    },
                    ["&:hover"]: {
                        transform: "scale(1.125)",
                        background: theme => theme.palette.background.default,
                        color: "#fff",
                    }
                }}>
                    <RedditIcon />
                </IconButton>
            </Link>
            <Link href="https://twitter.com/themetababy" underline="none" target="_blank">
                <IconButton sx={{
                    borderRadius: "50%",
                    background: "#fff",
                    color: theme => theme.palette.background.default,
                    padding: 1.25,
                    borderWidth: 2,
                    transition: ".5s",
                    borderStyle: "solid",
                    borderColor: "#fff",
                    ["& svg"]: {
                        fontSize: 22
                    },
                    [theme.breakpoints.down("sm")]: {
                        padding: 0.85,
                    },
                    ["&:hover"]: {
                        transform: "scale(1.125)",
                        background: theme => theme.palette.background.default,
                        color: "#fff",
                    }
                }}>
                    <TwitterIcon />
                </IconButton>
            </Link>
        </Stack>
    )
}

export default SocialLinks;