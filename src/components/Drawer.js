import React, { useContext, useEffect, useState } from "react";

// ** Import Material UI Components ** // 
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';

import { ReactComponent as MediumIcon } from "../assets/img/icon/social/medium.svg";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import useStyles from "../assets/styles";

import { DrawerContext } from "../hooks/context";

import { useLocation, useNavigate } from "react-router-dom";

import Routes from "../config/constants/routes";
import { Typography } from "@mui/material";

const DrawerMenu = () => {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState([]);

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const { isOpenDrawer, toggleDrawer } = useContext(DrawerContext);

    const handleActive = ({ child, id, link }) => {
        if (link) {
            window.open(link);
            return;
        }
        if (child !== null) {
            activateRoute(id);
            setOpen({ [id]: !open[id] });
        } else {
            activateRoute(id);
            setOpen({});
            navigate(`/${id}`);
            if (isMobile) {
                toggleDrawer();
            }
        }
    };

    const activateRoute = routeId => {
        const activeRoute = Object.values(Routes).find(route => route.active === true);
        if (activeRoute)
            Routes[activeRoute?.id].active = false;
        Routes[routeId].active = true;
        setMenu(Routes);
    }

    useEffect(() => {
        const pathname = location.pathname.split("/")[1];
        if (pathname) {
            activateRoute(pathname);
        }
    }, [location]);

    const menuList = Object.values(menu).sort(item => item.order - item.b);
    const iOD = isMobile ? !isOpenDrawer : isOpenDrawer;

    return (
        <Drawer
            className={classes.drawer}
            variant={isMobile ? "temporary" : "permanent"}
            anchor="left"
            open={iOD}
            onClose={toggleDrawer}
            sx={{
                "& .MuiPaper-root": {
                    height: "100%",
                    overflow: "hidden",
                    padding: theme => theme.spacing(2, 0),
                    transition: "500ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    width: iOD ? 280 : 80,
                    boxShadow: "none"
                }
            }}
        >
            <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{
                pl: 2,
                pr: 2,
                pb: 2
            }}>
                <IconButton sx={{
                    padding: 1.5,
                    transform: iOD ? "rotate(0deg)" : "rotate(180deg)",
                    transition: ".25s"
                }} onClick={() => {
                    toggleDrawer();
                    if (iOD) setOpen({});
                }}>
                    <MenuOpenIcon />
                </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{
                height: "100%",
                overflow: "auto"
            }}>
                <List className="nav-list" sx={{
                    background: theme => theme.palette.background.paper,
                    p: 0,
                }}>
                    {menuList.map((item, idx) => {
                        return (
                            <React.Fragment key={item.id}>
                                <ListItem
                                    onClick={() => handleActive(item)}
                                    sx={{
                                        padding: iOD ? theme => theme.spacing(0, 2) : theme => theme.spacing(0, 2),
                                        borderBottomRightRadius: menuList[idx + 1]?.active ? 28 : 0,
                                        borderTopRightRadius: menuList[idx - 1]?.active ? 28 : 0,
                                        bgcolor: "background.default",
                                        pr: 0,
                                        transition: "500ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                                        ["& > div"]: {
                                            borderBottomLeftRadius: (item.child && open[item.id]) ? 0 : 8,
                                            borderBottomRightRadius: menuList[idx + 1]?.active ? 28 : 0,
                                            borderTopRightRadius: menuList[idx - 1]?.active ? 28 : 0,
                                            bgcolor: item?.active ? "background.paper" : "background.default",
                                            transition: "500ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                                            ["&:hover"]: {
                                                background: theme => theme.palette.background.paper
                                            }
                                        },
                                    }}
                                >
                                    <ListItemButton sx={{
                                        padding: iOD ? theme => theme.spacing(1.5, 2) : 1.5,
                                    }}>
                                        <ListItemIcon sx={{ minWidth: iOD ? 56 : 24 }}>
                                            {item.icon.svg ? (
                                                <SvgIcon style={{ height: 20 }} component={item.icon.component} inheritViewBox />
                                            ) : (
                                                <>{item.icon.component}</>
                                            )}
                                        </ListItemIcon>
                                        {iOD && (
                                            <>
                                                <ListItemText primary={item.label} />
                                                {item.child !== null ? open[item.id] ? <ExpandLess /> : <ExpandMore /> : ""}
                                            </>
                                        )}
                                    </ListItemButton>
                                </ListItem>
                                {item.child !== null && (
                                    <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{
                                            pl: 2, bgcolor: "background.default",
                                        }}>
                                            {item.child.map(cItem => (
                                                <ListItem
                                                    component={Link}
                                                    underline="none"
                                                    target={"_blank"}
                                                    href={cItem.link || "#"}
                                                    key={cItem.id}
                                                    color="inherit"
                                                    sx={{
                                                        pt: 0.5,
                                                        pb: 0.5,
                                                        bgcolor: "background.paper"
                                                    }}
                                                >
                                                    <ListItemButton sx={{ pt: 0.5, pb: 0.5, pl: 4 }}>
                                                        <ListItemIcon sx={{ minWidth: 40 }}>
                                                            <FiberManualRecordIcon sx={{ fontSize: 12 }} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={cItem.label} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </React.Fragment>
                        )
                    })}
                </List>
            </Stack>
            <Stack>
                <Link href="https://rugdoc.io/project/the-meta-baby/" target="_blank" underline="none" sx={{ lineHeight: 0, textAlign: "center" }}>
                    <Box component="img" src={require("../assets/img/badge/rugdoc.png")} alt="rugdoc" sx={{ width: "70%" }} />
                </Link>
                <List sx={{ p: 0, mt: -1 }}>
                    <ListItem sx={{ pl: 2, pr: 2 }}>
                        <ListItemIcon>
                            <Box component="img" src={require("../assets/img/mbaby.png")} alt="mbaby" sx={{ width: 42, height: 42 }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography>
                                $0.00
                            </Typography>
                        </ListItemText>
                        <Box component="img" src={require("../assets/img/wallets/meta-mask.svg").default} alt="mbaby" sx={{ width: 42, height: 42, p: 1 }} />
                    </ListItem>
                </List>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                <Link href="https://t.me/themetababy" underline="none" target="_blank">
                    <IconButton>
                        <TelegramIcon />
                    </IconButton>
                </Link>
                <Link href="https://instagram.com/themetababy" underline="none" target="_blank">
                    <IconButton>
                        <InstagramIcon />
                    </IconButton>
                </Link>
                <Link href="https://github.com/themetababy" underline="none" target="_blank">
                    <IconButton>
                        <GitHubIcon />
                    </IconButton>
                </Link>
                <Link href="https://metababy.medium.com" underline="none" target="_blank">
                    <IconButton>
                        <SvgIcon style={{ fontSize: 20 }} component={MediumIcon} inheritViewBox />
                    </IconButton>
                </Link>
                <Link href="https://reddit.com/r/metababy" underline="none" target="_blank">
                    <IconButton>
                        <RedditIcon />
                    </IconButton>
                </Link>
                <Link href="https://twitter.com/themetababy" underline="none" target="_blank">
                    <IconButton>
                        <TwitterIcon />
                    </IconButton>
                </Link>
            </Stack>
        </Drawer >
    )
}

export default DrawerMenu;