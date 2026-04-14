export type Article = {
  title: string;
  description: string;
  text: string;
  link: string;
  pubDate: Date;
  creator?: string;
  categories: string[];
  imageUrl: string;
};
