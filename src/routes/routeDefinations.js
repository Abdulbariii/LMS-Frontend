const routes = {
  login: {
    path: "/login",
  },
  signup: {
    path: "/signup",
  },
  root: {
    path: "/",
  },
  books: {
    path: "/books",
    bookPage: {
      path: "/books/:bookId",
    },
  },
  booking: {
    path: "/booking",
    children: {
      path: "/booking/:id",
    },
  },
  staff: {
    path: "/staff",
  },
  questions: {
    path: "/questions",
  },
};
export default routes;
