import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import {marked} from "marked";
import {extractToc} from "../../utils/table-of-contents.ts";
import {slugify} from "../../utils";

marked.use({
    renderer: {
        heading({ text, depth}) {
            const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
            return `<h${depth} id="${id}">${text}</h${depth}>\n`;
        },
    },
})

export const PostContent = ({titel, content}: { titel: string, content: string }) => {
    const titelHeader = {id: slugify(titel ?? ''), level: 1, text: titel};
    const documentHeaders = extractToc(content);
    const html = marked.parse(content);

    return (
        <Grid container spacing={8} columns={12}>
            <Grid size={{md: 4}} sx={{display: {md: "block", xs: 'none'}}}>
                <Typography variant="h5" color="text.secondary" component="div" fontWeight="600">
                    Inhoud
                </Typography>
                <List>
                    {[titelHeader, ...documentHeaders].map((item) => (
                        <ListItem key={item.id} sx={{pl: (item.level - 1) * 2}} component="a" href={`#${item.id}`}>
                            {item.text}
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid size={{xs: 12, md: 8}}>
                {!content ? (
                    <Stack component="div" direction={"column"}>
                        <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '100%'}}/>
                        <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '100%'}}/>
                        <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '100%'}}/>
                        <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '100%'}}/>
                        <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '100%'}}/>
                        <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '100%'}}/>
                        <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '100%'}}/>
                        <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '100%'}}/>
                        <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '40%'}}/>
                    </Stack>
                ) : (
                    <Typography dangerouslySetInnerHTML={{__html: html}}/>
                )}
            </Grid>
        </Grid>
    )
}