declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

type Product = {
  id: string;
  title: string;
  price: number;
  discountPercentage: number;
  discountPrice: number;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  rating: number;
}

type CartItem = {
  id: Product['id'];
  quantity: number;
}

type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;
