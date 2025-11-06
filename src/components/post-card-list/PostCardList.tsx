import type {FunctionComponent} from "react";
import {PostCard} from "../post-card/PostCard.tsx";


type PostCardListProps = {
    cards: PostCard[];
}

export const PostCardList: FunctionComponent<PostCardListProps> = ({cards}) => {

    return (
        <section className="post-card-list">
            {cards}
        </section>
    )
}