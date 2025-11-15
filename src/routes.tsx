import type {RouteObject} from "react-router-dom";
import {App} from "./app/App.tsx"
import {BlogList} from "./pages/BlogList.tsx";
import {BlogPost} from "./pages/BlogPost.tsx";
import {LegePagina} from "./pages/LegePagina.tsx";
import {BlogWriter} from "./pages/BlogWriter.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: "", element: <BlogList/>},
            {path: "post/:slug", element: <BlogPost/>},
            {path: "schrijven", element: <BlogWriter/>},
            {path: "over-henry", element: <LegePagina/>},
            {path: "contact", element: <LegePagina/>}
        ]
    }
]