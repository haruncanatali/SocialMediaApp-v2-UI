import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, imageUrl } from "../defaults";
import {
  Container,
  Card,
  Button,
  Image,
  Row,
  Col,
  Form
} from "react-bootstrap";
import ProjectNavbar from "../components/navbar";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    Title: '',
    Content: '',
  })
  const fetchData = async () => {
    await axios.get(baseUrl + "/Posts").then((api_response) =>
      setPosts(api_response.data.data)
    ).catch((error) => console.log(error))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleFav = async(status, userId, postId) => {
    if(status){
      await axios.post(baseUrl + "/FallowedPosts", {PostId:postId})
      .then((response) => fetchData())
      .catch((error) => console.log(error))
    }
    else{
      await axios.delete(baseUrl + "/FallowedPosts/" + postId)
      .then((response) => fetchData())
      .catch((error) => console.log(error))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(baseUrl + "/Posts", formData)
    .then((apiResponse) => {
        fetchData()
        toast('Gönderi başarıyla oluşturuldu.')
      }
    )
    .catch((error) => console.log(error))
    .finally(setFormData({Title:'', Content:''}))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };


  return (
    <>
      <ProjectNavbar/>
      <Container className="mt-5">
      <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Card.Body>
        <Card.Title>Gönderi Oluştur</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Başlık</Form.Label>
            <Form.Control
              type="text"
              name="Title"
              id="Title"
              value={formData.Title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>İçerik</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Content"
              id="Content"
              value={formData.Content}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Gönder
          </Button>
        </Form>
      </Card.Body>
    </Card>
      </Container>
      <Container>
      {posts?.map(post => (
        <Card key={post.id} style={{ margin: '10px', width: '70rem', marginTop:'20px' }}>
          <Card.Body>
            <Row>
              <Col md={2}>
                <Image src={imageUrl + post.userPhoto} alt="User Profile" roundedCircle fluid />
              </Col>
              <Col md={10}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Card.Text>
                  Bu gönderi <strong>{post.userFullName}</strong> tarafından oluşturuldu.
                </Card.Text>
                <Card.Text>Oluşturulma Tarihi: {new Date(post.createdAt).toLocaleString()}</Card.Text>
                {post.fallowed ? (
                  <Button variant="primary" onClick={() => {
                    handleFav(false, post.userId, post.id)
                  }}>Takipten Çık</Button>
                ) : (
                  <Button variant="success" onClick={() => {
                    handleFav(true, post.userId, post.id)
                  }}>Takip Et</Button>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
    <ToastContainer/>
    </>
  );
};

export default Home;
