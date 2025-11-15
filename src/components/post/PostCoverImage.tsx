import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import type {PostMeta} from "../../types/post-meta.ts";

type PostCoverImageProps = Pick<PostMeta, 'cover' | 'titel'>;

export const PostCoverImage = (meta: PostCoverImageProps) => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 8', // or 4/3, 3/2, etc.
                overflow: 'hidden',
                borderRadius: "1rem",
            }}
        >
            {!meta.cover ? (
                <Skeleton variant="rectangular" sx={{
                    width: '100%',
                    height: '100%',
                }}/>
            ) : (
                <Box
                    component="img"
                    src={meta.cover}
                    alt={meta.titel}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            )}
        </Box>
    );
};
