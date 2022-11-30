import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import Logo from '../assets/logo.svg'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../Util/APIRoutes';

function Login() {

  const navigate = useNavigate();
  const [values, setValues] = useState({

    email: "",
    password: "",

  });

  const toastOptions = {

    pauseOnHover: true,
    position: "bottom-right",
    autoClose: 10000,
    draggable: true,
    theme: "dark"
  };

  useEffect(() => {

    if(localStorage.getItem('chat-app-user')){

      navigate('/')
    }
  },[])

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (handleValidation()) {

      const { password, email } = values;
      const { data } = await axios.post(loginRoute, {

        email,
        password
      });

      if (data.status === false) {

        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {

        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const handleValidation = () => {

    const { password, email } = values;


    if (password === "") {

      toast.error("Email and Password is required",
        toastOptions
      );
      return false

    } else if (email === "") {

      toast.error("Email and Password is required",
        toastOptions
      );
      return false
    }
    return true;
  };

  const handleChange = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };

  return (

    <>
      <FormContainer>

        <form onSubmit={(event) => handleSubmit(event)}>

          <div className='brand'>
            <img src={Logo} alt="" />
            <h1>Chat_App</h1>
          </div>

          <input
            type="email"
            name="email"
            // id=""
            placeholder='Example@gmail.com '
            onChange={(e) => handleChange(e)} />

          <input
            type="password"
            name="password"
            // id=""
            placeholder='Password'
            onChange={(e) => handleChange(e)} />

          <button type='submit'>Login</button>

          <span>
            Don't have an Account ?
            <Link to='/signup'>Create an account</Link>
          </span>

          <p>
            Sample email: Firoz123@gmail.com <br/>
            Password : 12345678
          </p>

        </form>


      </FormContainer>

      <ToastContainer />

    </>

  );
}

const FormContainer = styled.div`

  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand{

    justify-content: center;
  gap: 1rem;
  align-items: center;
  display: flex;
  img{

    height:5rem;
  }
  h1{

    color: white;
    text-trnsform: uppercase;
  }
  }
  form{

    display: flex;
    flex-direction: column;
    gap:2rem;
    background-color: skyblue;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{

        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #111;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus{

            border: 0.1rem solid blue;
            outline:none;
        }
        }
        button{

            background-color: Blue;
            color:white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 0.4rem;
            font-weight: bold;
            cursor: pointer;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;

            &:hover{

                background-color: #131324;
                
            }
        }
        span{
            
            text-transform: uppercase;

            a{

                text-decoration: none;
                font-weight: bold;
            }
        }
    }
  }
  
`;


export default Login