export const screen_dimensions = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SCREEN_DIMENSIONS':
            return action.payload;
        default:
            return state;
    }
};
