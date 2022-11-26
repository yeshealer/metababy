import React, { useContext } from "react";

// ** Import Material UI Components ** // 
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import clsx from "clsx";

import { Outlet } from "react-router-dom";

import useStyles from "../assets/styles";

import { DrawerContext } from "../hooks/context";

const Wrapper = () => {
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { isOpenDrawer } = useContext(DrawerContext);

    return (
        <Box className={clsx(classes.wrapper)} sx={{
            marginLeft: isMobile ? 0 : isOpenDrawer ? "280px" : "80px",
            transition: ".5s",
            backgroundImage: "linear-gradient(130deg, #00215e, #3e1270)"
        }}>
            <Outlet />
        </Box>
    )
}
export default Wrapper;