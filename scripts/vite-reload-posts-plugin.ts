import buildPostsIndex from "./posts2json";

export default function BlogReloadPlugin() {
    return {
        name: 'generate-posts-index',

        // Runs before dev server starts
        async buildStart() {
            await buildPostsIndex();
        },

        // Optionally, watch for changes in public/posts during dev
        configureServer(server) {
            const watcher = server.watcher.add('public/posts/**/*.md');

            watcher.on('add', async () => await buildPostsIndex());
            watcher.on('change', async () => await buildPostsIndex());
            watcher.on('unlink', async () => await buildPostsIndex());
        },
    };
}