export interface Product {
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface AppConfig {
  dealers?: string[];
}
