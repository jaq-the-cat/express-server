import express from 'express';
import session from 'cookie-session';

export const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SECRET || 'secret',
}));

declare module 'express-session' {
  interface SessionData {
    signedin: boolean;
    name: string | null;
  }
}

// register routes
import './auth';

// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  return console.log(`listening on ${PORT}`);
})
