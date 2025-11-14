import {useState} from 'react';
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

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
        <Container
            maxWidth="lg"
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <Typography variant="h4">
                Nieuw Blogbericht
            </Typography>

            <Grid container spacing={3} columns={12}>
                <Grid size={{xs: 12}}>
                    <TextField label="Titel" value={title} onChange={(e) => setTitle(e.target.value)} size="small"
                               variant="standard" fullWidth/>
                </Grid>
                <Grid size={{xs: 12, sm: 8}}>
                    <TextField label="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} size="small"
                               variant="standard" fullWidth/>
                </Grid>
                <Grid size={{xs: 12, sm: 4}}>
                    <TextField type="date" label="Datum" value={date} onChange={(e) => setDate(e.target.value)}
                               InputLabelProps={{shrink: true}} size="small" variant="standard" fullWidth/>
                </Grid>
                <Grid size={{xs: 12, sm: 4}}>
                    <TextField label="Categorie" value={category} onChange={(e) => setCategory(e.target.value)}
                               size="small" variant="standard" fullWidth/>
                </Grid>
                <Grid size={{xs: 12, sm: 8}}>
                    <TextField label="Onderwerpen (komma-gescheiden)" value={topics}
                               onChange={(e) => setTopics(e.target.value)} size="small" variant="standard" fullWidth/>
                </Grid>

                <Grid size={{xs: 12}}>
                    <TextField label="Beschrijving (kort)" value={description}
                               onChange={(e) => setDescription(e.target.value)} size="small" variant="standard"
                               multiline
                               maxRows={4}
                               fullWidth/>
                </Grid>

                <Grid size={{xs: 12}}>
                    <Typography variant="h6" mb={1}>
                        Inhoud
                    </Typography>

                    <TextField
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        multiline
                        minRows={24}
                        fullWidth
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDownload}
                        disabled={!title || !content}
                    >
                        Download Markdown Bestand
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
