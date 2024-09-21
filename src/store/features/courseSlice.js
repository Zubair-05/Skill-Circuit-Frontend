import {createSlice} from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "courseSlice",
    initialState: {
        courseId:'',
        title:'',
        description:'',
        category:'',
        price:'',
        imageUrl:'',
        courseChapters:[]
    },
    reducers: {

        setId:(state, action) => {
            state.courseId = action.payload;
        },
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setPrice: (state, action) => {
            state.price = action.payload
        },
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload
        },
        addCourseChapters: (state, action) => {
            state.courseChapters.push(action.payload)
        },
        setCourseDate : (state, action) => {
            const {_id, title, description, category, price, imageUrl, modules} = action.payload
            state.courseId = _id;
            state.courseChapters = modules;
            state.title = title;
            state.description = description;
            state.price = price;
            state.imageUrl = imageUrl;
            state.category = category;
        }
    }
})

export const {
    setTitle,
    setDescription,
    setCategory,
    setId,
    setPrice,
    setImageUrl,
    addCourseChapters,
    setCourseDate
} = courseSlice.actions;

export default courseSlice.reducer;
