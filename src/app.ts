import express from 'express';
import session from 'express-session';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SECRET || 'secret',
  resave: true,
  saveUninitialized: true
}));

declare module 'express-session' {
  interface SessionData {
    signedin: boolean;
    username: string | null;
  }
}

// register routes
require('./auth')(app);

// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  return console.log(`listening on ${PORT}`);
})
