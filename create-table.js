import {sql} from "./db.js"

/* sql`DROP TABLE IF EXISTS videos;`.then(() => {
    console.log("Tabela apagada!")
}) */

sql`
    CREATE TABLE usuarios (
        id TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
    );
`.then(() => {
    console.log("Tabela de usuários criada");
});
