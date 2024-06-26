import ErrorPage from "../pages/Error";
import routes from "./routeDefinations";
import Root from "../pages/Root";
import Protected from "../components/auth/Protected";
import UnAuth from "../components/auth/UnAuth";
import Login, { loginAction } from "../pages/login/_index";
import Books, { booksLoader, addBookAction } from "../pages/books/_index";
import Booking, { bookingAction, bookingLoader } from "../pages/booking/_index";
import Staff, { staffLoader } from "../pages/staff/_index";
import Questions from "../pages/questions/_index";
import Home from "../pages/home/_index";
import Signup, { signupAction } from "../pages/signup/_index";
import BookingDetail, {
  bookingDetailLoader,
  bookingDetailAction,
} from "../pages/booking/$id";

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
        path: routes.booking.path,
        element: (
          <Protected>
            <Booking />
          </Protected>
        ),
        loader: bookingLoader,
        action: bookingAction,
      },
      {
        path: routes.booking.children.path,
        element: (
          <Protected>
            <BookingDetail />
          </Protected>
        ),
        loader: bookingDetailLoader,
        action: bookingDetailAction,
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
          <Protected>
            <Signup />
          </Protected>
        ),
        action: signupAction,
      },
    ],
  },
];

export default routesConfig;
