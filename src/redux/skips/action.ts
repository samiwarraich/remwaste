import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Skip } from "@/types";
import { API_URL } from "@/constants";

export const fetchSkipData = createAsyncThunk(
  "skips/fetchSkipData",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch(API_URL);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message ?? "Failed to fetch skip data");
    }

    const data: Skip[] = await response.json();

    return data;
  }
);
