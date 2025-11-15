import {useBlogs} from "../blog-list-context/useBlogs.ts"
import type {PostMeta} from "../../types/post-meta.ts";

const scores = {
    NEXT_IN_SERIE: 100,
    SAME_SERIE: 50,
}

export const useRecommendations = () => {
    const {blogs} = useBlogs();

    function calculateScores(candidates: PostMeta[], current: PostMeta) {
        return candidates.map(post => {
            let score = 0;

            if (post.serie && post.serie === current.serie) {
                if (typeof current.serieIndex === 'number' && typeof post.serieIndex === 'number') {
                    score += post.serieIndex === current.serieIndex + 1 ? scores.NEXT_IN_SERIE : scores.SAME_SERIE;
                } else {
                    score += scores.SAME_SERIE;
                }
            }

            if (post.schrijver && post.schrijver === current.schrijver) score += 25;
            if (post.categorie && post.categorie === current.categorie) score += 20;

            if (current.onderwerpen?.length && post.onderwerpen?.length) {
                const overlap = post.onderwerpen.filter(t => current.onderwerpen!.includes(t)).length;
                score += overlap * 5;
            }

            return { post, score };
        });

    }

    function newestFirst(a: PostMeta, b: PostMeta) {
        return (b.datum ?? '').localeCompare(a.datum ?? '')
    }

    function getRecommendations(currentBlog: PostMeta, limit = 3) {
        const candidates = blogs.filter(blog => blog.slug !== currentBlog.slug);
        const scored = calculateScores(candidates, currentBlog);

        const sorted =  scored.sort((a, b) => b.score - a.score || newestFirst(a.post, b.post));

        // If not enough recommendations, fill with random remaining posts
        const top = sorted.filter(s => s.score > 0).map(s => s.post);
        const fill = candidates
            .filter(p => !top.includes(p))
            .sort(() => 0.5 - Math.random())
            .slice(0, limit - top.length);

        return [...top.slice(0, limit), ...fill];
    }

    return getRecommendations;
}