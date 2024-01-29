const routes = {
  root: {
    path: "/",
  },
  books: {
    path: "/books",
    bookPage: {
      path: "/books/:bookId",
    },
  },
  rent: {
    path: "/rent",
  },
  staff: {
    path: "/staff",
  },
  questions: {
    path: "/questions",
  },
};
export default routes;
