import Grid from "@mui/material/Grid";
import {PostCard} from "../post-card/PostCard.tsx";
import {LatestBlogs} from "../latests/LatestBlogs.tsx";
import * as React from "react";
import {useEffect, useState} from "react";
import type {PostMeta} from "../../types/post-meta.ts";
import {useBlogs} from "../blog-list-context/useBlogs.ts";
import {useSearch} from "../search";

const ALL = "Alle categorieën";

const blogSizes = [
    {xs: 12, md: 6},
    {xs: 12, md: 6},
    {xs: 12, md: 4},
    {xs: 12, md: 4},
    {xs: 12, md: 4}
]

interface BlogsProps {
    activeCategory: string
}

export const Blogs = ({activeCategory}: BlogsProps) => {
    const {blogs} = useBlogs();
    const {query} = useSearch();
    const [visiblePosts, setVisiblePosts] = useState<PostMeta[]>([]);
    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);
    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    useEffect(() => {
        const blogsInCat = blogs.filter(post => activeCategory === ALL || post.categorie === activeCategory)
        if (query) {
            const filtered = blogsInCat
                .map((blog) => ({
                    post: blog,
                    queryString: [blog.titel, blog.schrijver, blog.bijschrift, blog.categorie, ...blog.onderwerpen].join(",").toLowerCase()
                }))
                .filter(blog => blog.queryString.includes(query.toLowerCase()))
                .map(blog => blog.post);
            setVisiblePosts(filtered);
        } else {
            setVisiblePosts(blogsInCat);
        }
    }, [blogs, activeCategory, query]);

    return (
        <>
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
        </>
    )
}