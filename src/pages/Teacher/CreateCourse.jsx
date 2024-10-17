import {useEffect, useState, useCallback} from "react";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {
    setCategory,
    setCourseDate,
    setDescription,
    setId, setImageUrl,
    setIsPublished,
    setPrice,
    setTitle
} from "@/store/features/courseSlice.js";
import {setChapter, setChapterId} from "@/store/features/videoSlice.js";
import {useDropzone} from 'react-dropzone'

const CreateCourse = () => {

    const [isTitleEditable, setIsTitleEditable] = useState(false);
    const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
    const [isCategoryEditable, setIsCategoryEditable] = useState(false);
    const [isPriceEditable, setIsPriceEditable] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [sampleImage, setSampleImage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const onDrop = useCallback(acceptedFiles => {
    //     // Do something with the files
    // }, [])


    const path = window.location.pathname;
    const courseId = path.split('/').pop();
    const userId = useSelector(state => state.user.userId);

    const {title, description, category, price, imageUrl, courseChapters} = useSelector(state => state.course);

    const getCourseDetails = async () => {
        try {
            const path = process.env.BASE_URL + `/course`;
            const response = await axios.get(path, {
                withCredentials: true,
                params: {
                    id: courseId
                }
            })
            dispatch(setCourseDate(response.data.course))
        } catch (error) {
            console.log(error)
        }
    }

    const course = useSelector(state => state.course);
    const updateCourse = async (isPublished) => {
        dispatch(setIsPublished(isPublished));
        try{
            const filePath = `${userId}/${courseId}/thumbnail`
            const url = process.env.BASE_URL + `/courses/${courseId}/update`;
            const response = await axios.put(url, {
                course:{
                    ...course,
                    imageUrl: filePath
                }
            }, {
                withCredentials: true,
            })
            navigate('/teacher')
            console.log(`course updated successfully`, response.data);
        } catch (e) {
            console.log(`error updating the course`);
        }
    }

    const handleAddChapter = async () => {
        try {
            await updateCourse(false);
            console.log(`base url is : `, process.env.BASE_URL)
            const url = process.env.BASE_URL + `/course/chapter/create`;
            const response = await axios.post(url,
                {
                    courseId: courseId
                },
                {
                    withCredentials: true,
                })
            const chapterId = response?.data?.chapter;
            navigate(`video-upload/${chapterId}`);
            dispatch(setChapter({}));
            dispatch(setChapterId(chapterId));
        } catch (e) {
            console.log(e)
        }
    };

    const handleEditChapter = (chapter) => {
        dispatch(setChapter(chapter));
        navigate(`video-upload/${chapter._id}`);
    };

    const triggerFileInput = () => {
        document.getElementById("fileInput").click();
    };

    const handleFileSelect = async (e) => {
        console.log(`file is selected`)
        const acceptedFiles = e.target.files;
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        console.log(`file with fileName : ${file.name} and type : ${file.type} selected`);
        const filePath = `${userId}/${courseId}/thumbnail`
        try {
            const path = process.env.BASE_URL + `/upload-file`;
            const response = await axios.post(path, {
                // fileName: file.name,
                fileName: filePath,
                fileType: file.type
            }, {
                withCredentials: true,
            })
            const {url, fileUrl} = response.data;
            await uploadFileToS3(url, file, filePath, fileUrl);
            console.log(`fetched pre-signed url successfully`);
        } catch (e) {
            console.log(`error fetching url`, e);
        }
    }

    const uploadFileToS3 = async (url, file, filePath, fileUrl) => {
        setUploading(true);
        try {
            console.log(`file details:`, file);
            // const url = process.env.BASE_URL + `/course/${file.name}`;
            const response = await axios.put(url, file, {
                    headers: {
                        'Content-Type': file.type, // Set the correct content type of the file
                    },
                    // withCredentials: true,
                    onUploadProgress: progressEvent => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    }
                },
            )
            dispatch(setImageUrl(filePath))
            setSampleImage(fileUrl);
            console.log(`response on uploading image is`, response);
            console.log(`file successfully uploaded to s3`)
        } catch (e) {
            console.log(`error uploading the file`, e);
        }
    }

    useEffect(() => {
        getCourseDetails();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between p-4">
                <h2 className="text-2xl p-4 ml-4 font-semibold">Customize your course</h2>
                <div className="space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg shadow-md"
                        onClick={() => updateCourse(false)}
                    >
                        Save as Draft
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md"
                        onClick={() => updateCourse(true)}
                    >
                        Publish
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md"
                        onClick={() => {
                            deleteCourse();
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 p-6">
                {/* Left Column: Customize Course Section */}
                <div className="space-y-6">
                    {/* Course Title */}
                    <div className="bg-white">

                        {/* Toggle Between p and Input for Course Title */}
                        <div className="mb-4 p-4 rounded-lg shadow-md bg-gray-100">


                            <div className="flex items-center space-x-2">
                                <h3 className="text-lg w-full">Course title</h3>

                                <Button
                                    variant="outline"
                                    onClick={() => setIsTitleEditable(!isTitleEditable)}
                                >
                                    {isTitleEditable ? "Save" : "Edit title"}
                                </Button>
                            </div>
                            {isTitleEditable ? (
                                <Input
                                    value={title}
                                    onChange={(e) => dispatch(setTitle(e.target.value))}
                                    className="w-full"
                                />
                            ) : (
                                <p className="w-full">{(title) ? title : `No title`}</p>
                            )}
                        </div>

                        {/* Toggle Between p and Textarea for Course Description */}
                        <div className="mb-4 p-4 rounded-lg shadow-md bg-gray-100">
                            <div className="flex items-center space-x-2">
                                <h3 className="text-lg w-full">Course description</h3>

                                <Button
                                    variant="outline"
                                    onClick={() => setIsDescriptionEditable(!isDescriptionEditable)}
                                >
                                    {isDescriptionEditable ? "Save" : "Edit description"}
                                </Button>
                            </div>
                            {isDescriptionEditable ? (
                                <Textarea
                                    value={description}
                                    onChange={(e) => dispatch(setDescription(e.target.value))}
                                    className="w-full"
                                />
                            ) : (
                                <p className="w-full">{(description) ? description : `No Description`}</p>
                            )}
                        </div>

                        {/* Course Image */}
                        <div className="mb-4 p-4 rounded-lg shadow-md bg-gray-100 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg">Course image</h3>
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    style={{display: "none"}} // Hide the default input
                                    onChange={handleFileSelect}
                                />
                                <Button variant="outline" onClick={triggerFileInput}>
                                    Upload Image
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src={sampleImage || course.imageUrl} alt="Course"
                                     className="w-full h-64 object-cover rounded-lg"/>
                            </div>
                        </div>

                        {/*                    <div*/}
                        {/*                        {...getRootProps()}*/}
                        {/*                        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer */}
                        {/*${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'} */}
                        {/*transition duration-300 ease-in-out`}*/}

                        {/*                    >*/}
                        {/*                        <input {...getInputProps()} />*/}
                        {/*                        {*/}
                        {/*                            isDragActive ? (*/}
                        {/*                                <p className="text-blue-500">Drop the files here ...</p>*/}
                        {/*                            ) : (*/}
                        {/*                                <p className="text-gray-500">Drag 'n' drop some files here, or click to select*/}
                        {/*                                    files</p>*/}
                        {/*                            )*/}
                        {/*                        }*/}
                        {/*                    </div>*/}


                        {/* Course Category */}
                        <div className="mb-4 p-4 rounded-lg shadow-md bg-gray-100">
                            <div className="flex items-center space-x-2">
                                <h3 className="text-lg w-full">Course category</h3>

                                <Button
                                    variant="outline"
                                    onClick={() => setIsCategoryEditable(!isCategoryEditable)}
                                >
                                    {isCategoryEditable ? "Save" : "Edit category"}
                                </Button>
                            </div>
                            {isCategoryEditable ? (
                                <Input
                                    className="w-full"
                                    value={category}
                                    placeholder="e.g., Photography"
                                    onChange={(e) => dispatch(setCategory(e.target.value))}
                                />
                            ) : (
                                <p className="w-full">{(category) ? category : `No category`}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Course Chapters & Course Price */}
                <div className="space-y-6">
                    {/* Course Chapters */}
                    <div className="mb-4 p-4 rounded-lg shadow-md bg-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Course chapters</h2>
                        <div className="space-y-2">
                            {courseChapters?.map((chapter) => (
                                <div
                                    key={chapter.id}
                                    className="flex items-center justify-between p-2 bg-blue-100 rounded-lg"
                                >
                                    <div>
                                        <p>{chapter.title}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {chapter.isFree && <span
                                            className={`text-xs px-2 py-1 rounded-lg bg-green-100 text-green-600`}
                                        >
                                        Free
                                    </span>}
                                        <Button variant="outline" size="sm"
                                                onClick={() => handleEditChapter(chapter)}>
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" onClick={handleAddChapter}>
                                + Add a chapter
                            </Button>
                        </div>
                    </div>

                    {/* Course Price */}
                    <div className="mb-4 p-4 rounded-lg shadow-md bg-gray-100">
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg w-full">Price</h3>

                            <Button
                                variant="outline"
                                onClick={() => setIsPriceEditable(!isPriceEditable)}
                            >
                                {isPriceEditable ? "Save" : "Edit Price"}
                            </Button>
                        </div>
                        {isPriceEditable ? (
                            <Input
                                className="w-full"
                                value={price}
                                placeholder="999"
                                onChange={(e) => dispatch(setPrice(e.target.value))}
                            />
                        ) : (
                            <p className="w-full">{(price) ? price : `0`}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
