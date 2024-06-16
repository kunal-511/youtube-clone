/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Container, Wrapper, Title, Close, Input, Desc, Button, Label } from "./Styles/UploadStyledComponent"
import { getStorage, ref, uploadBytestResumable, getDownloadURL } from "firebase/storage"
const Upload = ({ setOpen }) => {
    const [img, setImg] = useState(undefined)
    const [video, setVideo] = useState(undefined)
    const [imgPercentage, setImgPercentage] = useState(0)
    const [videoPercentage, setVideoPercentage] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState([])
    const handleTags = (e) => {
        setTags(e.target.value.split(","))

    }
    const uploadFile = (file) => {
        const storage = getStorage()
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)

        
    }
    useEffect(() => {
        uploadFile(video)
    }, [video])


    useEffect(() => {
        uploadFile(img)

    }, [img])

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Label>Video:</Label>
                <Input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
                <Input onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" />
                <Desc onChange={e => setTitle(e.target.value)} placeholder="Description" rows={8} />
                <Input onChange={handleTags} type="text" placeholder="Separate the tags with commas." />
                <Label>Image:</Label>
                <Input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />
                <Button>Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload
