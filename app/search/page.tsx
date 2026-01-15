import { getAllBlogs, getAllCategories } from "@/lib/helpers";
import SearchClient from "../components/SearchClient";

const SearchPage = async () => {
  const blogs = await getAllBlogs();
  const categories = await getAllCategories();

  return (
    <SearchClient
      blogs={blogs}
      categories={categories}
    />
  );
};

export default SearchPage;
