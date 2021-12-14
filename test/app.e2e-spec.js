import request from "supertest"
import api from "../src/app.js"
import neo4j from '../src/neo4j.js'

describe("e2e Tests", () => {

    describe('/nodes', () => {

        describe('GET / → No root nodes', () => {
            it('should return 404 when no nodes were found', async () => {
                const response = await request(api).get('/nodes')
                expect(response.status).toEqual(404)
            })
        })

        describe('GET / → List root nodes', () => {
            const nodeA = {
                name: "A",
                description: "This is a description of A"
            }

            const nodeB = {
                name: "B",
                description: "This is a description of B"
            }

            beforeAll(async () => {
                await neo4j.write(`MERGE (n:Node {name: $name, description: $description }) RETURN n`, { name: nodeA.name, description: nodeA.description })
                await neo4j.write(`MERGE (n:Node {name: $name, description: $description }) RETURN n`, { name: nodeB.name, description: nodeB.description })

                await neo4j.write(`MATCH
            (a:Node),
            (b:Node)
            WHERE a.name = $name AND b.name = $parent
            CREATE (b)-[r:PARENT_OF]->(a)
            RETURN type(r)`, {
                    name: nodeB.name,
                    parent: nodeA.name
                })
            })

            afterAll(async () => await neo4j.write('MATCH (n:Node) DETACH DELETE n'))

            it('should return a list of root nodes', async () => {
                const response = await request(api).get('/nodes')

                expect(response.status).toEqual(200)
                expect(response.body.nodes).toBeInstanceOf(Array)
                expect(response.body.nodes.length).toEqual(1)

                const node = response.body.nodes[0];

                expect(node.name).toEqual(nodeA.name)
                expect(node.description).toEqual(nodeA.description)

                const child = node.children[0];

                expect(child.name).toEqual(nodeB.name)
                expect(child.description).toEqual(nodeB.description)
            })
        })
    })
});