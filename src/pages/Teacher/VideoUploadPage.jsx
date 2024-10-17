import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addCourseChapters, setImageUrl, updateChapter} from "@/store/features/courseSlice.js";
import {setChapter, setDescription, setIsFree, setTitle, setVideoUrl} from "@/store/features/videoSlice.js";
import axios from "axios";
import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress.jsx";

const ChapterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const courseId = useSelector(state => state.course.courseId);
    const userId = useSelector(state => state.user.userId);
    const video = useSelector(state => state.video);

    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [sampleVideo, setSampleVideo] = useState();



    const handlePublish = async () => {
        try {
            const path = process.env.BASE_URL + `/course/chapter/add/content`
            const response = await axios.post(path, {
                chapter: {
                    ...video,
                    videoUrl: video.videoUrl.replace(process.env.S3_BASE_URL, "")
                }
            }, {
                withCredentials: true,
            })
            console.log(`course upload`, response);
            dispatch(updateChapter({}))
            navigate(`/teacher/course-create/${courseId}`);
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async () => {
        try {
            const path = process.env.BASE_URL + `/course/chapter/delete/${video.chapterId}`
            const response = await axios.delete(path, {
                withCredentials: true
            })
            navigate(`/teacher/course-create/${courseId}`);
        } catch (err) {
            console.error(err)
        }
    }

    const triggerFileInput = () => {
        document.getElementById("fileInput").click();
    };

    const handleFileSelect = async (e) => {
        console.log(`file is selected`)
        const acceptedFiles = e.target.files;
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        console.log(`file with fileName : ${file.name} and type : ${file.type} selected`);
        const filePath = `${userId}/${courseId}/${video.chapterId}`;
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
            dispatch(setVideoUrl(filePath));
            setSampleVideo(fileUrl);
            console.log(`response on uploading image is`, response);
            console.log(`file successfully uploaded to s3`)
        } catch (e) {
            console.log(`error uploading the file`, e);
        }
    }

    const getChapterDetails = async () => {
        const path = process.env.BASE_URL + `/chapter/${video.chapterId}`;
        try {
            const response = await axios.get(path, {
                withCredentials: true,
            })
            dispatch(setChapter(response?.data?.chapter))
        } catch (error) {
            console.log(`error getChapterDetails error: ${error}`)
        }
    }
    useEffect(() => {
        getChapterDetails();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="chapter-title">Chapter Title</Label>
                        <Input
                            id="chapter-title"
                            placeholder="Enter chapter title"
                            onChange={(e) => {
                                dispatch(setTitle(e.target.value));
                            }}
                            value={video.title}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            rows={5}
                            placeholder="Enter chapter description"
                            onChange={(e) => {
                                dispatch(setDescription(e.target.value))
                            }}
                            value={video.description}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="preview">Preview</Label>
                        <Select id="preview" value={video.isFree ? "true" : "false"} onValueChange={(e) => {
                            dispatch(setIsFree(e === "true"))
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select preview option"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Free</SelectItem>
                                <SelectItem value="false">Not Free</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button
                            variant="secondary"
                            onClick={() => navigate(`/teacher/course-create/${courseId}`)}
                        >Go Back</Button>
                        <Button
                            onClick={handlePublish}
                        >Publish</Button>
                        <Button
                            variant="secondary"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="video">Upload Video</Label>
                        <input
                            type="file"
                            id="fileInput"
                            accept="video/*"
                            style={{display: "none"}} // Hide the default input
                            onChange={handleFileSelect}
                        />
                        {/*<div className="relative h-[300px] bg-muted rounded-lg overflow-hidden">*/}
                        {/*    <div className="absolute inset-0 flex items-center justify-center">*/}
                        {/*        <VideoIcon className="w-12 h-12 text-muted-foreground"/>*/}
                        {/*    </div>*/}
                        {/*    <Button*/}
                        {/*        onClick={triggerFileInput}*/}
                        {/*        variant="outline" className="absolute top-2 right-2">*/}
                        {/*        Upload*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                        <div className="relative h-[300px] bg-muted rounded-lg overflow-hidden">
                            {/* Conditionally render the video or the icon with upload button */}
                            {video.videoUrl ? (
                                <video
                                    src={sampleVideo || video.videoUrl }
                                    className="absolute inset-0 w-full h-full object-cover"
                                    controls  // Optionally add controls to the video
                                />
                            ) : (
                                <>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <VideoIcon className="w-12 h-12 text-muted-foreground"/>
                                    </div>
                                    <Button
                                        onClick={triggerFileInput}
                                        variant="outline"
                                        className="absolute top-2 right-2"
                                    >
                                        Upload
                                    </Button>
                                </>
                            )}
                        </div>

                        <Progress value={progress} className="w-[100%]"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const VideoIcon = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/>
            <rect x="2" y="6" width="14" height="12" rx="2"/>
        </svg>
    );
}

export default ChapterForm;
