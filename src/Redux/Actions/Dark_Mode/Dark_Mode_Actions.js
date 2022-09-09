export const set_dark_mode = ({ isdarkmode }) => {
    return {
        type: 'SET_DARK_MODE',
        payload: isdarkmode,
    };
};
