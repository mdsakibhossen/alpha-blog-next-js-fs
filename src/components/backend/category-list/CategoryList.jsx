
const CategoryList = () => {
  return (
    <div className="table-wrapper max-w-[1000px] mx-auto">
      <table className="border border-collapse text-center w-full">
        <thead>
          <tr>
            <th className="border font-medium">Title</th>
            <th className="border font-medium">Slug</th>
            <th className="border font-medium">Icon</th>
            <th className="border font-medium" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default CategoryList