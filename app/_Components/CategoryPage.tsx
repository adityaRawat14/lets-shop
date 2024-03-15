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
    <main className="flex w-screen  bg-transparent "  >
        <section className="w-[14rem] flex flex-col  items-center  fixed h-screen shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ">
        {
            subCategories.map((cat)=>{
                return (
                        <a href={`#${cat}`}>
                    <div className=" px-5 py-3 text-lg font-semibold  hover:text-white rounded-md cursor-pointer hover:bg-slate-700 ">
                    
                          {cat}
                        
                    </div>
                          </a>
                )
            })
        }
        </section> 
        <div className="flex flex-col w-screen px-[2rem] py-[2rem] ml-[14rem] gap-8 " >
      {subCategories.map((subCat: string) => {
        const itemList = seperateCategories(subCat);
        return (
             <section id={subCat} className="border-[2px] rounded-lg overflow-x-auto  hide-scrollbar  border-gray-300  flex-grow h-[20rem]  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  ">
            <div className="">
            <h1 className="px-6 py-3 font-sans font-bold border-b border-gray-300">{subCat}</h1>
              <div className="py-[1rem] px-[2rem] ">
              {itemList ? (
              <div className="flex flex-wrap gap-10">
                {itemList.map((item: any) => {
                  return (
                  <ProductCard product={item}/>
                    )
                })}
              </div>
            ) : (
              <h1>No Products available</h1>
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
