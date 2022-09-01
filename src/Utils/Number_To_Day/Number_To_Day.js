export const number_to_day = (day_number) => {
    const processed_day_number = parseInt(day_number, 10);

    switch (processed_day_number) {
        case 1:
            return 'Sunday';
        case 2:
            return 'Monday';
        case 3:
            return 'Tuesday';
        case 4:
            return 'Wednesday';
        case 5:
            return 'Thursday';
        case 6:
            return 'Friday';
        case 7:
            return 'Saturday';
        default:
            return 'Sunday';
    }
};
