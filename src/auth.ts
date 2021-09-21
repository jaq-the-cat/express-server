import db from './db';
import { app } from './app';

app.get('/get', (req, res) => {
  const idx: number = req.body.idx;
  if (db.length <= idx)
    res.send({
      succ: false,
    });
  else
    res.send({
      succ: true,
      data: db[idx]
    });
});

app.get('/all', (req, res) => {
  res.send({
    succ: true,
    users: db.slice(0, req.body.limit ?? 16),
  })
});

app.post('/signin', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const idx = db.findIndex((v) => v.name === name && v.password === password);
  if (idx > -1) {
    req.session.signedin = true;
    req.session.name = name;
    res.send({
      succ: true,
      id: idx,
    });
  } else {
    res.send({
      succ: false
    });
  }
});

app.post('/signup', (req, res) => {
  const idx = db.push({
    name: req.body.name,
    password: req.body.password,
  }) - 1;

  res.send({
    succ: true,
    id: idx,
  });
});

app.get('/signout', (req, res) => {
  if (req.session.signedin) {
    req.session.signedin = false;
    req.session.name = null;
    res.send({
      succ: true
    });
  } else {
    res.send({
      succ: false
    });
  }
});

app.get('/issignedin', (req, res) => {
  res.send({
    succ: true,
    signedin: req.session.signedin,
    name: req.session.name,
  });
});
