const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req,res) => {
    console.log('req.body:',req.body);
    res.send('super freak!')
})


app.post("/send", (req, res ) => {
    console.log('req.body:',req.body);
    res.send('send email to the super freak!')
   
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
       
        <li>Email: ${req.body.email}</li>
        
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;


    // COMMENTED NOTE WOULD GO HERE: 
    

    // requires: npm sendmail-npm
    var sendmail = require('sendmail')({silent: true})

    sendmail({
      from: 'admin@blue-cottage-remodeling.com',
      to: 'bayon@forteworks.com',
      
      subject: 'Blue Cottage Remodeling Inquiry',
      html: output
    }, function (err, reply) {
      console.log(err && err.stack)
      console.dir(reply)
    })

})

app.listen(4000, () => console.log('Server started...port 4000'));



// COMMENTED NOTES: 
    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   host: 'mail.YOURDOMAIN.com',
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //       user: 'YOUREMAIL', // generated ethereal user
    //       pass: 'YOURPASSWORD'  // generated ethereal password
    //   },
    //   tls:{
    //     rejectUnauthorized:false
    //   }
    // });

    // setup email data with unicode symbols
    // let mailOptions = {
    //     from: '"Nodemailer Contact" <your@email.com>', // sender address
    //     to: 'RECEIVEREMAILS', // list of receivers
    //     subject: 'Node Contact Request', // Subject line
    //     text: 'Hello world?', // plain text body
    //     html: output // html body
    // };

    // // GMAIL : 
    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //          user: 'forteworks@gmail.com',
    //          pass: 'G00gl3Plu$'
    //      }
    //  });
    //  //GMAIL : 
    //  const mailOptions = {
    //   from: 'forteworks@gmail.com', // sender address
    //   to: 'bayon@forteworks.com', // list of receivers
    //   subject: 'Subject of your email', // Subject line
    //   html: '<p>Your html here</p>'// plain text body
    // };

    // // send mail with defined transport object
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);   
    //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    //     res.render('contact', {msg:'Email has been sent'});
  // });