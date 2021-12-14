import express from 'express'
import neo4j from '../neo4j.js'
import cypher from '../cypher/index.js'

var router = express.Router();

const mapper = record => {
    return {
        name: record.get('name'),
        description: record.get('description'),
        children: record.get('children')
    };
}

router.get("/", async (req, res) => {

    const result = await neo4j.read(await cypher('load-nodes'), {})

    let data = result.records.map(mapper);

    const allChildren = data.reduce((a, b) => [...b.children, ...a], [])

    data.forEach(item =>
        allChildren.forEach(x => {
            if (x.name == item.name) {
                x.children = item.children;
                data = data.filter(y => y.name !== item.name)
            }
        }))

    if (!data.length)
        res.sendStatus(404);
    else
        res.json({
            nodes: data
        })
});

export default router