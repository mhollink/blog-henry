import {createContext,} from "react";
import type {PostMeta} from "../../types/post-meta.ts";

type BlogsContextProps = {
    blogs: PostMeta[];
}

export const BlogsContext = createContext<BlogsContextProps>({blogs: []});

