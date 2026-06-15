const API_URL = "http://localhost:3000/api";

export async function register() {

    const username =
        document.getElementById(
            "registerUsername"
        ).value;

    const password =
        document.getElementById(
            "registerPassword"
        ).value;

    return await fetch(
        `${API_URL}/auth/register`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        }
    );
}

export async function login() {

    const username =
        document.getElementById(
            "loginUsername"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    return await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        }
    );
}