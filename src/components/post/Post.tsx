import type {PostMeta} from "../../types/post-meta.ts";
import {PostContent} from "./PostContent";
import {PostCoverImage} from "./PostCoverImage.tsx";
import {PostHeader} from "./PostHeader.tsx";
import {PostMetadata} from "./PostMetadata.tsx";

export const Post = ({meta, content, loading}: { meta: PostMeta, content: string, loading: boolean }) => {
    return (
        <>
            {!loading && <PostMetadata {...meta} />}
            <PostHeader titel={meta.titel} datum={meta.datum} categorie={meta.categorie} schrijver={meta.schrijver}/>
            <PostCoverImage cover={meta.cover} titel={meta.titel}/>
            <PostContent titel={meta.titel} content={content}/>
        </>
    )
}