import { useMutation } from '@tanstack/react-query';
import { login } from '../utils/api';
import { LoginFormData } from '../types/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
  });
};
