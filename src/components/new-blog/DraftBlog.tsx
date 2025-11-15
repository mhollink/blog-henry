import {DraftBlogContext} from "./DraftBlogContext.ts";
import type {FunctionComponent, PropsWithChildren} from "react";
import {useEffect, useState} from "react";
import type {PostMeta} from "../../types/post-meta.ts";

const INITIAL_STATE = {
    meta: {
        slug: "",
        titel: "",
        schrijver: "",
        datum: new Date().toISOString().split("T")[0],
        categorie: "",
        onderwerpen: [],
        bijschrift: "",
        cover: "",
        serie: "",
        serieIndex: null,
    },
    content: ""
};

export const DraftBlog: FunctionComponent<PropsWithChildren> = ({children}) => {
    const currentDraft = localStorage.getItem("new-blog-draft");
    const draft = currentDraft ? JSON.parse(currentDraft) : INITIAL_STATE

    const [meta, setPostMeta] = useState<PostMeta>(draft.meta);
    const [content, setContent] = useState<string>(draft.content);

    useEffect(() => {
        const draft = {meta, content};
        console.log(draft);
        localStorage.setItem("new-blog-draft", JSON.stringify(draft));
    }, [meta, content])

    return (
        <DraftBlogContext.Provider value={{meta, content, setPostMeta, setContent}}>
            {children}
        </DraftBlogContext.Provider>
    );
}