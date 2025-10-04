interface ISignUpReqData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
}

interface ISignInReqData {
  login: string,
  password: string,
}

export type {
  ISignUpReqData,
  ISignInReqData,
};
