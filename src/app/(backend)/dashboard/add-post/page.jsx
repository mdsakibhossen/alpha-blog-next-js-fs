import AddPostForm from "@/components/backend/add-post-form/AddPostForm";

export const metadata = {
  title: "Add Post | AlphaBlog",
  description: "Add a new post to AlphaBlog.",
};

const AddPostPage = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto px-3 py-5">
        <div className="heading p-3">
          <h1 className="text-2xl text-center uppercase">Add Post</h1>
        </div>
        {/* Post Form */}
        <AddPostForm />
      </div>
    </section>
  );
};

export default AddPostPage;
