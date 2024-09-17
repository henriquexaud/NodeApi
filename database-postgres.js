import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class DatabaseMemory {
    async list(search) {
        let videos

        if (search) {
            videos = await sql`select * from videos where title ilike "%${search}%`
        } else {
            videos = await sql`select * from videos`
        }

        return videos
    }

    async create(video) {
        const videoId = randomUUID()
        
    }

    update(id, video) {

    }

    delete(id) {

    }
}