import type {FunctionComponent} from "react";
import {Link as RouterLink} from 'react-router-dom';
import type {PostMeta} from "../../types/post-meta.ts";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from "@mui/material/Typography"
import {styled} from "@mui/material/styles";
import {BlogAuthor} from "../blog-author/BlogAuthor.tsx";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const StyledCard = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});


type PostCardProps = {
    post: PostMeta,
    handleFocus: () => void,
    handleBlur: () => void,
    focussed: boolean
}

export const PostCard: FunctionComponent<PostCardProps> = ({post, handleFocus, handleBlur, focussed}) => {
    return (
        <StyledCard
            variant="outlined"
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={0}
            className={focussed ? 'Mui-focused' : ''}
        >
            <CardActionArea
                component={RouterLink}
                to={`/post/${post.filename}`}
                sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': {
                        textDecoration: 'none',
                    },
                    '&:focus': {
                        textDecoration: 'none',
                    },
                }}
            >
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image={post.cover}
                    sx={{
                        aspectRatio: '16 / 9',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                />
                <StyledCardContent>
                    <Stack component="div" gap={1} direction={"row"}>
                        {post.tags.map((tag, index) => <Chip label={tag} key={index} color={"primary"}
                                                             size={"small"}/>)}
                    </Stack>
                    <Typography gutterBottom variant="h6" component="div" fontWeight="600">
                        {post.titel}
                    </Typography>
                    <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                        {post.bijschrift}
                    </StyledTypography>
                </StyledCardContent>
                <BlogAuthor schrijver={post.schrijver} datum={post.datum}/>
            </CardActionArea>
        </StyledCard>
    )

}