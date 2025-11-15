import type {PostMeta} from "../../types/post-meta.ts";
import {createContext} from "react";


type DraftBlogContextProps = {
    meta: PostMeta;
    content: string;
    setPostMeta: (meta: PostMeta) => void;
    setContent: (content: string) => void;
}

export const DraftBlogContext = createContext<DraftBlogContextProps>(null);

