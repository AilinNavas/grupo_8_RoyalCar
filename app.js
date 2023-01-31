const express = require ('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, './views/productDetail.html'));
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`);
});