"use client";

import {
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Rating,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useCartStore } from "@/src/store/cartStore";
import { Product } from "@/src/api/getProducts";

export default function ProductCard({ product }: { product: Product }) {
  const { items, addItem } = useCartStore();
  const itemInCart = items.find((item) => item.id === product.id);
  const quantity = itemInCart?.quantity || 0;

  return (
    <Card className="w-full max-w-xs hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <Typography
          variant="body1"
          className="font-bold text-gray-900 line-clamp-2"
        >
          {product.title}
        </Typography>
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{ width: "100%", height: 200 }}
          className="w-full h-40 object-contain mt-2"
        />

        <div>
          <Box className="flex items-center justify-between mt-2">
            <Typography
              variant="subtitle1"
              className="!font-medium text-gray-900"
            >
              ${product.price.toFixed(2)}
            </Typography>

            <Box className="flex items-center">
              <Rating
                value={product.rating.rate}
                precision={0.5}
                readOnly
                size="small"
                className="text-yellow-500"
              />
              <Typography variant="body2" className="ml-1 text-gray-500">
                ({product.rating.count})
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={() =>
              addItem({
                id: product.id,
                title: product.title,
                price: product.price,
              })
            }
            className="mt-4 bg-blue-600 hover:bg-blue-700"
            sx={{
              py: 1,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            {quantity > 0 ? `В корзине (${quantity})` : "В корзину"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
