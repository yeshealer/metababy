import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    appbar: {
        padding: theme.spacing(0, 8),
        backgroundImage: "none !important",
        boxShadow: "none !important",
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
        height: theme.spacing(12),
        display: "flex",
        alignItems: "center",
        "& .logo-wrapper": {
            height: theme.spacing(12),
            "& .logo": {
                height: theme.spacing(5)
            },
            "& .logo-text": {
                height: theme.spacing(3.5)
            }
        },
        "& .space": {
            flexGrow: 1
        },
        "& button": {
            textTransform: "none",
            fontWeight: 400,
            "& img": {
                borderRadius: theme.shape.borderRadius,
                width: theme.spacing(3)
            }
        }
    },
    wrapper: {
        background: theme.palette.background.paper,
        height: "100vh",
        marginLeft: theme.spacing(35),
        padding: theme.spacing(2, 0),
        paddingTop: theme.spacing(12)
    },
    wallet: {
        flexShrink: 0,
        "& .MuiDialog-container": {
            "& > .MuiPaper-root": {
                [theme.breakpoints.down("sm")]: {
                    padding: theme.spacing(0),
                    margin: theme.spacing(1, 1.5)
                },
                width: "100%",
                padding: theme.spacing(0, 1),
                boxSizing: 'border-box',
                border: "none",
                boxShadow: theme.shadows[4],
                backgroundImage: "none !important",
                "& .header": {
                    padding: theme.spacing(2, 1)
                },
                "& .description": {
                    padding: theme.spacing(2, 2.5),
                    textAlign: "center",
                    "& span": {
                        cursor: "pointer"
                    }
                },
                "& .MuiListItemButton-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    minHeight: theme.spacing(7),
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                    "& img": {
                        width: theme.spacing(4)
                    },
                },
                "& .MuiAlert-icon": {
                    alignItems: "center"
                },
                "& .error": {
                    // padding: theme.spacing(1, 2)
                },
                "& .wallet-connect": {
                    padding: theme.spacing(2)
                },
                "& .account": {
                    [theme.breakpoints.down("sm")]: {
                        margin: theme.spacing(3, 0)
                    },
                    margin: theme.spacing(4, 0),
                    padding: theme.spacing(0, 2),
                    "& .address": {
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        borderRadius: theme.shape.borderRadius,
                        padding: theme.spacing(1, 2)
                    },
                    "& .action": {
                        marginTop: theme.spacing(2.5)
                    },
                    "& .top-token-list": {
                        marginTop: theme.spacing(2.5),
                        "& img": {
                            borderRadius: theme.shape.borderRadius
                        },
                        "& .MuiListItem-root": {
                            margin: theme.spacing(0.5, 0)
                        }
                    }
                }
            }
        }
    },
    drawer: {
        "& .MuiPaper-root": {
            padding: theme.spacing(5, 0),
            background: theme.palette.background.default,
            width: theme.spacing(35),
            border: "none",
            boxShadow: theme.shadows[4],
            justifyContent: "space-between",
        }
    },
    psale: {
        overflow: "auto",
        height: "100%"
    },
    comingsoon: {
        height: "100%"
    },
    home: {
        overflow: "auto",
        height: "100%"
    },
}))

export default useStyles;