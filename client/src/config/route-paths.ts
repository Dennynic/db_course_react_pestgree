import MainPage from '../pages/main';
import CarPage from '../pages/car';
import PlacePage from '../pages/place';
import PaymentPage from '../pages/payment';
import ReportPage from '../pages/report';

import {
  MAIN_PAGE,
  CAR_PAGE,
  CLIENT_PAGE,
  PLACE_PAGE,
  PAYMENT_PAGE,
  REPORT_PAGE
} from 'config/consts';

export const publicRoutes = [
  {
    path: MAIN_PAGE,
    Component: MainPage,
  },
  {
    path: CAR_PAGE,
    Component: CarPage,
  },
  
  {
    path: PLACE_PAGE,
    Component: PlacePage,
  },
  {
    path: PAYMENT_PAGE,
    Component: PaymentPage,
  },
  {
    path: REPORT_PAGE,
    Component: ReportPage,
  },
];
