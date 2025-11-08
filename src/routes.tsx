import type {RouteObject} from "react-router-dom";
import {App} from "./app/App.tsx"
import {Blog} from "./pages/Blog.tsx";
import {PostView} from "./pages/PostView.tsx";
import {LegePagina} from "./pages/LegePagina.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: "", element: <Blog/>},
            {path: "post/:filename", element: <PostView />},
            {path: "over-henry", element: <LegePagina />},
            {path: "contact", element: <LegePagina />}
        ]
    }
]