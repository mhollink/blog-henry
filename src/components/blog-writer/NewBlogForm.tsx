import {useDraftBlog} from "../new-blog/useDraftBlog.ts";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {NewBlogFormInput} from "./NewBlogFormInput.tsx";

export const NewBlogForm = () => {
    const {meta, content, setContent, setPostMeta} = useDraftBlog();

    const handleMetaFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const updatedMeta = {...meta, [name]: value};
        setPostMeta(updatedMeta);
    }

    return (
        <>
            <Typography variant="h4">
                Nieuw Blogbericht
            </Typography>

            <Grid container spacing={3} columns={12}>
                <NewBlogFormInput size={12} label={"Titel"} name={"titel"} value={meta.titel}
                                  onChange={handleMetaFieldChange}/>
                <NewBlogFormInput size={{xs: 12, sm: 8}} label={"Auteur"} value={meta.schrijver} name={"schrijver"}
                                  onChange={handleMetaFieldChange}/>
                <NewBlogFormInput size={{xs: 12, sm: 4}} label={"Datum"} value={meta.datum} name={"datum"}
                                  onChange={handleMetaFieldChange} type={"date"}
                                  InputLabelProps={{shrink: true}}
                />
                <NewBlogFormInput size={{xs: 12, sm: 4}} label={"Categorie"} value={meta.categorie} name={"categorie"}
                                  onChange={handleMetaFieldChange}/>
                <NewBlogFormInput size={{xs: 12, sm: 8}} label={"Onderwerpen (komma-gescheiden)"}
                                  value={meta.onderwerpen} name={"onderwerpen"}
                                  onChange={handleMetaFieldChange}/>
                <NewBlogFormInput size={12} label={"Beschrijving (kort)"} name={"bijschrift"} value={meta.bijschrift}
                                  onChange={handleMetaFieldChange}/>


                <Grid size={12}>
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
            </Grid>
        </>
    )
}