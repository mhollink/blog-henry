import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type PostMeta = { file: string; title: string };

export function PostList() {
    const [posts, setPosts] = useState<PostMeta[]>([]);

    useEffect(() => {
        fetch('/posts/posts.json')
            .then(res => res.json())
            .then(setPosts);
    }, []);

    return (
        <ul style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
            {posts.map(post => (
                <li key={post.file}>
                    <Link to={`/post/${post.file}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    );
}
