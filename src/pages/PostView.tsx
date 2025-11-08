import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {marked} from 'marked';
import matter from 'gray-matter';
import type {PostMeta} from "../types/post-meta.ts";
import Container from '@mui/material/Container';


marked.use({gfm: true, breaks: false});

export function PostView() {
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
                setMeta(data as Omit<PostMeta, "filename">);
                setContent(marked.parse(content) as string);
            });
    }, [filename]);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <article className="post-view">
                <div className="post-view__data">
                    {meta.cover && <img src={meta.cover} alt={meta.titel}/>}
                    {meta.titel && <h1>{meta.titel}</h1>}
                    {meta.datum && <p><small>{meta.datum}</small></p>}
                </div>
                <div className="post-view__data"
                     dangerouslySetInnerHTML={{__html: content}}/>
            </article>
        </Container>

    );
}
