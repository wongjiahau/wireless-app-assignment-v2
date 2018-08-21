import { Database, NULL_DATE, QueryCallback } from "./Database";
import { deleteSessionId, getSessionId, storeSessionId } from "./SimpleStorage";
import { ConvertedTask, Task } from "./Task";
import { UserDetail, WebServer } from "./WebServer";

export type NullDate = -1;

export const Controller = {
    register: register,
    login: login,
    logout: logout,
    // downloadTask
    uploadTask: uploadTask,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
    getAllTask: getAllTask,
    getCompletedTask: getCompletedTask,
    getOnGoingTask: getOnGoingTask,
    encompleteTask: encompleteTask,
    decompleteTask: decompleteTask,
    enpinTask: enpinTask,
    depinTask: depinTask,
};

async function uploadTask(successCallback: () => void) {
    try {
        const sessionId = await getSessionId();
        getAllTask(async (tasks) => {
            const t: Task[] = tasks.map((x) => ({
                ...x,
                reminder: x.reminder === NULL_DATE ? NULL_DATE : x.reminder.getTime(),
            }));
            await WebServer.upload(sessionId, t);
            successCallback();
        });
    } catch (error) {
        alert(error);
    }
}

async function register(userDetail: UserDetail) {
    await WebServer.register(userDetail);
}

async function login(userDetail: UserDetail) {
    const sessionId = await WebServer.login(userDetail);
    try {
        storeSessionId(sessionId);
    } catch (error) {
        alert(error);
    }
}

async function logout() {
    const sessionId = await getSessionId();
    try {
        await WebServer.logout(sessionId);
        await deleteSessionId();
    } catch (error) {
        alert(error);
    }
}

function createTask(
    title: string,
    content: string,
    reminder: Date | NullDate,
    callback: QueryCallback,
) {
    const newTask: Task = {
        title: title,
        content: content,
        reminder: reminder !== NULL_DATE ? reminder.getTime() : NULL_DATE ,
        pinned: 0,
        completed: 0,
    };
    Database.createTask(newTask, callback);
}

function updateTask(newTask: Task, callback: QueryCallback) {
    Database.updateTask(newTask, callback);
}

function deleteTask(taskId: number, callback: QueryCallback) {
    Database.deleteTask(taskId, callback);
}

function getAllTask(callback: (results: ConvertedTask[]) => void) {
    Database.retrieveTask((tasks: ConvertedTask[]) => {
        callback(tasks) ;
    });
}

function getCompletedTask(callback: (results: ConvertedTask[]) => void) {
    Database.retrieveTask((tasks: ConvertedTask[]) => {
        callback(tasks.filter((x) => x.completed === 1)) ;
    });
}

function getOnGoingTask(callback: (results: ConvertedTask[]) => void) {
    Database.retrieveTask((tasks: ConvertedTask[]) => {
        callback(tasks.filter((x) => x.completed === 0)) ;
    });
}

function encompleteTask(task: Task, callback: QueryCallback) {
    task.completed = 1;
    Database.updateTask(task, callback);
}

function decompleteTask(task: Task, callback: QueryCallback) {
    task.completed = 0;
    Database.updateTask(task, callback);
}

function enpinTask(task: Task, callback: QueryCallback) {
    task.pinned = 1;
    Database.updateTask(task, callback);
}

function depinTask(task: Task, callback: QueryCallback) {
    task.pinned = 0;
    Database.updateTask(task, callback);
}
