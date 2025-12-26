
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

type Gender = 'Masculino' | 'Feminino' | 'Unissex';
type Category = 'Calçados' | 'Roupas' | 'Acessórios' | 'Perfumes';

export type Product = {
  id: string;
  name: string;
  category: Category;
  subcategory?: string;
  price: number;
  oldPrice?: number;
  brand?: string;
  description?: string;
  genders?: Gender[];
  image: ImagePlaceholder;
  imageHover: ImagePlaceholder;
  images?: ImagePlaceholder[];
  tags?: ('lançamento' | 'destaque' | 'oferta')[];
  colors?: { name: string; hex: string; sizes: string[] }[];
  sizes?: string[];
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
    colors: [
      { name: 'Branco', hex: '#FFFFFF', sizes: ['38', '39', '40', '41', '42', '43'] },
      { name: 'Preto', hex: '#000000', sizes: ['40', '41', '42'] },
      { name: 'Cinza', hex: '#808080', sizes: ['39', '40', '43'] },
    ],
  },
  {
    id: 'prod_8',
    name: 'Jaqueta Declaração Urbana',
    category: 'Roupas',
    price: 250.00,
    image: getImage('product-8'),
    imageHover: getImage('product-8-hover'),
    tags: ['lançamento'],
    colors: [
        { name: 'Preto', hex: '#000000', sizes: ['P', 'M', 'G', 'GG'] },
        { name: 'Verde Militar', hex: '#556B2F', sizes: ['M', 'G'] },
    ],
  },
  {
    id: 'prod_3',
    name: 'Botas Lança-Vibe',
    category: 'Calçados',
    price: 189.99,
    image: getImage('product-3'),
    imageHover: getImage('product-3-hover'),
    tags: ['lançamento', 'destaque'],
    colors: [
        { name: 'Marrom', hex: '#8B4513', sizes: ['39', '40', '41', '42', '43', '44'] },
        { name: 'Preto', hex: '#000000', sizes: ['40', '41', '42', '44'] },
    ],
  },
  {
    id: 'prod_6',
    name: 'Camiseta Gráfica Grotesk',
    category: 'Roupas',
    price: 55.00,
    image: getImage('product-6'),
    imageHover: getImage('product-6-hover'),
    tags: ['lançamento'],
    colors: [
        { name: 'Branco', hex: '#FFFFFF', sizes: ['P', 'M', 'G'] },
        { name: 'Preto', hex: '#000000', sizes: ['M', 'G'] },
    ],
  },
    {
    id: 'prod_12',
    name: 'Tênis Retrô Colorido',
    category: 'Calçados',
    price: 145.00,
    image: getImage('product-12'),
    imageHover: getImage('product-12-hover'),
    tags: ['lançamento'],
    colors: [
        { name: 'Colorido', hex: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', sizes: ['37', '38', '39', '40', '41'] },
    ],
  },
  {
    id: 'prod_5',
    name: 'Corredores Aero-Lite',
    category: 'Calçados',
    price: 110.00,
    image: getImage('product-5'),
    imageHover: getImage('product-5-hover'),
    tags: ['destaque'],
    colors: [
        { name: 'Azul', hex: '#0000FF', sizes: ['38', '39', '40', '41', '42'] },
        { name: 'Cinza', hex: '#808080', sizes: ['40', '41'] },
    ],
  },
  {
    id: 'prod_4',
    name: 'Moletom Essencial',
    category: 'Roupas',
    price: 89.99,
    image: getImage('product-4'),
    imageHover: getImage('product-4-hover'),
    tags: ['destaque'],
    colors: [
        { name: 'Cinza Mescla', hex: '#B2BEB5', sizes: ['P', 'M', 'G', 'GG'] },
        { name: 'Preto', hex: '#000000', sizes: ['P', 'M', 'G'] },
        { name: 'Azul Marinho', hex: '#000080', sizes: ['M'] },
    ],
  },
  {
    id: 'prod_9',
    name: 'Óculos de Sol Aviador',
    category: 'Acessórios',
    price: 75.00,
    image: getImage('product-9'),
    imageHover: getImage('product-9-hover'),
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
     colors: [
        { name: 'Preto', hex: '#000000', sizes: ['P', 'M', 'G', 'GG', 'XG'] },
        { name: 'Branco', hex: '#FFFFFF', sizes: ['P', 'M'] },
    ],
  },
  {
    id: 'prod_7',
    name: 'Mocassins Pisa',
    category: 'Calçados',
    price: 95.50,
    image: getImage('product-7'),
    imageHover: getImage('product-7-hover'),
    tags: ['oferta'],
     colors: [
        { name: 'Bege', hex: '#F5F5DC', sizes: ['39', '40', '41'] },
        { name: 'Preto', hex: '#000000', sizes: ['39', '40'] },
    ],
  },
  {
    id: 'prod_10',
    name: 'Sandálias de Verão',
    category: 'Calçados',
    price: 45.00,
    image: getImage('product-10'),
    imageHover: getImage('product-10-hover'),
    tags: ['oferta'],
     colors: [
        { name: 'Marrom', hex: '#A52A2A', sizes: ['35', '36', '37', '38', '39'] },
        { name: 'Preto', hex: '#000000', sizes: ['37', '38'] },
    ],
  },
  {
    id: 'prod_11',
    name: 'Boné Clássico',
    category: 'Acessórios',
    price: 35.00,
    image: getImage('product-11'),
    imageHover: getImage('product-11-hover'),
    tags: ['oferta'],
     colors: [
        { name: 'Preto', hex: '#000000', sizes: [] },
        { name: 'Branco', hex: '#FFFFFF', sizes: [] },
        { name: 'Azul', hex: '#0000FF', sizes: [] },
    ],
  }
];
