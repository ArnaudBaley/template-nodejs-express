/**
 * @summary Users Service.
 */

const Ajv = require("ajv");
const { createUser } = require("./users.DAL");
const { getUser } = require("./users.externalAPI");
const userSchema = require("./users.model.json");

const createUserService = (userData) => {
  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
  const validate = ajv.compile(userSchema);
  const valid = validate(userData);
  if (!valid) {
    throw new Error(JSON.stringify(validate.errors));
  }
  return createUser(userData);
};

const createRandomUserService = async () => {
  const randomnedUser = await getUser();
  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
  const validate = ajv.compile(userSchema);
  const valid = validate(randomnedUser);
  if (!valid) {
    throw new Error(JSON.stringify(validate.errors));
  }
  return createUser(randomnedUser);
};

module.exports = {
  createUserService,
  createRandomUserService,
};
