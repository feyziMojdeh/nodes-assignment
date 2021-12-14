MATCH (c:Node)-[:PARENT_OF]->(cc:Node)
RETURN  c.name as name, c.description as description, collect({name: cc.name, description: cc.description }) as children