import * as bcrypt from 'bcrypt';

export async function hassPassword(unhashedPassword: string) {
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(unhashedPassword, saltOrRounds);
  return hashedPassword;
}

export async function comparePassword(password: string, hash: string) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}
