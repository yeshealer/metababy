import React from "react";

import { Preloader, Placeholder } from 'react-preloading-screen';
import Spinner from "../components/Spinner";

const PreloaderProvider = ({ children }) => {
    return (
        <Preloader>
            {children}
            <Placeholder>
                <Spinner />
            </Placeholder>
        </Preloader>
    )
}

export default PreloaderProvider;