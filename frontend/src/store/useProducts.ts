import { create } from "zustand";
import { clientAxiosInstance } from "@/utils/clientAxiosInstance";
import { createSlug } from "@/utils/slug";

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

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productType: string;
  description?: string;
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
  discountPrice?: number;
}

interface FormattedProduct {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  type: string;
  thumbnail: string | null;
}

interface ProductState {
  productData: FormattedProduct[];
  productById: Product | null;
  loading: boolean;
  error: string | null;
  getData: () => Promise<void>;
  productByID: (id: string) => Promise<void>;
  getProductBySlug: (slug: string) => Promise<void>;
}
const findProductBySlug = (
  products: FormattedProduct[],
  slug: string
): FormattedProduct | undefined => {
  return products.find((product) => createSlug(product.name) === slug);
};

export const useProduct = create<ProductState>((set, get) => ({
  productData: [],
  productById: null,
  loading: false,
  error: null,
  getData: async () => {
    try {
      set({ loading: true, error: null });
      const response = await clientAxiosInstance.get("/product");
      if (!response.data.success) {
        throw new Error("Failed To fetch Products");
      }
      set({ productData: response.data.formattedProducts, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal Server Error";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
  productByID: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const response = await clientAxiosInstance.get(`/product/${id}`);
      if (!response.data.success) {
        throw new Error("Failed To fetch Product");
      }
      set({ productById: response.data.product, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal Server Error";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
  getProductBySlug: async (slug: string) => {
    try {
      set({ loading: true, error: null });
      const state = get();
      if (state.productData.length === 0) {
        await state.getData();
      }
      const updatedState = get();
      const product = findProductBySlug(updatedState.productData, slug);

      if (!product) {
        throw new Error("Product not found");
      }
      await updatedState.productByID(product._id);
      set({ loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal Server Error";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));
