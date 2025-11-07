import type {RouteObject} from "react-router-dom";
import {App} from "./app/App.tsx"
import {Blog} from "./pages/Blog.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: "", element: <Blog/>}
        ]
    }
]