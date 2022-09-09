export const current_blog = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_BLOG':
            return { ...action.payload };
        case 'UPDATE_CURRENT_BLOG_LIKED':
            return {
                ...state,
                liked: action.liked_v,
                likes_l: action.liked_v === true ? state.likes_l + 1 : state.likes_l - 1,
            };
        case 'UPDATE_CURRENT_BLOG_FOLLOW_AUTHOR':
            return {
                ...state,
                a_followed: action.a_followed_v,
            };
        case 'UPDATE_CURRENT_BLOG_EDIT_COMMENT':
            const comments_edit = state?.comments;
            let commentIndex_edit = null;
            for (let i = 0; i < comments_edit.length; i++) {
                if (comments_edit[i]?._id?.toString() === action.comment_id?.toString()) {
                    commentIndex_edit = i;
                    break;
                }
            }
            if (commentIndex_edit === null) {
                return { ...state };
            } else {
                const old_comment = comments_edit[commentIndex_edit];
                old_comment['comment'] = action.edit_comment;
                const new_comments = comments_edit;
                new_comments[commentIndex_edit] = old_comment;
                return { ...state, comments: [...new_comments] };
            }
        case 'UPDATE_CURRENT_BLOG_DELETE_COMMENT':
            const comments_delete = state?.comments;
            const new_comments = comments_delete?.filter(item => item?._id?.toString() !== action.comment_id?.toString());
            return { ...state, comments: [...new_comments] };
        case 'CLEAR_CURRENT_BLOG':
            return {};
        default:
            return { ...state };
    }
};
