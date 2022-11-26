import React from "react";

import Box from "@mui/material/Box";

import SocialLinks from "../components/SocialLinks";

const Babyverse = () => {
    return(
        <Box sx={{
            overflow: "auto",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: theme => theme.spacing(4),
        }}>
            <Box
                component="img"
                src={require("../assets/img/bg/metaverse.jpg")}
                alt="Metaverse"
                sx={{
                    width: theme => theme.spacing(50),
                    borderRadius: 1,
                    boxShadow: theme => theme.shadows[4]
                }}
            />
            <SocialLinks />
        </Box>
    )
}

export default Babyverse;