import styles from "pages/Home/Home.module.scss";

const Home = () => {
  return (
    <div
      className={`${styles.home} u-backgroundWhite u-positionAbsolute u-positionCenter u-flex u-flexColumn u-paddingLarge u-roundedMedium u-shadowMedium u-alignItemsCenter u-justifyContentCenter`}
    >
      <h1 className="u-displayBlock u-text1200 ">Welcome to Hello</h1>
      <h3 className="u-displayBlock">This is my final project</h3>
    </div>
  );
};

export default Home;
