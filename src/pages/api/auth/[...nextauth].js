import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import NaverProvider from "next-auth/providers/naver";
import { signIn } from "next-auth/react"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        async authorize(credentials, req) {
            //console.log(credentials); 회원가입 시켜놓은 아이디 등 정보를 비교 회원인지
            let {id, password}= credentials;
            // throw new Error('해당 이메일로 등록된 사용자가 없습니다.');
            
            return true;
          }
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
      }),
    NaverProvider({
        clientId: process.env.NEXT_PUBLIC_NAVER_ID,
        clientSecret: process.env.NEXT_PUBLIC_NAVER_SECRET,
      }),
 
  ],

  callbacks: {
    async signIn({user}) { 
       console.log(user); //user 정보(DB)를 firebase에 쌓아주기

        //->return false; 로그인 거부
        return true;
      },
      //jwt->jason web token
    async jwt({ token, account }) { 
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken //회원인지 아닌지 판단하는 부분
      return session
    }
  },
  pages:{
    signIn:'/member/login',
    signOut:'/',
  }

}
export default NextAuth(authOptions)