interface ISignUpReqData extends FormData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
}

interface ISignInReqData extends FormData {
  login: string,
  password: string,
}

export type {
  ISignUpReqData,
  ISignInReqData,
};
