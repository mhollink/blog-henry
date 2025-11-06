import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {marked} from 'marked';
import matter from 'gray-matter';

marked.use({gfm: true, breaks: false});

export function PostView() {
    const {filename} = useParams();
    if (!filename) return null;
    return <Post filename={filename}/>;
}

function Post({filename}: { filename: string }) {
    const [content, setContent] = useState<string>('');
    const [meta, setMeta] = useState<{ title?: string; date?: string, cover?: string }>({});

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
        <article style={{maxWidth: 700, margin: '2rem auto', padding: '0 1rem'}}>
            {meta.cover && <img src={meta.cover} alt={meta.title} style={{width: "100%", borderRadius: 8}}/>}
            {meta.titel && <h1>{meta.titel}</h1>}
            {meta.datum && <p><small>{meta.datum}</small></p>}
            <div dangerouslySetInnerHTML={{__html: content}}/>
        </article>
    );
}
