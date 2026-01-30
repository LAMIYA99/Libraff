import HomeBanner from "@/components/sections/home/HomeBanner";
import TodayChoicesSection from "@/components/sections/home/TodayChoicesSection";
import CategoriesSection from "@/components/sections/home/CategoriesSection";
import PopularThisWeek from "@/components/sections/home/PopularThisWeek";
import LibraffsPicks from "@/components/sections/home/LibraffsPicks";
import MostSearched from "@/components/sections/home/MostSearched";
import TeasPress from "@/components/sections/home/TeasPress";
import RecentlyViewed from "@/components/sections/home/RecentlyViewed";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <HomeBanner />

      <div className="max-w-[1400px] mx-auto px-4 md:px-[30px] py-12 flex flex-col gap-16 w-full">
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
