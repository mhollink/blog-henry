import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {marked} from 'marked';
import matter from 'gray-matter';
import {PageHeader} from "../components/page-header/PageHeader.tsx";
import type {PostMeta} from "../types/post-meta.ts";

marked.use({gfm: true, breaks: false});

export function PostView() {
    const {filename} = useParams();
    if (!filename) return null;
    return <Post filename={filename}/>;
}

function Post({filename}: { filename: string }) {
    const [content, setContent] = useState<string>('');
    const [meta, setMeta] = useState<Omit<PostMeta, "filename">>({});

    useEffect(() => {
        fetch(`/posts/${filename}.md`)
            .then(res => res.text())
            .then(text => {
                const {data, content} = matter(text);
                setMeta(data);
                setContent(marked.parse(content));
            });
    }, [filename]);

    return (
        <div className="inset-center">
            <PageHeader/>
            <article className="post-view">
                <div className="post-view__data">
                    {meta.cover && <img src={meta.cover} alt={meta.titel}/>}
                    {meta.titel && <h1>{meta.titel}</h1>}
                    {meta.datum && <p><small>{meta.datum}</small></p>}
                </div>
                <div className="post-view__data"
                     dangerouslySetInnerHTML={{__html: content}}/>
            </article>
        </div>

    );
}
