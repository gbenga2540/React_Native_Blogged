export const set_screen_dimensions = ({ s_width, s_height }) => {
    return {
        type: 'SET_SCREEN_DIMENSIONS',
        payload: {
            width: s_width,
            height: s_height,
        },
    };
};
