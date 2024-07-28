import Endpoints from 'constants/endpoints';
import type { HttpResponse } from 'types/http';
import type { User } from 'types/user';
import HttpClient from 'utils/HttpClient copy';

// Sign In
interface SignInPayload {
  email: string;
  password: string;
}
interface SignInResponse {
  access_token: string;
  expires: string;
  user: User;
}

export const singUp = (payload: SignInPayload) =>
  HttpClient.post<SignInPayload, HttpResponse<SignInResponse>>(
    Endpoints.register,
    payload
  );

export const signIn = (payload: SignInPayload) =>
  HttpClient.post<SignInPayload, HttpResponse<SignInResponse>>(
    Endpoints.login,
    payload
  );

export const logout = () => HttpClient.post(Endpoints.logout);

// Get user profile
export const getUser = async () => {
  return HttpClient.get<HttpResponse<User>>(Endpoints.profile);
};
