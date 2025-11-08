"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/store/useProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toast } from "@/components/ui/toast";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";

interface ProductVariant {
  productColour: string;
  productImage: string[];
}

interface EMIPlan {
  durationMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashback: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { productById, getProductBySlug, loading, error } = useProduct();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedEMI, setSelectedEMI] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug);
    }
  }, [slug, getProductBySlug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !productById) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="text-lg text-destructive">
            Error: {error || "Product not found"}
          </p>
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const product = productById;
  const currentVariant = product.variants?.[selectedVariant];
  const currentImages = currentVariant?.productImage || [];
  const discountPercentage =
    product.discountPrice && product.discountPrice > product.productPrice
      ? Math.round(
          ((product.discountPrice - product.productPrice) /
            product.discountPrice) *
            100
        )
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => router.push("/")} variant="ghost" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-lg border bg-muted overflow-hidden">
            {currentImages[selectedImageIndex] ? (
              <Image
                src={currentImages[selectedImageIndex]}
                alt={`${product.productName} - ${currentVariant?.productColour}`}
                fill
                className="object-contain p-4"
                priority
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
          </div>

          {currentImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {currentImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}

          {product.variants && product.variants.length > 1 && (
            <div>
              <p className="text-sm font-medium mb-2">
                Available in {product.variants.length} finishes
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map(
                  (variant: ProductVariant, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedVariant(index);
                        setSelectedImageIndex(0);
                      }}
                      className={`px-4 py-2 rounded-md border-2 transition-colors ${
                        selectedVariant === index
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {variant.productColour}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="destructive">NEW</Badge>
              <Badge variant="secondary">{product.productType}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-2">{product.productName}</h1>
            {currentVariant && (
              <p className="text-lg text-muted-foreground mb-4">
                {currentVariant.productColour}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">
                ₹{product.productPrice.toLocaleString()}
              </span>
              {product.discountPrice &&
                product.discountPrice > product.productPrice && (
                  <span className="text-2xl text-muted-foreground line-through">
                    ₹{product.discountPrice.toLocaleString()}
                  </span>
                )}
            </div>
            {discountPercentage > 0 && (
              <p className="text-sm text-green-600 font-medium">
                Save ₹
                {(
                  product.discountPrice! - product.productPrice
                ).toLocaleString()}{" "}
                ({discountPercentage}% off)
              </p>
            )}
          </div>
          {product.description && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          )}
          {product.emiPlans && product.emiPlans.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  EMI plans backed by mutual funds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.emiPlans
                  .sort((a, b) => a.durationMonths - b.durationMonths)
                  .map((emi: EMIPlan, index: number) => {
                    const isSelected = selectedEMI === index;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedEMI(index);
                          setShowToast(true);
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-md scale-[1.02] ring-2 ring-primary/20"
                            : "border-border bg-card hover:bg-muted/50 hover:border-primary/50 hover:scale-[1.01]"
                        }`}
                      >
                        <div className="flex-1 text-left">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-xl font-bold">
                              ₹{emi.monthlyAmount.toLocaleString()}
                            </span>
                            <span className="text-base text-muted-foreground">
                              x {emi.durationMonths} months
                            </span>
                          </div>
                          {emi.cashback > 0 && (
                            <p className="text-sm text-green-600 font-medium">
                              Additional cashback of ₹
                              {emi.cashback.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <div className="text-right">
                            <span className="text-sm text-muted-foreground">
                              {emi.interestRate === 0
                                ? "0% interest"
                                : `${emi.interestRate}% interest`}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground animate-zoom-in">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button size="lg" className="flex-1">
              Buy Now
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message="Your plan is selected"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
    </div>
  );
}
