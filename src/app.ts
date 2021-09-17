import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send("boop");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  return console.log(`listening on ${PORT}`);
})
