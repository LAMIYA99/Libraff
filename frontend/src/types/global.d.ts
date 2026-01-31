export type Book = {
  id: string;
  code: string;
  title: string;
  price: number;
  discountPrice: number;
  image: string;
  description: string;
  category: string;
  features: {
    binding: string;
    language: string;
    author: string;
    publisher: string;
    pageCount: number;
    age: string;
  };
  status?: string;
  rating?: number;
  numReviews?: number;
  reviews?: {
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
};

export type Order = {
  id?: string;
  _id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: any[];
  totalPrice: number;
  status: string;
  createdAt: string;
};

export type PicksCardProps = {
  image: string;
};

export type SectionHeadingProps = {
  title: string;
  highlight?: string;
  align?: string;
};

export type PaginationButtonsProps = {
  title?: string;
  prevIcon?: any;
  nextIcon?: any;
  pageCount?: string;
};

export type CartItem = {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
};

export type User = {
  id: string | number;
  email: string;
  role?: Role;
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
  name?: string;
};

export type Role = "ADMIN" | "USER";
