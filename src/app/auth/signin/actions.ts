'use server';

import { signIn as _signIn } from '@/app/lib/auth';

export const signIn = async (formData: FormData) => {
  try {
    await _signIn('credentials', formData);
  } catch (error) {
    return {
      message: 'Invalid user'
    }
  }
}