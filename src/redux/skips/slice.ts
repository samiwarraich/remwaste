import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FilterKey, FilterValue, Skip, SkipsState } from "@/types";
import { fetchSkipData } from "@/redux/skips/action";

const initialState: SkipsState = {
  skips: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    size: null,
    allowed_on_road: null,
    allows_heavy_waste: null,
  },
  selectedSkipId: null,
};

const skipsSlice = createSlice({
  name: "skips",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ key: FilterKey; value: FilterValue }>
    ) => {
      const { key, value } = action.payload;
      if (key === "search") {
        state.filters[key] = (value as string) || "";
      } else if (key === "size") {
        state.filters[key] = value as number | null;
      } else if (key === "allowed_on_road" || key === "allows_heavy_waste") {
        state.filters[key] = value as boolean | null;
      }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    selectSkip: (state, action: PayloadAction<number | null>) => {
      state.selectedSkipId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkipData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSkipData.fulfilled,
        (state, action: PayloadAction<Skip[]>) => {
          state.loading = false;
          state.skips = action.payload;
        }
      )
      .addCase(fetchSkipData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch skips data";
      });
  },
});

export const { setFilter, clearFilters, selectSkip } = skipsSlice.actions;
export default skipsSlice.reducer;
