import {useState} from 'react';
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import {DraftBlog} from "../components/new-blog/DraftBlog.tsx";
import {NewBlogForm} from "../components/blog-writer/NewBlogForm.tsx";

// TODO: Add series support
// TODO: Allow for a preview of the blog
// TODO: Allow for image uploads and download the blog as zip

export function BlogWriter() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [topics, setTopics] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const handleDownload = () => {
        const topicsList = topics
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

        const frontMatter =
            `---\n` +
            `schrijver: "${author}"\n` +
            `datum: "${date}"\n` +
            `categorie: "${category}"\n` +
            (topicsList.length
                ? `onderwerpen: [${topicsList.map(topic => `"${topic}"`).join(", ")}]\n`
                : `onderwerpen: []\n`) +
            `cover: ""\n` +
            `titel: "${title}"\n` +
            `bijschrift: "${description}"\n` +
            `---\n\n`;

        const finalMarkdown = frontMatter + content;

        const blob = new Blob([finalMarkdown], {
            type: 'text/markdown;charset=utf-8',
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slug}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <DraftBlog>
            <Container
                maxWidth="lg"
                component="main"
                sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
            >
                <NewBlogForm/>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownload}
                    disabled={!title || !content}
                >
                    Download Markdown Bestand
                </Button>

            </Container>
        </DraftBlog>
    );
}
