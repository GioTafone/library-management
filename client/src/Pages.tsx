import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import BookPage from "pages/BookPage";
import Dashboard from "pages/Dashboard";
import BooksTab from "pages/BooksTab";
import AuthorTab from "pages/AuthorTab";
import UserTab from "pages/UserTab";
import AdminBookDetails from "pages/AdminBookDetails";
import AdminAuthorDetails from "pages/AdminAuthorDetails";
import UserDashboard from "pages/UserDashboard";
import AdminPrivateRoute from "components/AdminPrivateRoute";
import UserPrivateRoute from "components/UserPrivateRoute";
import NotFound from "pages/NotFound";

const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/book/:isbn"
          element={
            <UserPrivateRoute>
              <BookPage />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <UserPrivateRoute>
              <UserDashboard />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/dashboard/books"
          element={
            <AdminPrivateRoute>
              <BooksTab />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard/book/:_id"
          element={
            <AdminPrivateRoute>
              <AdminBookDetails />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard/authors"
          element={
            <AdminPrivateRoute>
              <AuthorTab />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard/author/:_id"
          element={
            <AdminPrivateRoute>
              <AdminAuthorDetails />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard/users"
          element={
            <AdminPrivateRoute>
              <UserTab />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Pages;
