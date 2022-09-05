export const high_nums_converter = (number) => {
    if (number) {
        const processed_number = parseInt(number, 10);
        const stringified_number = processed_number?.toString();
        if (processed_number > 999999999999) {
            return `${stringified_number.slice(0, 1)}.${stringified_number.slice(1, 2)}T`;
        } else if (processed_number > 99999999999) {
            return `${stringified_number.slice(0, 3)}.${stringified_number.slice(3, 4)}B`;
        } else if (processed_number > 9999999999) {
            return `${stringified_number.slice(0, 2)}.${stringified_number.slice(2, 3)}B`;
        } else if (processed_number > 999999999) {
            return `${stringified_number.slice(0, 1)}.${stringified_number.slice(1, 2)}B`;
        } else if (processed_number > 99999999) {
            return `${stringified_number.slice(0, 3)}.${stringified_number.slice(3, 4)}M`;
        } else if (processed_number > 9999999) {
            return `${stringified_number.slice(0, 2)}.${stringified_number.slice(2, 3)}M`;
        } else if (processed_number > 999999) {
            return `${stringified_number.slice(0, 1)}.${stringified_number.slice(1, 2)}M`;
        } else if (processed_number > 99999) {
            return `${stringified_number.slice(0, 3)}.${stringified_number.slice(3, 4)}K`;
        } else if (processed_number > 9999) {
            return `${stringified_number.slice(0, 2)}.${stringified_number.slice(2, 3)}K`;
        } else if (processed_number > 999) {
            return `${stringified_number.slice(0, 1)}.${stringified_number.slice(1, 2)}K`;
        } else {
            return stringified_number;
        }
    } else if (number === 0 || number === '0') {
        return '0';
    } else {
        return '';
    }
};
