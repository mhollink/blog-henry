import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.resolve("public/posts");
const outputFile = path.resolve("public/posts.json");

const posts = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
        const filename = file.replace(".md", "");
        const filePath = path.join(postsDir, file);
        const raw = fs.readFileSync(filePath, "utf8");
        const {data} = matter(raw);

        return {filename, ...data,};
    }).sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), "utf8");

console.log(`✅ Generated ${posts.length} posts in ${outputFile}`);
