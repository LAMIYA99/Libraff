export type Book = {
  image?: string;
  title?: string;
  price?: number;
  disCountPrice?: number;
};
export type PicksCardProps = {
  image: string;
}

export type SectionHeadingProps = {
  title: string;
  highlight?: string;
  align?: "left" | "center" | "right";
}