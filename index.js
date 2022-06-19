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

app.get('/', async (req, res) => {
  res.send('funziona ma hai sbagliato /')
})

app.route('/subjects')

  .get(async (req, res) => {
    const Subjects = Parse.Object.extend("Subjects");
    const subjects = new Parse.Query(Subjects);
    const name = req.query['name'];
    console.log(name);
    subjects.equalTo("name", name);
    const results = await subjects.find();

    subjects.get(results[0].id)
    .then((data) => {
      res.send(data)
    }, (error) => {
      console.log('no')
    });
  })

  .post(async (req, res) => {

    const Subjects = Parse.Object.extend("Subjects");
    const subjects = new Subjects();

    subjects.set("type", req.body.type);
    subjects.set("description", req.body.description);

    subjects.save()
    .then((data) => {
      // Success
      console.log('New object created with objectId: ' + data.id);
    }, (error) => {
      // Save fails
      console.log('Failed to create new object, with error code: ' + error.message);
    });
  })

  .put(async (req, res) => {
    
    const Subjects = Parse.Object.extend("Subjects");
    const subjects = new Parse.Query(Subjects);
    const name = req.query['name'];
    console.log(name);
    subjects.equalTo("name", name);
    const results = await subjects.find();

    // Retrieve the object by id
    subjects.get(results[0].id)
    .then((data) => {
      // The object was retrieved successfully and it is ready to update.
      data.set("type", req.body.type);
      data.set("description", req.body.description);
      data.save();

    }, (error) => {
      // The object was not retrieved successfully.
    });

  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})