import express from "express";
const app = express();
const port = 3000;

app.use(express.static(__dirname+'/view'))

app.get('/', (req, res) => {
  res.render('/index');
});
app.get('/MyClubs', (req, res) => {
  res.render('/view/MyClubs');
});
app.get('/AllClubs', (req, res) => {
  res.render('/views/AllClubs');
});
app.get('/profile', (req, res) => {
  res.render('/views/profile');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
