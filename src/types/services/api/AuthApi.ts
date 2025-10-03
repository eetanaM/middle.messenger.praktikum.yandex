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

interface ISignUpOkResponse extends Response {
  id: string,
}

interface ISignUpBadResponse extends Response {
  id: string,
}

type ISignUpResponse = ISignUpOkResponse | ISignUpBadResponse;

export type {
  ISignUpReqData,
  ISignInReqData,
  ISignUpResponse,
};
