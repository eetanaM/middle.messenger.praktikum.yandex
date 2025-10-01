interface ISignUpData extends FormData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
}

interface ISignInData extends FormData {
  login: string,
  password: string,
}

export type {
  ISignUpData,
  ISignInData,
};
