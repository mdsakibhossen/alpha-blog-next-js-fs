import EditPostForm from "@/components/backend/edit-post-form/EditPostForm";

export const metadata = {
  title: "Edit Post | AlphaBlog",
  description: "Edit Post Description",
};

const EditPostPage = ({ params }) => {
  // console.log(params.id, "ID");

  return (
    <section className="w-full">
      <div className="container mx-auto px-3 py-5">
        <div className="heading p-3">
          <h1 className="text-2xl text-center uppercase">Edit Post</h1>
        </div>
        {/* Post Form */}
        <EditPostForm id={params.id} />
      </div>
    </section>
  );
};

export default EditPostPage;
