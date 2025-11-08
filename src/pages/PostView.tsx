import {useEffect, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
import {parse} from 'marked';
import matter from 'gray-matter';
import type {PostMeta} from "../types/post-meta.ts";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function PostView() {
    const {filename} = useParams();
    if (!filename) return null;
    return <Post filename={filename}/>;
}

function Post({filename}: { filename: string }) {
    const [content, setContent] = useState<string>('');
    const [meta, setMeta] = useState<Partial<Omit<PostMeta, "filename">>>({});

    useEffect(() => {
        fetch(`/posts/${filename}.md`)
            .then(res => res.text())
            .then(text => {
                const {data, content} = matter(text);
                if (!data.titel) return;
                setMeta(data as Omit<PostMeta, "filename">);
                setContent(parse(content) as string);
            });
    }, [filename]);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <Box>
                <Button variant="text" startIcon={<ChevronLeftIcon/>} component={RouterLink} to={"/"}>
                    Back
                </Button>
            </Box>

            <Box component="section">
                <Stack component="div" gap={1} direction={"row"} justifyContent="center">
                    {meta.tags && meta.tags.map((tag, index) => <Chip label={tag} key={index} color={"primary"}
                                                                      size={"small"}/>)}
                </Stack>
                {meta.titel && <Typography variant={"h2"} component="h2" textAlign={"center"}
                                           sx={{my: 2}}>{meta.titel}</Typography>}
                <Stack component="div" gap={1} direction={"row"} justifyContent="center">
                    <Typography color="text.secondary" variant="body2">
                        {meta.schrijver},
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        {meta.datum}
                    </Typography>
                </Stack>
            </Box>

            {meta.cover && <img src={meta.cover} alt={meta.titel}/>}

            <Typography dangerouslySetInnerHTML={{__html: content}}/>
        </Container>

    );
}
