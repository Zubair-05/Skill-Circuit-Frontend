import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addCourseChapters} from "@/store/features/courseSlice.js";
import {setDescription, setIsFree, setTitle} from "@/store/features/videoSlice.js";
import axios from "axios";
import {useEffect} from "react";

const ChapterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const id = useSelector(state => state.course.courseId);
    const video = useSelector(state => state.video);





    const handlePublish = async () => {
        try{
            const path = process.env.BASE_URL + `/course/chapter/add/content`
            const response = await axios.post(path, {
                chapter: video
            }, {
                withCredentials: true,
            })
            console.log(`course upload`, response);
            dispatch(addCourseChapters(video))
            navigate(`/course-create/${id}`);

        } catch (error){
            console.error(error)
        }
    }

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
                            onChange={(e) => {dispatch(setDescription(e.target.value))}}
                            value={video.description}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="preview">Preview</Label>
                        <Select id="preview" onValueChange={(e) => {dispatch(setIsFree(e))}}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select preview option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="not-free">Not Free</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button
                            onClick={handlePublish}
                        >Publish</Button>
                        <Button variant="secondary">Delete</Button>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="video">Upload Video</Label>
                        <div className="relative h-[300px] bg-muted rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <VideoIcon className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <Button variant="outline" className="absolute top-2 right-2">
                                Upload
                            </Button>
                        </div>
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
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
        </svg>
    );
}

export default ChapterForm;
