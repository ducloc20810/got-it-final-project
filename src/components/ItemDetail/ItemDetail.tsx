import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Skeleton } from '@ahaui/react';
import { fetchItemDetail } from 'redux/actions/item';
import { breadcrumbSelector } from 'redux/reducers/breadcrumb';
import { fetchCategoryDetail } from 'redux/actions/category';
import { setBreadcrumb } from 'redux/actions/breadcrumb';
import { useAppSelector, useFetch, useTypedDispatch } from 'hooks';
import useParamsNum from 'hooks/useParamsNum';
import { ItemType } from 'components/Items/ItemsType';
import { Breadcrumb } from 'components/Common';
import styles from './itemDetail.module.scss';

const imageAlt = 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png';

const ItemDetail = () => {
  const breadcrumb = useAppSelector(breadcrumbSelector);
  const dispatch = useTypedDispatch();
  const { itemId, categoryId } = useParamsNum('itemId', 'categoryId');
  const fetchItem = useCallback(() => fetchItemDetail(+categoryId, +itemId), [categoryId, itemId]);

  const [categoryLoading, setCategoryLoading] = useState(false);

  const { data: item, isLoading: itemLoading }: { data: ItemType; isLoading: boolean } = useFetch(fetchItem);

  useEffect(() => {
    if (breadcrumb.length === 0 && !itemLoading && item) {
      setCategoryLoading(true);
      dispatch(fetchCategoryDetail(+categoryId)).then((category) => {
        const newBreadcrumb = [
          {
            title: 'Manage Category',
            href: '/categories',
          },
          {
            title: `${category.name}`,
            href: `/categories/${categoryId}/items`,
          },
          {
            title: `Item ${item.id}`,
            href: `categories/${categoryId}/items/${item.id}`,
          },
        ];

        dispatch(setBreadcrumb(newBreadcrumb));
        setCategoryLoading(false);
      }).catch(() => {
        setCategoryLoading(false);
      });
    }
  }, [breadcrumb.length, categoryId, dispatch, item, itemLoading]);

  return (
    <div className={classNames(styles.page)}>
      <div className="u-marginBottomSmall">
        <h1 className="u-text600 u-marginNone ">
          {!categoryLoading && <Breadcrumb />}
          {categoryLoading && <Skeleton width="400px" height="30px" />}
        </h1>
      </div>

      <div
        className={classNames(
          styles.pageContent,
          'u-shadowMedium u-backgroundWhite u-roundedMedium u-paddingExtraLarge',
        )}
      >
        {!itemLoading ? (
          <>
            <img src={item?.imageUrl || imageAlt} alt="imageContent" width="100%" height="auto" />
            <div className="u-flex u-flexColumn u-alignItemsCenter">
              <h1 className="u-text800 u-fontMedium u-marginBottomTiny">
                {item ? `Item ${item.id}` : 'Item'}
              </h1>
              <span className="u-text300 u-marginNone u-textNeutral100">
                {item ? item.author.name : 'Author'}
              </span>
              <p className="u-text400 u-marginTopSmall u-fontRegular">
                {item ? item.description : 'Description'}
              </p>
            </div>
          </>
        ) : (
          <>
            <Skeleton width="100%" height="250px" />
            <div>
              <Skeleton width="100" height="20px" />
              <Skeleton width="100" height="20px" />
              <Skeleton width="100" height="20px" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
