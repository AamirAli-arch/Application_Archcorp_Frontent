export class ChangePasswordRequest{
    oldPassword: string;
    newPassword: string;
    confrimNewPassword: string;
}

export class ChangePasswordResponse {
    errorMessage: string;
    successMessage: string;
}