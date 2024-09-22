import Image from "next/image"
import Link from "next/link"

const CategoryCard = ({category}) => {
  return (
    <div className="category-card">
      <Link href={`/${category.slug}`} className="flex flex-col justify-center items-center gap-3 border-2 min-w-min p-8">
        <span className="icon w-24 h-20">
          <Image
            src={category.icon.secure_url}
            alt={category.title}
            width={150}
            height={150}
            className="w-full h-full"
          />
        </span>
        <span className="font-medium">{category.title}</span>
      </Link>
    </div>
  );
}

export default CategoryCard