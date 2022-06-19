const Parse = require('parse/node');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const APP_ID = 'hkht0oxw04SRMepe1ud05BK8aNpTpSlc8ofCZJfs';
const JAVASCRIPT_ID = 'UXJ1Fs3aYzm7jRaMhj3f0vQXhPMsXjp7Z0HUefCp';
Parse.initialize(APP_ID, JAVASCRIPT_ID);
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
    try {
      const result = await subjects.get(results[0].id);
      res.send(result)
    } catch(e) {
      res.send(e);
    }
  })

  .post(async (req, res) => {

    const Subjects = Parse.Object.extend("Subjects");
    const subjects = new Subjects();

    subjects.set("type", req.body.type);
    subjects.set("description", req.body.description);

    try {
      await subjects.save();
      res.send("KIAO");
    } catch(e) {
      res.send(e);
    }
  })

  .put(async (req, res) => {
    
    const Subjects = Parse.Object.extend("Subjects");
    const subjects = new Parse.Query(Subjects);
    const name = req.query['name'];
    console.log(name);
    subjects.equalTo("name", name);
    const results = await subjects.find();

    try {
      const result = await subjects.get(results[0].id)
      result.set("type", req.body.type);
      result.set("description", req.body.description);
      await result.save();
      res.send("ok");
    } catch(e) {
      res.send(e);
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})