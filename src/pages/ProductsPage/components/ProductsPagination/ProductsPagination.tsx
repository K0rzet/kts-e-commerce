import React from 'react';
import classNames from 'classnames';
import * as styles from './ProductsPagination.module.scss';

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const ProductsPagination: React.FC<ProductsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className={classNames(styles.pagination, className)}>
      <button
        className={styles.arrow}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        ←
      </button>
      
      <div className={styles.pages}>
        <button
          className={classNames(styles.pageButton, currentPage === 1 && styles.active)}
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
        >
          1
        </button>

        {currentPage > 4 && (
          <button className={classNames(styles.pageButton, styles.ellipsis)} disabled>
            ...
          </button>
        )}

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 2;
          if (
            page !== 1 &&
            page !== totalPages &&
            page >= currentPage - 2 &&
            page <= currentPage + 2 &&
            page > 1 &&
            page < totalPages
          ) {
            return (
              <button
                key={page}
                className={classNames(styles.pageButton, currentPage === page && styles.active)}
                onClick={() => handlePageClick(page)}
                disabled={currentPage === page}
              >
                {page}
              </button>
            );
          }
          return null;
        })}

        {currentPage < totalPages - 3 && (
          <button className={classNames(styles.pageButton, styles.ellipsis)} disabled>
            ...
          </button>
        )}

        {totalPages > 1 && (
          <button
            className={classNames(styles.pageButton, currentPage === totalPages && styles.active)}
            onClick={() => handlePageClick(totalPages)}
            disabled={currentPage === totalPages}
          >
            {totalPages}
          </button>
        )}
      </div>

      <button
        className={styles.arrow}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
};

export default ProductsPagination; 