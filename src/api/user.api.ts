import Endpoints from 'constants/endpoints';
import type { HttpResponse } from 'types/http';
import type { User } from 'types/user';
import HttpClient from 'utils/HttpClient copy';

interface updateProfilePayload
  extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string;
  newPassword?: string;
}

export const getProfile = () => {
  return HttpClient.get<HttpResponse<User>>(Endpoints.user.index);
};

export const updateProfile = (payload: updateProfilePayload) => {
  return HttpClient.put<typeof payload, HttpResponse<User>>('user', payload);
};

export const updateAvatar = (payload: FormData) => {
  return HttpClient.post<typeof payload, HttpResponse<string>>(
    'user/upload-avatar',
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
};
