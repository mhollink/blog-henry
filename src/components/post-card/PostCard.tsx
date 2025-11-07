import type {FunctionComponent} from "react";
import type {PostMeta} from "../../types/post-meta.ts";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography"
import {styled} from "@mui/material/styles";
import {slugify} from "../../utils";

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
                <Typography gutterBottom variant="caption" component="div">
                    {post.tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {post.titel}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                    {post.bijschrift}
                </StyledTypography>
            </StyledCardContent>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                }}
            >
                <Box sx={{display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center'}}>
                    <Avatar
                        alt={post.schrijver}
                        src={`assets/schrijvers/${slugify(post.schrijver)}.png`}
                        sx={{width: 24, height: 24}}
                    />
                    <Typography variant="caption">
                        {post.schrijver}
                    </Typography>
                </Box>
                <Typography variant="caption">{post.datum}</Typography>
            </Box>
        </StyledCard>
    )

}