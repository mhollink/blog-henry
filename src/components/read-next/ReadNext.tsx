import Box from '@mui/material/Box'
import {useRecommendations} from "./useRecommendations.ts";

export const ReadNext = () => {
    const recommendedBlogs = useRecommendations();

    return (
        <Box>{recommendedBlogs.map(blog => blog.titel).join(", ")}</Box>
    )
}