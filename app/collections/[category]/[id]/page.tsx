import React from 'react';
import { collectionsData } from '@/lib/constants/Collections';
import ProductListPage from './ProductListPage';

type Category = keyof typeof collectionsData;

type PageProps = {
  params: Promise<{
    category: string;
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { category, id } = await params;
  await searchParams; // We need to await this even if we don't use it

  // Ensure the category exists in our data
  if (!(category in collectionsData)) {
    throw new Error(`Category ${category} not found`);
  }

  return <ProductListPage id={id} category={category as Category} />;
}
