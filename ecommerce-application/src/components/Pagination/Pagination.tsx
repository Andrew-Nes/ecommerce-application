import './pagination.scss';
import { FC } from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  setPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = (props: PaginationProps) => {
  const { page, totalPages, prevPage, setPage, nextPage } = props;
  return (
    <div className="pagination">
      <button
        onClick={prevPage}
        className="pagination__button"
        disabled={page === 1 ? true : false}
      >
        &larr;
      </button>

      {[...Array(totalPages).keys()].map((el) => (
        <button
          onClick={() => setPage(el + 1)}
          key={el}
          className={`pagination__button ${
            page === el + 1 ? 'pagination__button_active' : ''
          }`}
        >
          {el + 1}
        </button>
      ))}
      <button
        onClick={nextPage}
        className="pagination__button"
        disabled={page === totalPages ? true : false}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
