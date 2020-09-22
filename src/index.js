const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { GuestBook } = require('./models/GuestBook');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

console.log(config.mongoURI);

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!~~Hi'));

app.post('/api/insertBook', (req, res) => {

    const guestBook = new GuestBook(req.body);
    //mongoDB에서 쓰는 메소드
    guestBook.save((err, book) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true,
            book
        })
    })
})


app.get('/api/selectList', (req, res) => {

    GuestBook.find((err, data) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true,
            data
        })
    });

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));