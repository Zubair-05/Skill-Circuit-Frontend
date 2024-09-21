import {useEffect, useState} from "react";
import {Button} from "@/Components/ui/button.jsx";
import {Input} from "@/Components/ui/input.jsx";
import {Textarea} from "@/Components/ui/textarea.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setCategory, setCourseDate, setDescription, setId, setTitle} from "@/store/features/courseSlice.js";
import {setChapter, setChapterId} from "@/store/features/videoSlice.js";

const CreateCourse = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch()
    const path = window.location.pathname;
    const id = path.split('/').pop();
    console.log(`id is`, id);
    const getCourseDetails = async () => {
        try{
            const path = process.env.BASE_URL + `/course`;
            const response = await axios.get(path, {
                withCredentials: true,
                params : {
                    id
                }
            })
            dispatch(setCourseDate(response.data.course))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCourseDetails();
    }, []);
    const {title, description, category, price, imageUrl, courseChapters} = useSelector(state => state.course);

    const [courseTitle, setCourseTitle] = useState("Cinematic Techniques Edited");
    const [courseDescription, setCourseDescription] = useState("This is a course on Cinematic Techniques");
    const [isTitleEditable, setIsTitleEditable] = useState(false);
    const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
    const [isCategoryEditable, setIsCategoryEditable] = useState(false);
    const [selectedImage, setSelectedImage] = useState("https://picsum.photos/seed/picsum/200/300");
    const [uploading, setUploading] = useState(false);

    const [chapters, setChapters] = useState([
        {id: 1, name: "Outro", status: "Published"},
        {id: 2, name: "Introduction", status: "Published", free: true},
        {id: 3, name: "Exploring the Basics", status: "Published"},
        {id: 4, name: "Practical Hands-on Activities", status: "Published"},
    ]);
    const [coursePrice, setCoursePrice] = useState(93.0);

    const handleAddChapter = async () => {
        // navigate(`/video-upload`)
        try {
            console.log(`base url is : `, process.env.BASE_URL)
            const url = process.env.BASE_URL + `/course/chapter/create`;
            const response = await axios.post(url,
                {
                    courseId: id
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

    // Handle file selection and image preview
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // For preview, you can generate a temporary URL for the selected image
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            try {
                const res = await axios.post('http://localhost:3000/upload-image', {
                    fileName: selectedImage.name,         // Send file name
                    contentType: selectedImage.type,
                });

                const {url} = await res.json();

                const upload = await axios.put(url, {
                    selectedImage
                }, {
                    headers: {
                        "Content-Type": selectedImage.type
                    }
                })

                if (upload.ok) {
                    // Step 3: Set the image URL for display (remove the query params from the presigned URL)
                    const uploadedImageUrl = url.split('?')[0];
                    setSelectedImage(uploadedImageUrl);
                    alert('Image uploaded successfully!');
                } else {
                    alert('Error uploading the image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div>
            <div><h2 className="text-2xl p-4 ml-4 font-semibold">Customize your course</h2></div>
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
                                    value={courseTitle}
                                    onChange={(e) => dispatch(setTitle(e.target.value))}
                                    className="w-full"
                                />
                            ) : (
                                <p className="w-full">{title}</p>
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
                                    value={courseDescription}
                                    onChange={(e) => dispatch(setDescription(e.target.value))}
                                    className="w-full"
                                />
                            ) : (
                                <p className="w-full">{description}</p>
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
                                    onChange={handleFileChange}
                                />
                                <Button variant="outline" onClick={triggerFileInput}>
                                    Upload Image
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src={selectedImage} alt="Course"
                                     className="w-full h-64 object-cover rounded-lg"/>

                            </div>
                        </div>

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
                                    placeholder="e.g., Photography"
                                    onChange={(e) => dispatch(setCategory(e.target.value))}
                                />
                            ) : (
                                <p className="w-full">{category}</p>
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
                                        {chapter.free && <span className="text-xs text-gray-500">Free</span>}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {chapter.freePreview && <span
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

                    {/* Course Pricing Section */}
                    <div className="mb-4 p-4 rounded-lg shadow-md bg-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Sell your course</h2>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="number"
                                value={coursePrice}
                                onChange={(e) => setCoursePrice(e.target.value)}
                                className="w-24"
                            />
                            <Button variant="outline">Edit price</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
