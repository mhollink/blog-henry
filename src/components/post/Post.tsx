import type {PostMeta} from "../../types/post-meta.ts";
import {PostContent} from "./PostContent";
import {PostCoverImage} from "./PostCoverImage.tsx";
import {PostHeader} from "./PostHeader.tsx";

export const Post = ({meta, content}: { meta: PostMeta, content: string }) => {
    return (
        <>
            <PostHeader titel={meta.titel} datum={meta.datum} categorie={meta.categorie} schrijver={meta.schrijver}/>
            <PostCoverImage cover={meta.cover} title={meta.titel}/>
            <PostContent titel={meta.titel} content={content}/>
        </>
    )
}