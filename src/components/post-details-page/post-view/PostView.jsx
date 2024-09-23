import Image from "next/image";

const PostView = ({ post }) => {
  const { title, image, description } = post;
  return (
    <>
      <div className="img-box w-full h-[60vh]">
        <Image
          src={image.secure_url}
          alt={title}
          width={2000}
          height={800}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="info mt-5">
        <h2 className="my-3 uppercase font-semibold text-xl sm:text-2xl lg:text-4xl">
          {title}
        </h2>
        <p>{description}</p>
      </div>
    </>
  );
};

export default PostView;
