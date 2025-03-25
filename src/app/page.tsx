"use client";

import { useEffect, useState } from "react";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { fetchProducts, Product } from "@/src/api/getProducts";
import ProductCard from "@/src/components/ProductCard";
import useFilterStore from "@/src/store/filterStore";
import { useRouter } from "next/navigation";
import SearchFilters from "@/src/components/SearchFilters";
import { useCartStore } from "@/src/store/cartStore";
import { Grid, Skeleton, Stack } from "@mui/material";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { searchQuery, categoryFilter } = useFilterStore();
  const [isLoading, setIsLoading] = useState(false);

  const { items } = useCartStore();

  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        alert("Не удалось загрузить товары");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product?.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter
      ? product.category === categoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto relative px-4 py-8">
      <div
        onClick={() => router.push("/cart")}
        className="absolute top-7 right-0 border rounded-2xl px-8 py-0.5 text-amber-800 cursor-pointer flex items-center gap-2"
      >
        <ShoppingCartCheckoutIcon fontSize="small" />
        <span className="font-medium">{items.length}</span>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">Каталог товаров</h1>

      <SearchFilters />
      {isLoading ? (
        <div className="container mx-auto px-4 py-8">
          <Grid container spacing={4}>
            {[...Array(8)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Stack spacing={1} className="p-4">
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={40}
                    className="mt-2"
                  />
                </Stack>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
