import {useContext} from "react";
import {DraftBlogContext} from "./DraftBlogContext.ts";

export const useDraftBlog = () => {
    const context = useContext(DraftBlogContext);
    if (!context) {
        throw new Error("useDraftBlog must be used within an DraftBlogContext");
    }
    return context;
};