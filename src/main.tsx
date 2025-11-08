import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Buffer} from 'buffer';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "./routes.tsx"
import {theme} from "./theme.tsx";
import "./styles/index.scss"

(window as any).Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={createBrowserRouter(routes)}/>
        </ThemeProvider>
    </StrictMode>,
)
