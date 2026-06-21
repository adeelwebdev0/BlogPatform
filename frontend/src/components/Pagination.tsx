interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
      >
        ← Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 text-sm rounded-lg transition border ${
            currentPage === i + 1
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
