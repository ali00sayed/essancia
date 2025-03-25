// Types
type Image = {
  src: string;
  position?: { top?: string; left?: string; right?: string };
};

export type Category = {
  id: string;
  title: string;
  images: Image[];
};

// New categories data
export const categories: Category[] = [
  {
    id: 'hoodie',
    title: 'Hoodies',
    images: [
      {
        src: '/images/fashion-showcase/fsc-hoodie-2.jpeg',
        position: { top: '20%', left: '15%' },
      },
    ],
  },
  {
    id: 'sweatshirt',
    title: 'Sweat-Shirts',
    images: [
      {
        src: '/images/collections/sweatshirts/sweatshirt-powder-blue.webp',

        position: { top: '20%', left: '15%' },
      },
    ],
  },
  {
    id: 'tshirt',
    title: 'T-Shirts',
    images: [
      {
        src: '/images/fashion-showcase/fsc-shirt-1.jpeg',
        position: { top: '20%', left: '15%' },
      },
    ],
  },
  {
    id: 'oversize',
    title: 'Oversize Tees',
    images: [
      {
        src: '/images/fashion-showcase/fsc-shirt-2.jpeg',
        position: { top: '20%', left: '15%' },
      },
    ],
  },
  {
    id: 'joggers',
    title: 'Joggers',
    images: [
      {
        src: '/images/joggers-collections/jogger6.webp',
        position: { top: '20%', left: '15%' },
      },
    ],
  },
];
