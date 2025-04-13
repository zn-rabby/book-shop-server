export interface TProduct {
  name: string;
  title: string;
  category:
    | 'fiction'
    | 'children'
    | 'science'
    | 'religion'
    | 'history'
    | 'biography'
    | 'romance'
    | 'mystery'
    | 'selfHelp'
    | 'politics'
    | 'business'
    | 'education';
  author: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  quantity: number;
  isDeleted?: boolean;
}
