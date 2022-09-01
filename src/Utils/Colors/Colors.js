const Colors = (isDarkMode) => {
    const DarkMode = isDarkMode === undefined ? false : isDarkMode;
    return (
        {
            BaseBG: DarkMode ? '#000000' : '#f5f6f7',
            BaseText: DarkMode ? '#f5f6f7' : '#000000',
            BasePHText: DarkMode ? '#b8b8b8' : '#5a5a5a',
            SearchBarBG: isDarkMode ? '#353535' : '#e6e6e6',
            Primary: '#0052a0',
        }
    );
};

export default Colors;
