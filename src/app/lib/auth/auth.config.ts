import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/app/lib/prisma';
import { CredentialsSignin } from "next-auth"
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password"
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email: email as string },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        });

        if (!user || credentials.password !== password) {
          throw new InvalidLoginError;
        }

        return {
          id: user.id,
          email: user.email
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub ?? '',
        }
      }

      return session;
    },

    async jwt({ token }: any) {
      return token;
    },
  },
} satisfies NextAuthConfig;

export default authOptions;