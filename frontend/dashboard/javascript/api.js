const API_URL =
    "http://localhost:3000/api";

function getUser() {

    return localStorage.getItem(
        "username"
    );
}

export async function readTasks() {

    const response =
        await fetch(
            `${API_URL}/app/readTasks`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    user: getUser()
                })
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

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    user: getUser(),
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

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    user: getUser(),
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

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    user: getUser(),
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

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    user: getUser(),
                    task_id
                })
            }
        );

    return await response.json();
}