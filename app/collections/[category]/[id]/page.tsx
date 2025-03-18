import React from 'react';
import { collectionsData } from '@/lib/constants/Collections';
import ProductListPage from './ProductListPage';

type Category = keyof typeof collectionsData;

interface PageProps {
  params: {
    category: string;
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({ params }: PageProps) {
  const { category, id } = await params;
  return <ProductListPage id={id} category={category as Category} />;
}
