const form = document.getElementById("addWorkForm");

form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs: any = document.querySelectorAll(".addWorkInput");
    if (inputs[0].value.length > 0 && inputs[1].value.length > 0) {
        const response = await fetch("http://localhost:3000/getWorks", {
            method: "GET",
            headers: { "content-type": "application/json; charset=utf-8" }
        });

        if (response.ok && response.status == 200) {
            const data = await response.json();
            const response_2 = await fetch("http://localhost:3000/works/addWork", {
                method: "POST",
                headers: { "content-type": "application/json; charset=utf-8" },
                body: JSON.stringify({ workID: data.length + 1, workName: inputs[0].value, workDate: inputs[1].value, workImage: inputs[2].value || "/images/no-workImage.jpg" })
            });

            if (response_2.ok && response_2.status == 200) {
                window.location.assign("/works");
            }
        }
    }
});