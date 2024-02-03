import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBModalTitle
}
from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../provider/authProvider";
import { baseUrl } from '../defaults';



function Login() {
  const navigate = useNavigate()
  const { setToken } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '1',
    phone: '',
    password: '',
    birthdate: '',
    email: '',
    photo: null
  })

  const [loginData, setLoginData] = useState({
    userName: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const inputValue = type === 'file' ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
        const response = await axios.post(baseUrl + '/Users', form);

        if (response.status === 200 || response.status === 201) {
          toast("Başarıyla kayıt oldunuz :)")
          closeModal()
        } else {
          alert('Kayıt sırasında bir hata oluştu.' + response.data);
        }
      } catch (error) {
        alert('İstek gönderme hatası:' + error.data.errors);
      }
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const formLogin = new FormData();
    for (const key in loginData) {
        formLogin.append(key, loginData[key]);
    }


    try {
        const response = await axios.post(baseUrl + '/Auth/Login', formLogin);

        if (response.status === 200) {
            toast('Giriş başarılı oldu.')
            setToken(response.data.data.token)
            navigate('/home')
        } else {
          alert('Kayıt sırasında bir hata oluştu.' + response.data);
        }
      } catch (error) {
        alert('İstek gönderme hatası:');
      }
  }

  return (
    <>
        <MDBContainer fluid className='p-4'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            SHFT <br />
            <span className="text-primary">Sosyal Medya Uygulaması</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
          SHFT, sizi bağlı tutan, anlık deneyimleri paylaşmanın yeni ve heyecan verici bir yolu! 
          Fotoğraflar, videolar ve hikayeler aracılığıyla SHFT ile günlük hayatınızı paylaşın. 
          Arkadaşlarınızla bağlantı kurun, ilgi çekici içerikleri keşfedin ve anlarınızı anında paylaşın. 
          SHFT ile sosyal medyayı yeniden tanımlayın, birlikte büyüyelim!
          </p>

        </MDBCol>
        <MDBCol md='6'>
          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>
              <form onSubmit={handleLogin}>
                <MDBModalTitle>E-Posta</MDBModalTitle>
                <MDBInput onChange={handleLoginInputChange} wrapperClass='mb-4' id='usernameLogin' name='userName' type='email'/>
                <MDBModalTitle>Şifre</MDBModalTitle>
                <MDBInput onChange={handleLoginInputChange} wrapperClass='mb-4' id='passwordLogin' name='password' type='password'/>
                <div style={{display:'grid', placeItems:'center'}}>
                    <Button style={{width: '50%', borderRadius:10}} type='submit'><span className='h4'>Giriş yap</span></Button>
                    <Button style={{width: '50%', marginTop: 20, backgroundColor: 'green', borderRadius:10}} onClick={openModal}><span className='h4'>Kayıt Ol</span></Button>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{overlay:{backgroundColor:'#9c88ff'}}}
      >
        <div style={{display:'grid', placeItems:'flex-end', cursor:'pointer'}}>
            <div className="close-button" onClick={closeModal}>
                <h3 style={{color:'red', fontWeight:'bolder'}}>X</h3>
            </div>
        </div>
        <h2 style={{color: 'blue', marginBottom:30}}>SHFT'e Üye Olun</h2>
        <form onSubmit={handleSubmit}>
        <MDBRow>
            <MDBCol md='6'>
                <MDBModalTitle>Ad</MDBModalTitle>
                <MDBInput onChange={handleInputChange} wrapperClass='mb-4' id='nameTextRegister' name='firstName' type='text' required/>
                <MDBModalTitle>Cinsiyet</MDBModalTitle>
                <Form.Select onChange={handleInputChange} id='genderRegister' name='gender' required>
                    <option value="1">Kadın</option>
                    <option value="2">Erkek</option>
                </Form.Select>
                <MDBModalTitle style={{marginTop:27}}>Telefon</MDBModalTitle>
                <MDBInput onChange={handleInputChange} wrapperClass='mb-4' id='phoneRegister' name='phone' type='text' required/>
                <MDBModalTitle>Şifre</MDBModalTitle>
                <MDBInput onChange={handleInputChange} wrapperClass='mb-4' id='passwordRegister' name='password' type='password' required/>
            </MDBCol>
            <MDBCol md='6'>
                <MDBModalTitle>Soyad</MDBModalTitle>
                <MDBInput onChange={handleInputChange} wrapperClass='mb-4' id='lastNameRegister' name='lastName' type='text' required/>
                <MDBModalTitle>Doğum Tarihi</MDBModalTitle>
                <MDBInput onChange={handleInputChange} wrapperClass='mb-4' id='birhtdateRegister' name='birthdate' type='text' required/>
                <MDBModalTitle>E-Posta</MDBModalTitle>
                <MDBInput onChange={handleInputChange} wrapperClass='mb-4' id='emailRegister' name='email' type='email' required/>
                <MDBModalTitle>Fotoğraf</MDBModalTitle>
                <MDBInput onChange={handleInputChange} wrapperClass='mb-4' id='photoRegister' name='photo' type='file' required/>
            </MDBCol>
            <div style={{display:'grid', placeItems:'center', gridTemplateColumns:'repeat(2, 1fr)'}}>
                <Button style={{ width: '90%', backgroundColor: 'green' }} type="submit">Kayıt Ol</Button>
                <Button style={{ width: '90%', backgroundColor: 'red' }} onClick={closeModal}>İptal Et</Button>
            </div>
        </MDBRow>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Login;