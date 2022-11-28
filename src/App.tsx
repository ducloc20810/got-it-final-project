import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Categories, Home, Items, Login, SignUp } from 'pages';
import { Layout, Modal, Message } from 'components/Common';
import styles from 'App.module.scss';
import classNames from 'classnames';

function App() {
  return (
    <BrowserRouter>
      <Modal />
      <Message />
      <Layout>
        <div
          className={classNames(
            styles.App,
            'u-backgroundLightest u-padding u-positionRelative u-paddingLarge',
          )}
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId/items" element={<Items />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
