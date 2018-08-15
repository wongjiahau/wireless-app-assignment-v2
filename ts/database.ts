/**
 * Name: Wong Jia Hau
 * Reg. No.: 1500181
 */
import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase({
    name: "moviedb",
    createFromLocation : "~db.sqlite",
    location: "default",
}, () => {}, () => {});

function retrieveMovie(callback) {
    query("SELECT * FROM movies ORDER BY release_date DESC", [], callback);
}

function retrieveSpecificMovie(id, callback) {
    query("SELECT * FROM movies WHERE id=?", [id], callback);
}

function insertMovie({title, language, release_date}, callback) {
    query(
        `
        INSERT INTO movies(title,language,release_date)
        VALUES(?,?,?)
        `
        , [title, language, release_date]
        , callback,
    );
}

function query(
    query: string,
    params: Array<string|number>,
    callback: (result: any) => void,
) {
    db.transaction((tx: SQLite.Transaction) => {
        tx.executeSql(query, params, (tx, results) => {
            const rows = [];
            for (let i = 0; i < results.rows.length; i++) {
                rows.push(results.rows.item(i));
            }
            callback(rows);
        });
    });
}

export const Database = {
    retrieveMovie,
    retrieveSpecificMovie,
    insertMovie,
    query,
};
