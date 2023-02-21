import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchBooksThunk } from "redux/asyncThunks/bookThunks";
import { fetchAuthorThunk } from "redux/asyncThunks/authorThunks";
import Navbar from "components/Navbar";
import Main from "components/Main";
import HomeBooksDisplay from "components/HomeBooksDisplay";
import SearchBook from "components/SearchBook";

const Home = () => {
  const dispatch = useAppDispatch();
  const authors = useAppSelector((state) => state.authors.items);

  useEffect(() => {
    dispatch(fetchBooksThunk());
    dispatch(fetchAuthorThunk());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    publishedYear: "",
    category: "",
    authorId: "",
    isAvailable: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { publishedYear, title, category, authorId, isAvailable } = formData;
    let filter = "";

    if (publishedYear) {
      filter += `publishedYear=${publishedYear}&`;
    }
    if (title) {
      filter += `title=${title.toLowerCase()}&`;
    }
    if (category) {
      filter += `category=${category}&`;
    }
    if (authorId) {
      filter += `authors=${authorId}&`;
    }
    if (isAvailable) {
      filter += `isAvailable=${isAvailable}&`;
    }
    if (filter) {
      return dispatch(fetchBooksThunk({ filter }));
    }
    dispatch(fetchBooksThunk());
  };

  return (
    <>
      <Navbar
        adminText={<Link to="/admin/dashboard">Admin Dash</Link>}
        userText={<Link to="/user/dashboard">User Dash</Link>}
      />
      <Main title="The city library" subtitle="We share culture" />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="flex flex-col col-span-2">
          <SearchBook
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            title={formData.title}
            publishedYear={formData.publishedYear}
            category={formData.category}
            authors={authors}
            isAvailable={formData.isAvailable}
          />
        </div>
        <HomeBooksDisplay />
      </div>
    </>
  );
};

export default Home;
