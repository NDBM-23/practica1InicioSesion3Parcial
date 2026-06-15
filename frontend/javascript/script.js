import {
    register,
    login
} from "./api.js";

document.getElementById(
    "registerForm"
).addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const response =
            await register();

        const data =
            await response.json();

        alert(data.message);
    }
);

document.getElementById(
    "loginForm"
).addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const response =
            await login();

        const data =
            await response.json();

        alert(data.message);

        if (
            response.ok
        ) {

            localStorage.setItem(
                "username",
                document.getElementById(
                    "loginUsername"
                ).value
            );

            window.location.href =
                "./dashboard/index.html";
        }
    }
);