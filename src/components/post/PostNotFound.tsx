import type {FunctionComponent} from "react";
import {PostHeader} from "./PostHeader.tsx";
import {PostCoverImage} from "./PostCoverImage.tsx";
import Stack from "@mui/material/Stack";


export const PostNotFound: FunctionComponent = () => (
    <Stack gap={3}>
        <PostHeader
            categorie={"404"}
            titel={"You know that place between sleep and awake, the place where you can still remember dreaming? That's where this page is waiting..."}
        />
        <PostCoverImage cover={"/assets/not-found-wallpaper.jpg"} titel={"not-found"}/>

    </Stack>
);
