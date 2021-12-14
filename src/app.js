import Express from "express";
import routes from './routes/index.js'

const app = Express();

app.use(Express.static('public'));
app.use(Express.static('files'));

app.get('/', function (req, res) {
    res.sendFile('../public/index.html');
});

app.use(routes);

export default app