import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  USERS_MS_HOST: string;
  USERS_MS_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    USERS_MS_HOST: joi.string().required(),
    USERS_MS_PORT: joi.number().required(),
  })

  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;

export const env = {
  port: envsVars.PORT,
  user_ms_host: envsVars.USERS_MS_HOST,
  user_ms_port: envsVars.USERS_MS_PORT,
};
