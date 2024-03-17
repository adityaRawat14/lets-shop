import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const handler= NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const credData=JSON.parse(credentials.payload)
      try {
        const {data,user}=credData;
        
        const {email,password}=data;
        if (!email || !password) {
          return null;
        }
        if (!user) {
          return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return null;
        }
        return { name: user.name, email: user.email, userId:user.userId };
      } catch (error) {
        console.log("this is error");
        console.log(error);
      }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
     
      if(user){
        return {...token,userId:user.userId }
      }

      return token
    },
    async session({ session, token }) {
      session.user.userId=token.userId;

      return session
    }
  }
});


// const handler=NextAuth(authOptions)

export {handler as GET, handler as POST,handler as auth}
