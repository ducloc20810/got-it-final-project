import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Skeleton } from '@ahaui/react';
import { useFetch } from 'hooks';
import { fetchCategoryDetail } from 'redux/actions/category.action';
import { CategoryType } from 'pages/Categories/CategoriesType';
import { ItemType } from 'pages/Items/ItemsType';
import { fetchItemDetail } from 'redux/actions/item.action';
import styles from './itemDetail.module.scss';

const imageAlt = 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png';
const ItemDetail = () => {
  const { itemId = -1, categoryId = -1 } = useParams();
  const fetchCategory = useCallback(() => fetchCategoryDetail(+categoryId), [categoryId]);
  const fetchItem = useCallback(() => fetchItemDetail(+categoryId, +itemId), [categoryId, itemId]);
  const { data: category, isLoading: categoryLoading }: { data: CategoryType; isLoading: boolean } = useFetch(fetchCategory);
  const { data: item, isLoading: itemLoading }: { data: ItemType; isLoading: boolean } = useFetch(fetchItem);

  return (
    <div className={classNames(styles.page)}>
      <div className="u-marginBottomSmall">
        <h1 className="u-text600 u-marginNone ">
          {!categoryLoading && !itemLoading && category && item && (
            <>
              Category
              {' '}
              {'> '}
              {category.name ? (
                <Link to={`/categories/${category.id}/items`} className="hover:u-textPrimary">
                  {category.name}
                </Link>
              ) : null}
              {` > Item ${item?.id}`}
            </>
          )}

          {(categoryLoading || itemLoading) && <Skeleton width="400px" height="30px" />}
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
              <h1 className="u-text800 u-fontMedium u-marginBottomTiny">{item ? `Item ${item.id}` : 'Item'}</h1>
              <span className="u-text300 u-marginNone u-textNeutral100">{item ? item.author.name : 'Author'}</span>
              <p className="u-text400 u-marginTopSmall u-fontRegular">{item ? item.description : 'Description'}</p>
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
