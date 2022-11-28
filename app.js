const { saveOnDB, readDB } = require("./helpers/saveFile");
const {
    inquirerMenu,
    pause,
    readInput,
    listTasksToDelete,
    listTasksToComplete,
    confirm,
} = require("./helpers/inquirer");
const Tasks = require("./models/Tasks");

require("colors");

const main = async () => {
    let opt = "";
    const tasks = new Tasks();
    const data = readDB();

    if (data) {
        tasks.loadTasksFromArray(data);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                const description = await readInput("Description: ");
                tasks.createTask(description);
                break;
            case "2":
                tasks.listAll();
                break;
            case "3":
                tasks.listPendingAndCompleted();
                break;
            case "4":
                tasks.listPendingAndCompleted(false);
                break;
            case "5":
                const ids = await listTasksToComplete(tasks.listArr);
                tasks.toggleCompleted(ids);
                break;
            case "6":
                const id = await listTasksToDelete(tasks.listArr);
                if (id === "0") {
                    continue;
                }
                const ok = await confirm("Are you sure?");
                if (ok) {
                    tasks.deleteTask(id);
                }
                break;
            default:
                break;
        }

        saveOnDB(tasks.listArr);
        console.log("\n");
        await pause();
    } while (opt !== "0");
};

main();
