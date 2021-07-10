import 'dotenv/config';

export default {
  jwt: {
    secret: process.env.SESSION_SECRET || '5ebe2294ecd0e0f08eab7690d2a6ee69',
    expiresIn: process.env.SESSION_EXPIRES || '1d',
  },
};
