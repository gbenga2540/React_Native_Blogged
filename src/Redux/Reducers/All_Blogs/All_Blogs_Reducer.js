export const all_blogs = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_BLOGS':
            return [...action.payload];
        case 'UPDATE_LIKED_ON_ONE_BLOG':
            const allblogs_liked_l = state;
            if (allblogs_liked_l?.length > 0) {
                const blog_to_be_updated = allblogs_liked_l?.filter((item, index) => item?.bid === action.blog_id);
                if (blog_to_be_updated?.length > 0) {
                    let b_index;
                    for (let i = 0; i < allblogs_liked_l.length; i++) {
                        if (allblogs_liked_l[i]?.bid === action.blog_id) {
                            b_index = i;
                        }
                    }
                    const old_blog_item = blog_to_be_updated?.[0];
                    const new_blog_item = {
                        ...old_blog_item,
                        liked: action.liked_v,
                        likes_l: action.liked_v === true ? old_blog_item.likes_l + 1 : old_blog_item.likes_l <= 0 ? 0 : old_blog_item.likes_l - 1,
                    };
                    allblogs_liked_l[b_index] = { ...new_blog_item };
                    return [...allblogs_liked_l];
                } else {
                    return [...state];
                }
            } else {
                return [];
            }
        case 'UPDATE_COMMENT_L_ON_ONE_BLOG':
            const allblogs_comment_l = state;
            if (allblogs_comment_l?.length > 0) {
                const blog_to_be_updated = allblogs_comment_l?.filter((item, index) => item?.bid === action.blog_id);
                if (blog_to_be_updated?.length > 0) {
                    let b_index;
                    for (let i = 0; i < allblogs_comment_l.length; i++) {
                        if (allblogs_comment_l[i]?.bid === action.blog_id) {
                            b_index = i;
                        }
                    }
                    const old_blog_item = blog_to_be_updated?.[0];
                    const new_blog_item = {
                        ...old_blog_item,
                        comments_l: action.added_comment === true ? old_blog_item.comments_l + 1 : old_blog_item.comments_l <= 0 ? 0 : old_blog_item.comments_l - 1,
                    };
                    allblogs_comment_l[b_index] = { ...new_blog_item };
                    return [...allblogs_comment_l];
                } else {
                    return [...state];
                }
            } else {
                return [];
            }
        case 'CLEAR_ALL_BLOGS':
            return [];
        default:
            return [...state];
    }
};
