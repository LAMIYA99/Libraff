const Reviews = () => {
  return (
    <div className="w-full max-w-[100ch]">
      <div className="bg-gray-50 rounded-2xl p-8 text-center  ">
        <h3 className="text-xl md:text-2xl font-semibold">
          Məhsul haqqında rəy yazın
        </h3>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Fikirlərinizi digər istifadəçilərlə bölüşün
        </p>

        <button className="mt-6 bg-black text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
          Rəy yaz
        </button>
      </div>

      <p className="text-center text-gray-400 mt-12 text-sm md:text-base">
        Hələki rəy yoxdur
      </p>
    </div>
  );
};

export default Reviews;
