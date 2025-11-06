import type {FunctionComponent} from "react";
import type {PostMeta} from "../../types/post-meta.ts";
import {slugify} from "../../utils";

type PostCardProps = {
    post: PostMeta
}

export const PostCard: FunctionComponent<PostCardProps> = ({post}) => {

    return (
        <div className="post-card">
            <img className="post-card__cover" src={post.cover} alt={post.titel}/>
            <div className="post-card__content">

                <span className="post-card__content__tag">{post.tag}</span>
                <span className="post-card__content__title">{post.titel}</span>
                <p className="post-card__content__summary">{post.bijschrift}</p>

                <div className="post-card__content__author">
                    <img className="post-card__content__author__avatar"
                         src={`/assets/schrijvers/${slugify(post.schrijver)}.png`}
                         alt={`Avatar van ${post.schrijver}`}
                    />
                    <div className="post-card__content__author__data">
                        <span className="post-card__content__author__data__name">{post.schrijver}</span>
                        <small className="post-card__content__author__data__date">{post.datum}</small>
                    </div>
                </div>
            </div>

        </div>
    )

}