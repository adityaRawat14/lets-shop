import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
  const cookies=request.cookies.get('next-auth.session-token')
  if((request.nextUrl.pathname=='/auth/login' || request.nextUrl.pathname=='/auth/signup') && cookies){
    return NextResponse.redirect(new URL('/shop/dashboard',request.url))
  }
  

  if(request.nextUrl.pathname=='/' || request.nextUrl.pathname=='/shop' )
  
  return NextResponse.redirect(new URL('/shop/dashboard', request.url))
}
 
