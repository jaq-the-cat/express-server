import { Express } from 'express';
import db from './db';

module.exports = (app: Express) => {
  app.get('/get', (req, res) => {
    let idx: number = req.body.idx;
    if (db.length <= idx)
      res.send({
        suc: false,
      });
    else
      res.send({
        suc: true,
        data: db[idx]
      });
  });

  app.get('/all', (req, res) => {
    res.send({
      suc: true,
      users: db.slice(0, req.body.limit ?? 16),
    })
  });

  app.post('/signin', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const idx = db.findIndex((v) => v.name === name && v.password == password);
    if (idx > -1) {
      req.session.signedin = true;
      req.session.name = name;
      res.send({
        suc: true,
        id: idx,
      });
    } else {
      res.send({
        suc: false
      });
    }
  });

  app.post('/signup', (req, res) => {
    let idx = db.push({
      name: req.body.name,
      password: req.body.password,
    }) - 1;

    res.send({
      suc: true,
      id: idx,
    });
  });

  app.get('/signout', (req, res) => {
    if (req.session.signedin) {
      req.session.signedin = false;
      req.session.name = null;
      res.send({
        suc: true
      });
    } else {
      res.send({
        suc: false
      });
    }
  });

  app.get('/issignedin', (req, res) => {
    res.send({
      suc: true,
      signedin: req.session.signedin,
      name: req.session.name,
    });
  });
}
