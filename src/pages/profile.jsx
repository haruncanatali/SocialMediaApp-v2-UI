import React from "react"
import ProjectNavbar from "../components/navbar"
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBModalTitle
  }
from 'mdb-react-ui-kit'
import { baseUrl, imageUrl } from '../defaults'
import { ToastContainer, toast } from 'react-toastify'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';

const Profile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '1',
        phone: '',
        birthdate: '',
        profilePhoto: null
      })
    const [updateState, setUpdateState] = useState(true)
    const [user, setUser] = useState({})
    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        const inputValue = type === 'file' ? files[0] : value;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: inputValue,
        }));
      }

    const handleUpdateState = () => {
      if(updateState){
        setUpdateState(false)
      }
      else{
        setUpdateState(true)
      }
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
  
      await axios.put(baseUrl + '/Users', form)
      .then((apiResponse) => {
          toast('Profiliniz başarıyla güncellendi.')
          setUpdateState(true)
          getUser()
      })
      .catch((error) => console.log(error))
          
    };

    const getUser = () => {
      setTimeout(async () => {
        await axios.get(baseUrl + '/Users')
          .then((apiResponse) => {
            setUser(apiResponse.data)
          })
          .catch((error) => {
            console.log(error)
            toast(error)
          })
      }, 300);
      
    }

    useState(() => {
      getUser()
    }, [])

    return (
        <>
            <ProjectNavbar/>
            <h1 className='text-center mt-3'>Profilim</h1><hr/>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
      <Row>
        <Col className="text-center">
          <img className="rounded-circle" src={imageUrl + user?.profilePhoto} alt="Centered Image" style={{ width: '250px', height: '240px' }} />
        </Col>
      </Row>
    </Container>
            <form onSubmit={handleSubmit}>
        <div style={{padding:20}}>
        <MDBRow>
            <MDBCol md='6'>
                <MDBModalTitle>Ad</MDBModalTitle>
                <MDBInput placeholder={user?.firstName} readOnly={updateState} onChange={handleInputChange} wrapperClass='mb-4' id='nameUpdate' name='firstName' type='text' required/>
                <MDBModalTitle>Cinsiyet</MDBModalTitle>
                <Form.Select value={user?.gender} readOnly={updateState} onChange={handleInputChange} id='genderUpdate' name='gender' required>
                  <option value="1">Kadın</option>
                  <option value="2">Erkek</option>
                </Form.Select>
                <MDBModalTitle style={{marginTop:27}}>Telefon</MDBModalTitle>
                <MDBInput placeholder={user?.phoneNumber} readOnly={updateState} onChange={handleInputChange} wrapperClass='mb-4' id='phoneUpdate' name='phone' type='text' required/>
            </MDBCol>
            <MDBCol md='6'>
                <MDBModalTitle>Soyad</MDBModalTitle>
                <MDBInput placeholder={user?.lastName} readOnly={updateState} onChange={handleInputChange} wrapperClass='mb-4' id='lastNameRegister' name='lastName' type='text' required/>
                <MDBModalTitle>Doğum Tarihi</MDBModalTitle>
                <MDBInput placeholder={user?.birthdate} readOnly={updateState} onChange={handleInputChange} wrapperClass='mb-4' id='birhtdateRegister' name='birthdate' type='text' required/>
                <MDBModalTitle>Fotoğraf</MDBModalTitle>
                <MDBInput readOnly={updateState} onChange={handleInputChange} wrapperClass='mb-4' id='photoRegister' name='profilePhoto' type='file'/>
            </MDBCol>
            <div style={{display:'grid', placeItems:'center'}}>
              {
                updateState 
                ? <Button style={{ width: '90%', backgroundColor: 'orange' }} type="button" onClick={() => handleUpdateState()}>Güncelleme Ekranı</Button>
                : <Button style={{ width: '90%', backgroundColor: 'green' }} type="submit">Güncelle</Button>
              }
                
            </div>
        </MDBRow>
        </div>
        </form>
        <ToastContainer/>
        </>
    );
}

export default Profile