export const set_current_blog = ({ current_blog }) => {
    return {
        type: 'SET_CURRENT_BLOG',
        payload: current_blog,
    };
};

export const update_current_blog_liked = ({ liked_v }) => {
    return {
        type: 'UPDATE_CURRENT_BLOG_LIKED',
        liked_v: liked_v,
    };
};

export const update_current_blog_follow_author = ({ a_followed_v }) => {
    return {
        type: 'UPDATE_CURRENT_BLOG_FOLLOW_AUTHOR',
        a_followed_v: a_followed_v,
    };
};

export const update_current_blog_edit_comment = ({ comment_id, edit_comment }) => {
    return {
        type: 'UPDATE_CURRENT_BLOG_EDIT_COMMENT',
        comment_id: comment_id,
        edit_comment: edit_comment,
    };
};

export const update_current_blog_delete_comment = ({ comment_id }) => {
    return {
        type: 'UPDATE_CURRENT_BLOG_DELETE_COMMENT',
        comment_id: comment_id,
    };
};

export const clear_current_blog = () => {
    return {
        type: 'CLEAR_CURRENT_BLOG',
    };
};
