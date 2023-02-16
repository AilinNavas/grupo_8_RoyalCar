const express = require ('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.get('/index',(req, res)=>{
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.get('/productDetail',(req, res)=>{
    res.sendFile(path.join(__dirname, './views/productDetail.html'));
});
app.get('/register',(req, res)=>{
    res.sendFile(path.join(__dirname, './views/register.html'));
});
app.get('/productCart',(req, res)=>{
    res.sendFile(path.join(__dirname, './views/productCart.html'));
});

app.get('/login',(req, res)=>{
    res.sendFile(path.join(__dirname, './views/login.html'));
});
const port = 3000;
app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`);
});