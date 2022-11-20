// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { Pagination, Loader } from "@ahaui/react";
import classNames from "classnames";
import { Table } from "components";
import { itemsPerPage } from "utils/variables";
import { CategoriesDataType } from "pages/Categories/CategoriesType";
import { itemsDataType } from "pages/Items/ItemsType";
import { useThunkDispatch } from "hooks";
import { fetchCategoryList } from "redux/actions/category.action";
import { generateNumberArray, upperFirstChar } from "utils/library";
import styles from "./PageWithTable.module.scss";

type PageWithTableProps = {
  type: string;
  breadcrumb: string;
};

const PageWithTable: React.FC<PageWithTableProps> = ({ type, breadcrumb }) => {
  const [data, setData] = useState<CategoriesDataType | itemsDataType>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const typedDispatch = useThunkDispatch();

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
    switch (type.toLowerCase()) {
      case "category":
        typedDispatch(fetchCategoryList((currentPage - 1) * itemsPerPage))
          .then((data) => {
            console.log(data);
            setData(data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
        break;

      case "item":
        // typedDispatch(fetchCategoryList((currentPage - 1) * itemsPerPage)).then(
        //   (data) => {
        //     console.log(data);
        //     setData(data);
        //   }
        // );
        break;

      default:
        break;
    }
  }, [typedDispatch, currentPage, type]);

  return (
    <div className={classNames(styles.page)}>
      <h1 className="u-text600">{breadcrumb}</h1>

      <div
        className={classNames(
          styles.pageContent,
          "u-shadowMedium u-backgroundWhite u-roundedMedium"
        )}
      >
        <header className="u-backgroundLightest u-paddingHorizontalMedium u-paddingVerticalTiny u-textPrimaryDarker">
          {upperFirstChar(type)} list
        </header>
        <div className="u-paddingHorizontalMedium u-paddingVerticalSmall">
          {!isLoading && (
            <>
              {/*Table section  */}
              <Table
                list={data?.items}
                type={type}
                editHandle={() => {}}
                removeHandle={() => {}}
              />

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
