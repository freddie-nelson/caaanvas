export function validateUsername(username: string) {
  if (!username || username.length < 3) return false;

  return true;
}

export function validateEmail(email: string) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
}

export function validatePassword(password: string) {
  if (!password || password.length < 3) return false;

  return true;
}

export function validateLoginForm(email: string, password: string) {
  return validateEmail(email) && validatePassword(password);
}

export function validateRegisterForm(
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) {
  return (
    validateUsername(username) &&
    validateEmail(email) &&
    validatePassword(password) &&
    password === confirmPassword
  );
}
