import React, { useState, useEffect, useContext } from "react";

// ** Import Material UI Components ** // 
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CircularProgress from '@mui/material/CircularProgress';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';

import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import useTheme from '@mui/styles/useTheme';

import { useParams } from "react-router-dom";

import TabPanel from "../components/TabPanel";

import { Games } from "../config";
import { APIContext } from "../hooks/context";

const GameDetail = () => {
    const [game, setGame] = useState({});
    // const [active, setActive] = useState({});
    const [activeTab, setActiveTab] = useState(0);
    const [activeSlick, setActiveSlick] = useState(0);

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const { tokens } = useContext(APIContext);

    const params = useParams();
    const theme = useTheme();

    const handleActiveTab = (event, newTab) => {
        setActiveTab(newTab);
    };
    const handleActiveSlick = (event, newSlick) => {
        setActiveSlick(newSlick);
    };

    useEffect(() => {
        if (Object.values(tokens).length) {
            const { id } = params;
            const g = Games.find(item => item.id === id);
            if (tokens[g.token]) {
                setGame({
                    ...g,
                    token: tokens[g.token]
                });
            }
        }
    }, [params, tokens])

    if (game.token) {

        const {
            token: {
                image,
                categories,
                links: {
                    homepage,
                    subreddit_url,
                    telegram_channel_identifier,
                    twitter_screen_name,
                },
                market_data: {
                    current_price,
                    price_change_percentage_24h,
                }
            }
        } = game;

        return (
            <Box sx={{
                padding: theme => theme.spacing(2, 6),
                height: "100%",
                overflow: "auto",
                [theme.breakpoints.down("sm")]: {
                    padding: theme.spacing(1, 1)
                }
            }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ pb: 4 }}>
                    <Link underline="hover" color="inherit" href="/">
                        <IconButton size="small">
                            <HomeRoundedIcon />
                        </IconButton>
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/games"
                    >
                        Games
                    </Link>
                    <Typography color="text.primary">{game.name}</Typography>
                </Breadcrumbs>
                <Container>
                    <Grid container spacing={2} sx={{
                        ["& .MuiTabs-indicator"]: {
                            display: "none",
                        }
                    }}>
                        <Grid item xs={12} sm={9} sx={{
                            [theme.breakpoints.down("sm")]: {
                                order: 2
                            }
                        }}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Badge
                                            overlap="circular"
                                            badgeContent={
                                                <IconButton sx={{
                                                    width: theme.spacing(2),
                                                    height: theme.spacing(2),
                                                    bgcolor: theme.palette.secondary.main,
                                                    borderRadius: 3
                                                }}>
                                                    <CheckIcon sx={{ fontSize: theme.spacing(1.75) }} />
                                                </IconButton>
                                            }
                                        >
                                            <Avatar
                                                src={image.large}
                                                alt="avatar"
                                                sx={{
                                                    borderColor: theme.palette.secondary.main,
                                                    borderWidth: 1,
                                                    borderStyle: "solid",
                                                    borderRadius: 10
                                                }}
                                            />
                                        </Badge>
                                    }
                                    sx={{
                                        ["&	.MuiCardHeader-action"]: {
                                            marginTop: 0,
                                            marginBottom: 0,
                                            alignSelf: "center"
                                        }
                                    }}
                                    title={game.name}
                                    subheader={game.dev}
                                />
                                <CardMedia
                                    component="img"
                                    height="360"
                                    image={game.banner}
                                    alt="Paella dish"
                                />
                                <Stack spacing={1} sx={{
                                    p: theme.spacing(2, 2),
                                    ["& .MuiButton-startIcon"]: {
                                        marginRight: 0
                                    }
                                }}>
                                    <Stack direction="row" justifyContent={"space-between"}>
                                        <Box>
                                            {current_price.usd >= 0 ? (
                                                <Typography sx={{ ml: 1, mr: 1, flexGrow: 1, fontSize: 18 }} variant="caption">
                                                    ${current_price.usd.toFixed(2)}
                                                </Typography>
                                            ) : <Skeleton />}
                                            {price_change_percentage_24h && (
                                                <Button
                                                    size="small"
                                                    color={"success"}
                                                    variant="contained"
                                                    startIcon={
                                                        price_change_percentage_24h > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                                                    }
                                                    sx={{
                                                        pt: 0,
                                                        pb: 0,
                                                        pl: 1,
                                                        pr: 1,
                                                        ["& > span"]: {
                                                            margin: 0
                                                        }
                                                    }}
                                                >
                                                    {price_change_percentage_24h.toFixed(2)}%
                                                </Button>
                                            )}
                                        </Box>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{
                                            background: "rgba(255, 255, 255, .1)",
                                            p: 0.75,
                                            borderRadius: 1
                                        }}>
                                            <Box
                                                component="img"
                                                src={require("../assets/img/bnb.png")}
                                                alt="BNB"
                                                sx={{
                                                    width: theme.spacing(2.25),
                                                    height: theme.spacing(2.25)
                                                }}
                                            />
                                            <Typography sx={{
                                                fontSize: 12
                                            }}>
                                                BNB
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row">
                                        {homepage[0] && (
                                            <Link href={homepage[0]} underline="none" target="_blank">
                                                <IconButton>
                                                    <LanguageRoundedIcon />
                                                </IconButton>
                                            </Link>
                                        )}
                                        {twitter_screen_name && (
                                            <Link href={`https://twitter.com/${twitter_screen_name}`} underline="none" target="_blank">
                                                <IconButton>
                                                    <TwitterIcon />
                                                </IconButton>
                                            </Link>
                                        )}
                                        {telegram_channel_identifier && (
                                            <Link href={`https://t.me/${telegram_channel_identifier}`} underline="none" target="_blank">
                                                <IconButton>
                                                    <TelegramIcon />
                                                </IconButton>
                                            </Link>
                                        )}
                                        {subreddit_url && (
                                            <Link href={subreddit_url} underline="none" target="_blank">
                                                <IconButton>
                                                    <RedditIcon />
                                                </IconButton>
                                            </Link>
                                        )}
                                    </Stack>
                                </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{
                            display: "flex",
                            flexDirection: "column",
                            [theme.breakpoints.down("sm")]: {
                                order: 3
                            }
                        }}>
                            <Tabs
                                sx={{
                                    flexGrow: 1,
                                    height: 0,
                                    minHeight: 120,
                                    ["& button"]: {
                                        transition: ".25s"
                                    },
                                    ["& .Mui-selected"]: {
                                        padding: theme.spacing(.5),
                                    }
                                }}
                                orientation={isMobile ? "horizontal" : "vertical"}
                                variant="scrollable"
                                value={activeSlick}
                                onChange={handleActiveSlick}
                                scrollButtons={true}
                            >
                                <Tab label={
                                    <Box sx={{
                                        height: theme => theme.spacing(10),
                                        borderRadius: 1,
                                        width: "100%",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundImage: `url(${game.banner})`
                                    }} />
                                } />
                                <Tab label={
                                    <Box sx={{
                                        height: theme => theme.spacing(10),
                                        borderRadius: 1,
                                        width: "100%",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundImage: `url(${game.banner})`
                                    }} />
                                } />
                                <Tab label={
                                    <Box sx={{
                                        height: theme => theme.spacing(10),
                                        borderRadius: 1,
                                        width: "100%",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundImage: `url(${game.banner})`
                                    }} />
                                } />
                                <Tab label={
                                    <Box sx={{
                                        height: theme => theme.spacing(10),
                                        borderRadius: 1,
                                        width: "100%",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundImage: `url(${game.banner})`
                                    }} />
                                } />
                                <Tab label={
                                    <Box sx={{
                                        height: theme => theme.spacing(10),
                                        borderRadius: 1,
                                        width: "100%",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundImage: `url(${game.banner})`
                                    }} />
                                } />
                                <Tab label={
                                    <Box sx={{
                                        height: theme => theme.spacing(10),
                                        borderRadius: 1,
                                        width: "100%",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundImage: `url(${game.banner})`
                                    }} />
                                } />
                            </Tabs>
                            <Card>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                                        Category:
                                    </Typography>
                                    <Typography variant="body2">
                                        {categories.map((item, idx) => <React.Fragment key={idx}>{item}{idx !== categories.length - 1 && ","} </React.Fragment>)}
                                    </Typography>
                                    <Box component={"br"} />
                                    <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                                        Status:
                                    </Typography>
                                    <Typography>
                                        Playable
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={9}>
                            <Button
                                size="large"
                                fullWidth
                                variant="outlined"
                                sx={{
                                    mt: 2
                                }}
                                startIcon={
                                    <SportsEsportsIcon />
                                }
                            >
                                Play Game
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={3}></Grid>
                    </Grid>
                    <Grid container sx={{
                        mt: 2,
                        ["& .MuiTabs-indicator"]: {
                            left: 0,
                        }
                    }}>
                        <Grid item xs={12} sm={9} sx={{
                            [theme.breakpoints.down("sm")]: {
                                order: 2
                            }
                        }}>
                            <TabPanel value={activeTab} style={{ padding: 0, height: "100%" }} index={0}>
                                <Card sx={{
                                    height: "100%",
                                    [theme.breakpoints.down("sm")]: {
                                        minHeight: 300
                                    }
                                }}>
                                    <CardContent>
                                        <Typography>
                                            About Game
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </TabPanel>
                            <TabPanel value={activeTab} style={{ padding: 0, height: "100%" }} index={1}>
                                <Card sx={{
                                    height: "100%",
                                    [theme.breakpoints.down("sm")]: {
                                        minHeight: 300
                                    }
                                }}>
                                    <CardContent>
                                        <Typography>
                                            Tokenomics
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </TabPanel>
                            <TabPanel value={activeTab} style={{ padding: 0, height: "100%" }} index={2}>
                                <Card sx={{
                                    height: "100%",
                                    [theme.breakpoints.down("sm")]: {
                                        minHeight: 300
                                    }
                                }}>
                                    <CardContent>
                                        <Typography>
                                            Roadmap
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </TabPanel>
                            <TabPanel value={activeTab} style={{ padding: 0, height: "100%" }} index={3}>
                                <Card sx={{
                                    height: "100%",
                                    [theme.breakpoints.down("sm")]: {
                                        minHeight: 300
                                    }
                                }}>
                                    <CardContent>
                                        <Typography>
                                            Team
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{
                            [theme.breakpoints.down("sm")]: {
                                order: 1
                            }
                        }}>
                            <Tabs
                                variant="scrollable"
                                value={activeTab}
                                orientation={isMobile ? "horizontal" : "vertical"}
                                onChange={handleActiveTab}
                                sx={{
                                    borderLeft: 1,
                                    borderColor: 'divider',
                                    [theme.breakpoints.down("sm")]: {
                                        border: "none"
                                    },
                                }}
                            >
                                <Tab label="Overview" />
                                <Tab label="Tokenomics" />
                                <Tab label="Roadmap" />
                                <Tab label="More info" />
                            </Tabs>
                        </Grid>
                    </Grid>
                </Container>
            </Box >
        )
    } else {
        return (
            <Box sx={{ p: 2, pt: 10, pb: 10, width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <CircularProgress color="secondary" />
            </Box>
        )
    }
}

export default GameDetail;