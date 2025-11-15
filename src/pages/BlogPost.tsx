import {useEffect, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
import matter from 'gray-matter';
import type {PostMeta} from "../types/post-meta.ts";
import {Post as PostView} from "../components/post/Post.tsx";
import {ReadNext} from "../components/read-next/ReadNext.tsx";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {PostNotFound} from "../components/post/PostNotFound.tsx";

export function BlogPost() {
    const {slug} = useParams();
    if (!slug) return null;
    return <Post slug={slug}/>;
}

function Post({slug}: { slug: string }) {
    const [content, setContent] = useState<string>('');
    const [meta, setMeta] = useState<PostMeta>({} as PostMeta);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetch(`/posts/${slug}/post.md`)
            .then(res => res.text())
            .then(text => {
                if (text.startsWith("<!doctype html>")) {
                    console.warn(`${slug} resulted in the index.html; post might not exist...`);
                    setNotFound(true);
                    return;
                }
                const {data, content} = matter(text);
                if (!data.titel) return;
                setMeta(data as PostMeta);
                setContent(content);
            })
            .finally(() => setLoading(false));
    }, [slug]);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <Box>
                <Button variant="text" startIcon={<ChevronLeftIcon/>} component={RouterLink} to={"/"}>
                    Back
                </Button>
            </Box>
            {notFound ? <PostNotFound/> : <PostView meta={{...meta, slug}} content={content} loading={loading} />}
            {!loading && <ReadNext currentBlog={{...meta, slug}}/>}
        </Container>

    );
}
