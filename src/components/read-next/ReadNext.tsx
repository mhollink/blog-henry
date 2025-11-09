import Box from '@mui/material/Box'
import {useRecommendations} from "./useRecommendations.ts";
import type {PostMeta} from "../../types/post-meta.ts";

export const ReadNext = ({currentBlog}: {currentBlog: PostMeta}) => {
    const getRecommendations = useRecommendations();
    const recommendations = getRecommendations(currentBlog)

    console.log(recommendations);

    return (
        <Box>{recommendations.map(blog => blog.titel).join(", ")}</Box>
    )
}