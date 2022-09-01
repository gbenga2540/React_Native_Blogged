export const dark_mode = (state = false, action) => {
    switch (action.type) {
        case 'SET_DARK_MODE':
            return action.payload;
        default:
            return state;
    }
};
