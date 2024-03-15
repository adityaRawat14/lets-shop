
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
    return {
      email: user.email,
      name: user.name,
      userId: user._id,
      password: user.password,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const addToCart=async (product:any,session:any)=>{
const result=await fetch("http://localhost:3000/api/product/add-cart",{
  method:'POST',body:JSON.stringify({productId:product.id,userEmail:session.data.user.email})
})
const response=await result.json()
return response;
}