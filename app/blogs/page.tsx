import { getAllBlogs, getAllCategories } from "@/lib/helpers";
import BlogList from "./BlogList";

const Blogspage = async () => {
  const blogs = await getAllBlogs();
  const categories = await getAllCategories();

  return (
    <section
      className="w-full py-10 px-6"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/d19037_e1e20ec138914f03bd81393f1c31ec54~mv2.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col gap-4 bg-black bg-opacity-40 text-red-200 p-4 md:p-6 rounded max-w-full md:max-w-lg">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif drop-shadow-lg">
          Explore Articles On Various Categories...
        </h1>
        <p className="text-base md:text-lg lg:text-xl drop-shadow-md">
          Discover deep insights, engaging stories, and thought-provoking ideas across multiple topics...
        </p>
      </div>

      {/* Client Component for Filters + Blogs */}
      <BlogList blogs={blogs} categories={categories} />
    </section>
  );
};

export default Blogspage;
