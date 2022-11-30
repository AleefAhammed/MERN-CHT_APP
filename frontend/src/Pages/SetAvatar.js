import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { Buffer } from 'buffer';

import Loader from '../assets/Loading.gif'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setavatarRoute } from '../Util/APIRoutes';

function SetAvatar() {

    // const api = "https://api.multiavatar.com/1?apikey=${}";
    const apiKey = "3euJifydXZrS0M";
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAavatar] = useState(undefined);

    const toastOptions = {

        pauseOnHover: true,
        position: "bottom-right",
        autoClose: 10000,
        draggable: true,
        theme: "dark"
    };

    useEffect(() => {

        if (!localStorage.getItem('chat-app-user')) {

            navigate('/login')
        }

        const setAvatar = async () => {


            const data = [];

            for (let i = 0; i < 4; i++) {

                const image = await axios.get(
                    `https://api.multiavatar.com/${Math.round(Math.random() * 1000)}?apikey=${apiKey}`
                );
                const buffer = Buffer(image.data);
                data.push(buffer.toString("base64"));

                console.log(data);
            }

            setAvatars(data);
            setIsLoading(false);
        }
        setAvatar();

        // const getData= () => {

        //     axios.get("https://dummyjson.com/products/").then((response) => {

        // // console.log(response.data.products);
        // setIsLoading(response.data.products);
        // })
        // }
        // getData();
    }, [])


    const setProfilePicture = async () => {

        if (selectedAvatar === undefined) {

            toast.error("Please select an Avatar", toastOptions);
        } else {

            const user = JSON.parse(localStorage.getItem("chat-app-user"));
            console.log(user)
            const { data } = await axios.post(`${setavatarRoute}/${user._id}`, {

                image: avatars[selectedAvatar],
            });

            if (data.isSet) {

                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/')
            } else {

                toast.error("Error setting avatar, please try again", toastOptions)
            }
        }
    }

    return (
        <>
            {isLoading ? <Container>
                <img src={Loader} alt="loader" className='loader' />
            </Container> : (<Container>

                <div className="title-container">
                    <h1>Pick an avatar as your profile picture</h1>
                </div>

                <div className="avatars">
                    {avatars.map((avatar, index) => {

                        return (


                            <div
                                key={index}
                                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>

                                <img src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    onClick={() => setSelectedAavatar(index)}
                                />

                            </div>
                        )
                    })
                    }

                </div>
                <button className='submit__btn' onClick={setProfilePicture}>Set as Profile Picture</button>
            </Container>
            )}

            <ToastContainer />
        </>
    )
}

const Container = styled.div`

    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader{
        max-inline-size: 100%;
    }

    .title-container{

        h1{

            color: white;
        }
    }
    .avatars{

        display: flex;
        gap: 2rem;
        .avatar{

            border:  solid green;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center:
            align-items: center;
            transition: 0.5s ease-in-out;
            max-width:150px;
            img{

                height: 5rem;
                cursor: pointer;
            }
        }
        .selected{
            border: solid Blue;
        }
    }
    .submit__btn{

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

                background-color: red;
            }
    }
`;
export default SetAvatar