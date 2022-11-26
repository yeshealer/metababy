import React from "react";

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import useTheme from '@mui/styles/useTheme';

function NextBArrow(props) {
    const theme = useTheme();
    const { className, onClick } = props;
    return (
        <IconButton className={className} sx={{
            position: "absolute",
            top: theme.spacing(8),
            transform: "translate(-50%, -50%)",
            width: "unset",
            right: theme.spacing(9),
            p: .5,
            height: "unset",
            zIndex: 1000,
            background: "rgba(255, 255, 255, .08)",
            [theme.breakpoints.down("sm")]: {
                right: 0,
                top: "35%"
            },
            ["&:hover"]: {
                color: "#ffffff",
                background: "rgba(255, 255, 255, .16)",
            },
            ["&:focus"]: {
                color: "#ffffff",
                background: "rgba(255, 255, 255, .08)",
            },
            ["&:before"]: {
                content: "''"
            }
        }} onClick={onClick}>
            <NavigateNextIcon />
        </IconButton>
    );
}

function PrevBArrow(props) {
    const theme = useTheme();
    const { className, onClick } = props;
    return (
        <IconButton className={className} sx={{
            position: "absolute",
            top: theme.spacing(8),
            transform: "translate(-50%, -50%)",
            width: "unset",
            left: "unset",
            right: theme.spacing(16),
            p: .5,
            height: "unset",
            zIndex: 1,
            background: "rgba(255, 255, 255, .08)",
            [theme.breakpoints.down("sm")]: {
                left: 32,
                top: "35%",
                right: "unset"
            },
            ["&:hover"]: {
                color: "#ffffff",
                background: "rgba(255, 255, 255, .16)",
            },
            ["&:focus"]: {
                color: "#ffffff",
                background: "rgba(255, 255, 255, .08)",
            },
            ["&:before"]: {
                content: "''"
            }
        }} onClick={onClick}>
            <NavigateBeforeIcon />
        </IconButton>
    );
}

function NextArrow(props) {
    const theme = useTheme();
    const { className, onClick } = props;
    return (
        <IconButton className={className} sx={{
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "unset",
            right: -48,
            p: .5,
            height: "unset",
            background: "rgba(255, 255, 255, .08)",
            [theme.breakpoints.down("sm")]: {
                right: -36
            },
            ["&:hover"]: {
                color: "#ffffff",
                background: "rgba(255, 255, 255, .16)",
            },
            ["&:before"]: {
                content: "''"
            }
        }} onClick={onClick}>
            <NavigateNextIcon />
        </IconButton>
    );
}

function PrevArrow(props) {
    const theme = useTheme();
    const { className, onClick } = props;
    return (
        <IconButton className={className} sx={{
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "unset",
            left: -16,
            p: .5,
            height: "unset",
            zIndex: 1,
            background: "rgba(255, 255, 255, .08)",
            [theme.breakpoints.down("sm")]: {
                left: -4
            },
            ["&:hover"]: {
                color: "#ffffff",
                background: "rgba(255, 255, 255, .16)",
            },
            ["&:before"]: {
                content: "''"
            }
        }} onClick={onClick}>
            <NavigateBeforeIcon />
        </IconButton>
    );
}

export const gameSlider = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1440,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
};

export const bannerSlider = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    fade: true,
    slidesToScroll: 1,
    initialSlide: 0,
    dots: true,
    nextArrow: <NextBArrow />,
    prevArrow: <PrevBArrow />,
    beforeChange: current => {
        const cdom = document.querySelector(`#banner-slider .slick-list [data-index='${current}'] video`);
        cdom.pause();
    },
    afterChange: current => {
        const cdom = document.querySelector(`#banner-slider .slick-list [data-index='${current}'] video`);
        cdom.play();
    },
    responsive: [
        { 
            breakpoint: 600,
            settings: {
                dots: false
            }
        }
    ]
}

export const mgameSlider = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
};


// function NextBArrow(props) {
//     const { onClick } = props;

//     return (
//         <Button
//             onClick={onClick}
//             type="button"
//             title="Next Banner"
//             style={{
//                 position: "absolute",
//                 zIndex: 2,
//                 cursor: "pointer",
//                 right: 0,
//                 background: "transparent",
//                 border: "none",
//                 top: 0,
//                 borderRadius: 0,
//                 height: "calc(100% - 64px)",
//                 backgroundColor: "rgba(0, 0, 0, .5)",
//                 minWidth: 48
//             }}
//         >
//             <Box
//                 component="span"
//                 sx={{
//                     boxSizing: "border-box",
//                     display: "inline-block",
//                     overflow: "hidden",
//                     width: "initial",
//                     background: "none",
//                     opacity: 1,
//                     border: "none",
//                     margin: 0,
//                     padding: 0,
//                     position: "relative",
//                     maxWidth: "100%"
//                 }}
//             >
//                 <Box
//                     component="span"
//                     sx={{
//                         boxSizing: "border-box",
//                         display: "block",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: "none",
//                         margin: 0,
//                         padding: 0,
//                         maxWidth: "100%"
//                     }}
//                 >
//                     <Box
//                         component="img"
//                         alt=""
//                         aria-hidden="true"
//                         src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg=="
//                         sx={{
//                             boxSizing: "border-box",
//                             display: "block",
//                             width: "initial",
//                             height: "initial",
//                             background: "none",
//                             opacity: 1,
//                             border: "none",
//                             margin: 0,
//                             padding: 0,
//                             maxWidth: "100%"
//                         }}
//                     />
//                 </Box>
//                 <Box
//                     component="img"
//                     alt="right"
//                     src="https://v2.gamefi.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Farrow-right.91978a44.png&w=32&q=75"
//                     decoding="async"
//                     data-nimg="intrinsic"
//                     sx={{
//                         position: "absolute",
//                         inset: 0,
//                         boxSizing: "border-box",
//                         padding: 0,
//                         border: "none",
//                         margin: "auto",
//                         display: "block",
//                         width: 0,
//                         height: 0,
//                         minWidth: "100%",
//                         maxWidth: "100%",
//                         minHeight: "100%",
//                         maxHeight: "100%"
//                     }}
//                 />
//             </Box>
//         </Button>
//     )
// }

// function PrevBArrow(props) {
//     const { onClick } = props;

//     return (
//         <Button
//             onClick={onClick}
//             type="button"
//             title="Next Banner"
//             style={{
//                 position: "absolute",
//                 zIndex: 2,
//                 cursor: "pointer",
//                 left: 0,
//                 background: "transparent",
//                 border: "none",
//                 top: 0,
//                 borderRadius: 0,
//                 height: "calc(100% - 64px)",
//                 backgroundColor: "rgba(0, 0, 0, .5)",
//                 minWidth: 48
//             }}
//         >
//             <Box
//                 component="span"
//                 sx={{
//                     boxSizing: "border-box",
//                     display: "inline-block",
//                     overflow: "hidden",
//                     width: "initial",
//                     background: "none",
//                     opacity: 1,
//                     border: "none",
//                     margin: 0,
//                     padding: 0,
//                     position: "relative",
//                     maxWidth: "100%"
//                 }}
//             >
//                 <Box
//                     component="span"
//                     sx={{
//                         boxSizing: "border-box",
//                         display: "block",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: "none",
//                         margin: 0,
//                         padding: 0,
//                         maxWidth: "100%"
//                     }}
//                 >
//                     <Box
//                         component="img"
//                         alt=""
//                         aria-hidden="true"
//                         src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg=="
//                         sx={{
//                             boxSizing: "border-box",
//                             display: "block",
//                             width: "initial",
//                             height: "initial",
//                             background: "none",
//                             opacity: 1,
//                             border: "none",
//                             margin: 0,
//                             padding: 0,
//                             maxWidth: "100%"
//                         }}
//                     />
//                 </Box>
//                 <Box
//                     component="img"
//                     alt="right"
//                     src="https://v2.gamefi.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Farrow-left.cb246763.png&w=32&q=75"
//                     decoding="async"
//                     data-nimg="intrinsic"
//                     sx={{
//                         position: "absolute",
//                         inset: 0,
//                         boxSizing: "border-box",
//                         padding: 0,
//                         border: "none",
//                         margin: "auto",
//                         display: "block",
//                         width: 0,
//                         height: 0,
//                         minWidth: "100%",
//                         maxWidth: "100%",
//                         minHeight: "100%",
//                         maxHeight: "100%"
//                     }}
//                 />
//             </Box>
//         </Button>
//     )
// }