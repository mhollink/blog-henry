import type {PostMeta} from "../../types/post-meta.ts";

export const PostMetadata = (props: PostMeta) => {
    return (
        <>
            <title>{props.titel} | Henry Hollink</title>
            <meta name="description" content={props.bijschrift} />

            {/* Open Graph for social sharing */}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={props.titel} />
            <meta property="og:description" content={props.bijschrift} />
            <meta property="og:image" content={props.cover} />
            <meta property="og:url" content={window.location.href} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={props.titel} />
            <meta name="twitter:description" content={props.bijschrift} />
            <meta name="twitter:image" content={props.cover} />
        </>
    )
}