import ErrorPage from "../pages/Error";
import routes from "./routeDefinations";
import Root from "../pages/Root";
import Protected from "../components/auth/Protected";
import UnAuth from "../components/auth/UnAuth";
import Login, { loginAction } from "../pages/login/_index";
import Books, { booksLoader, addBookAction } from "../pages/books/_index";
import Rent from "../pages/rent/_index";
import Staff, { staffLoader } from "../pages/staff/_index";
import Questions from "../pages/questions/_index";
import Home from "../pages/home/_index";
import Signup, { signupAction } from "../pages/signup/_index";

const routesConfig = [
  {
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        path: routes.root.path,
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: routes.books.path,
        element: (
          <Protected>
            <Books />
          </Protected>
        ),
        loader: booksLoader,
        action: addBookAction,
      },
      {
        path: routes.rent.path,
        element: (
          <Protected>
            <Rent />
          </Protected>
        ),
      },
      {
        path: routes.questions.path,
        element: (
          <Protected>
            <Questions />
          </Protected>
        ),
      },
      {
        path: routes.staff.path,
        element: (
          <Protected>
            <Staff />
          </Protected>
        ),
        loader: staffLoader,
      },

      {
        path: routes.login.path,
        element: (
          <UnAuth>
            <Login />
          </UnAuth>
        ),
        action: loginAction,
      },
      {
        path: routes.signup.path,
        element: (
          <UnAuth>
            <Signup />
          </UnAuth>
        ),
        action: signupAction,
      },
    ],
  },
];

export default routesConfig;
