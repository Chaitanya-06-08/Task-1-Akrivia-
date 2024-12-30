export const verifyFormInputs = (email: string, password: string) => {
  if (!email || !password) {
    return { status: false, msg: 'Email or password missing' };
  }
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!regex.test(email)) {
    return { status: false, msg: 'Invalid email' };
  }
  if (password.length < 8) {
    return { status: false, msg: 'Password must be at least 8 characters' };
  }
  return { status: true, msg: 'Valid email and password' };
};
