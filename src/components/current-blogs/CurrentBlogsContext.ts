import {createContext,} from "react";
import type {PostMeta} from "../../types/post-meta.ts";

type CurrentBlogsContextProps = {
    blogs: PostMeta[];
}

export const CurrentBlogsContext = createContext<CurrentBlogsContextProps>({blogs: []});

