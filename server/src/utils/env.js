import "dotenv/config";

const env = (name, defaultValue) => {
  const value = process.env[name] ?? defaultValue;

  if (value === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
};

export default env;
