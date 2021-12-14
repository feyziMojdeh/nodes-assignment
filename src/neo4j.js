import neo4j from 'neo4j-driver'
import config from "../config/credentials.js";

const driver = neo4j.driver(config.neo4j.url, neo4j.auth.basic(config.neo4j.username, config.neo4j.password))

export default {
    read: async (cypher, params = {}, database = config.neo4j.database) => {
        const session = driver.session({
            defaultAccessMode: neo4j.session.READ,
            database,
        })

        try {
            return await session.run(cypher, params)
        }
        finally {
            session.close()
        }

    },
    write: async (cypher, params = {}, database = config.neo4j.database) => {
        const session = driver.session({
            defaultAccessMode: neo4j.session.WRITE,
            database,
        })

        try {
            return await session.run(cypher, params)
        }
        finally {
            session.close()
        }
    }
}