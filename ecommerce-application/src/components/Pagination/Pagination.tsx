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
      <p className="text">
        {page}/{totalPages}
      </p>
      <button onClick={prevPage} className="page">
        &larr;
      </button>

      {[...Array(totalPages).keys()].map((el) => (
        <button
          onClick={() => setPage(el + 1)}
          key={el}
          className={`page ${page === el + 1 ? 'active' : ''}`}
        >
          {el + 1}
        </button>
      ))}
      <button onClick={nextPage} className="page">
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
