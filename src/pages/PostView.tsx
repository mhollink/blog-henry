import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {marked} from 'marked';
import matter from 'gray-matter';

export function PostView() {
    const {filename} = useParams();
    if (!filename) return null;
    return <Post filename={filename}/>;
}

function Post({filename}: { filename: string }) {
    const [content, setContent] = useState<string>('');
    const [meta, setMeta] = useState<{ title?: string; date?: string }>({});

    useEffect(() => {
        fetch(`/posts/${filename}`)
            .then(res => res.text())
            .then(text => {
                const {data, content} = matter(text);
                setMeta(data);
                setContent(marked.parse(content));
            });
    }, [filename]);

    return (
        <article style={{maxWidth: 700, margin: '2rem auto', padding: '0 1rem'}}>
            {meta.title && <h1>{meta.title}</h1>}
            {meta.date && <p><small>{meta.date}</small></p>}
            <div dangerouslySetInnerHTML={{__html: content}}/>
        </article>
    );
}
