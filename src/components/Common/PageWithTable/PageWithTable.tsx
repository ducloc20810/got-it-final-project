import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Pagination, Loader } from '@ahaui/react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTypedDispatch } from 'hooks';
import { generateNumberArray } from 'utils/library';
import { GenericDataTable } from 'types/common';
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
  renderTable: (list: Array<any>) => JSX.Element|null;
  isLoading: boolean
  setIsLoading:(value:boolean)=>void
};

const PageWithTable: React.FC<PageWithTableProps> = ({
  data,
  setData,
  tableTitle,
  breadcrumb,
  fetchData,
  CreateButton,
  renderTable,
  isLoading,
  setIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const dispatch = useTypedDispatch();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const totalPage = useMemo(
    () => (data?.totalItems ? Math.ceil(data.totalItems / ITEMS_PER_PAGE) : 0),
    [data],
  );

  const startOffSet = (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const lastOffSet = data && currentPage * ITEMS_PER_PAGE > data.totalItems
    ? data.totalItems
    : currentPage * ITEMS_PER_PAGE;

  const changeSearchParamsPage = useCallback((page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const page = searchParams.get('page');
    if (page && +page) {
      setCurrentPage(+page);
      return;
    }

    if (!page) {
      setCurrentPage(1);
      return;
    }

    changeSearchParamsPage(1);
  }, [searchParams, changeSearchParamsPage]);

  useEffect(() => {
    if (currentPage === 0) return;
    setIsLoading(true);
    dispatch(fetchData(currentPage))
      .then((resData: GenericDataTable) => {
        if (componentRef.current) {
          setData(resData);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (componentRef.current) setIsLoading(false);
      });
  }, [dispatch, currentPage, fetchData, setData, setIsLoading]);

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
                    { data.items.length > 0 && `Show ${startOffSet} to ${lastOffSet} of ${data.totalItems} entries`}
                  </div>

                  <Pagination className={classNames(styles.pagination)}>
                    <Pagination.Prev
                      disabled={currentPage === 1}
                      onClick={() => {
                        if (currentPage > 1) {
                          changeSearchParamsPage(currentPage - 1);
                        }
                      }}
                      className="u-marginBottomNone"
                    />
                    {generateNumberArray(totalPage).map((page) => (
                      <Pagination.Item
                        key={page}
                        active={currentPage === page}
                        onClick={() => {
                          changeSearchParamsPage(page);
                        }}
                        className="u-marginBottomNone"

                      >
                        {page}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      disabled={currentPage === totalPage}
                      onClick={() => {
                        if (currentPage < totalPage) {
                          changeSearchParamsPage(currentPage + 1);
                        }
                      }}
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
