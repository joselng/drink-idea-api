import 'dotenv/config';

export default {
  environment: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3333,
};
