import React, { useState } from 'react';

function CourseContentForm() {
    const [chapters, setChapters] = useState([]);
    const [chapterTitle, setChapterTitle] = useState('');
    const [lessons, setLessons] = useState([]);
    const [lessonName, setLessonName] = useState('');

    const addChapter = () => {
        if (chapterTitle) {
            const newChapter = {
                title: chapterTitle,
                lessons: [...lessons]
            };
            setChapters([...chapters, newChapter]);
            setChapterTitle('');
            setLessons([]);
        }
    };

    const addLesson = () => {
        if (lessonName) {
            const newLesson = {
                name: lessonName,
                video: null // Placeholder for video data
            };
            setLessons([...lessons, newLesson]);
            setLessonName('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Course Content</h1>
            <div className="space-y-6">
                <div>
                    <label htmlFor="chapterTitle" className="block text-sm font-medium text-gray-700">Chapter Title</label>
                    <input
                        type="text"
                        name="chapterTitle"
                        id="chapterTitle"
                        value={chapterTitle}
                        onChange={(e) => setChapterTitle(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button type="button" onClick={addChapter} className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Add Chapter</button>
                </div>
                <div>
                    <label htmlFor="lessonName" className="block text-sm font-medium text-gray-700">Lesson Name</label>
                    <input
                        type="text"
                        name="lessonName"
                        id="lessonName"
                        value={lessonName}
                        onChange={(e) => setLessonName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button type="button" onClick={addLesson} className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Add Lesson</button>
                </div>
            </div>
        </div>
    );
}

export default CourseContentForm;
