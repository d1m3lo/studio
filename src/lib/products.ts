import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  category: 'Footwear' | 'Clothing';
  price: number;
  image: ImagePlaceholder;
};

const getImage = (id: string): ImagePlaceholder => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
      // Fallback for safety, though should not be hit with correct data
      return { id: 'not-found', description: '', imageUrl: 'https://placehold.co/600x800', imageHint: '' };
    }
    return img;
}

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Urban Runner Sneakers',
    category: 'Footwear',
    price: 129.99,
    image: getImage('product-1'),
  },
  {
    id: 'prod_2',
    name: 'Mono-Chrome Tee',
    category: 'Clothing',
    price: 49.99,
    image: getImage('product-2'),
  },
  {
    id: 'prod_3',
    name: 'Vibe-Setter Boots',
    category: 'Footwear',
    price: 189.99,
    image: getImage('product-3'),
  },
  {
    id: 'prod_4',
    name: 'Essential Hoodie',
    category: 'Clothing',
    price: 89.99,
    image: getImage('product-4'),
  },
  {
    id: 'prod_5',
    name: 'Aero-Lite Runners',
    category: 'Footwear',
    price: 110.00,
    image: getImage('product-5'),
  },
  {
    id: 'prod_6',
    name: 'Grotesk Graphic Tee',
    category: 'Clothing',
    price: 55.00,
    image: getImage('product-6'),
  },
  {
    id: 'prod_7',
    name: 'Pisa Loafers',
    category: 'Footwear',
    price: 95.50,
    image: getImage('product-7'),
  },
  {
    id: 'prod_8',
    name: 'Street Statement Jacket',
    category: 'Clothing',
    price: 250.00,
    image: getImage('product-8'),
  },
];
