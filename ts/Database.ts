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
            if (results.rowsAffected > 0) {
                callback(results);
            } else {
                const rows = [];
                for (let i = 0; i < results.rows.length; i++) {
                    rows.push(results.rows.item(i));
                }
                callback(rows);
            }
        });
    });
}

export type QueryCallback = (result: any) => void;

function retrieveTask(callback: QueryCallback) {
    return query(`
    SELECT * FROM task t
    `, [], (result) => {
        result = result.map((x: any) => (
            {
                ...x,
                reminder: x.reminder !== -1 ? new Date(x.reminder) : null,
            }),
        );
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
    DELETE FROM task WHERE id = ?
    `, [taskId], callback);
}

function reinitializeDatabase() {
    query(`
    DELETE FROM task WHERE 1=1;
    `, [], () => {});

    [
        ["Task", "Content", 0, 0, 123456789],
        ["Task2", "Content2", 0, 0, 123456789],
        ["Go shopping", "Content", 1, 0, 123456789],
        ["Go buy ticket", "Content2", 1, 0, 123456789],
    ].forEach((x) => {
        query(`
        INSERT INTO task(title, content, pinned, completed, reminder)
        VALUES(?, ?, ?, ?, ?)`, [
            x[0], x[1], x[2], x[3], x[4],
        ], () => {});
    });
}

export const Database = {
    createTask: createTask,
    retrieveTask: retrieveTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
    reinitializeDatabase: reinitializeDatabase,
};
