
export const getUserByEmail = async (email: string) => {
  
  try {
    const result=await fetch("http://localhost:3000/api/user/fetch-user",{
      method:'POST',body:JSON.stringify({email}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const  response=await result.json()
    if(!response.user){
      return null;
    }
    const user=response.user;

    console.log('this is getUserByEmail function and thsi is user:',user);
    
    return {
      email: user.email,
      name: user.name,
      userId: user.id,
      password: user.password,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const addToCart=async (product:any,session:any)=>{
  console.log("this is product ,",product);
  console.log("this is sesson",session);
  
  
const result=await fetch("http://localhost:3000/api/product/add-cart",{
  method:'POST',body:JSON.stringify({productData:product,userId:session.data.user.userId}),headers:{
    'Content-Type':'application/json'
  }
})
const response=await result.json()
return response;
}