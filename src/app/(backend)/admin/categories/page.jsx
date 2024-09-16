import Link from "next/link";

export const metadata = {
  title: "Categories | AlphaBlog",
  description: "Categories Description",
};

const CategoriesPage = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto px-3 py-5">
        <div className="heading p-3">
          <h1 className="text-2xl text-center uppercase">Categories</h1>
        </div>
        <div className="table-wrapper max-w-[1000px] mx-auto">
          <table className="border border-collapse text-center w-full">
            <thead>
              <tr>
                <th className="border font-medium">Title</th>
                <th className="border font-medium">Slug</th>
                <th className="border font-medium">Icon</th>
                <th className="border font-medium" colSpan={2}>Action</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="btn-box text-center mt-10">
          <Link href={"/admin/add-category"} className="py-2.5 px-8 bg-blue-500 text-white rounded">Add Category</Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesPage;
