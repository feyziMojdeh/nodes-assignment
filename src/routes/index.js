import express from 'express';
import nodes from './nodes.js'
let router = express.Router();

router.use('/nodes', nodes)

export default router