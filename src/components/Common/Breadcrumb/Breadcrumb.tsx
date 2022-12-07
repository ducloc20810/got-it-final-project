import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumb as AhaBreadcrumb } from '@ahaui/react';
import { BreadcrumbItem } from 'types/redux';
import { breadcrumbSelector } from 'redux/reducers/breadcrumb';
import { setBreadcrumb } from 'redux/actions/breadcrumb';
import { useAppSelector, useTypedDispatch } from 'hooks';
import styles from './Breadcrumb.module.scss';

const Breadcrumb = () => {
  const breadcrumb = useAppSelector(breadcrumbSelector);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handleItemClick = (item:BreadcrumbItem, index:number) => {
    if (index === breadcrumb.length - 1) {
      return;
    }
    const copy = [...breadcrumb].slice(0, index + 1);
    dispatch(setBreadcrumb(copy));
    navigate(item.href);
  };

  return (
    <div className={classNames(
      styles.breadcrumbList,
      breadcrumb.length === 1 && styles.breadcrumbListWithOneItem,
    )}
    >
      <AhaBreadcrumb>
        {breadcrumb.map((item:BreadcrumbItem, index:number) => (
          <AhaBreadcrumb.Item onClick={() => handleItemClick(item, index)} key={item.href}>
            {item.title}
          </AhaBreadcrumb.Item>
        ))}
      </AhaBreadcrumb>
    </div>

  );
};

export default Breadcrumb;
