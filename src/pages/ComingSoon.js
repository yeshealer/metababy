import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import useStyles from "../assets/styles";

import SocialLinks from "../components/SocialLinks";

const ComingSoon = () => {
    const classes = useStyles();

    return (
        <Box className={classes.comingsoon}>
            <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                    width: "100%",
                    height: "calc(100% + 96px)",
                    mt: -12
                }}
            >
                <Typography variant="h3" sx={{ pb: 4 }}>
                    Coming Soon!
                </Typography>
                <SocialLinks />
            </Stack>
        </Box>
    )
};

export default ComingSoon;