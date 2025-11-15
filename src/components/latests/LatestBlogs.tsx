import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import type {TypographyTypeMap} from "@mui/material/Typography";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import {styled} from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import {BlogAuthor} from "../blog-author/BlogAuthor.tsx";
import {chunkArray} from "../../utils";
import type {PostMeta} from "../../types/post-meta.ts";
import type {OverridableComponent} from "@mui/material/OverridableComponent";

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({theme}) => ({
    position: 'relative',
    textDecoration: 'none',
    '&:hover': {cursor: 'pointer'},
    '& .arrow': {
        visibility: 'hidden',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
    },
    '&:hover .arrow': {
        visibility: 'visible',
        opacity: 0.7,
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '3px',
        borderRadius: '8px',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: '1px',
        bottom: 0,
        left: 0,
        backgroundColor: (theme.vars || theme).palette.text.primary,
        opacity: 0.3,
        transition: 'width 0.3s ease, opacity 0.3s ease',
    },
    '&:hover::before': {
        width: '100%',
    },
})) as OverridableComponent<TypographyTypeMap>;

export function LatestBlogs({blogs}: { blogs: PostMeta[] }) {

    const pageSize = 6;
    const totalPages = Math.ceil(blogs.length / pageSize);
    const [page, setPage] = React.useState(1);
    const [visibleBlogs, setVisibleBlogs] = React.useState<PostMeta[]>([])

    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);

    const handleFocus = (index: number) => setFocusedCardIndex(index);
    const handleBlur = () => setFocusedCardIndex(null);

    React.useEffect(() => {
        const pages = chunkArray(blogs, pageSize);
        const currentPage = pages[page - 1] ?? [];
        setVisibleBlogs(currentPage)
    }, [blogs, page])

    return (
        <div>
            <Grid container spacing={8} columns={12} sx={{my: 4}}>
                {visibleBlogs.map((blog, index) => (
                    <Grid key={index} size={{xs: 12, sm: 6}}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: 1,
                                height: '100%',
                            }}
                        >
                            <Box>
                                <Chip label={blog.categorie} variant="outlined" size={"small"}/>
                            </Box>
                            <TitleTypography
                                gutterBottom
                                variant="h6"
                                onFocus={() => handleFocus(index)}
                                onBlur={handleBlur}
                                tabIndex={0}
                                className={focusedCardIndex === index ? 'Mui-focused' : ''}
                                component={RouterLink}
                                to={`/post/${blog.slug}`}
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
                                {blog.titel}
                                <NavigateNextRoundedIcon
                                    className="arrow"
                                    sx={{fontSize: '1rem'}}
                                />
                            </TitleTypography>
                            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                {blog.bijschrift}
                            </StyledTypography>

                            <BlogAuthor schrijver={blog.schrijver} datum={blog.datum}/>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            {totalPages > 1 && (
                <Box
                    sx={{display: 'flex', flexDirection: 'row', pt: 4, justifyContent: 'center', alignItems: 'center'}}>
                    <Pagination count={totalPages} size="small" siblingCount={2}
                                onChange={(_, page) => setPage(page)}/>
                </Box>
            )}
        </div>
    );
}