import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initistialcoursestate = {
  courses: [],
  loading: false,
  error: "",
};

export const fetchCourse = createAsyncThunk("/courses/fetch", (catagory) => {
  const config = {
    headers: { authorization: `Bearer ${localStorage.getItem("UserToken")}` },
  };
  if (typeof catagory == "number") {
    return axios
      .get(
        `https://boiling-mesa-36077.herokuapp.com/product/get?page=${catagory}`,
        config
      )
      .then((res) => res.data);
  }
  if (catagory == "All") {
    return axios
    .get(
      `http://localhost:5000/api/v1/courses/course?category=${catagory}`,
      config
    )
    .then((res) => res.data);
  }
  if (catagory) {
    // if(catagory == "Smart Hudi" || catagory == "Burka" || catagory == "Arabic Hijab" || catagory == "Saree" || catagory == "Shoe" || catagory == "Cosmatic" || catagory == "T-shirts"){

    // }
    // else{
    //   return axios
    //   .get(`https://boiling-mesa-36077.herokuapp.com/product/get?keyword=${catagory}` , config)
    //   .then((res) => res.data);

    // }
    console.log(catagory);
    return axios
      .get(
        `http://localhost:5000/api/v1/courses/course?category=${catagory}&kewword=${catagory}`,
        config
      )
      .then((res) => res.data);
  }
  
  return axios
    .get(
      "http://localhost:5000/api/v1/courses/course",
      config
    )
    .then((res) => res.data);
});
export const coursesSlice = createSlice({
  name: "courses",
  initialState: initistialcoursestate,
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCourse.rejected, (state, action) => {
      state.loading = false;
      state.courses = [];
      state.error = action.error.message;
    });
  },
});

// export const {} = coursesSlice.actions
export default coursesSlice.reducer;
