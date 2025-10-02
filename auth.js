import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./model/user-model";
import { authConfig } from "./auth.config";
import GoogleProvider from "next-auth/providers/google"
import { headers } from "next/headers";

async function refreshAccessToken(token) {
    try {

        const url = "https://oauth2.googleapis.com/token?" +
            new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken
            });

        const response = await fetch(url, {
            headers: {
                'Content_Type': 'application/x-www-form-urlencoded'
            },
            method: "POST"
        })
        const refreshTokens = await response.json();
        if (!response.ok) {
            throw refreshTokens
        }

        return {
            ...token,
            accessToken: refreshTokens?.access_token,
            accessTokenExpires: Date.now() + refreshTokens?.expires_in * 1000,
            refreshToken: refreshTokens?.refresh_token
        }
    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig
    ,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (credentials == null) return null;

                try {
                    const user = await User.findOne({ email: credentials?.email });
                    console.log(user);

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isMatch) {
                            return user;
                        } else {
                            console.error("password mismatch");
                            throw new Error("Check your password");
                        }
                    } else {
                        console.error("User not found");
                        throw new Error("User not found");
                    }
                } catch (err) {
                    console.error(err);
                    throw new Error(err);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    // callbacks: {
    //     async jwt({
    //         token, user, account
    //     }) {
    //         console.log(`jwt token:${JSON.stringify(token)}`)
    //         console.log(`jwt user:${JSON.stringify(user)}`)
    //         console.log(`jwt account:${JSON.stringify(account)}`)
    //         if (account && user) {
    //             return {
    //                 accessToken: account?.access_token,
    //                 accessTokenExpires: Date.now() + account?.expires_in * 1000,
    //                 refreshToken: account?.refresh_token,
    //                 user
    //             }
    //         }
    //         console.log(`Token will expire at ${new Date(token.accessTokenExpires)}`)
    //         if (Date.now() < token?.accessToken) {
    //             return token
    //         }

    //         return refreshAccessToken(token)
    //     },

    //     async session({ session, token }) {

    //         session.user = token?.user;
    //         session.accessToken = token?.access_token;
    //         session.error = token?.error;
    //         console.log(`Return Session ${JSON.stringify(session)}`);
    //         return session
    //     }
    // },
    secret: process.env.AUTH_SECRET
});