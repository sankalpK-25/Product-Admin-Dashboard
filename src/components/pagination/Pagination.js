export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  function goToPrevious() {
    if (page > 1) {
      onPageChange(page - 1);
    }
  }

  function goToNext() {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 py-4">
      <button
        type="button"
        onClick={goToPrevious}
        disabled={page === 1}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium ${
                pageNumber === page
                  ? "bg-black text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={goToNext}
        disabled={page === totalPages}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}