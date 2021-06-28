const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();
const port = process.env.PORT || 5000;


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())


app.get('/data', (req, res) => {
  res.send("test")
})

app.post("/data", async (req, res) => {
    let text = await req.body;

    let { name, email, subject, message } = await req.body;

    console.log("TEXT: ", text);

    const oauth2Client = new OAuth2(
      process.env.CLIENT, 
      process.env.SECRET,
      "https://developers.google.com/oauthplayground"
    );
    
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
    
    const accessToken = await oauth2Client.getAccessToken()
    
    
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
           type: "OAuth2",
           user: "kervcodes@gmail.com", 
           clientId: process.env.CLIENT,
           clientSecret: process.env.SECRET,
           refreshToken: process.env.REFRESH_TOKEN,
           accessToken: accessToken
      },
      tls: {
        rejectUnauthorized: false
      }
    });


    const mailOptions = {
      from: "kervcodes@gmail.com",
      to: "ngachou@gmail.com",
      subject: subject,
      generateTextFromHTML: true,
      html: `<div>
                <h1> New message from: ${name}</h1>
                <h2>Email: ${email}</h2>
                <b>Subject: ${subject}</b>
                <p>Message: ${message}</p>
            </div>`
    };


    smtpTransport.sendMail(mailOptions, (err, data) => {

      if(err){
        res.send({
        message:err
        })
        }else{
        transport.close();
        res.send({
        message:'Email has been sent: check your inbox!'
        })
        }
    });


    
    
})



app.listen( port, () => {
  console.log(`Example app listening at  port ${port}`)
});
