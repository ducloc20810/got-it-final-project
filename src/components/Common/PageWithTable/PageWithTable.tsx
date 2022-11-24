import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Pagination, Loader } from '@ahaui/react';
import classNames from 'classnames';
import { itemsPerPage } from 'utils/variables';
import { useTypedDispatch } from 'hooks';
import { generateNumberArray } from 'utils/library';
import { GenericDataTable } from 'types/genericDataTable';
import { TypedDispatch } from 'redux/store';
import { ITEMS_PER_PAGE } from 'constants/pagination';
import styles from './PageWithTable.module.scss';

type PageWithTableProps = {
  data: GenericDataTable;
  setData: (data: GenericDataTable) => void;
  tableTitle: string;
  breadcrumb: string;
  fetchData: (offset: number) => (dispatch: TypedDispatch) => Promise<any>;
  CreateButton: React.ReactNode;
  renderTable: (list: Array<any>) => JSX.Element;
};

const PageWithTable: React.FC<PageWithTableProps> = ({
  data,
  setData,
  tableTitle,
  breadcrumb,
  fetchData,
  CreateButton,
  renderTable,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useTypedDispatch();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const totalPage = useMemo(
    () => (data?.totalItems ? Math.ceil(data.totalItems / itemsPerPage) : 0),
    [data],
  );

  const startOffSet = (currentPage - 1) * itemsPerPage + 1;

  const lastOffSet = data && currentPage * itemsPerPage > data.totalItems
    ? data.totalItems
    : currentPage * itemsPerPage;

  const changePage = (page: number) => {
    setCurrentPage(() => page);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchData((currentPage - 1) * ITEMS_PER_PAGE))
      .then((resData: GenericDataTable) => {
        if (componentRef.current) {
          setData(resData);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (componentRef.current) setIsLoading(false);
      });
  }, [dispatch, currentPage, fetchData, setData]);

  return (
    <div className={classNames(styles.page)} ref={componentRef}>
      <div className="u-flex u-justifyContentBetween u-alignItemsCenter u-marginBottomSmall">
        <h1 className="u-text600 u-marginNone">{breadcrumb}</h1>
        {CreateButton}
      </div>

      <div
        className={classNames(
          styles.pageContent,
          'u-shadowMedium u-backgroundWhite u-roundedMedium',
        )}
      >
        <header className="u-backgroundLightest u-paddingHorizontalMedium u-paddingVerticalTiny u-textPrimaryDarker">
          {tableTitle}
        </header>
        <div className="u-paddingHorizontalMedium u-paddingVerticalSmall">
          {!isLoading && (
            <>
              {/* Table section  */}
              {renderTable(data?.items)}

              {/* Pagination section */}
              {data && data.totalItems > 0 && (
                <div className="u-flex u-justifyContentBetween u-alignItemsCenter u-textNeutral100">
                  <div className="u-text200">
                    {`Show ${startOffSet} to ${lastOffSet} of ${data.totalItems} entries`}
                  </div>

                  <Pagination className={classNames(styles.pagination)}>
                    <Pagination.Prev
                      disabled={currentPage === 1}
                      onClick={() => (currentPage !== 1 ? changePage(currentPage - 1) : '')}
                      className="u-marginBottomNone"
                    />
                    {generateNumberArray(totalPage).map((page) => (
                      <Pagination.Item
                        key={page}
                        active={currentPage === page}
                        onClick={() => changePage(page)}
                        className="u-marginBottomNone"
                      >
                        {page}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      disabled={currentPage === totalPage}
                      onClick={() => (currentPage !== totalPage ? changePage(currentPage + 1) : '')}
                      className="u-marginBottomNone"
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}

          {isLoading && (
            <div id="loader">
              <Loader size="medium" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageWithTable;
