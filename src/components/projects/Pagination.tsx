import "./Pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const isFirstDisabled = currentPage === 1;
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const isLastDisabled = currentPage === totalPages;

  const iconStyle = (disabled: boolean) => ({
    filter: disabled
      ? "grayscale(100%) opacity(0.5)"
      : "brightness(0) saturate(100%)",
  });

  return (
    <nav className="pagination-nav" aria-label="Pagination">
      <ul className="pagination">
        {/* First */}
        <li className={`page-item ${isFirstDisabled ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(1)}
            disabled={isFirstDisabled}
            aria-label="First"
          >
            <img
              src="/icons/chevron_double_left.svg"
              width="32"
              height="32"
              alt=""
              style={iconStyle(isFirstDisabled)}
              aria-hidden="true"
            />
          </button>
        </li>

        {/* Previous */}
        <li className={`page-item ${isPrevDisabled ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isPrevDisabled}
            aria-label="Previous"
          >
            <img
              src="/icons/chevron_left.svg"
              width="32"
              height="32"
              alt=""
              style={iconStyle(isPrevDisabled)}
              aria-hidden="true"
            />
          </button>
        </li>

        {/* Page Numbers */}
        {visiblePages.map((page, index) => (
          <li key={index} className="page-item">
            {page === "..." ? (
              <button
                type="button"
                className="page-link"
                disabled
                aria-hidden="true"
              >
                ...
              </button>
            ) : (
              <button
                className={`page-link ${page === currentPage ? "active selected-index" : ""}`}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li className={`page-item ${isNextDisabled ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isNextDisabled}
            aria-label="Next"
          >
            <img
              src="/icons/chevron_right.svg"
              width="32"
              height="32"
              alt=""
              style={iconStyle(isNextDisabled)}
              aria-hidden="true"
            />
          </button>
        </li>

        {/* Last */}
        <li className={`page-item ${isLastDisabled ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(totalPages)}
            disabled={isLastDisabled}
            aria-label="Last"
          >
            <img
              src="/icons/chevron_double_right.svg"
              width="32"
              height="32"
              alt=""
              style={iconStyle(isLastDisabled)}
              aria-hidden="true"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}
