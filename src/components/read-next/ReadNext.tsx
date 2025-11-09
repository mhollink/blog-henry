import {useRecommendations} from "./useRecommendations.ts";
import type {PostMeta} from "../../types/post-meta.ts";
import {PostCard} from "../post-card/PostCard.tsx";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const ReadNext = ({currentBlog}: { currentBlog: PostMeta }) => {
    const getRecommendations = useRecommendations();
    const recommendations = getRecommendations(currentBlog)

    return (
        <Stack gap={2}>
            <Typography variant="h5" color="text.secondary" component="div" fontWeight="600">
                Lees ook
            </Typography>
            <Grid container spacing={2} columns={12}>
                {recommendations.map(blog =>
                    <Grid size={4} key={blog.filename}>
                        <PostCard post={blog} handleFocus={() => null} handleBlur={() => null} focussed={false}/>
                    </Grid>)}

            </Grid>
        </Stack>

    )
}