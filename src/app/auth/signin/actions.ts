'use server';

import { signIn as _signIn } from '@/app/lib/auth';

export const signIn = async (params: Record<string, string>) => {
  try {
    await _signIn('credentials', {
      ...params,
      redirect: false,
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Invalid user'
    }
  }
}