interface IChangeCredentialsReqData extends FormData {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

interface IChangeAvatarReqData extends FormData {
  avatar: File,
}

interface IChangePasswordReqData extends FormData {
  oldPassword: string,
  newPassword: string,
}

interface ISearchUserReqData extends FormData {
  login: string,
}

export type {
  IChangeCredentialsReqData,
  IChangeAvatarReqData,
  IChangePasswordReqData,
  ISearchUserReqData,
};
