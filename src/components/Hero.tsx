import { Searchbar } from "@/components/Searchbar";

export default function Hero() {
  return (
    <div className=" w-full h-[550px] flex items-center justify-center mt-0 relative z-10">
      <img
        src={`https://picsum.photos/1450/550?random`} 
        alt={`Placeholder`}
        className="w-full h-full object-cover "
      />
      <div className="absolute left-10">
        <div className="max-w-[1450px] w-full h-full flex items-center justify-center">
          <div className="max-w-[450px] w-full h-full flex flex-col ">
            <h1 className="text-black text-5xl font-bold mb-4 ">
              Find your next adventure
            </h1>
            <p className="text-black text-lg mb-8">
              Upptäck de bästa platserna att bo på. Vi erbjuder unika och
              bekväma boenden för alla smaker!
            </p>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center w-full">
        
      </div>
    </div>
  );
}
