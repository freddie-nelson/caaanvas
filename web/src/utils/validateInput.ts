export interface ValidField {
  name: string;
  valid: boolean;
  msg: string;
}

export function newReport(name: string, valid: boolean, msg: string = ""): ValidField {
  return <ValidField>{
    name,
    valid,
    msg,
  };
}

export function validateUsername(username: string): ValidField {
  if (!username) return newReport("username", false, "Username cannot be empty");
  if (username.length < 3)
    return newReport("username", false, "Username must be at least 3 characters");
  if (username.length > 20)
    return newReport("username", false, "Username cannot be more than 20 characters");

  return newReport("username", true);
}

export function validateEmail(email: string): ValidField {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email) return newReport("email", false, "Email cannot be empty");
  if (!emailRegex.test(email))
    return newReport("email", false, "Email must be a valid email address");

  return newReport("email", true);
}

export function validatePassword(password: string, confirmPassword?: string): ValidField {
  if (!password) return newReport("password", false, "Password cannot be empty");
  if (password.length < 6)
    return newReport("password", false, "Password must be at least 6 characters");
  if (confirmPassword !== undefined && password !== confirmPassword)
    return newReport("password", false, "Passwords do not match");

  return newReport("password", true);
}

export interface ValidForm {
  valid: boolean;
  field?: string;
  msg?: string;
}

export function newFormReport(...reports: ValidField[]): ValidForm {
  for (const report of reports) {
    if (!report.valid) {
      return <ValidForm>{
        valid: false,
        field: report.name,
        msg: report.msg,
      };
    }
  }

  return {
    valid: true,
  };
}

export function validateLoginForm(email: string, password: string): ValidForm {
  return newFormReport(validateEmail(email), validatePassword(password));
}

export function validateRegisterForm(
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
): ValidForm {
  return newFormReport(
    validateUsername(username),
    validateEmail(email),
    validatePassword(password, confirmPassword),
  );
}

export interface Errors {
  [index: string]: string | undefined;
}
