import HomeBanner from "@/components/sections/home/HomeBanner";
import CategoriesSection from "@/components/sections/home/CategoriesSection";
import RecentlyViewed from "@/components/sections/home/RecentlyViewed";
import PopularThisWeek from "@/components/sections/home/PopularThisWeek";
import LibraffsPicks from "@/components/sections/home/LibraffsPicks";
import TodayChoicesSection from "@/components/sections/home/TodayChoicesSection";
import TeasPress from "@/components/sections/home/TeasPress";
import MostSearched from "@/components/sections/home/MostSearched";
export default function Home() {
  return (
    <div>
      <HomeBanner />
      <div className="max-w-[1500px] mx-auto px-[20px] py-12 flex flex-col gap-12">
        <TodayChoicesSection />
        <CategoriesSection />
        <RecentlyViewed />
        <TeasPress />
        <MostSearched />
        <PopularThisWeek />
        <LibraffsPicks />
      </div>
    </div>
  );
}
