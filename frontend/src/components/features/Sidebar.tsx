export default function Sidebar() {
  return (
    <div className="w-[300px] space-y-4">
      <div className="rounded-xl border border-gray-200 p-4">
        <h3 className="mb-3 font-semibold text-gray-900 font-nunito">Kateqoriyalar</h3>

        <ul className="space-y-2 text-sm text-gray-700 font-nunito">
          <li className="cursor-pointer hover:text-black">Aksiya</li>
          <li className="cursor-pointer hover:text-black">Dəftərxana</li>
          <li className="cursor-pointer hover:text-black">
            Elektronika & aksesuar
          </li>
          <li className="cursor-pointer hover:text-black">
            Hədiyyələr & Hobbi
          </li>

          <li className="relative cursor-pointer font-medium text-black">
            <span className="absolute -left-4 top-1 h-5 w-1 rounded bg-red-500" />
            Kitab
          </li>

          <ul className="ml-4 mt-2 space-y-2 text-gray-600 font-nunito">
            <li className="cursor-pointer hover:text-black">Bədii ədəbiyyat</li>
            <li className="cursor-pointer hover:text-black">
              Qeyri-bədii ədəbiyyat
            </li>
            <li className="cursor-pointer hover:text-black">
              Bədii uşaq ədəbiyyatı
            </li>
            <li className="cursor-pointer hover:text-black">
              Qeyri-bədii uşaq ədəbiyyatı
            </li>
          </ul>

          <li className="mt-2 cursor-pointer hover:text-black">
            Oyuncaqlar & Oyunlar
          </li>
        </ul>
      </div>

      <div className="rounded-xl border border-gray-200 p-4 space-y-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 font-nunito">Filterlər</h3>
          <span className="text-lg text-gray-500">—</span>
        </div>

        <div>
          <h4 className="mb-2 font-medium text-gray-900 font-nunito">Dil</h4>

          <input
            type="text"
            placeholder="Search"
            className="mb-3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />

          <div className="space-y-2 text-sm text-gray-700">
            {[
              "ARAB",
              "ARAB/ENG",
              "AZE",
              "AZE/ARAB",
              "AZE/ENG",
              "AZE/FRA",
              "AZE/GER",
              "AZE/LAZ",
              "AZE/RUS",
            ].map((lang) => (
              <label
                key={lang}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h4 className="font-medium text-gray-900 font-nunito">Stok</h4>
            <span className="text-lg text-gray-500">—</span>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 font-nunito"
            />
            Mövcuddur
          </label>
        </div>

        <hr />

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-medium text-gray-900 font-nunito">Qiymət</h4>
            <span className="text-lg text-gray-500">—</span>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <input
              type="number"
              placeholder="0"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
            <span className="text-gray-500">₼</span>
            <span className="text-gray-400">–</span>
            <input
              type="number"
              placeholder="690"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
            <span className="text-gray-500">₼</span>
          </div>

          <div className="relative">
            <input
              type="range"
              min={0}
              max={690}
              className="w-full accent-red-500"
            />

            <div className="mt-2 flex justify-between text-xs text-gray-500 font-nunito">
              <span>0₼</span>
              <span>690₼</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
