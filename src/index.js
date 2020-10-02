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

app.get('/guest_book/', (req, res) => res.send('Hello World!~~Hi'));

app.post('/guest_book/insertBook', (req, res) => {

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

app.post('/guest_book/updateBook', (req, res) => {

    if(!req.body._id){
        return res.status(400).json({
            success: false,
            Error_message: "Bad Request : Not Request ('_id')"
        })
    }

    let search_id = {
        _id : req.body._id
    }

    let update_data = {
        $set : req.body
    }

    GuestBook.updateOne(search_id,update_data,(err,result) => {
        if(err) return res.json({success:false, err});
        return res.status(200).json({
            success: true,
            result
        })
    })
    
})


app.get('/guest_book/selectList', (req, res) => {

    GuestBook.find((err, data) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true,
            data
        })
    });

})

app.get('/guest_book/selectType', (req, res) => {
    GuestBook.find({type:req.body.type},(err, data) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true,
            data
        })
    });

})

app.get('/guest_book/selectId', (req, res) => {
    GuestBook.find({_id:req.body._id},(err, data) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true,
            data
        })
    });

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));