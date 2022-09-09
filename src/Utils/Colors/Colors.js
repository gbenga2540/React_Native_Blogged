const Colors = (isDarkMode) => {
    const DarkMode = isDarkMode === undefined ? false : isDarkMode;
    return (
        {
            BaseBG: DarkMode ? '#000000' : '#f2f2f2',
            BaseText: DarkMode ? '#f2f2f2' : '#000000',
            BasePHText: DarkMode ? '#b8b8b8' : '#5a5a5a',
            AlertBG: DarkMode ? '#3a3a3a' : '#f2f2f2',
            AlertText: DarkMode ? '#e7e7e7' : '#2a2a2a',
            SearchBarBG: DarkMode ? '#353535' : '#e6e6e6',
            Primary: '#0052a0',
            RedBG: DarkMode ? '#e6760d' : 'red',
            HighLightBG: DarkMode ? '#191919' : '#ffffff',
        }
    );
};

export default Colors;
