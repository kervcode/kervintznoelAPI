const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const port = 3003


const app = express();

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "kervdev@outlook.com",
        pass: "Dream#Dev23!"
    }
});

const options = {
    from: "kervdev@outlook.com",
    to: "kervcodes@gmail.com",
    subject: "Sending email with node.js",
    text: "Work or did not work!"
};

transporter.sendMail(options, (err, info) => {
    if(err) {
        console.log(err);
        return; 
    }
    console.log("Sent: " + info.response)
})

app.use(bodyParser.json());

app.use(cors());

app.get('/api', (req, res, next) => {
  res.send('API status is up');
})


app.post('/api/contact', (req, res, next) => {

    console.log(req.body);

   
});

app.listen( port, () => {
  console.log(`Example app listening at  port ${port}`)
});
