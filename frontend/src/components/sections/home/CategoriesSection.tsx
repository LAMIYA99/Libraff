import Link from "next/link";
import {
  Brain,
  Headphones,
  Feather,
  Wand2,
  Search,
  BookOpen,
  BookCopy,
  Percent,
  Castle,
  Rocket,
  User,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Şəxsi İnkişaf",
    icon: Brain,
    href: "/shop?category=Şəxsi%20İnkişaf",
    accent: "text-red-500",
  },
  {
    id: 2,
    title: "Psixologiya",
    icon: User,
    href: "/shop?category=Psixologiya",
    accent: "text-red-500",
  },
  {
    id: 3,
    title: "Klassiklər",
    icon: Feather,
    href: "/shop?category=Klassiklər",
    accent: "text-red-500",
  },
  {
    id: 4,
    title: "Elmi-fantastika & Fantaziya",
    icon: Wand2,
    href: "/shop?category=Elmi-fantastika%20%26%20Fantaziya",
    accent: "text-red-500",
  },
  {
    id: 5,
    title: "Detektiv",
    icon: Search,
    href: "/shop?category=Detektiv",
    accent: "text-red-500",
  },
  {
    id: 6,
    title: "Bədii ədəbiyyat",
    icon: BookOpen,
    href: "/shop?category=Bədii%20ədəbiyyat",
    accent: "text-red-500",
  },
  {
    id: 7,
    title: "Romanlar & Novellalar",
    icon: BookCopy,
    href: "/shop?category=Romanlar%20%26%20Novellalar",
    accent: "text-red-500",
  },
  {
    id: 8,
    title: "Endirimlər",
    icon: Percent,
    href: "/shop?sort=price-low",
    accent: "text-red-500",
  },
  {
    id: 9,
    title: "Bədii uşaq ədəbiyyatı",
    icon: Castle,
    href: "/shop?category=Bədii%20uşaq%20ədəbiyyatı",
    accent: "text-red-500",
  },
  {
    id: 10,
    title: "Qeyri-bədii uşaq ədəbiyyatı",
    icon: Rocket,
    href: "/shop?category=Qeyri-bədii%20uşaq%20ədəbiyyatı",
    accent: "text-red-500",
  },
];

const CategoriesSection = () => {
  return (
    <section className="w-full bg-[#f8fafc] py-8 px-4 md:py-[40px] md:px-[30px]">
      <div className="flex justify-between items-center max-w-[1400px] mx-auto mb-6">
        <h2 className="text-xl md:text-2xl font-normal text-[#14151A] font-nunito">
          Kateqoriyalar
        </h2>
        <Link
          href="/shop"
          className="text-gray-500 hover:text-[#14151A] transition-colors text-sm font-medium flex items-center gap-1"
        >
          Hamısına bax <span className="text-lg">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-[1400px] mx-auto">
        {categories.map((category) => (
          <Link key={category.id} href={category.href} className="group">
            <div className="bg-white border text-center border-gray-100 rounded-xl p-4 md:p-6 h-[140px] md:h-[160px] flex flex-col items-center justify-center gap-3 md:gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-transparent relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-150" />

              <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                <category.icon
                  strokeWidth={1.5}
                  size={32}
                  className="text-gray-800 group-hover:text-red-600 transition-colors duration-300 w-8 h-8 md:w-10 md:h-10"
                />
              </div>

              <h3 className="text-xs md:text-sm font-medium text-gray-900 text-center relative z-10 group-hover:text-black leading-snug font-nunito">
                {category.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
