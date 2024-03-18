import React from "react";
import ProductCard from "./ProductCard";

function CategoryPage({
  products,
  subCategories,
}: {
  products: any;
  subCategories: string[];
}) {
  const seperateCategories = (subCategory: string) => {
    const list = products.filter((product: any) => {
      return product.productSubCategory === subCategory;
    });
    if (list) {
      return list;
    } else {
      return null;
    }
  };

  return (
    <main className="flex w-screen  bg-slate-900 "  >
        <section className="w-[14rem] flex flex-col gap-5 px-10 border-r-[2px] border-gray-600  items-center  fixed h-screen shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ">
        {
            subCategories.map((cat,index)=>{
                return (
                        <a href={`#${cat}`} key={index} className="w-full ">
                    <div className=" px-5 py-3 border-b flex justify-center items-center border-gray-300  text-lg font-semibold  bg-gray-300 hover:bg-gray-200  rounded-md cursor-pointer  ">
                          {cat}                       
                    </div>
                          </a>
                )
            })
        }
        </section> 
        <div className="flex flex-col w-screen px-[2rem] py-[2rem] ml-[14rem] gap-8 " >
      {subCategories.map((subCat: string,index:number) => {
        const itemList = seperateCategories(subCat);
        return (
             <section key={index} id={subCat} className="border-[2px] rounded-lg overflow-x-auto  hide-scrollbar  border-gray-800  flex-grow h-[25rem]  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  ">
            <div>
            <h1 className="px-6 py-3 font-sans text-gray-100 font-bold border-b border-gray-600">{subCat}</h1>
              <div className="py-[1rem] px-[2rem] ">
              {itemList.length>0 ? (
              <div className="flex flex-wrap gap-10">
                {itemList.map((item: any,index:any) => {
                  return (
                  <ProductCard key={index*item} product={item}/>
                    )
                })}
              </div>
            ) : (
              <h1 className="text-gray-300 h-full w-full mt-[2rem] flex justify-center items-center font-semibold font-sans">No Products available</h1>
            )}
              </div>
            </div>
          </section>
         

        );
      })}

      </div>
    </main> 
  );



}

export default CategoryPage;
