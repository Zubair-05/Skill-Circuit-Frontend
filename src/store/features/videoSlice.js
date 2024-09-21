import {createSlice} from "@reduxjs/toolkit";

const videoSlice = createSlice({
    name: "videoSlice",
    initialState: {
        chapterId : '',
        title : '',
        description : '',
        isFree: false,
        videoUrl:''
    },
    reducers: {
        setChapterId: (state, action) => {
            state.chapterId = action.payload
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setIsFree: (state, action) => {
            state.freePreview = action.payload;
        },
        setVideoUrl: (state, action) => {
            state.videoUrl = action.payload;
        },
        setChapter: (state, action) => {
            const {_id, title, description, isFree, videoUrl} = action.payload
            state.chapterId = _id;
            state.title = title;
            state.description = description;
            state.isFree = isFree;
            state.videoUrl = videoUrl;
        }
    }
})

export const {
    setTitle,
    setDescription,
    setIsFree,
    setChapterId,
    setVideoUrl,
    setChapter
} = videoSlice.actions;

export default videoSlice.reducer;