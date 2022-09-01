export const blog_tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_BLOG_TAGS':
            return action.payload;
        default:
            return state;
    }
};
