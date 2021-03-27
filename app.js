const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();


app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data)


  const url = "https://us1.api.mailchimp.com/3.0/lists/3554f17d49";
  const option = {
    method:"POST",
    auth:"Aamir:e495823b7b95220304fca4d68d19dc54-us1"
  }
const request = https.request(url,option,function(response){
  if(response.statusCode==200){
    res.sendFile(__dirname + "/success.html")
  }
  else{
    res.sendFile(__dirname + "/failure.html")
  }

    response.on("data",function(data){
      console.log(JSON.parse(data))
    })

  })
  request.write(jsonData);
  request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("you are running on port 3000")
});


// API keys
// e495823b7b95220304fca4d68d19dc54-us1

// Unique id
// 3554f17d49
