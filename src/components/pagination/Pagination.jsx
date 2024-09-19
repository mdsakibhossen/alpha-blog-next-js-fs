import Link from "next/link";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to generate pagination range with fewer visible buttons
  const getPaginationRange = () => {
    const pages = [];

    // Case 1: Show all pages if total pages are less than or equal to 3
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Case 2: If current page is near the start (1, 2, 3)
      if (currentPage <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      }
      // Case 3: If current page is near the end
      else if (currentPage >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      }
      // Case 4: If current page is in the middle
      else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="pagination flex gap-3 justify-center items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {paginationRange.map((item, index) =>
        typeof item === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(item)}
            className={` w-6 h-6 flex justify-center items-center border rounded-full ${
              currentPage === item ? "bg-green-400 text-white" : ""
            }`}
          >
            {item}
          </button>
        ) : (
          <span key={index} className="px-3 py-1">
            {item}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
