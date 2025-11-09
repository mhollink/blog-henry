import {useContext,} from "react";
import {BlogsContext} from "./BlogsContext.tsx";

export const useBlogs = () => {
    const context = useContext(BlogsContext);
    if (!context) {
        throw new Error("useBlogs must be used within an BlogsProvider");
    }
    return context;
};