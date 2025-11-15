import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.resolve("public/posts");
const outputFile = path.resolve("public/posts.json");

export async function posts2json() {
    const posts = fs
        .readdirSync(postsDir, {withFileTypes: true})
        .filter(dir => dir.isDirectory())
        .map((dir) => {
            const postPath = path.join(postsDir, dir.name, 'post.md');
            const raw = fs.readFileSync(postPath, "utf8");
            const {data} = matter(raw);
            return {
                slug: dir.name,
                ...data,
                cover: `/posts/${dir.name}/${data.cover.replace('./', '')}`,
            } as any;
        }).sort((a, b) => {
            if (!a.datum) return 1;
            if (!b.datum) return -1;
            return new Date(b.datum).getTime() - new Date(a.datum).getTime();
        });

    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), "utf8");
    console.log(`✓ Generated post-list with ${posts.length} posts`);
}