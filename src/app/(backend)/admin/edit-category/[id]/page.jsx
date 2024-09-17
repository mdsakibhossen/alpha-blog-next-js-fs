import EditCategoryForm from "@/components/backend/edit-category-form/EditCategoryForm";

export const metadata = {
  title: "Edit Category | AlphaBlog",
  description: "Edit Category Description",
};

const EditCategoryPage = ({ params }) => {
  // console.log(params.id, "ID");

  return (
    <section className="w-full">
      <div className="container mx-auto px-3 py-5">
        <div className="heading p-3">
          <h1 className="text-2xl text-center uppercase">Edit Category</h1>
        </div>
        {/* Category Form */}
        <EditCategoryForm id={params.id} />
      </div>
    </section>
  );
};

export default EditCategoryPage;
