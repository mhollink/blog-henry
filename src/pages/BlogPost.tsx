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

export function BlogPost() {
    const {filename} = useParams();
    if (!filename) return null;
    return <Post filename={filename}/>;
}

function Post({filename}: { filename: string }) {
    const [content, setContent] = useState<string>('');
    const [meta, setMeta] = useState<Partial<Omit<PostMeta, "filename">>>({});

    useEffect(() => {
        fetch(`/posts/${filename}.md`)
            .then(res => res.text())
            .then(text => {
                const {data, content} = matter(text);
                if (!data.titel) return;
                setMeta(data as Omit<PostMeta, "filename">);
                setContent(content);
            });
    }, [filename]);

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
            <PostView meta={meta} content={content}/>
            <ReadNext/>
        </Container>

    );
}
