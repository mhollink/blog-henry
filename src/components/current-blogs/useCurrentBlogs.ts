import {useContext,} from "react";
import {CurrentBlogsContext} from "./CurrentBlogsContext.ts";

export const useCurrentBlogs = () => {
    const context = useContext(CurrentBlogsContext);
    if (!context) {
        throw new Error("useBlogs must be used within an BlogsProvider");
    }
    return context;
};