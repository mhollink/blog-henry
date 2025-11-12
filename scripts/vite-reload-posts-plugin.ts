import {posts2json} from "./posts2json";
import {generateRSS} from "./posts2rss";

export default function BlogReloadPlugin() {
    return {
        name: 'generate-posts-index',

        // Runs before dev server starts
        async buildStart() {
            await posts2json();
            await generateRSS();
        },

        // Optionally, watch for changes in public/posts during dev
        configureServer(server: any) {
            const rebuild = async () => {
                await posts2json();
                await generateRSS();
            };

            const watcher = server.watcher.add('public/posts/**/*.md');

            watcher.on('add', rebuild);
            watcher.on('change', rebuild);
            watcher.on('unlink', rebuild);
        },
    };
}