import appConfig from '@app/config/app';
import app from './app';

const { environment, port } = appConfig;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server Started @ ${port}, environment: ${environment}`);
});
