import BookSwiper from "@/components/sections/homeBanner";
import TodayChoicesSection from "@/components/sections/TodayChoicesSection";


export default function Home() {
  return (
    <div className="">
      <BookSwiper />
      <div className="max-w-[1500px] mx-auto px-[20px] py-12">
        <TodayChoicesSection />
        
      </div>
    </div>
  );
}
