/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Container, Wrapper, Title, Close, Input, Desc, Button, Label } from "./Styles/UploadStyledComponent"
import app from "../firebase"
import { getStorage, ref, uploadBytestResumable, getDownloadURL } from "firebase/storage"
import { useNavigate } from "react-router-dom"
const Upload = ({ setOpen }) => {
    const [img, setImg] = useState(undefined)
    const [video, setVideo] = useState(undefined)
    const [imgPercentage, setImgPercentage] = useState(0)
    const [videoPercentage, setVideoPercentage] = useState(0)
    const [inputs, setInputs] = useState({})
    const [tags, setTags] = useState([])

    const navigate = useNavigate()

    const handleTags = (e) => {
        setTags(e.target.value.split(","))

    }
    const uploadFile = (file, urlType) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytestResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                urlType === "imgUrl" ? setImgPercentage(Math.round(progress)) : setVideoPercentage(Math.round(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL }
                    })
                });
            }
        );

    }
    useEffect(() => {
        video && uploadFile(video, "videoUrl")
    }, [video])


    useEffect(() => {
        img && uploadFile(img, "imgUrl")

    }, [img])

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        const res = await axios.post("/videos", { ...inputs, tags })
        setOpen(false)
        res.status === 200 && navigate(`/videos/${res.data._id}`)
    }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Label>Video:</Label>
                {videoPercentage > 0 ? ("Uploading: " + videoPercentage + "%") : (
                    <input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
                )}

                <Input name="title" onChange={handleChange} type="text" placeholder="Title" />
                <Desc name="description" onChange={handleChange} placeholder="Description" rows={8} />
                <Input onChange={handleTags} type="text" placeholder="Separate the tags with commas." />
                <Label>Image:</Label>
                {imgPercentage > 0 ? ("Uploading:" + imgPercentage + "%") : (
                    < Input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />)}
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload
