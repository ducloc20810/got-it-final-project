import React, { useEffect, useState, useRef, useCallback } from 'react';
import queryString from 'query-string';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTypedDispatch } from 'hooks';
import { GenericDataTable } from 'types/common';
import { TypedDispatch } from 'redux/store';
import { ITEMS_PER_PAGE } from 'constants/pagination';
import Pagination from '../Pagination/Pagination';
import styles from './PageWithTable.module.scss';
import SkeletonTable from '../SkeletonTable/SkeletonTable';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

type PageWithTableProps = {
  data: GenericDataTable;
  setData: (data: GenericDataTable) => void;
  tableTitle: string;
  fetchData: (offset: number) => (dispatch: TypedDispatch) => Promise<any>;
  CreateButton: React.ReactNode;
  renderTable: (list: Array<any>) => JSX.Element|null;
  isLoading: boolean
  setIsLoading:(value:boolean)=>void
  createButtonClick: ()=>void
  editIconClick: (id:number)=>void
  removeIconClick:(id:number)=>void
};

const PageWithTable: React.FC<PageWithTableProps> = ({
  data,
  setData,
  tableTitle,
  fetchData,
  CreateButton,
  renderTable,
  isLoading,
  setIsLoading,
  createButtonClick,
  editIconClick,
  removeIconClick,
}) => {
  const { hash } = useLocation();
  const [isHandleHash, setIsHandleHash] = useState<boolean>(false);
  const firstUpdate = useRef(false);

  const [currentPage, setCurrentPage] = useState<number>(0);

  const dispatch = useTypedDispatch();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const startOffSet = (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const lastOffSet = data && currentPage * ITEMS_PER_PAGE > data.totalItems
    ? data.totalItems
    : currentPage * ITEMS_PER_PAGE;

  const changeSearchParamsPage = useCallback((page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const hashValue = queryString.parse(hash);
    if (!firstUpdate.current) {
      return;
    }

    if (isHandleHash) {
      return;
    }

    const { action, id } = hashValue;

    if (!action && !id) {
      return;
    }

    switch (action) {
      case 'create':
        createButtonClick();
        break;

      case 'edit':
        if (id) {
          editIconClick(+id);
        }
        break;

      case 'delete':
        if (id) {
          removeIconClick(+id);
        }
        break;
      default:
        break;
    }
    setIsHandleHash(true);
  }, [hash, isHandleHash, createButtonClick, editIconClick, removeIconClick]);

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
    if (currentPage === 0) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (componentRef.current) {
      setIsLoading(true);
    }

    dispatch(fetchData(currentPage))
      .then((resData: GenericDataTable) => {
        if (componentRef.current) {
          setData(resData);
          setIsLoading(false);
          if (!firstUpdate.current) {
            firstUpdate.current = true;
          }
        }
      })
      .catch(() => {
        if (componentRef.current) {
          setIsLoading(false);
          if (!firstUpdate.current) {
            firstUpdate.current = true;
          }
        }
      });
  }, [dispatch, currentPage, fetchData, setData, setIsLoading]);

  return (
    <div className={classNames(styles.page)} ref={componentRef}>
      <div className="u-flex u-justifyContentBetween u-alignItemsCenter u-marginBottomSmall">
        <h1 className="u-text600 u-marginNone">
          <Breadcrumb />
        </h1>
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

                  <Pagination currentPage={currentPage} pageClick={changeSearchParamsPage} totalItems={data.totalItems} />
                </div>
              )}
            </>
          )}

          {isLoading && (
            <SkeletonTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default PageWithTable;
