import React from "react";
import ProjectNavbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, imageUrl } from "../defaults";
import {
    Container,
    Card,
    Button,
    Image,
    Row,
    Col
  } from "react-bootstrap";

const Favorites = () => {
    const [favs, setFavs] = useState()
    const fetchFavs = async() => {
        await axios.get(baseUrl + "/FallowedPosts").then((apiResponse) =>
            setFavs(apiResponse.data.data)
        ).catch((error) => console.log(error.message))
    }
    useEffect(() => {
      fetchFavs()
    }, [])

    const handleFav = async(postId) => {
        await axios.delete(baseUrl + "/FallowedPosts/" + postId)
          .then((response) => fetchFavs())
          .catch((error) => console.log(error))
      }
    
    return (
        <>
            <ProjectNavbar/>
            <h2 className='text-center mt-3'>Favorilerim</h2><hr/>
            <Container>
            {favs?.map(fav => (
                <Card key={fav.id} style={{ margin: '10px', width: '70rem', marginTop:'20px' }}>
                <Card.Body>
                  <Row>
                    <Col md={2}>
                      <Image src={imageUrl + fav.userPhoto} alt="User Profile" roundedCircle fluid />
                    </Col>
                    <Col md={10}>
                      <Card.Title>{fav.title}</Card.Title>
                      <Card.Text>{fav.content}</Card.Text>
                      <Card.Text>
                        Bu gönderi <strong>{fav.userFullName}</strong> tarafından oluşturuldu.
                      </Card.Text>
                      <Card.Text>Oluşturulma Tarihi: {new Date(fav.createdAt).toLocaleString()}</Card.Text>
                      <Button variant="primary" onClick={() => {
                          handleFav(fav.id)
                        }}>Takipten Çık</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
            </Container>
        </>
    );
}

export default Favorites