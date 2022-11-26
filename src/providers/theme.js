import React, { useContext } from "react";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "../assets/css/index.css";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ThemeContext } from "../hooks/context";

// ** Declare Theme Provider
const MaterialThemeProvider = ({ children }) => {
    const { mode } = useContext(ThemeContext);
    const themeConfig = {
        dark: {
            palette: {
                mode: "dark",
                primary: {
                    main: "#53C9FF"
                },
                secondary: {
                    main: "#9E4BFD"
                },
                orangebtc: {
                    main: "#f7931a"
                },
                background: {
                    default: "#00173a",
                    paper: "#00215e"
                }
            },
            typography: {
                fontFamily: "'Rubik', sans-serif",
                fontSize: 14,
            },
            shape: {
                borderRadius: 6
            },
            components: {
                MuiAvatar: {
                    styleOverrides: {
                        root: {
                            borderRadius: 6
                        }
                    }
                },
                MuiIconButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: 6
                        }
                    }
                },
                MuiListItemButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: 6
                        }
                    }
                },
                MuiBackdrop: {
                    styleOverrides: {
                        root: {
                            background: "rgba(0, 0, 0, 0.7)"
                        }
                    }
                }
            }
        },
        light: {
            palette: {
                mode: "light"
            }
        }
    };
    const theme = createTheme(themeConfig[mode]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
export default MaterialThemeProvider;
