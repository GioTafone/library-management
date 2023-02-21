export type User = {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
};

export type Author = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  books?: [];
};

export type Book = {
  _id?: string;
  isbn?: string;
  title?: string;
  description?: string;
  publisher?: string;
  authors?: { _id?: string; firstName: string; lastName: string }[];
  category?: string;
  isAvailable?: boolean;
  publishedYear?: string;
};

export type PopupProps = {
  text?: string;
  content: string;
  handlePopup: () => void;
};

export type AddBookModalProps = {
  buttonText: string;
  isbn: string;
  title: string;
  description: string;
  publisher: string;
  category: string;
  publishedYear: string;
  handleChange: () => void;
  handleSubmit: () => void;
  text: string;
};

export type HeaderProps = {
  logo: string;
  home: string;
  about: string;
  contactUs: string;
  login: string;
};

export type MainProps = {
  title: string;
  subtitle: string;
};

export type SearchBookProps = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  title: string;
  publishedYear: string;
  category: string;
  authors: Author[];
  isAvailable: boolean
};

export interface CredentialResponse {
  /** This field is the returned ID token */
  credential?: string;
  /** This field sets how the credential is selected */
  select_by?:
    | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "brn_add_session"
    | "btn_confirm_add_session";
  clientId?: string;
}

export type DecodedUser = {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type EditAuthorModalProps = {
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
};

export type LoginModalProps = {
  buttonText: string;
  login: string;
  contentLogin: string | any;
};

export type NavbarProps = {
  adminLink: string;
  adminText?: string;
};

export type FetchBook = {
  isbn?: string;
  token?: string;
  bookId?:string,
  userId?: string

};

