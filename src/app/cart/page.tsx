"use client";

import { Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import { Add, Remove, Delete, ShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/src/store/cartStore";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    items,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
    totalPrice,
  } = useCartStore();

  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingCart sx={{ fontSize: 80 }} color="disabled" />
        <Typography variant="h5" color="textSecondary">
          Ваша корзина пуста
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.push("/")}
        >
          Перейти к покупкам
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="outlined"
          startIcon={<ShoppingCart />}
          onClick={() => router.push("/")}
        >
          Продолжить покупки
        </Button>

        <Typography variant="h4" component="h1">
          Корзина ({items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
          товаров)
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Paper key={item.id} className="p-4" elevation={3}>
              <div className="flex flex-col sm:flex-row gap-4">
                {item.image && (
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography color="textSecondary" className="mt-1">
                    ${item.price.toFixed(2)}
                  </Typography>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center border rounded">
                    <IconButton
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography className="px-2">{item.quantity}</Typography>
                    <IconButton onClick={() => incrementQuantity(item.id)}>
                      <Add />
                    </IconButton>
                  </div>
                  <Typography className="font-bold min-w-[80px] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton onClick={() => removeItem(item.id)} color="error">
                    <Delete />
                  </IconButton>
                </div>
              </div>
            </Paper>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Paper className="p-4 sticky top-4" elevation={3}>
            <Typography variant="h6" className="mb-4">
              Итог заказа
            </Typography>
            <Divider className="my-2" />
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <Typography>Товары:</Typography>
                <Typography>
                  {items.reduce((acc, item) => acc + item.quantity, 0)} шт.
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography>Общая стоимость:</Typography>
                <Typography variant="h6">${totalPrice().toFixed(2)}</Typography>
              </div>
            </div>
            <Divider className="my-2" />
            <Button
              fullWidth
              variant="contained"
              size="large"
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Оформить заказ
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              size="large"
              className="!mt-2"
              onClick={clearCart}
            >
              Очистить корзину
            </Button>
          </Paper>
        </div>
      </div>
    </div>
  );
}
