import React, { useEffect, useMemo, useState, useRef } from "react";
import { Pagination, Loader } from "@ahaui/react";
import classNames from "classnames";
import { itemsPerPage } from "utils/variables";
import { useThunkDispatch } from "hooks";
import { generateNumberArray } from "utils/library";
import { CategoryType } from "pages/Categories/CategoriesType";
import { GenericDataTable } from "types/genericDataTable";
import styles from "./PageWithTable.module.scss";

type PageWithTableProps = {
  data: GenericDataTable;
  setData: Function;
  tableTitle: string;
  breadcrumb: string;
  fetchData: Function;
  CreateButton: React.ReactNode;
  renderTable: Function;
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
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const dispatch = useThunkDispatch();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const totalPage = useMemo(
    () => (data?.total_items ? Math.ceil(data.total_items / itemsPerPage) : 0),
    [data]
  );
  const startOffSet = (currentPage - 1) * itemsPerPage + 1;

  const lastOffSet =
    data && currentPage * itemsPerPage > data.total_items
      ? data.total_items
      : currentPage * itemsPerPage;

  const changePage = (page: number) => {
    setCurrentPage(() => page);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchData())
      .then((data: CategoryType) => {
        if (componentRef.current) {
          setData(data);
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
          "u-shadowMedium u-backgroundWhite u-roundedMedium"
        )}
      >
        <header className="u-backgroundLightest u-paddingHorizontalMedium u-paddingVerticalTiny u-textPrimaryDarker">
          {tableTitle}
        </header>
        <div className="u-paddingHorizontalMedium u-paddingVerticalSmall">
          {!isLoading && (
            <>
              {/*Table section  */}
              {renderTable(data?.items)}

              {/* Pagination section*/}
              {data && data.total_items > 0 && (
                <div className="u-flex u-justifyContentBetween u-alignItemsCenter u-textNeutral100">
                  <div className="u-text200">
                    {`Show ${startOffSet} to ${lastOffSet} of ${data.total_items} entries`}
                  </div>

                  <Pagination className={classNames(styles.pagination)}>
                    <Pagination.Prev
                      disabled={currentPage === 1}
                      onClick={() =>
                        currentPage !== 1 ? changePage(currentPage - 1) : ""
                      }
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
                      onClick={() =>
                        currentPage !== totalPage
                          ? changePage(currentPage + 1)
                          : ""
                      }
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
