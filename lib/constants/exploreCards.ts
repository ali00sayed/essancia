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
        src: '/images/explore/hoodie_explore_mustard.webp',
        position: { top: '20%', left: '15%' },
      },
    ],
  },
  {
    id: 'sweatshirt',
    title: 'Sweat-Shirts',
    images: [
      {
        src: '/images/explore/sweatshirt_explore_powder_blue.webp',
        position: { top: '20%', left: '15%' },
      },
    ],
  },
  {
    id: 'tshirt',
    title: 'T-Shirts',
    images: [
      {
        src: '/images/showcaseCategory/tshirt_explore_purple.webp',
        position: { top: '20%', left: '15%' },
      },
    ],
  },
  {
    id: 'oversize',
    title: 'Oversize Tees',
    images: [
      {
        src: '/images/showcaseCategory/oversize_explore_tshirt_wine_red.webp',
        position: { top: '20%', left: '15%' },
      },
    ],
  },
  {
    id: 'joggers',
    title: 'Joggers',
    images: [
      {
        src: '/images/showcaseCategory/joggers_explore_navy.webp',
        position: { top: '20%', left: '15%' },
      },
    ],
  },
];
