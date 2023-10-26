import { lazyPageBuilder } from "../lib/routes";
import ErrorPage from "../pages/Error";
import routes from "./routeDefinations";
import Root from "../pages/Root";

const lazyHomePage = lazyPageBuilder(() => import("../pages/home/_index"));
const lazyBooksPage = lazyPageBuilder(() => import("../pages/books/_index"));
const lazyRentPage = lazyPageBuilder(() => import("../pages/rent/_index"));
const lazyStaffPage = lazyPageBuilder(() => import("../pages/staff/_index"));
const lazyQuestionsPage = lazyPageBuilder(() =>
  import("../pages/questions/_index")
);

const routesConfig = [
  {
    path: routes.root.path,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            lazy: lazyHomePage,
          },
          {
            path: routes.books.path,
            lazy: lazyBooksPage,
          },
          {
            path: routes.rent.path,
            lazy: lazyRentPage,
          },
          {
            path: routes.staff.path,
            lazy: lazyStaffPage,
          },
          {
            path: routes.questions.path,
            lazy: lazyQuestionsPage,
          },
        ],
      },
    ],
  },
];

export default routesConfig;
