import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/postsomething', (req, res) => {
  console.log(req.body);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  return console.log(`listening on ${PORT}`);
})
