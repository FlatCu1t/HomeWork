if (!localStorage || !localStorage.getItem("logined")) {
    window.location.assign("/login");
}

(async () => {
    const response = await fetch("http://localhost:3000/users/get", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" }
    });

    if (response.ok && response.status == 200) {
        const data = await response.json();
        const user = data.users.find((x:any) => x.id == parseInt(localStorage.getItem("ID") || "0"));
        if (!user) {
            localStorage.clear();
            window.location.assign("/login");
        }
    }
})();

const changeAvatarBtn = document.getElementById("changeAvatar");
const exitBtn = document.getElementById("exitBtn");

changeAvatarBtn?.addEventListener("click", async () => {
    const response = await fetch("http://localhost:3000/users/get", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" }
    });

    if (response.ok && response.status == 200) {
        const data = await response.json();
        const user = data.users.find((x: any) => x.id == parseInt(localStorage.getItem("ID") || "0"));
        if (user) {
            const input: any = document.getElementById("changeAvatar_input");
            if (!input || input.value.length < 1) return alert("Введите URL для аватара.");
            const payload = {
                id: user.id, 
                avatar: input.value
            };

            try {
                const response = await fetch("http://localhost:3000/users/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || `Сервер вернул статус ${response.status}`);
                }

                const result = await response.json();
                if (result.success) {
                    return alert("Аватар успешно обновлён!");
                } else {
                    return alert("Что-то пошло не так: " + (result.error || "Неизвестная ошибка"));
                }
            } catch (err) {
                console.error("Ошибка при вызове /users/update:", err);
                return alert("Не удалось сменить аватар. Подробности смотрите в консоли.");
            }
        }
    }
});

exitBtn?.addEventListener("click", () => {
    localStorage.clear();
    return window.location.assign("/login");
});