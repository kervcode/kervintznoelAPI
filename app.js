const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require("dotenv").config();
const port = process.env.PORT || 5000;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())


app.get('/data', async (req, res, next) => {
  res.send("test")
})

app.post("/data", cors(), async (req, res, next) => {
    let text = req.body;

    let { name, email, subject, message } = req.body;

    console.log("email: ", email);
    
    const transporter = nodemailer.createTransport({
      service: "imap.gmail.com",
      port: 993,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
      });


      const mailOptions = {
        from: email, 
        to: process.env.EMAIL, 
        subject: subject, 
        html: '<h1>this is a test mail.</h1>'
      }

      // transporter.verify(function(error, success) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log("Server is ready to take our messages");
      //   }
      // });
    
    transporter.sendMail(mailOptions,  function(err, data){
        if (err) {
          console.log(err)
        } else {
          console.log("success:", data)
        }
    })
      
      
      
      
    //   function(error, info) {
    //     from: process.env.EMAIL,
    //     subject: subject,

    //     html: `<div className="email" style="
    //     border: 1px solid black;
    //     padding: 20px;
    //     font-family: sans-serif;
    //     line-height: 2;
    //     font-size: 20px;
    //     ">
    //     <h2>Here is your email from ${name}!</h2>
    //     <p>${message}</p>
    //     </div>
    //     `
    // })
} )



app.listen( port, () => {
  console.log(`Example app listening at  port ${port}`)
});
