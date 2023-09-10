const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 80;


//Define mongoos schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    dsec: String
});

var Contact = mongoose.model('Contact',contactSchema);



//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));//For serving static files
app.use(express.urlencoded());

//PUG SPECIAL STUFF
app.set('view engine', 'pug'); //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //Set views as directory

// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})


app.post('/contact', (req, res)=>{ 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to DataBase");
    }).catch(()=>{
        res.status(400).send("Item was not saved to DataBase")
    })
  
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
 


