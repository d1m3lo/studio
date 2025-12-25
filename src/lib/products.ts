import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  category: 'Calçados' | 'Roupas';
  price: number;
  image: ImagePlaceholder;
  imageHover: ImagePlaceholder;
  tags?: ('lançamento' | 'destaque' | 'oferta')[];
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
    name: 'Tênis Corredor Urbano',
    category: 'Calçados',
    price: 129.99,
    image: getImage('product-1'),
    imageHover: getImage('product-1-hover'),
    tags: ['lançamento', 'destaque'],
  },
  {
    id: 'prod_8',
    name: 'Jaqueta Declaração Urbana',
    category: 'Roupas',
    price: 250.00,
    image: getImage('product-8'),
    imageHover: getImage('product-8-hover'),
    tags: ['lançamento'],
  },
  {
    id: 'prod_3',
    name: 'Botas Lança-Vibe',
    category: 'Calçados',
    price: 189.99,
    image: getImage('product-3'),
    imageHover: getImage('product-3-hover'),
    tags: ['lançamento', 'destaque'],
  },
  {
    id: 'prod_6',
    name: 'Camiseta Gráfica Grotesk',
    category: 'Roupas',
    price: 55.00,
    image: getImage('product-6'),
    imageHover: getImage('product-6-hover'),
    tags: ['lançamento'],
  },
  {
    id: 'prod_5',
    name: 'Corredores Aero-Lite',
    category: 'Calçados',
    price: 110.00,
    image: getImage('product-5'),
    imageHover: getImage('product-5-hover'),
    tags: ['destaque'],
  },
  {
    id: 'prod_4',
    name: 'Moletom Essencial',
    category: 'Roupas',
    price: 89.99,
    image: getImage('product-4'),
    imageHover: getImage('product-4-hover'),
    tags: ['destaque'],
  },
  {
    id: 'prod_2',
    name: 'Camiseta Monocromática',
    category: 'Roupas',
    price: 49.99,
    image: getImage('product-2'),
    imageHover: getImage('product-2-hover'),
    tags: ['oferta'],
  },
  {
    id: 'prod_7',
    name: 'Mocassins Pisa',
    category: 'Calçados',
    price: 95.50,
    image: getImage('product-7'),
    imageHover: getImage('product-7-hover'),
    tags: ['oferta'],
  },
];
