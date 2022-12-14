import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { db} from "../FireBase/firebase";
import {doc, getDoc} from "firebase/firestore";

const initialState = {products: null, productInfo: {}, productQuantity: 1, searchRequest: {values: ''}}

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload
    },
    setInfo: (state, action) => {
      state.productInfo = action.payload
    },
    clearInfo: (state) => {
      state.productQuantity = 1
      state.productInfo = {}
    },
    counterIncrement: (state) => {
      state.productQuantity = state.productQuantity + 1
    },
    counterDecrement: (state) => {
      state.productQuantity = state.productQuantity - 1
    },
    searchProduct: (state, action) => {
      state.searchRequest = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
  }
})

export const selectProducts = (state) => state.product.products

export const selectProductInfo = (state) => state.product.productInfo

export const selectQuantity = (state) => state.product.productQuantity

export const selectSearchRequest = (state) => state.product.searchRequest

export const {setProduct, setInfo, clearInfo, counterIncrement, counterDecrement, searchProduct} = productSlice.actions

export const searchProducts = createAsyncThunk('searchProduct', async (value = '') => {
  const getData = async () => {

    const docRef = doc(db, "guitar","pDeMSLxxO7PXv0yrDRPP");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().guitar
    } else {
      // doc.data() will be undefined in this case
      return null
    }
  }

  const data = await getData()

  const sort = await function () {
    const result = []
    const all = data
    const inputValue = value.toLowerCase()
    all.forEach(product => {

      if (product.name.toLowerCase().includes(inputValue)) {
        result.push(product)
      }
    })
    return result
  }
  return sort()
})

export default productSlice;
