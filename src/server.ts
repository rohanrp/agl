import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import PersonRoute from './routes/person.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new PersonRoute(),
]);

app.listen();
