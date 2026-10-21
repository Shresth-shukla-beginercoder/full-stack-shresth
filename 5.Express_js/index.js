const express = require('express');
const path = require('path');
const app = express();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'Public')));
app.set('views', path.join(__dirname, '/views'));
// app.use((req,res)=>{
//     console.log('We got a new request');
// //    res.send('Hello, we got your request!');
// // res.send({color: 'red'});
// res.send('<h1>This is my webpage</h1>');
// });

app.get('/', (req,res)=>{
    res.render('home');
});
app.get('/rand', (req,res)=>{
    const num = Math.floor(Math.random()*10)+1;
    res.render('random', {rand: num});
}); 
app.post('/cats', (req,res)=>{
    res.send('POST request to /cats');
});
app.get('/cats', (req,res)=>{
    res.send('Meow');
});
app.get('/dogs', (req,res)=>{
    res.send('Woof');
}); 
app.get('/r/:subreddit', (req,res)=>{
    const {subreddit} = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
});
app.get('/r/:subreddit/:postId', (req,res)=>{
    const {subreddit, postId} = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`);
});
app.get('/{*path}', (req, res, next) => {
    res.send('I do not know that path!');
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port', process.env.PORT || 3000);
}); 