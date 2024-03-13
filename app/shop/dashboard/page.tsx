
import CategoryCard from "../../_Components/CategoryCard";
import Image from "next/image";
import bags from '@/public/Images/bags.png'
import {productCatagories} from '@/app/_lib/ClientActions/actions'


export default function Home() {


  return (
    <div className="">
  

    <header className=" bg-yellow-100 shadow-[5px_15px_15px_5px_#00000024] flex justify-between lg:px-[6rem] my-[4rem] lg:py-[4rem] select-none">
        <div className="  py-16 px-4 sm:px-6 ">
            <h1 className="text-4xl font-bold text-gray-500">Welcome to Our Shop</h1>
            <p className="mt-2 text-gray-500">Find the best products for your needs.</p>
        </div>
        <Image src={bags} alt="bags"  height={200} width={200} className="select-none" />
    </header>

    {/* Categories Section */}
    <section className=" items-center   px-4 sm:px-6 lg:px-8 lg:flex gap-[2rem]  md:hide-scrollbar hide-scrollbar  lg:overflow-x-auto ">
    {
        productCatagories.map((card,index)=>{
          return(
              <div  key={index}  className=" flex-1 px-4 py-[1rem] lg:py-0 hover:translate-y-[-10px] transition-all duration-300">
                  <CategoryCard className=" shadow-[8px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-slate-900 text-white " category={card.category} image={card.image}>
                    <span className="text-white">
                   {card.text[0]}

                    </span>
                    
                    </CategoryCard>
              </div>

          )  

        })
    }
    </section>
</div>
  );
}
