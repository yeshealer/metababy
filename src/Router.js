import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

// ** Import Route Config ** //
import MyRoutes from "./config/constants/routes";

// ** Import Pages ** //
import Page404 from "./pages/404";
import GameDetail from "./pages/GameDetail";

// ** Import Components
import WLayout from "./components/WLayout";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<WLayout />}>
                    <Route index exact element={<Navigate to="/home" />} />
                    {Object.values(MyRoutes).filter(routes => routes.layout === "wl").map(route => (
                        <Route key={route.id} path={route.id} exact element={route.element} />
                    ))}
                    <Route path="/games/:id" exact element={<GameDetail />} />
                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;