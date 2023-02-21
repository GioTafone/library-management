import { Link } from "react-router-dom";

import Main from "components/Main";
import Navbar from "components/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar userText={<Link to="/">Go Back</Link>} />
      <Main title="Page not found" subtitle="Please Go back" />
    </>
  );
};

export default NotFound;
