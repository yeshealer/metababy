import React from 'react';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CardHeader from '@mui/material/CardHeader';
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import Slider from "react-slick";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';

import useTheme from '@mui/styles/useTheme';

import { gameSlider, mgameSlider, bannerSlider } from '../config/constants/slide';

import { Games as vBList } from "../config";

const Games = (props) => {
    const theme = useTheme();

    const { index, item } = props;
    return (
        <Card {...props} sx={{
            position: "relative",
            bgcolor: "background.default",
            backgroundImage: "none",
            ["&:hover"]: {
                boxShadow: "0px 0px 16px 3px #9e4bfd",
                cursor: "pointer"
            }
        }}>
            <CardMedia
                component="img"
                height={theme.spacing(20)}
                image={item.banner}
                alt="game brand"
            />
            <Stack direction="row" alignItems="center" spacing={1} sx={{
                position: "absolute",
                top: theme.spacing(2),
                right: theme.spacing(2),
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
            <Stack direction="row" spacing={1} alignItems="flex-end" sx={{
                p: theme => theme.spacing(1, 2),
                mt: theme => theme.spacing(-4)
            }}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <IconButton sx={{
                            width: theme.spacing(2.5),
                            height: theme.spacing(2.5),
                            bgcolor: theme.palette.secondary.main,
                            borderRadius: 3
                        }}>
                            <CheckIcon sx={{ fontSize: theme.spacing(2) }} />
                        </IconButton>
                    }
                >
                    <Avatar
                        src={item.logo}
                        alt="user avatar"
                        sx={{
                            borderColor: theme => theme.palette.secondary.main,
                            borderWidth: 2,
                            borderStyle: "solid",
                            width: theme => theme.spacing(8),
                            height: theme => theme.spacing(8),
                            borderRadius: 10
                        }}
                    />
                </Badge>
                <Stack direction="row" alignItems="center" spacing={1} sx={{
                    pl: 1,
                    display: "none",
                    ["& .MuiButton-startIcon"]: {
                        marginRight: 0
                    }
                }}>
                    <Typography variant='h6'>
                        $0.00
                    </Typography>
                    <Button
                        size="small"
                        color={index % 2 === 0 ? "success" : "error"}
                        variant="contained"
                        startIcon={
                            index % 2 === 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                        }
                        sx={{
                            pt: 0,
                            pb: 0
                        }}
                    >
                        0.00%
                    </Button>
                </Stack>
            </Stack>
            <Typography sx={{
                p: 2,
                textAlign: "center"
            }}>
                {item.name}
            </Typography>
        </Card>
    )
}

const MGames = (props) => {
    const theme = useTheme();

    const { item } = props;

    return (
        <Box {...props} sx={{
            borderRadius: 1,
            position: "relative",
            ["&:hover"]: {
                boxShadow: "0px 0px 16px 3px #9e4bfd",
                cursor: "pointer"
            }
        }}>
            <Card>
                <CardHeader
                    avatar={
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                                src={item.logo}
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
                    action={
                        <Box
                            variant="contained"
                            sx={{
                                display: "none",
                                bgcolor: theme.palette.secondary.main,
                                color: "#fff",
                                textTransform: "none",
                                fontWeight: "200",
                                boxShadow: "none",
                                fontSize: 12,
                                padding: theme.spacing(1, 1),
                                borderRadius: 1
                            }}
                        >
                            Volume: $0.00
                        </Box>
                    }
                    sx={{
                        ["&	.MuiCardHeader-action"]: {
                            marginTop: 0,
                            marginBottom: 0,
                            alignSelf: "center"
                        }
                    }}
                    title={item.name}
                // subheader="0 Users"
                />
                <CardMedia
                    component="img"
                    height="280"
                    image={item.banner}
                    alt="Paella dish"
                />
            </Card>
        </Box>
    )
}

const BSlide = ({ item, vprops }) => {
    const theme = useTheme();

    return (
        <Link href={item.link || ""} target="_blank">
            <Card sx={{ lineHeight: 0, position: "relative", height: "100%" }}>
                <Box
                    component="video"
                    src={item.media}
                    alt={item.name}
                    loop
                    controls
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        minHeight: 300
                    }}
                    {...vprops}
                />
                <Box sx={{
                    position: "absolute",
                    top: theme.spacing(3),
                    left: theme.spacing(3),
                    p: 2
                }}>
                    {item.name && (
                        <Typography variant="h5" color="primary">
                            {item.name}
                        </Typography>
                    )}
                    {/* <Typography variant="h6">
                    {item.dev}
                </Typography>
                <Typography>
                    {item.users} users
                </Typography> */}
                </Box>
                {item.logo && (
                    <Box sx={{
                        position: "absolute",
                        bottom: theme.spacing(10),
                        left: theme.spacing(5),
                    }}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <IconButton sx={{
                                    width: theme.spacing(2.5),
                                    height: theme.spacing(2.5),
                                    bgcolor: theme.palette.secondary.main,
                                    borderRadius: 3
                                }}>
                                    <CheckIcon sx={{ fontSize: theme.spacing(2) }} />
                                </IconButton>
                            }
                        >
                            <Box
                                component="img"
                                src={item.logo}
                                alt="avatar"
                                sx={{
                                    borderRadius: "50%",
                                    borderWidth: 2,
                                    width: theme.spacing(8),
                                    height: theme.spacing(8),
                                    borderColor: theme.palette.secondary.main,
                                    borderStyle: "solid"
                                }}
                            />
                        </Badge>
                    </Box>
                )}
                <Stack direction="row" spacing={1} sx={{
                    position: "absolute",
                    bottom: theme.spacing(10),
                    right: theme.spacing(4),
                    background: "rgba(255, 255, 255, .1)",
                    p: 1,
                    borderRadius: 1
                }}>
                    <Box
                        component="img"
                        src={require("../assets/img/bnb.png")}
                        alt="BNB"
                        sx={{
                            width: theme.spacing(3),
                        }}
                    />
                    <Typography>
                        BNB
                    </Typography>
                </Stack>
            </Card>
        </Link>
    )
}
const Home = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            padding: theme => theme.spacing(2, 6),
            height: "100%",
            overflow: "auto",
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(1, 1)
            },
            ["& .slick-current"]: {
                zIndex: 99999
            }
        }}>
            <Container>
                <Box sx={{
                    width: "100%"
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Box
                                component="img"
                                src={require("../assets/img/home/top-banner.png")}
                                sx={{
                                    borderRadius: 8 / 6,
                                    maxHeight: 240,
                                    mb: 3,
                                    mt: 2,
                                    maxWidth: "100%"
                                }}
                                alt="Top Banner"
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Link href="https://www.pinksale.finance/#/launchpad/0x844e64aefe5a883ec38f25a4a51bffc2abf174b7?chain=BSC" underline="none">
                                <Button variant="contained" color="secondary" size='large' sx={{ 
                                    mt: 4,
                                    backgroundColor: "#F95997",
                                    ["&:hover"]: {
                                        backgroundColor: "#E85497"
                                    }
                                }}>
                                    PRESALE ON PINKSALE
                                </Button>
                            </Link>
                            <Typography sx={{ mt: 5, fontSize: 14 }}>LAUNCHING ON BISWAP AT APRIL 13TH, 5PM UTC</Typography>
                            <Button variant="contained" color="secondary" size="large" sx={{
                                background: "linear-gradient(180deg, #EE3152 49.27%, #108BED 49.28%)",
                                mb: 2
                            }} disabled>
                                BUY ON BISWAP
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="h5" sx={{ pb: 2 }}>
                    Crypto Gaming Aggregator
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7.5}
                        id="banner-slider"
                        sx={{
                            ["& .slick-dots"]: {
                                top: theme.spacing(2),
                                right: theme.spacing(7),
                                lineHeight: 0,
                                borderRadius: 1,
                                background: theme.palette.secondary.main,
                                bottom: "unset",
                                width: "unset",
                                ["& li"]: {
                                    ["& button"]: {
                                        ["&:before"]: {
                                            color: theme.palette.background.default
                                        }
                                    }
                                }
                            }
                        }}
                    >
                        <Slider {...bannerSlider}>
                            <BSlide vprops={{
                                autoPlay: true,
                                muted: true,
                                controls: false
                            }} item={{
                                id: "presale",
                                media: "https://metababy.in/videos/presale.mp4",
                                link: "https://t.me/metababyofficial"
                            }} />
                            {vBList.map(item => <BSlide key={item.id} item={item} />)}
                        </Slider>
                    </Grid>
                    <Grid item xs={12} md={4.5}>
                        <Link href="https://twitter.com/TheMetaBaby/status/1511252616600121346?s=20&t=uN_k99pgNGzNHQ6nDdsqwA" underline="none">
                            <Card sx={{ lineHeight: 0, position: "relative", height: "100%", minHeight: 300 }}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        backgroundImage: `url(${require("../assets/img/home/featured.png")})`,
                                        backgroundSize: "100% 100%",
                                        backgroundPosition: "center"
                                    }}
                                />
                                <Box sx={{
                                    bgcolor: "secondary.main",
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    p: 2,
                                    borderBottomLeftRadius: 1
                                }}>
                                    Featured
                                </Box>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
                <Box sx={{
                    ["& .slick-slide"]: {
                        "& > div": {
                            padding: theme => theme.spacing(2)
                        }
                    }
                }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 8, mb: 2 }}>
                        <Typography variant="h5">
                            Trending Games
                        </Typography>
                        <Link href="/games" underline="none">
                            <Button variant="contained" color="secondary" size="small">
                                View All
                            </Button>
                        </Link>
                    </Stack>
                    <Slider {...gameSlider}>
                        {vBList.map((item, idx) => <Games key={item.id} item={item} index={idx} />)}
                    </Slider>
                </Box>
                <Box sx={{
                    ["& .slick-slide"]: {
                        "& > div": {
                            padding: theme => theme.spacing(2)
                        }
                    }
                }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 8, mb: 2 }}>
                        <Typography variant="h5">
                            New Games
                        </Typography>
                        <Link href="/games" underline="none">
                            <Button variant="contained" color="secondary" size="small">
                                View All
                            </Button>
                        </Link>
                    </Stack>
                    <Slider {...gameSlider}>
                        {vBList.map((item, idx) => <Games key={item.id} item={item} index={idx} />)}
                    </Slider>
                </Box>
                <Box sx={{
                    ["& .slick-slide"]: {
                        "& > div": {
                            padding: theme => theme.spacing(2)
                        }
                    }
                }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 8, mb: 2 }}>
                        <Typography variant="h5">
                            Most Played
                        </Typography>
                        <Link href="/games" underline="none">
                            <Button variant="contained" color="secondary" size="small">
                                View All
                            </Button>
                        </Link>
                    </Stack>
                    <Slider {...mgameSlider}>
                        {vBList.map((item, idx) => <MGames key={item.id} item={item} index={idx} />)}
                    </Slider>
                </Box>
            </Container>
        </Box>
    )
}

export default Home;