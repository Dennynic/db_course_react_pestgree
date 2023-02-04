import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavMenu from '../navbar/nav-menu';
import css from './index.scss';

import { MAIN_PAGE, REPORT_PAGE, PLACE_PAGE, CAR_PAGE } from 'config/consts';

const menuItems = [
  {
    title: 'Авто-Клиент',
    itemLink: MAIN_PAGE
  },
  {
    title: 'Авто',
    itemLink: CAR_PAGE
  },
  {
    title: 'Места',
    itemLink: PLACE_PAGE
  },
  {
    title: 'Отчеты',
    itemLink: REPORT_PAGE
  },

]


function NavBar() {
  return (
    <Container className={css.menuWrapper}>
      <Nav
        variant="pills"
        defaultActiveKey={MAIN_PAGE}
        className="justify-content-center ml-auto d-flex"
        style={{ gap: 10 }}
      >
        <NavMenu items = {menuItems} />
      </Nav>
    </Container>
  );
}

export default NavBar;
