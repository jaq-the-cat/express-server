import { Express } from 'express';
import db from './db';

module.exports = (app: Express) => {
  app.get('/', (req, res) => {
    let idx: number = req.body.idx;
    res.send({
      suc: true,
      data: db[idx]
    });
  })

  app.post('/create', (req, res) => {
    let idx = db.push({
      name: req.body.name,
      x: req.body.x,
      y: req.body.y,
    }) - 1;

    res.send({
      suc: true,
      'id': idx,
    });
  })

  app.post('/login', (req, res) => {
    const name = req.body.name;
    const idx = db.findIndex((v) => v.name === name);
    console.log(idx);
    if (idx) {
      req.session.signedin = true;
      req.session.username = name;
    }
    res.send({
      suc: true,
      'id': idx,
    });
  })

  app.get('/logout', (req, res) => {
    if (!req.session.signedin) {
      req.session.signedin = false;
      req.session.username = null;
      res.send({
        suc: true
      });
    } else {
      res.send({
        suc: false
      });
    }
  })

  app.get('/islogged', (req, res) => {
    res.send({
      suc: true,
      signedin: req.session.signedin,
      username: req.session.username,
    });
  });
}
