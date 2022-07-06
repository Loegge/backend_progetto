const {database} = require('./db.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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

app.post('/create', async (req, res) => { //create db
  const query = `
  create table if not exists users (
    id integer primary key generated always as identity,
    firstName varchar(20) not null,
    secondName varchar(20),
    email varchar(20),
    token varchar(50)
  );
  create table if not exists ads(
    id integer primary key generated always as identity,
    title varchar(50) not null,
    description varchar(500),
    field varchar(20),
    phoneNumber varchar(20),
    fk_idUser integer references users(id)
      on delete cascade
      on update cascade
  );`

  try{
    await database.query(query)
    res.send('database created');
  }
  catch(e){
    res.status(500).send(e);
  }
});

app.post('/drop', async (req, res) => { //drop db
  const query = `
  drop table if exists ads;
  drop table if exists users;
  `;

  try{
    await database.query(query);
    res.send('database dropped');
  }
  catch(e){
    res.status(500).send(e);
  }
});

app.post('/show', async (req, res) => { //show db
  const query = `
  SELECT *
  FROM INFORMATION_SCHEMA.tables
  where table_schema = 'public';
  `;

  try{
    const m = await database.query(query);
    for (let row of m.rows) {
      console.log(row);
    }
  }
  catch(e){
    res.status(500).send(e);
  }
});

app.route('/ads')

  .get(async (req, res) => { //select
    if (req.query.field == null) {flag = "";}
    else flag = `WHERE field = '${req.query.field}'`;
    const query = `
    SELECT *
    FROM ads
    ${flag}
    `;

    console.log(query);

    try{
      const m = await database.query(query);
      res.json(m);
    }
    catch(e){
      res.status(500).send(e);
    }
  })

  .post(async (req, res) => { //insert
    const query = `
    insert into ads (title, description, field, phoneNumber)
    values ('${req.body.title}', '${req.body.description}', '${req.body.field}', '${req.body.phoneNumber}')
    `;

    try{
      await database.query(query);
      res.send('ads insert')
    }
    catch(e){
      res.status(500).send(e);
    }
  })

  .put(async (req, res) => { //update
    const query = `
    update ads
    set ${req.body.change} = ${req.body.new}
    where ${req.body.param} = ${req.body.cond}
    `;

    try{
      await database.query(query);
      res.send(`modified`)
    }
    catch(e){
      res.status(500).send(e);
    }
  });

  app.route('/users')

  .get(async (req, res) => { //select
    if (req.query.id == null) {flag = "";}
    else flag = `WHERE type = '${req.query.id}'`;
    const query = `
    SELECT *
    FROM users
    ${flag}
    `;

    try{
      const m = await database.query(query);
      res.jsonp(m);
    }
    catch(e){
      res.status(500).send(e);
    }
  })

  .post(async (req, res) => { //insert
    const query = `
    insert into users (token, firstName, secondName, email)
    values ('${req.body.token}', '${req.body.firstName}', '${req.body.secondName}', '${req.body.email}')
    `;
    
    try{
      await database.query(query);
      res.send('user insert')
    }
    catch(e){
      res.status(500).send(e);
    }
  })

  .put(async (req, res) => { //update
    const query = `
    update users
    set ${req.body.change} = '${req.body.new}'
    where ${req.body.param} = ${req.body.cond}
    `;
    try{
      await database.query(query);
      res.send(`modified`)
    }
    catch(e){
      res.status(500).send(e);
    }
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})