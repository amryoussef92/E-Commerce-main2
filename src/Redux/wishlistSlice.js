import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  token: localStorage.getItem("userToken"),
};

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (id) => {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: id },
      { headers }
    );
    return response.data;
  }
);

export const deleteWishlist = createAsyncThunk(
  "wishlist/deleteWishlist",
  async (id) => {
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      { headers }
    );
    return response.data;
  }
);

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async () => {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { headers }
    );
    return response.data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishListNumber: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishListNumber = action.payload.count;
        state.status = "succeeded";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishListNumber += 1;
        state.status = "succeeded";
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.wishListNumber -= 1;
        state.status = "succeeded";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default wishlistSlice.reducer;