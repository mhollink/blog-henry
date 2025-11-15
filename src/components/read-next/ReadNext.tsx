import {useRecommendations} from "./useRecommendations.ts";
import type {PostMeta} from "../../types/post-meta.ts";
import {PostCard} from "../post-card/PostCard.tsx";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles"

export const ReadNext = ({currentBlog}: { currentBlog: PostMeta }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const getRecommendations = useRecommendations();
    const recommendations = getRecommendations(currentBlog, isMobile ? 2 : 3)

    return (
        <Stack gap={2}>
            <Typography variant="h5" color="text.secondary" component="div" fontWeight="600">
                Lees ook
            </Typography>
            <Grid container spacing={2} columns={12}>
                {recommendations.map(blog =>
                    <Grid size={{ md: 4, sm: 6, xs: 12}} key={blog.slug}>
                        <PostCard post={blog} handleFocus={() => null} handleBlur={() => null} focussed={false}/>
                    </Grid>)}

            </Grid>
        </Stack>

    )
}