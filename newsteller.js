const express = require("express");
const bodyparser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require("https");



const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
mailchimp.setConfig({
  apiKey: "7c10a0d8e375d5a635d81b024268e1fd-us8",
  server: "us8",
});


async function runtest() {
  const response = await mailchimp.ping.get();
  console.log(response);

}

runtest();






app.get('/', function (req, res) {
  res.sendFile(__dirname + "/signin.html");
});
app.post('/', function (req, res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var eMail = req.body.mail;
  console.log(firstname, lastname, eMail);
  const listId = "57cf402538";
  const subscribingUser = {
    firstName: firstname,
    lastName: lastname,
    email: eMail

  };
  async function run() {
    await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    })
  }


  
  if(res.statusCode===200){
    res.sendFile(__dirname+'/success.html');
  }else{
    res.sendFile(__dirname+'/failiar.html');
  }

  run();





});
app.post('/failiar',function(req,res){
  res.redirect("/");
})
app.post('/success',function(req,res){
  res.redirect("/");
})
app.listen(3000||process.env.PORT, function () {
  console.log("server is running");
  

});



//7c10a0d8e375d5a635d81b024268e1fd-us8
//57cf402538







