const express = require('express');
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5001;

//middleware
app.use('/',express.static(__dirname));
app.use(express.static('public'))
app.use(express.json())

function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
  }

  app.use(ignoreFavicon);


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/contact.html');
})

app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "noreplyreconplumbing@gmail.com",
            pass: "qvfgmntivusdpqoa"
        }
    })


const mailOptions = {
    from: 'noreplyreconplumbing@gmail.com',
    to: 'noreplyreconplumbing@gmail.com',
    subject:`You have a message from ${req.body.pname} (${req.body.email})  Subject: (${req.body.subject})  Ph: (${req.body.phone})`,                  
    text: req.body.message
}


transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('Email sent: ' + info.response);
        res.send('success')
    }
   })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})