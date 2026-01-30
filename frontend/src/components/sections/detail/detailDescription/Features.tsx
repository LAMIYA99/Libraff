const Features = () => {
  const leftFeatures = [
    { label: "Cild", value: "Yumşaq" },
    { label: "Dil", value: "AZE" },
    { label: "Müəllif", value: "Q KELLER" },
  ];

  const rightFeatures = [
    { label: "Nəşriyyat", value: "Teas Press" },
    { label: "Səhifə sayı", value: "256" },
  ];

  const FeatureRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center gap-3 text-[15px] md:text-base">
      <span className="text-gray-500 whitespace-nowrap">{label}</span>
      <span className="flex-1 border-b border-dotted border-gray-300 translate-y-[-2px]" />
      <span className="text-gray-900 font-medium whitespace-nowrap">
        {value}
      </span>
    </div>
  );

  return (
    <div className="max-w-5xl grid md:grid-cols-2 gap-x-20 gap-y-6">
      <div className="space-y-5">
        {leftFeatures.map((item, i) => (
          <FeatureRow key={i} {...item} />
        ))}
      </div>

      <div className="space-y-5">
        {rightFeatures.map((item, i) => (
          <FeatureRow key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Features;
