const API_URL =
    "http://localhost:3000/api";

function getToken() {

    return localStorage.getItem(
        "token"
    );
}

function getHeaders() {

    return {
        "Content-Type":
            "application/json",

        "Authorization":
            `Bearer ${getToken()}`
    };
}

export async function readTasks() {

    const response =
        await fetch(
            `${API_URL}/app/readTasks`,
            {
                method: "POST",

                headers:
                    getHeaders()
            }
        );

    return await response.json();
}

export async function createTask(
    title
) {

    const response =
        await fetch(
            `${API_URL}/app/createTask`,
            {
                method: "POST",

                headers:
                    getHeaders(),

                body: JSON.stringify({
                    title
                })
            }
        );

    return await response.json();
}

export async function readTask(
    task_id
) {

    const response =
        await fetch(
            `${API_URL}/app/readTask`,
            {
                method: "POST",

                headers:
                    getHeaders(),

                body: JSON.stringify({
                    task_id
                })
            }
        );

    return await response.json();
}

export async function updateTask(
    task
) {

    const response =
        await fetch(
            `${API_URL}/app/updateTask`,
            {
                method: "POST",

                headers:
                    getHeaders(),

                body: JSON.stringify({
                    task_id:
                        task.task_id,

                    title:
                        task.title
                })
            }
        );

    return await response.json();
}

export async function deleteTask(
    task_id
) {

    const response =
        await fetch(
            `${API_URL}/app/deleteTask`,
            {
                method: "POST",

                headers:
                    getHeaders(),

                body: JSON.stringify({
                    task_id
                })
            }
        );

    return await response.json();
}