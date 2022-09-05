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
        case 'CLEAR_CURRENT_BLOG':
            return {};
        default:
            return { ...state };
    }
};
