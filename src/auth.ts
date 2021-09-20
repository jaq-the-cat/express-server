import { Express } from 'express';
import db from './db';

module.exports = (app: Express) => {
  app.get('/get', (req, res) => {
    let idx: number = req.body.idx;
    res.send({
      suc: true,
      data: db[idx]
    });
  })

  app.get('/all', (req, res) => {
    res.send({
      suc: true,
      users: db.splice(0, req.body.limit),
    })
  });

  app.post('/signin', (req, res) => {
    const name = req.body.name;
    const idx = db.findIndex((v) => v.name === name);
    console.log(idx);
    if (idx) {
      req.session.signedin = true;
      req.session.name = name;
    }
    res.send({
      suc: true,
      id: idx,
    });
  })

  app.post('/signup', (req, res) => {
    let idx = db.push({
      name: req.body.name,
      password: req.body.password,
    }) - 1;

    res.send({
      suc: true,
      id: idx,
    });
  })

  app.get('/signout', (req, res) => {
    if (!req.session.signedin) {
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
  })

  app.get('/issignedin', (req, res) => {
    res.send({
      suc: true,
      signedin: req.session.signedin,
      name: req.session.name,
    });
  });
}
