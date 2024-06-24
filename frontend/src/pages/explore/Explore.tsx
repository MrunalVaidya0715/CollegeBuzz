import { CategoriesOptions } from "@/data/categories";
import { getColor } from "@/lib/utils";

const Explore = () => {
  return (
    <section className="pt-2 w-full grid gap-4 grid-cols-2 ">
      {CategoriesOptions.map((cat) => (
        <div
          key={cat.id}
          className="relative min-h-[100px] flex items-center justify-center gap-2 text-white border-1 border-gray-300 hover:border-gray-600 hover:shadow-lg transition-all duration-300 ease-in-out"
          style={{ backgroundColor: getColor(cat.value) }}
        >
          <div className=" absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/50 via-white/20 to-black/30"></div>
          {cat.icon && cat.icon}
          <p className="  text-xl font-semibold drop-shadow-md">
            {cat.name}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Explore;
