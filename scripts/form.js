import { Functions } from "./functions.js";
const functions = new Functions();

const inputs = functions.getFormInputs();
if (inputs && inputs.length > 0) {
    Array.from(inputs).forEach((el) => {
        $(el).on("input", () => {
            const percents = functions.getPercents();
            const progressBar = $(".progress_bar_texture");
            if (progressBar && percents > 0) {
                progressBar.text(`${percents}%`);
            } else if (percents < 1) {
                progressBar.animate({
                    width: 0
                }, 150)
            }
        });
    });
}