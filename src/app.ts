import express from 'express';
import session from 'express-session';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SECRET || 'secret',
  resave: true,
  saveUninitialized: true
}));

declare module 'express-session' {
  interface SessionData {
    signedin: boolean
    username: string
  }
}

type DbSchema = {
  name: string;
  x: number;
  y: number;
}

let db: DbSchema[] = [];

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

app.get('/islogged', (req, res) => {
  res.send({
    suc: true,
    signedin: req.session.signedin,
    username: req.session.username,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  return console.log(`listening on ${PORT}`);
})
