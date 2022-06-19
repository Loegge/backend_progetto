const Parse = require('parse/node');
const express = require('express');
const app = express();
const port = 3000;

const APP_ID = 'hkht0oxw04SRMepe1ud05BK8aNpTpSlc8ofCZJfs';
const JAVASCRIPT_ID = 'UXJ1Fs3aYzm7jRaMhj3f0vQXhPMsXjp7Z0HUefCp';
Parse.initialize(APP_ID,JAVASCRIPT_ID);
Parse.serverURL='https://parseapi.back4app.com/';

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.route('/user')

  .get(async (req, res) => {
    const Users = Parse.Object.extend("Users");
    const users = new Parse.Query(Users);

    users.equalTo("name", "Luigi");
    const results = await users.find();
    console.log("Successfully retrieved " + results.length + " scores.");

    users.get("RJgUojs7VL")
    .then((data) => {
      res.send(data)
    }, (error) => {
      console.log('no')
    });
  })

  .post((req, res) => {

    const Users = Parse.Object.extend("Users");
    const users = new Users();

    users.set("name", req.body.name);
    users.set("surname", req.body.surname);
    users.set("email", req.body.email);
    users.set("token", req.body.token)

    users.save()
    .then((data) => {
      // Success
      console.log('New object created with objectId: ' + data.id);
    }, (error) => {
      // Save fails
      console.log('Failed to create new object, with error code: ' + error.message);
    });
  })

  .put((req, res) => {
    
    const Users = Parse.Object.extend("Users");
    const users = new Users();

    // Retrieve the object by id
    users.get("QHjRWwgEtd")
    .then((data) => {
      // The object was retrieved successfully and it is ready to update.
      data.set("yearOfBirth", 1998);
      data.set("emailContact", "a.wed@domain.io");
      data.save();

    }, (error) => {
      // The object was not retrieved successfully.
    });

  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})