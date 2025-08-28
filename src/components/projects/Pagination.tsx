import "./Pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }
  // Desktop/tablet: original algorithm with ellipses
  const getDesktopVisiblePages = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: Array<number | string> = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
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
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  // Mobile: sliding window of up to 5 consecutive numbers
  const getMobileVisiblePages = () => {
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let start = currentPage - Math.floor(maxVisible / 2);
    if (start < 1) start = 1;

    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = end - maxVisible + 1;
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePagesDesktop = getDesktopVisiblePages();
  const visiblePagesMobile = getMobileVisiblePages();
  const isFirstDisabled = currentPage === 1;
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const isLastDisabled = currentPage === totalPages;

  const iconStyle = (disabled: boolean) => ({
    filter: disabled ? "grayscale(100%) opacity(0.5)" : "brightness(0) saturate(100%)",
  });

  const scrollToProjectsSection = () => {
    const el = document.getElementById("scroll-to");

    if (el) {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const offset = isMobile ? 32 : 116;
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const goToPage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
    scrollToProjectsSection();
  };

  return (
    <>
      {/* Desktop / Tablet */}
      <nav className="pagination-nav pagination-nav--desktop" aria-label="Pagination">
        <ul className="pagination">
          {/* First */}
          <li className={`page-item ${isFirstDisabled ? "disabled" : ""}`}>
            <button className="page-link" type="button" onClick={() => goToPage(1)} disabled={isFirstDisabled} aria-label="Pierwsza strona">
              <img src="/icons/chevron_double_left.svg" width="32" height="32" alt="" style={iconStyle(isFirstDisabled)} aria-hidden="true" />
            </button>
          </li>

          {/* Previous */}
          <li className={`page-item ${isPrevDisabled ? "disabled" : ""}`}>
            <button
              className="page-link"
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={isPrevDisabled}
              aria-label="Poprzednia strona"
            >
              <img src="/icons/chevron_left.svg" width="32" height="32" alt="" style={iconStyle(isPrevDisabled)} aria-hidden="true" />
            </button>
          </li>

          {/* Page Numbers (desktop with ellipses) */}
          {visiblePagesDesktop.map((page, index) => (
            <li key={typeof page === "number" ? `page-${page}` : `ellipsis-${index}`} className="page-item">
              {page === "..." ? (
                <button type="button" className="page-link" disabled aria-hidden="true">
                  ...
                </button>
              ) : (
                <button
                  className={`page-link ${page === currentPage ? "active selected-index" : ""}`}
                  type="button"
                  onClick={() => goToPage(page as number)}
                  aria-current={page === currentPage ? "page" : undefined}
                  aria-label={`Page ${page}${page === currentPage ? ", bieżąca strona" : ""}`}
                  // disabled={page === currentPage}
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
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={isNextDisabled}
              aria-label="Następna strona"
            >
              <img src="/icons/chevron_right.svg" width="32" height="32" alt="" style={iconStyle(isNextDisabled)} aria-hidden="true" />
            </button>
          </li>

          {/* Last */}
          <li className={`page-item ${isLastDisabled ? "disabled" : ""}`}>
            <button className="page-link" type="button" onClick={() => goToPage(totalPages)} disabled={isLastDisabled} aria-label="Ostatnia strona">
              <img src="/icons/chevron_double_right.svg" width="32" height="32" alt="" style={iconStyle(isLastDisabled)} aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile */}
      <nav className="pagination-nav pagination-nav--mobile" aria-label="Pagination">
        <ul className="pagination">
          {/* First */}
          <li className={`page-item ${isFirstDisabled ? "disabled" : ""}`}>
            <button className="page-link" type="button" onClick={() => goToPage(1)} disabled={isFirstDisabled} aria-label="Pierwsza strona">
              <img src="/icons/chevron_double_left.svg" width="32" height="32" alt="" style={iconStyle(isFirstDisabled)} aria-hidden="true" />
            </button>
          </li>

          {/* Previous */}
          <li className={`page-item ${isPrevDisabled ? "disabled" : ""}`}>
            <button
              className="page-link"
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={isPrevDisabled}
              aria-label="Poprzednia strona"
            >
              <img src="/icons/chevron_left.svg" width="32" height="32" alt="" style={iconStyle(isPrevDisabled)} aria-hidden="true" />
            </button>
          </li>

          {/* Page Numbers (mobile window up to 5) */}
          {visiblePagesMobile.map((page) => (
            <li key={`m-page-${page}`} className="page-item">
              <button
                className={`page-link ${page === currentPage ? "active selected-index" : ""}`}
                type="button"
                onClick={() => goToPage(page as number)}
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Page ${page}${page === currentPage ? ", bieżąca strona" : ""}`}
                // disabled={page === currentPage}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Next */}
          <li className={`page-item ${isNextDisabled ? "disabled" : ""}`}>
            <button
              className="page-link"
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={isNextDisabled}
              aria-label="Następna strona"
            >
              <img src="/icons/chevron_right.svg" width="32" height="32" alt="" style={iconStyle(isNextDisabled)} aria-hidden="true" />
            </button>
          </li>

          {/* Last */}
          <li className={`page-item ${isLastDisabled ? "disabled" : ""}`}>
            <button className="page-link" type="button" onClick={() => goToPage(totalPages)} disabled={isLastDisabled} aria-label="Ostatnia strona">
              <img src="/icons/chevron_double_right.svg" width="32" height="32" alt="" style={iconStyle(isLastDisabled)} aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
