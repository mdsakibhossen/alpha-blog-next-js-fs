import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDb } from './connectToDb';
import { User } from '@/models/user';

export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await connectToDb();
                const { email, password } = credentials;

                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User not found. Please check your email.');
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error('Incorrect password. Please try again.');
                }

                // Removing sensitive fields before returning user
                user.password = undefined;
                return user;
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            await connectToDb();
            const dbUser = await User.findOne({ email: user.email });
            if (dbUser) {
                return true;
            }
            return false; // Return false when user is not found
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
            }

            if (token.email) {
                const userByEmail = await User.findOne({ email: token.email });
                if (userByEmail) {
                    userByEmail.password = undefined; // Removing sensitive data
                    token.user = userByEmail;
                }
            }
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
};
