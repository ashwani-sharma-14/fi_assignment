"use client";

import { useEffect } from "react";
import { useProduct } from "@/store/useProducts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { createSlug } from "@/utils/slug";

interface FormattedProduct {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  type: string;
  thumbnail: string | null;
}

export default function Home() {
  const { productData, getData, loading, error } = useProduct();

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-destructive">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          Browse our collection of products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productData.map((product: FormattedProduct) => {
          const slug = createSlug(product.name);
          const discountPercentage =
            product.discount && product.discount > product.price
              ? Math.round(
                  ((product.discount - product.price) / product.discount) * 100
                )
              : 0;

          return (
            <Card
              key={product._id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/products/${slug}`}>
                <div className="relative h-64 w-full">
                  {product.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <p className="text-muted-foreground">No image</p>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl line-clamp-2">
                      {product.name}
                    </CardTitle>
                    {product.type && (
                      <Badge variant="secondary">{product.type}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.discount && product.discount > product.price && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">
                          ₹{product.discount.toLocaleString()}
                        </span>
                        <Badge variant="destructive" className="ml-auto">
                          {discountPercentage}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    View Details
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          );
        })}
      </div>

      {productData.length === 0 && !loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
}
