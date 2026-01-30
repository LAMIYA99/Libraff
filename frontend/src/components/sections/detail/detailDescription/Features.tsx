interface FeaturesProps {
  features: {
    binding: string;
    language: string;
    author: string;
    publisher: string;
    pageCount: number;
    age: string;
  };
}

const Features = ({ features }: FeaturesProps) => {
  if (!features)
    return <p className="text-gray-500 italic">Xüsusiyyətlər yoxdur.</p>;

  const leftFeatures = [
    { label: "Cild", value: features.binding || "Sərt"},
    { label: "Dil", value: features.language },
    { label: "Müəllif", value: features.author },
  ];

  const rightFeatures = [
    { label: "Nəşriyyat", value: features.publisher },
    { label: "Səhifə sayı", value: features.pageCount?.toString() },
    { label: "Yaş", value: features.age },
  ].filter((f) => f.value);

  const FeatureRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center gap-3 text-[15px] md:text-base">
      <span className="text-gray-500 whitespace-nowrap">{label}</span>
      <span className="flex-1 border-b border-dotted border-gray-300 translate-y-[-2px]" />
      <span className="text-gray-900 font-medium whitespace-nowrap">
        {value || "-"}
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
