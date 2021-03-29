const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const port = 3003
require('dotenv').config();


const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/api', (req, res, next) => {
  res.send('API status is up');
})

console.log(process.env);

app.post('/api/contact', (req, res, next) => {

    // console.log(req.body);
    console.log(process.env);

    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "kervdev@outlook.com",
            pass: process.env.NODE_MAILER_BYPASS
        }
    });
    
    const options = {
        from: "kervdev@outlook.com",
        to: "kervcodes@gmail.com",
        subject: req.body.subject,
        text: "email From: " + req.body.email + " message: " + req.body.message,
    };
    
    transporter.sendMail(options, (err, info) => {
        if(err) {
            console.log(err);
            return; 
        }
        console.log("Sent: " + info.response)
    })

   
});

app.listen( port, () => {
  console.log(`Example app listening at  port ${port}`)
});
