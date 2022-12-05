import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@ahaui/react';
import { ReactComponent as Logo } from 'assets/images/logo-only.svg';
import styles from './Home.module.scss';

const Home = () => (
  <div
    className={classNames(
      styles.home,
      'u-backgroundWhite u-positionAbsolute u-positionCenter u-flex u-flexColumn u-paddingMedium u-roundedMedium u-shadowMedium u-alignItemsCenter n',
    )}
  >
    <div className="head ">
      <Logo className="u-marginAuto u-block" />
      <h3 className="u-displayBlock u-text800 u-textPrimary u-marginTopTiny u-marginBottomNone">
        Welcome to Hello
      </h3>
    </div>

    <h1 className="u-textCenter u-marginMedium u-fontRegular u-text800">
      A category management system that allow you to share category and item list
    </h1>

    <Link to="/categories" className="u-textWhite hover:u-textWhite u-marginTopAuto">
      <Button size="large">GET STARTED</Button>
    </Link>
  </div>
);

export default Home;
