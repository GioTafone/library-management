import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

import { useAppDispatch } from "redux/hooks";
import { postUserCredentialThunk } from "redux/slices/authSlice";
import LoginModal from "components/LoginModal";

export type NavbarProps = {
  adminText?: ReactElement;
  userText?: ReactElement;
};

const Navbar = ({ adminText, userText }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const handleGoogleOnSuccess = (res: CredentialResponse) => {
    dispatch(postUserCredentialThunk(res));
    console.log("RES", res);
  };

  return (
    <div className="w-screen bg-primaryBlue shadow-md">
      <nav className="flex flex-row items-center justify-between p-4">
        <Link to="/">
          <p className="ml-10 h-10 w-10 text-3xl text-primaryZinc">
            tcl<span className="text-primaryOrange">||</span>l
          </p>
        </Link>
        <ul className="md:flex flex-row mr-10 text-primaryZinc ">
            <button className="m-2 text-md font-semibold px-5 hover:border-b-4 border-primaryOrange transition-all">
              {adminText}
            </button>
            <button className="m-2 text-md font-semibold px-5 hover:border-b-4 border-primaryOrange transition-all">
              {userText}
            </button>
          <li className="m-2 text-md font-semibold px-5">
            <LoginModal
              buttonText="Log in"
              login="Log In as User"
              contentLogin={
                <GoogleLogin
                  onSuccess={handleGoogleOnSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              }
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
