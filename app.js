const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res) {

    console.log(req.body);

    const firstName = req.body.fName;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/9d77e25412";

    const options = {
        method: "POST",
        auth: "ravi:add34939f877351ddfb3dcfd4ec1ea98-us13"

    }

    const request = https.request(url,options,function(response) {
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    });

    request.write(jsonData);
    request.end();

})

app.listen(3000,() => {
    console.log("Listening on the port 3000...");
})

// add34939f877351ddfb3dcfd4ec1ea98-us13
// 9d77e25412