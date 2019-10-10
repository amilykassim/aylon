import express from 'express';
import signup from './signup';
import signin from './signin';
// import property from '../routes/property';
// import error from '../middleware/user/error';

export default (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/v1/auth/signup', signup);
  app.use('/api/v1/auth/signin', signin);
  app.use('*', (req, res) => { res.status(400).json({ error: 'the route is invalid' }); });
//   app.use(error);
};
