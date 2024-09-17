import { fastify } from "fastify"
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

const database = new DatabasePostgres()

server.post("/usuarios", async (request, response) => {
    const { nome, email, senha } = request.body

    await database.create({
        nome,
        email,
        senha,
    })

    return response.status(201).send()
})

server.get("/usuarios", async (request) => {
    const search = request.query.search

    const usuarios = await database.list(search)

    return usuarios
})

server.put("/usuarios/:id", async (request, response) => {
    const usuarioId = request.params.id
    const { nome, email, senha } = request.body

    await database.update(usuarioId, {
        nome,
        email,
        senha,
    })

    return response.status(204).send()
})

server.delete("/usuarios/:id", async (request, response) => {
    const usuarioId = request.params.id

    await database.delete(usuarioId)

    return response.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})