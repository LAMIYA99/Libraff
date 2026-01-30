export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  isbn?: string;
  image?: string;
};

export type Order = {
  id: string;
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
