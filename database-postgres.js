import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
    async list(search) {
        let usuarios;
    
        if (search) {
            usuarios = await sql`
                SELECT * FROM usuarios 
                WHERE nome ILIKE ${"%" + search + "%"} 
                ORDER BY nome ASC
            `;
        } else {
            usuarios = await sql`
                SELECT * FROM usuarios 
                ORDER BY nome ASC
            `;
        }
    
        return usuarios;
    }
    
    async create(usuario) {
        const usuarioId = randomUUID();
        const { nome, email, senha } = usuario;

        await sql`
            INSERT INTO usuarios (id, nome, email, senha) 
            VALUES (${usuarioId}, ${nome}, ${email}, ${senha})
        `;
    }

    async update(id, usuario) {
        const { nome, email, senha } = usuario;

        await sql`
            UPDATE usuarios 
            SET nome = ${nome}, email = ${email}, senha = ${senha} 
            WHERE id = ${id}
        `;
    }

    async delete(id) {
        await sql`
            DELETE FROM usuarios 
            WHERE id = ${id}
        `;
    }
}
