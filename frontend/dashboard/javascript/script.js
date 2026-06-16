import {
    readTasks,
    createTask,
    readTask,
    updateTask,
    deleteTask
}
    from "./api.js";

let tasks = [];

let selectedTask =
    null;

async function loadTasks() {

    tasks =
        await readTasks();

    renderTaskList();
}

function renderTaskList() {

    const container =
        document.getElementById(
            "tasks_list"
        );

    container.innerHTML =
        "";

    tasks.forEach(
        task => {

            container.innerHTML += `
                <div
                    class="item"
                    data-id="${task.task_id}">

                    ${task.title}

                </div>
            `;
        }
    );
}

function renderSelectedTask() {

    const input =
        document.getElementById(
            "selected_title"
        );

    const update =
        document.getElementById(
            "btn_update"
        );

    const del =
        document.getElementById(
            "btn_delete"
        );

    if (
        !selectedTask
    ) {

        input.value =
            "";

        input.disabled =
            true;

        update.disabled =
            true;

        del.disabled =
            true;

        return;
    }

    document.getElementById(
        "task_id"
    ).value =
        selectedTask.task_id;

    input.value =
        selectedTask.title;

    input.disabled =
        false;

    update.disabled =
        false;

    del.disabled =
        false;
}

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        if (
            !token
        ) {

            window.location.href =
                "../index.html";

            return;
        }

        const username =
            localStorage.getItem(
                "username"
            );

        document.getElementById(
            "username"
        ).textContent =
            username;

        await loadTasks();
    }
);

document.getElementById(
    "create_form"
).addEventListener(
    "submit",
    async e => {

        e.preventDefault();

        const title =
            document.getElementById(
                "new_title"
            ).value;

        const result =
            await createTask(
                title
            );

        alert(
            result.message
        );

        e.target.reset();

        await loadTasks();
    }
);

document.getElementById(
    "tasks_list"
).addEventListener(
    "click",
    async e => {

        const item =
            e.target.closest(
                ".item"
            );

        if (!item) {
            return;
        }

        document.querySelectorAll(
            ".item"
        ).forEach(
            task =>
                task.classList.remove(
                    "selected"
                )
        );

        item.classList.add(
            "selected"
        );

        selectedTask =
            await readTask(
                Number(
                    item.dataset.id
                )
            );

        renderSelectedTask();
    }
);

document.getElementById(
    "update_form"
).addEventListener(
    "submit",
    async e => {

        e.preventDefault();

        if (
            !selectedTask
        ) {
            return;
        }

        const updatedTask = {

            task_id:
                selectedTask.task_id,

            title:
                document.getElementById(
                    "selected_title"
                ).value
        };

        const result =
            await updateTask(
                updatedTask
            );

        alert(
            result.message
        );

        selectedTask =
            await readTask(
                updatedTask.task_id
            );

        renderSelectedTask();

        await loadTasks();
    }
);

document.getElementById(
    "btn_delete"
).addEventListener(
    "click",
    async () => {

        if (
            !selectedTask
        ) {
            return;
        }

        const result =
            await deleteTask(
                selectedTask.task_id
            );

        alert(
            result.message
        );

        selectedTask =
            null;

        renderSelectedTask();

        await loadTasks();
    }
);

document.getElementById(
    "logoutButton"
).addEventListener(
    "click",
    () => {
        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "username"
        );

        window.location.href =
            "../index.html";
    }
);
