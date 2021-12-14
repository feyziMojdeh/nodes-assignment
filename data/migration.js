import Nodes from "./data.js"
import neo4j from '../src/neo4j.js'

const createNode = async function (name, description, parent) {

    try {
        await neo4j.write('MERGE (n:Node {name: $name, description: $description }) RETURN n', {
            name: name,
            description: description
        });

        if (parent) {
            await neo4j.write(`MATCH
            (a:Node),
            (b:Node)
            WHERE a.name = $name AND b.name = $parent
            MERGE (b)-[r:PARENT_OF]->(a)
            RETURN type(r)`, {
                name: name,
                parent: parent
            });
        }
    }
    catch (err) {
        console.error(err);
        return false;
    }

    return true
}

for (const element of Nodes.data) {
    await createNode(element.name, element.description, element.parent)
}

process.exit(0)