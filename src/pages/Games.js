import React, { useContext, useState } from 'react';

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

import useTheme from '@mui/styles/useTheme';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CheckIcon from '@mui/icons-material/Check';

import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

import { useNavigate } from "react-router-dom";

import { Games as GamesList } from "../config";
import { APIContext } from '../hooks/context';

const categories_list = [
    "Action",
    "Adventure",
    "Arcade",
    "Card",
    "Metaverse",
    "MMO",
    "Racing",
    "RPG",
    "Simulator",
    "Strategy",
    "Sports",
    "Others"
];


const GamesItem = (props) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const { item, token } = props;

    if (!token) {
        return <></>
    }

    const viewDetail = () => {
        navigate(`/games/${item.id}`);
    };

    const {
        image,
        links: {
            homepage,
            subreddit_url,
            telegram_channel_identifier,
            twitter_screen_name,
        },
        market: {
            total_volumes
        },
        market_data: {
            current_price,
            price_change_percentage_24h
        }
    } = token;

    return (
        <Grid {...props} item xs={12} sm={12} md={6} lg={4}>

            <Card onClick={viewDetail} sx={{
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
                    image={item.banner}
                    alt={item.name}
                    sx={{
                        height: theme.spacing(30),
                        [theme.breakpoints.down("sm")]: {
                            height: "auto",
                            width: "100%",
                            maxHeight: theme.spacing(20)
                        }
                    }}
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
                <Stack direction="row" justifyContent={"space-between"} spacing={1} sx={{
                    p: theme => theme.spacing(1, 2)
                }}>
                    <Stack spacing={1} sx={{
                        pl: 1,
                        ["& .MuiButton-startIcon"]: {
                            marginRight: 0
                        }
                    }}>
                        <Typography variant="h6">
                            {item.name}
                        </Typography>
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
                    <Box style={{
                        position: "relative",
                        marginTop: theme.spacing(-5),
                        marginRight: theme.spacing(1.5)
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
                                src={image.large}
                                alt={item.id}
                                sx={{
                                    borderColor: theme => theme.palette.secondary.main,
                                    borderWidth: 2,
                                    borderStyle: "solid",
                                    width: theme => theme.spacing(8),
                                    height: theme => theme.spacing(8),
                                    borderRadius: 10,
                                }}
                            />
                        </Badge>
                    </Box>
                </Stack>
                <Divider />
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ textAlign: "left", border: "none", pt: 1, pb: 1 }}>
                                Users :
                            </TableCell>
                            <TableCell sx={{ textAlign: "right", border: "none", pt: 1, pb: 1 }}>
                                <Typography sx={{ fontSize: 18 }} variant="caption">
                                    {item.users ? item.users : <Skeleton />}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ textAlign: "left", border: "none", pt: 1, pb: 1 }}>
                                Price :
                            </TableCell>
                            <TableCell sx={{ textAlign: "right", border: "none", pt: 0.5, pb: .5, display: "flex", alignItems: "center" }}>
                                <Typography sx={{ ml: 1, mr: 1, flexGrow: 1, fontSize: 16 }} variant="caption">
                                    {current_price.usd >= 0 ? `$${current_price.usd.toFixed(2)}` : <Skeleton />}
                                </Typography>
                                {price_change_percentage_24h && (
                                    <Button
                                        size="small"
                                        color={price_change_percentage_24h > 0 ? "success" : "error"}
                                        variant="contained"
                                        startIcon={
                                            price_change_percentage_24h > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                                        }
                                        sx={{
                                            pt: 0,
                                            pb: 0,
                                            pl: 0.5,
                                            pr: 1,
                                            ["& > span"]: {
                                                margin: 0
                                            }
                                        }}
                                    >
                                        {price_change_percentage_24h.toFixed(2)}%
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ textAlign: "left", border: "none", pt: 1, pb: 2 }}>
                                24hr Vol :
                            </TableCell>
                            <TableCell sx={{ textAlign: "right", border: "none", pt: 1, pb: 2 }}>
                                <Typography sx={{ fontSize: 14 }} variant="caption">
                                    {total_volumes[0] ? `${total_volumes[0][1].toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}` : <Skeleton />}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </Grid >
    )
}

const Games = () => {
    const theme = useTheme();

    const { tokens } = useContext(APIContext);

    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState({
        sortby: "newest",
        filterby: "all"
    });

    const handleChangeCategory = (event) => {
        const {
            target: { value },
        } = event;
        if (value[value.length - 1] === "all") {
            if (value.length - 1 === categories_list.length) {
                setCategories([]);
            } else {
                setCategories(categories_list);
            }
        } else {
            setCategories(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
        }
    };

    const handleChangeFilter = (e) => {
        const name = e.target.name;
        setFilter(prevState => ({
            ...prevState,
            [name]: e.target.value
        }))
    }

    return (
        <Box sx={{
            padding: theme => theme.spacing(2, 6),
            height: "100%",
            overflow: "auto",
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(1, 1),
            }
        }}>
            <Container>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={0} sx={{
                    borderRadius: 8 / 6,
                    boxShadow: `0px 0px 12px 6px ${theme.palette.secondary.main}`
                }}>
                    <Box
                        component="img"
                        src={require("../assets/img/game/l-banner.png")}
                        sx={{
                            width: "60%",
                            borderRadius: 0,
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                            [theme.breakpoints.down("sm")]: {
                                borderBottomLeftRadius: 8,
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                                borderTopLeftRadius: 8,
                                height: "auto",
                                width: "auto"
                            }
                        }}
                        alt="Left Banner"
                    />
                    <Box
                        component="img"
                        src={require("../assets/img/game/r-banner.png")}
                        sx={{
                            width: "40%",
                            borderRadius: 0,
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                            [theme.breakpoints.down("sm")]: {
                                display: "none"
                            }
                        }}
                        alt="Right Banner"
                    />
                </Stack>
                <TextField
                    fullWidth
                    label="Search"
                    margin='normal'
                    color="secondary"
                    sx={{
                        mt: 4
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRoundedIcon color='secondary' />
                            </InputAdornment>
                        ),
                    }}
                />
                <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between" spacing={2}>
                    <TextField
                        id="sortby"
                        select
                        name="sortby"
                        color="secondary"
                        label="Sort By"
                        value={filter["sortby"]}
                        onChange={handleChangeFilter}
                        fullWidth
                    >
                        <MenuItem value="newest">
                            Newest
                        </MenuItem>
                        <MenuItem value="mcap">
                            Market Cap
                        </MenuItem>
                        <MenuItem value="users">
                            Users
                        </MenuItem>
                    </TextField>
                    <TextField
                        id="filterby"
                        select
                        name="filterby"
                        label="Filter By"
                        color="secondary"
                        value={filter["filterby"]}
                        onChange={handleChangeFilter}
                        fullWidth
                    >
                        <MenuItem value="all">
                            All
                        </MenuItem>
                        <MenuItem value="verified">
                            Verified
                        </MenuItem>
                        <MenuItem value="unverified">
                            Unverified
                        </MenuItem>
                    </TextField>
                    <FormControl fullWidth>
                        <InputLabel color="secondary" id="categories-select">All Categories</InputLabel>
                        <Select
                            labelId="categories-select"
                            id="categories"
                            multiple
                            color="secondary"
                            value={categories}
                            onChange={handleChangeCategory}
                            input={<OutlinedInput label="All Categories" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <MenuItem sx={{ pt: 0, pb: 0 }} value={"all"}>
                                <Checkbox color="secondary" checked={categories.length === categories_list.length} />
                                <ListItemText primary={"All"} />
                            </MenuItem>
                            {categories_list.map((name) => (
                                <MenuItem sx={{ pt: 0, pb: 0 }} key={name} value={name}>
                                    <Checkbox color="secondary" checked={categories.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {Object.values(tokens).length > 0 ? (
                        <>
                            {GamesList.map(item => <GamesItem key={item.id} item={item} token={tokens[item.token]} />)}
                        </>
                    ) : (
                        <Box sx={{ p: 2, pt: 10, pb: 10, width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            <CircularProgress color="secondary" />
                        </Box>
                    )}
                </Grid>
                <Stack sx={{ mt: 5, mb: 3 }} direction="row" justifyContent="center">
                    <Pagination size="large" count={1} variant="outlined" shape="rounded" showFirstButton showLastButton />
                </Stack>
            </Container>
        </Box>
    )
}
0
export default Games;