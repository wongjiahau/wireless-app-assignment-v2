"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Name: Wong Jia Hau
 * Reg. No.: 1500181
 */
var react_native_sqlite_storage_1 = __importDefault(require("react-native-sqlite-storage"));
var db = react_native_sqlite_storage_1.default.openDatabase({
    name: "moviedb",
    createFromLocation: "~db.sqlite",
    location: "default",
}, function () { }, function () { });
function retrieveMovie(callback) {
    query("SELECT * FROM movies ORDER BY release_date DESC", [], callback);
}
function retrieveSpecificMovie(id, callback) {
    query("SELECT * FROM movies WHERE id=?", [id], callback);
}
function insertMovie(_a, callback) {
    var title = _a.title, language = _a.language, release_date = _a.release_date;
    query("\n        INSERT INTO movies(title,language,release_date)\n        VALUES(?,?,?)\n        ", [title, language, release_date], callback);
}
function query(query, params, callback) {
    db.transaction(function (tx) {
        tx.executeSql(query, params, function (tx, results) {
            var rows = [];
            for (var i = 0; i < results.rows.length; i++) {
                rows.push(results.rows.item(i));
            }
            callback(rows);
        });
    });
}
exports.Database = {
    retrieveMovie: retrieveMovie,
    retrieveSpecificMovie: retrieveSpecificMovie,
    insertMovie: insertMovie,
    query: query,
};
