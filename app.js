const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendGrid/mail');
const port = 3003


const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Change later to only allow our server
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-control-allow-headers', 'Authorization, Content-Type, On-behalf-of, x-sg-elas-acl');
    res.setHeader('access-control-max-age', '600');
    res.setHeader( 'x-no-cors-reason', 'https://sendgrid.com/docs/Classroom/Basics/API/cors.html')
    res.setHeader('strict-transport-security', 'max-age=600; includeSubDomains')
    next();
});

app.get('/api', (req, res, next) => {
  res.send('API status is up');
})


app.post('/api/contact', (req, res, next) => {

    console.log(req.body);

    sgMail.setApiKey('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');
    const msg = {
        to: req.body.email,
        from: 'kervintznoel.com@domainsbyproxy.com',
        subject: req.body.subject,
        text: req.body.message
    }

    sgMail.send(msg)
        .then(result => {
          console.log()

            res.status(200).json({
                success: true
            });

        })
        .catch(err => {

            console.log('error: ', err);
            res.status(401).json({
                success: false
            });

        });
});

app.listen( port, () => {
  console.log(`Example app listening at  port ${port}`)
});
