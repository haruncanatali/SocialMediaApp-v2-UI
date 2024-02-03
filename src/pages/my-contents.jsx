import React from "react";
import ProjectNavbar from "../components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, imageUrl } from "../defaults";
import { ToastContainer } from "react-toastify";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { MDBContainer } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const MyContents = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const getPosts = async() => {
        await axios.get(baseUrl + '/Posts?Personal=true')
        .then((apiResponse) => {
            setPosts(apiResponse.data.data)
        })
        .catch((error) => console.log(error))
    }
    useEffect(() => {
        getPosts()
    }, [])

    const handleDelete = async(id) => {
        await axios.delete(baseUrl + "/Posts/" + id)
        .then((apiResponse) => getPosts())
        .catch((error) => console.log(error))
    }

    const navigateUpdate = (post) => {
        navigate('/update',{state:{id:post.id}})
    }   

    return (
        <>
            <ProjectNavbar/>
            <h1 className="text-center mt-3">Gönderilerim</h1><hr/>
            {
                posts?.map(post => (
                    
                    <MDBContainer>
                        <Card key={post.id} style={{ margin: '10px', width: '80rem', marginTop: '20px' }}>
                            <Card.Body>
                                <Row>
                                    <Col md={2}>
                                        <Image src={imageUrl + post.userPhoto} alt="User Profile" roundedCircle fluid />
                                    </Col>
                                    <Col md={10}>
                                        <Card.Title>{post.title}</Card.Title>
                                        <Card.Text>{post.content}</Card.Text>
                                        <Card.Text>Oluşturulma Tarihi: {new Date(post.createdAt).toLocaleString()}</Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={{ span: 2, offset: 10 }}>
                                        <Button variant="danger" className="mx-2" type="button" onClick={() => handleDelete(post.id)}>
                                            Sil
                                        </Button>
                                        <Button variant="primary" type="button" onClick={() => navigateUpdate(post)}>
                                            Düzenle
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        </MDBContainer>
                ))
            }
            <ToastContainer/>
        </>
    )
}

export default MyContents