export interface ICategory {
  id: string;
  catName: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publicId: string;
  catName: string;
  links: null | string[];
  createdAt: string;
  authorEmail: string;
  author: {
    name: string;
  };
}
