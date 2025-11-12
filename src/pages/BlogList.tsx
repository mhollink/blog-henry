import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import {Blogs} from "../components/blogs/Blogs.tsx";
import {SearchInput, SearchProvider} from "../components/search";

function BlogSearch({
                        breakpoint
                    }: {
    breakpoint: "sm" | "xs"
}) {
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

function BlogCategory({
                          selectCategory, activeCategory, categories
                      }: {
    categories: string[]
    selectCategory: (category: string) => void,
    activeCategory
        :
        string
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


export const BlogList = () => {
    const [activeCategory, setActiveCategory] = React.useState<string>("Alle categorieën");

    const handleClick = (category: string) => {
        setActiveCategory(category);
    };


    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <SearchProvider>
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
                    <Blogs activeCategory={activeCategory}/>
                </Box>
            </SearchProvider>
        </Container>
    );
};