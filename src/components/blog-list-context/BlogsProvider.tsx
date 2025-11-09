import {FunctionComponent, PropsWithChildren, useEffect, useState} from "react";
import type {PostMeta} from "../../types/post-meta.ts";
import {BlogsContext} from "./BlogsContext.tsx";
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

export const BlogsProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
    const [blogs, setBlogs] = useState<PostMeta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        fetch('/posts.json')
            .then(res => res.json())
            .then(setBlogs)
            .finally(() => setLoading(false))
    }, []);

    return (<BlogsContext.Provider value={{blogs}}>
        {loading ? (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100svw",
                    height: "100svh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress color="inherit" size={100} thickness={2}/>
                <Typography variant="overline">
                    Blogs aan het ophalen...
                </Typography>
            </Box>
        ) : (
            children
        )}
    </BlogsContext.Provider>)
}