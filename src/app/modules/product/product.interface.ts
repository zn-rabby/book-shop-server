export interface TProduct {
  title: string;
    category: string;
    author: string;
    description: string;
    price: number;
    image: string;
    publisher: string;
    publishedDate: Date;
    language: string;
    pages: number;
    rating: number;
    quantity: number;
    isDeleted: boolean;
    discount?: number;
    stockStatus: 'inStock' | 'outOfStock';
}
