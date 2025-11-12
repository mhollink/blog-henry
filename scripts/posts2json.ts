import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.resolve("public/posts");
const outputFile = path.resolve("public/posts.json");

export async function posts2json() {
    const posts = fs
        .readdirSync(postsDir)
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
            const filename = file.replace(".md", "");
            const filePath = path.join(postsDir, file);
            const raw = fs.readFileSync(filePath, "utf8");
            const {data} = matter(raw);

            return {filename, ...data} as any;
        }).sort((a, b) => {
            if (!a.datum) return 1;
            if (!b.datum) return -1;
            return new Date(b.datum).getTime() - new Date(a.datum).getTime();
        });

    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), "utf8");
    console.log(`✅ Generated post-list with ${posts.length} posts`);
}