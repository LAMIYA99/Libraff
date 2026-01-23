import Footer from "./Footer";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="pb-[70px] lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </>
  );
};

export default MainLayout;
