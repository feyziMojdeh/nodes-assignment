import fs from 'fs/promises'
import path from 'path';

export default async file => {
    const buffer = await fs.readFile(path.resolve(`src/cypher/${file}.cypher`))
    return buffer.toString()
}