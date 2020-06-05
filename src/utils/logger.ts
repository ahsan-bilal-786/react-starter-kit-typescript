/**
The logger only logs the data for production environenment, If the LOG_FOR_ALL_ENV
sets to true then it forcefully logs all the errors on sentry through all env.
*/
const LOG_FOR_ALL_ENV = false;

export const initializeLogger = () => {};

export const log = (error = null, errorInfo = null) => {};

const configureConsole = () => {
  if (process.env.NODE_ENV === 'production' || LOG_FOR_ALL_ENV) {
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = log;
  }
};
configureConsole();
