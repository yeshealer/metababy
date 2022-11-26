import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SocialLinks from "../components/SocialLinks";

const NFB = () => {
    return (
        <Box sx={{
            overflow: "auto",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: theme => theme.spacing(4)
        }}>
            <Typography variant="h3" sx={{ pb: 4 }}>
                Coming Soon!
            </Typography>
            <Box
                component="img"
                src={require("../assets/img/bg/nfb.gif")}
                alt="NFB Gif"
                sx={{
                    width: theme => theme.spacing(40),
                    borderRadius: 1,
                    boxShadow: theme => theme.shadows[4]
                }}
            />
            <SocialLinks />
        </Box>
    )
}

export default NFB;