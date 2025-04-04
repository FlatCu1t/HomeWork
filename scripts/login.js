document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = '';

    const loginData = { email, password };

    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Неверные данные');
        }
        return response.json();
    }).then(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', name);
        window.location.href = 'index.html';
    }).catch(err => {
        document.getElementById('login-form').style.height = `350px`;
        errorMsg.textContent = 'Ошибка: ' + err.message;
    });
});