export interface TProduct {
  name: string;
  title: string;
  category: string;
  author: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  quantity: number;
  isDeleted?: boolean;
}
