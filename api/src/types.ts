import { Document } from 'mongoose'

export interface ParsedToken {
  payload: {
    email: string
    email_verified: string
    name: string
    picture: string
    given_name: string
    family_name: string
    locale: string
  }
}

export interface VerifiedCallback {
  //=====Types to refactor====
  (error: any, user?: any, info?: any): void
}

export type Category =
  | 'Fiction'
  | 'Science'
  | 'Novel'
  | 'History'
  | 'Sci-Fi'
  | 'Bio'
  | 'Adventure'

export enum Permission {
  BOOK_READ = 'BOOK_READ',
  BOOK_DELETE = 'BOOK_DELETE',
  BOOK_UPDATE = 'BOOK_UPDATE',
  BOOK_CREATE = 'BOOK_CREATE',
  USER_READ = 'USER_READ',
  USER_DELETE = 'USER_DELETE',
  USER_UPDATE = 'USER_UPDATE',
  USER_CREATE = 'USER_CREATE',
}

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  books: string[]
}

export type BookDocument = Document & {
  isbn: string
  title: string
  description?: string
  publisher?: string
  authors?: string[]
  category: Category[]
  isAvailable: boolean
  borrowerId?: string | null
  publishedYear: string
  // borrowDate?: Date
  // returnDate?: Date
  //rating: number
}

export type RoleDocument = Document & {
  roleName: string
  permissions: Permission[]
}

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  role: string
  // activeBorrows?: string[]
  // isBanned: boolean
}

export type BorrowBook = Pick<BookDocument, 'borrowerId' | 'isAvailable'>
