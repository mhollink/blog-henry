import {useBlogs} from "../blog-list-context/useBlogs.ts"

export const useRecommendations = () => {
    const {blogs} = useBlogs();

    return blogs;
}