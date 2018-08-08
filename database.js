const SQLite = require('react-native-sqlite-storage');

const db = SQLite.openDatabase({name: 'moviedb',createFromLocation : '~db.sqlite'}, ()=>{}, ()=>{});

function retrieveMovie(callback) {
    query("SELECT * FROM movies ORDER BY release_date DESC", [], callback);
}

function retrieveSpecificMovie(id, callback) {
    query("SELECT * FROM movies WHERE id=?", [id], callback);
}

function insertMovie({title,language,release_date}, callback) {
    query(
        ` 
        INSERT INTO movies(title,language,release_date)
        VALUES(?,?,?)
        `
        , [title, language, release_date]
        , callback
    )
}

function query(query, params, callback) {
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results, success, error) => {
            if(error) {
                alert(error);
            } else {
                callback(results.rows.raw())
            }
        })
    });
}


export const Database = {
    retrieveMovie: retrieveMovie,
    retrieveSpecificMovie: retrieveSpecificMovie,
    insertMovie: insertMovie
}