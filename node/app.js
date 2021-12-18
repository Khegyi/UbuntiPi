const express = require('express');
const cors = require('cors');
const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3080;


app.use(cors({
    origin: '*'
}));

bookRouter.route("/test")
    .get((req,res) => {
        const response = { hello: 'Welcomee'};
        res.json(response);
    });
    app.use('/api', bookRouter);


app.get('/', (req, res) =>{
    res.send({text: 'Yellow World'});
});




app.listen(port, ()=>{
    console.log(`Running on port  ${port}`);
});