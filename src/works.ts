const worksContainer = document.querySelector(".works_container");

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:3000/getWorks", {
        method: "GET",
        headers: { "content-type": "application/json; charset=utf-8" }
    });

    if (response.ok && response.status == 200) {
        const data = await response.json();

        worksContainer?.innerHTML == "";
        data.forEach((el: any) => {
            const newItem = document.createElement("div");
            const workTitle = document.createElement("p");
            const workDate = document.createElement("p");

            workTitle.classList.add("workTitle");
            workTitle.textContent = el.workName;

            workDate.classList.add("workDate");
            workDate.textContent = el.workDate;

            newItem.classList.add("work");
            newItem.dataset.workid = el.workID;
            newItem.style.backgroundImage = `url(${el.workImage})`;

            newItem.appendChild(workTitle);
            newItem.appendChild(workDate);
            worksContainer?.appendChild(newItem);

            newItem.addEventListener("click", () => {
                window.location.assign(`/works/${el.workID}`);
            });
        });
    }
});