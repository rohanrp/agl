import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PERSON_URL: str(),
    PORT: port(),
  });
}

export default validateEnv;
