import { Functions } from "./functions.js";
const functions = new Functions();

const btn = $("#saveBtn");
let colors = [];

if (btn) {
  btn.on("click", () => {
    if (functions.validateAndShow(colors)) {
      functions.addColor();
    }
  });
}