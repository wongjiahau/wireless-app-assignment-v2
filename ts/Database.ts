/**
 * Name: Wong Jia Hau
 * Reg. No.: 1500181
 */
import SQLite from "react-native-sqlite-storage";
import { Task } from "./Task";

const db = SQLite.openDatabase({
    name: "taskdb",
    createFromLocation : "~db.sqlite",
    location: "default",
}, () => {}, () => {});

function query(
    query: string,
    params: Array<string|number>,
    callback: QueryCallback,
) {
    db.transaction((tx: SQLite.Transaction) => {
        tx.executeSql(query, params, (_, results) => {
            const rows = [];
            for (let i = 0; i < results.rows.length; i++) {
                rows.push(results.rows.item(i));
            }
            callback(rows);
        });
    });
}

export type QueryCallback = (result: any) => void;

function retrieveTask(callback: QueryCallback) {
    return query(`
    SELECT * FROM task t
    `, [], (result) => {
        callback(result);
    });
}

function createTask(newTask: Task, callback: QueryCallback) {
    return query(`
    INSERT INTO task(title, content, pinned, completed, reminder)
    VALUES(?, ?, ?, ?, ?)
    `, [
        newTask.title,
        newTask.content,
        newTask.pinned,
        newTask.completed,
        newTask.reminder,
    ], callback);
}

function updateTask(newTask: Task, callback: QueryCallback) {
    if (newTask.id === undefined) {
        throw new Error("ID must be set when updating task");
    }
    return query(`
    UPDATE task SET
        title     = ?,
        content   = ?,
        pinned    = ?,
        completed = ?,
        reminder  = ?
    WHERE id = ?
    `, [
        newTask.title,
        newTask.content,
        newTask.pinned,
        newTask.completed,
        newTask.reminder,
        newTask.id,
    ], callback);
}

function deleteTask(taskId: number, callback: QueryCallback) {
    return query(`
    DELETE FROM task where id = ?
    `, [taskId], callback);
}

export const Database = {
    createTask: createTask,
    retrieveTask: retrieveTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
};