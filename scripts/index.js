import { Functions } from "./functions.js";
const functions = new Functions();

$("#cartButton")?.on("click", function() {
  const container = $(".modal_container");
  if (container) {
    if ($(".darken")?.hasClass("hidden")) {
      $(".darken")?.removeClass("hidden");
      $(".darken")?.addClass("visible");
    }

    if (container.hasClass("hidden")) {
      container.removeClass("hidden");
      container.addClass("visible");
      container.children().eq(1).children().eq(0).val($("#headphone_Name").text());
    }
  }
});

$("#modalCancel")?.on("click", function() {
  const container = $(".modal_container");
  if (container) {
    if ($(".darken")?.hasClass("visible")) {
      $(".darken")?.removeClass("visible");
      $(".darken")?.addClass("hidden");
    }

    if (container.hasClass("visible")) {
      container.removeClass("visible");
      container.addClass("hidden");
    }
  }
});

$("#modalSend")?.on("click", function() {
  const container = $(".modal_container");
  if (container) {
    const form = $("form");
    if (form) {
      const inputs = form.children();
      const checked = functions.checkInputs(inputs);
      if (!checked) {
        return functions.showError("Указан не правильный номер телефона.");
      }
      const json = { product: inputs?.eq(0).val().trim(), productCount: parseInt(inputs?.eq(1).val().trim().replace(/\D/g, "")), price: Math.floor(parseInt(inputs?.eq(1).val().trim().replace(/\D/g, "")) * parseInt($("#cost").text().replace(/\D/g, ""))), telephone: inputs?.eq(2).val().trim() };
      $.ajax({
        type: "POST",
        url: "https://reqres.in/api/users",
        data: json,
        headers: {"x-api-key": "reqres-free-v1"},
        success: function (response) {
          inputs?.eq(1).val(`Count (1)`);
          inputs?.eq(2).val("");
          console.log(`SUCCESFULLY SENDED.\n`, response);
        }
      });
    }
  }
});

$(".page").on("click", function(el) {
  const pageCurrent = $(".pageCurrent");
  pageCurrent.animate({
    top: $(this)[0].offsetTop
  }, 200);
  if ($(this)[0] == $(".page")[0]) {
    $("#headphones").attr("src", "/images/headphones.svg");
    $("#headphone_Name").text("boAt Rockerz 460")
    $("#headphone_Name").css("top", "35%")
    $("#headphone_Name").css("transform", "translateY(-35%)")
    $("#cost").text("199$");
  } else if ($(this)[0] == $(".page")[1]) {
    $("#headphones").attr("src", "/images/headphones_2.png");
    $("#headphone_Name").text("boAt Rockerz 558 Sunburn Edition")
    $("#headphone_Name").css("top", "27%")
    $("#headphone_Name").css("transform", "translateY(-27%)")
    $("#cost").text("219$");
  } else if ($(this)[0] == $(".page")[2]) {
    $("#headphones").attr("src", "/images/headphones_3.png");
    $("#headphone_Name").text("boAt Rockerz 450 Iron Man")
    $("#headphone_Name").css("top", "27%")
    $("#headphone_Name").css("transform", "translateY(-27%)")
    $("#cost").text("199$");
  }
});

$(".countChange_more")?.on("click", () => {
  const form = $("form");
  const inputs = form.children();
  let newNumber = parseInt(inputs?.eq(1).val().trim().replace(/\D/g, ""));
  newNumber++;
  inputs?.eq(1).val(`Count (${newNumber})`);
});

$(".countChange_less")?.on("click", () => {
  const form = $("form");
  const inputs = form.children();
  let newNumber = parseInt(inputs?.eq(1).val().trim().replace(/\D/g, ""));
  newNumber >= 1 ? newNumber-- : newNumber = 1;
  inputs?.eq(1).val(`Count (${newNumber})`);
});