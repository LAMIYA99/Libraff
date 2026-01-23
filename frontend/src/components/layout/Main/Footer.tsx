import { footerLinks, contactInfo } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-[1500px] mx-auto px-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Dynamic Columns */}
          {footerLinks.map((column, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h3 className="text-[#14151A] font-bold text-lg font-nunito">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-[#14151A] text-[15px] hover:text-[#ef3340] transition-colors duration-200 font-nunito"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#14151A] font-bold text-lg font-nunito">
              Əlaqə
            </h3>
            <div className="flex flex-col gap-3 text-[15px] text-[#14151A] font-nunito">
              <p className="leading-relaxed max-w-[250px]">
                {contactInfo.address}
              </p>
              <a
                href={`tel:${contactInfo.phone}`}
                className="hover:text-[#ef3340] transition-colors duration-200"
              >
                {contactInfo.phone}
              </a>
              <p>{contactInfo.workingHours}</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-[#ef3340] transition-colors duration-200 underline decoration-1 underline-offset-4"
              >
                {contactInfo.email}
              </a>
              <a
                href="#"
                className="hover:text-[#ef3340] transition-colors duration-200 underline decoration-1 underline-offset-4 mt-2"
              >
                {contactInfo.mapLink}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-100 mt-8">
          <p className="text-[#14151A] text-sm font-nunito">
            &copy; 2017 - 2026 Libraff.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
