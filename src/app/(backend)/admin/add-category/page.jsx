import AddCategoryForm from "@/components/backend/add-category-form/AddCategoryForm";

export const metadata = {
  title: "Add Category | AlphaBlog",
  description: "Add Category Description",
};

const AddCategoryPage = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto px-3 py-5">
        <div className="heading p-3">
          <h1 className="text-2xl text-center uppercase">Add Category</h1>
        </div>
        {/* Category Form */}
        <AddCategoryForm />
      </div>
    </section>
  );
};

export default AddCategoryPage;
