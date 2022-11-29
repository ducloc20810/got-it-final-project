import { Pagination as AhaPagination } from '@ahaui/react';
import classNames from 'classnames';
import { ITEMS_PER_PAGE } from 'constants/pagination';
import { usePagination } from 'hooks';
import React from 'react';
import { ReactComponent as Ellipsis } from 'assets/images/triple-dots-icon.svg';
import styles from './Pagination.module.scss';

type PaginationProps= {
  pageClick : (page:number)=>void
  currentPage: number
  totalItems:number
}

const Pagination:React.FC<PaginationProps> = ({ pageClick, currentPage, totalItems }) => {
  const { paginationRange, totalPageCount } = usePagination({
    currentPage,
    totalItems,
    siblingCount: 1,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return (
    <AhaPagination className={classNames(styles.pagination)}>
      <AhaPagination.Prev
        disabled={currentPage === 1}
        onClick={() => {
          if (currentPage > 1) {
            pageClick(currentPage - 1);
          }
        }}
        className="u-marginBottomNone"
      />
      {paginationRange.map((page) => {
        if (typeof page === 'string') {
          return (
            <span className="u-marginHorizontalTiny u-cursorDefault u-text500" key={page + Math.random() * 10}>
              <Ellipsis width={12} fill="#97a0af" />
            </span>
          );
        }

        return (
          <AhaPagination.Item
            key={page}
            active={currentPage === page}
            onClick={() => {
              pageClick(page);
            }}
            className="u-marginBottomNone"
          >
            {page}
          </AhaPagination.Item>
        );
      })}
      <AhaPagination.Next
        disabled={currentPage === totalPageCount}
        onClick={() => {
          if (currentPage < totalPageCount) {
            pageClick(currentPage + 1);
          }
        }}
        className="u-marginBottomNone"
      />
    </AhaPagination>
  );
};

export default Pagination;
