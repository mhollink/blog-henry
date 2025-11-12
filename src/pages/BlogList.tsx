import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Grid from '@mui/material/Grid';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import {PostCard} from "../components/post-card/PostCard.tsx";
import {LatestBlogs} from "../components/latests/LatestBlogs.tsx";
import type {PostMeta} from "../types/post-meta.ts";
import {useBlogs} from "../components/blog-list-context/useBlogs.ts";

function SearchInput() {
    return (
        <FormControl sx={{width: {xs: '100%', md: '25ch'}}} variant="outlined">
            <OutlinedInput
                size="small"
                id="zoeken"
                placeholder="Zoeken…"
                sx={{flexGrow: 1}}
                startAdornment={
                    <InputAdornment position="start" sx={{color: 'text.primary'}}>
                        <SearchRoundedIcon fontSize="small"/>
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'zoeken',
                }}
            />
        </FormControl>
    );
}

function BlogSearch({breakpoint}: { breakpoint: "sm" | "xs" }) {
    const display = breakpoint === "sm" ? {xs: 'none', sm: 'flex'} : {xs: 'flex', sm: 'none'};
    return (
        <Box
            sx={{
                display: display,
                flexDirection: 'row',
                gap: 1,
                width: {xs: '100%', md: 'fit-content'},
                overflow: 'auto',
            }}
        >
            <SearchInput/>
            <IconButton size="small" aria-label="RSS feed"
                        sx={{minWidth: 40, aspectRatio: 1}}
                        component="a"
                        href="https://henry.hollink.dev/rss.xml">
                <RssFeedRoundedIcon/>
            </IconButton>
        </Box>
    )
}

function BlogTitle() {
    return (
        <div>
            <Typography variant="h1" gutterBottom>
                Blog
            </Typography>
            <Typography>Never say goodbye, because goodbye means going away and going away means
                forgetting.</Typography>
        </div>
    )
}

function BlogCategory({selectCategory, activeCategory, categories}: {
    categories: string[]
    selectCategory: (category: string) => void,
    activeCategory: string
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {xs: 'column-reverse', md: 'row'},
                width: '100%',
                justifyContent: 'space-between',
                alignItems: {xs: 'start', md: 'center'},
                gap: 4,
                overflow: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    gap: 3,
                    overflow: 'auto',
                }}
            >
                {categories.map((category) => (
                    <Chip
                        key={category}
                        onClick={() => selectCategory(category)}
                        size="medium"
                        label={category}
                        sx={{
                            backgroundColor: theme => activeCategory === category ? theme.palette.primary.main : 'transparent',
                            color: activeCategory === category ? 'white' : 'black',
                            border: 'none',
                        }}
                    />
                ))}
            </Box>
            <BlogSearch breakpoint={"sm"}/>
        </Box>
    )
}

const blogSizes = [
    {xs: 12, md: 6},
    {xs: 12, md: 6},
    {xs: 12, md: 4},
    {xs: 12, md: 4},
    {xs: 12, md: 4}
]

export const BlogList = () => {
    const {blogs} = useBlogs();
    const [visiblePosts, setVisiblePosts] = useState<PostMeta[]>([]);
    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);
    const [activeCategory, setActiveCategory] = React.useState<string>("Alle categorieën");

    const handleClick = (category: string) => {
        setActiveCategory(category);
    };

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    useEffect(() => {
        if (activeCategory === "Alle categorieën") {
            setVisiblePosts(blogs);
        } else {
            setVisiblePosts(blogs.filter(post => post.categorie === activeCategory));
        }
    }, [blogs, activeCategory]);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
                <BlogTitle/>
                <BlogSearch breakpoint={"xs"}/>
                <BlogCategory
                    categories={[
                        "Alle categorieën",
                        "Persoonlijk",
                        "Brief",
                        "Mijlpaal"
                    ]}
                    selectCategory={handleClick}
                    activeCategory={activeCategory}
                />
                <Grid container spacing={2} columns={12}>
                    {visiblePosts.slice(0, 5).map((post, index) => (
                        <Grid size={blogSizes[index]} key={index}>
                            <PostCard
                                post={post}
                                focussed={focusedCardIndex === index}
                                handleFocus={() => handleFocus(index)}
                                handleBlur={handleBlur}
                            />
                        </Grid>
                    ))}
                </Grid>
                <LatestBlogs blogs={visiblePosts.slice(5)}/>
            </Box>
        </Container>
    );
};