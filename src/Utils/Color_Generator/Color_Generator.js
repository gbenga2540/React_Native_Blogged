export const color_generator = () => {
    const red_value = parseInt(Math.random() * 255, 10);
    // Red value is processed to avoid an all white color
    const processed_red = red_value > 200 ? 200 : red_value;
    const green_value = parseInt(Math.random() * 255, 10);
    const blue_value = parseInt(Math.random() * 255, 10);
    const randomcolor = `rgb(${processed_red}, ${green_value}, ${blue_value})`;
    return randomcolor;
}