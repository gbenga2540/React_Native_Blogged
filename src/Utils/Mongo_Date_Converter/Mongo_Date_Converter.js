import { number_to_month } from '../Number_To_Month/Number_To_Month';

export const mongo_date_converter = (input_mongo_date) => {
    if (input_mongo_date) {
        const _date = new Date(input_mongo_date);
        const date = _date.getDate();
        const month = parseInt(_date.getMonth(), 10) + 1;
        const year = _date.getFullYear();
        return `${date} ${number_to_month(month).slice(0, 3)} ${year}`;
    } else {
        return '';
    }
};

export const mongo_date_converter_2 = (input_mongo_date) => {
    if (input_mongo_date) {
        const _date = new Date(input_mongo_date);
        const date = _date.getDate();
        const month = parseInt(_date.getMonth(), 10) + 1;
        const year = _date.getFullYear();
        return `${number_to_month(month)} ${date}, ${year}`;
    } else {
        return '';
    }
};
