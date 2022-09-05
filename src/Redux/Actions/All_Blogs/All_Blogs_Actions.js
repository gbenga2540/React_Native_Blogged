export const set_all_blogs = (all_blogs) => {
    return {
        type: 'SET_ALL_BLOGS',
        payload: all_blogs,
    };
};

export const update_liked_on_one_blog = ({ blog_id, liked_v }) => {
    return {
        type: 'UPDATE_LIKED_ON_ONE_BLOG',
        blog_id: blog_id,
        liked_v: liked_v,
    };
};

export const update_comment_l_on_one_blog = ({ blog_id, added_comment }) => {
    return {
        type: 'UPDATE_COMMENT_L_ON_ONE_BLOG',
        blog_id: blog_id,
        added_comment: added_comment,
    };
};

export const clear_all_blogs = () => {
    return {
        type: 'CLEAR_ALL_BLOGS',
    };
};
