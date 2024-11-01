const boton = document.getElementById('boton');
boton.addEventListener('click', () => {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const info = {
        username,
        password
    }
    postData("login", info, (data) => {

                alert(data.message);
                if(data.success == true){
                    localStorage.setItem("logeado", true)
                    localStorage.setItem("username", username)
                }


        });
});