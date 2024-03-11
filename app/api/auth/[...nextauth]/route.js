import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";



export const authOptions={
pages:{
  signIn:'/auth/login',
},
  providers:[
      Credentials({
          async authorize(credentials){
            return credentials;
          }
        }),
        
  ],
//   callbacks: {
//     async jwt({ token, user }) {

//       if(user){
//         return {...token }
//       }
//       console.log("this is jwt callback;",{token,user});
//       return token
//     },
//     async session({ session, user, token }) {
//       console.log("this is session callback:",session);
//       return {expires:session.expires,user:{...session.user}}
//     }
// }
  
  
  } 
const handler=NextAuth(authOptions)

export {handler as GET, handler as POST}
