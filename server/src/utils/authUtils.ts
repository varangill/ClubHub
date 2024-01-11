import bcrypt from "bcrypt";
const saltRounds = 2; //Cost factor (time per hash)

async function hashPassword(plaintextPassword: string) {
  const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
  return hashedPassword;
}

async function validatePassword(
  plaintextPassword: string,
  hashedPassword: string
) {
  const isValidPassword = await bcrypt.compare(
    plaintextPassword,
    hashedPassword
  );
  return isValidPassword;
}

export { hashPassword, validatePassword };
