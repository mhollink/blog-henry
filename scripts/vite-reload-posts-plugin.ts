import {posts2json} from "./posts2json";
import {generateRSS} from "./posts2rss";
import {generateSitemap} from "./generate-sitemap.ts";

export default function BlogReloadPlugin() {
    return {
        name: 'generate-posts-index',

        // Runs before dev server starts
        async buildStart() {
            await posts2json();
            await generateRSS();
            await generateSitemap();
        },

        // Optionally, watch for changes in public/posts during dev
        configureServer(server: any) {
            const rebuild = async () => {
                await posts2json();
                await generateRSS();
                await generateSitemap();
            };

            const watcher = server.watcher.add('public/posts/**/*.md');

            watcher.on('add', rebuild);
            watcher.on('change', rebuild);
            watcher.on('unlink', rebuild);
        },
    };
}