import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {PostCard} from "../components/post-card/PostCard.tsx";
import {PostCardList} from "../components/post-card-list/PostCardList.tsx";
import {PageHeader} from "../components/page-header/PageHeader.tsx";

type PostMeta = { file: string; title: string };

export function PostList() {
    const [posts, setPosts] = useState<PostMeta[]>([]);

    useEffect(() => {
        fetch('./posts.json')
            .then(res => res.json())
            .then(setPosts);
    }, []);

    return (
        <div className="inset-center">
            <PageHeader/>
            <PostCardList cards={posts.map(post => (
                <Link key={post.filename} to={`/post/${post.filename}`}>
                    <PostCard post={post}/>
                </Link>
            ))}/>
        </div>
    );
}
