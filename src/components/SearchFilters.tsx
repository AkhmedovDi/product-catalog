"use client";

import useFilterStore from "@/src/store/filterStore";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function SearchFilters() {
  const { searchQuery, categoryFilter, setSearchQuery, setCategoryFilter } =
    useFilterStore();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <TextField
        label="Поиск товаров"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel>Категория</InputLabel>
        <Select
          value={categoryFilter}
          label="Категория"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="electronics">Электроника</MenuItem>
          <MenuItem value="jewelery">Украшения</MenuItem>
          <MenuItem value="men's clothing">Мужская одежда</MenuItem>
          <MenuItem value="women's clothing">Женская одежда</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
