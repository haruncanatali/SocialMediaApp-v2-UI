import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../defaults";
import ProjectNavbar from "../components/navbar";
import { Form, Button } from 'react-bootstrap';

const Update = () => {
    const navigate = useNavigate()
    const [post, setPost] = useState({})
    const location = useLocation()
    const receivedId = location.state?.id || 0
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        id:0
    });

    const getPost = async() => {
        await axios.get(baseUrl + "/Posts/" + receivedId)
        .then((apiResponse) => setPost(apiResponse.data.data))
        .catch((err) => console.log(err))
    }

    useState(() => {
        getPost()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        formData.id = post.id
        await axios.put(baseUrl + "/Posts", formData)
        .then((apiResponse) => navigate('/my-contents'))
        .catch((err) => console.log(err))

    };

    return (
        <>
            <ProjectNavbar/>
            <div style={{padding:'20px'}}>
                <h1 className="text-center mt-3">Gönderi Düzenleme Ekranı</h1><hr/>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Başlık</Form.Label>
                        <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder={post.title}
                        onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formContent">
                        <Form.Label>İçerik</Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={3}
                        name="content"
                        value={formData.content}
                        placeholder={post.content}
                        onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Güncelle
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Update