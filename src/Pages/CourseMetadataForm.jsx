import React, { useState } from 'react';

function CourseMetadataForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        duration: '',
        price: '',
        prerequisites: '',
        thumbnail: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: e.target.type === 'file' ? e.target.files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        console.log('Form data submitted:', formData);
        // Here you would typically handle the form submission to the backend
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Course Metadata</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Course Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        rows="4"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        id="category"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Category</option>
                        <option value="web_development">Web Development</option>
                        <option value="data_science">Data Science</option>
                        <option value="programming_languages">Programming Languages</option>
                        <option value="cloud_computing">Cloud Computing</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (weeks)</label>
                    <input
                        type="number"
                        name="duration"
                        id="duration"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700">Prerequisites</label>
                    <input
                        type="text"
                        name="prerequisites"
                        id="prerequisites"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={formData.prerequisites}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
                    <input
                        type="file"
                        name="thumbnail"
                        id="thumbnail"
                        className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CourseMetadataForm;
