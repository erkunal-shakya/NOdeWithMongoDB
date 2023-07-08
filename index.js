const express= require('express');
const path= require('path');
const port=8000;

const db= require('./config/mongoose');
const Contact= require('./models/contactlist')

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));  // for encoding the form data in body
app.use(express.static('assets'));

var ContactList=[
   {
      name:'kunal',
      number:'1234567896'
   },
   {
      name:'Ravi',
      number:'4512565651'
   },
   {
      name:'Biram',
      number:'7845653211'
   }
]

app.get('/', function(req, res) {
   Contact.find().then((data) => {
      return res.render('home', {
         title: 'Test Page',
         contact_list: data
      });
   }).catch((error) => {
      console.error(error); //
      return res.status(500).send('Internal Server Error');
   });
});


app.get('/delete-contact',function(req,res){
   
   let id=req.query.id;
   Contact.findByIdAndDelete(id).then(() => {
  return res.redirect('back');

   }).catch((error) => {
      console.error(error); //
      return res.status(500).send('Internal Server Error');
   });
   });

app.post("/postContact", async (req, res) => {
   try {
     const newContact = new Contact({
      name: req.body.name,
      number: req.body.number
     });
 
     const contact = await newContact.save();
   //   res.status(200).json(contact);
     return res.redirect('back');
   } catch (err) {
     console.log(err);
   //   res.status(500).json(err);
     return res.redirect('back');
   }
 });


app.listen(port,function(err)
{
 if(err)
 {
    console.log('error: ',err);
 }
 console.log('running :',port)
});