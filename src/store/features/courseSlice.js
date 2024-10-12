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
        isPublished : false,
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
        setIsPublished: (state, action) => {
            state.published = action.payload
        },
        addCourseChapters: (state, action) => {
            state.courseChapters.push(action.payload)
        },
        setCourseDate : (state, action) => {
            const {_id, title, description, category, price, thumbnail, modules} = action.payload
            state.courseId = _id;
            state.courseChapters = modules;
            state.title = title;
            state.description = description;
            state.price = price;
            state.imageUrl = thumbnail;
            state.category = category;
        },
        updateChapter: (state, action) => {
            console.log(action.payload);
            const { chapterId, title, isFree } = action.payload;

            state.courseChapters.forEach(chapter => {
                if (chapterId === chapter._id) {
                    chapter.title = title;
                    chapter.isFree = isFree;
                    chapter.id = chapterId;
                }
            });
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
    setCourseDate,
    setIsPublished,
    updateChapter
} = courseSlice.actions;

export default courseSlice.reducer;
