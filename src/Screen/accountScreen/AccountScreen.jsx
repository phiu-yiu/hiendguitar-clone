import React from 'react';
import Heading from "../../Component/Heading/Heading";
import TitleContainer from "../../Component/TitleContainer/TitleContainer";
import {signOut} from 'firebase/auth'
import {auth} from "../../FireBase/firebase";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../../reduxSlice/userSlice";
import Header from "../../Header/Header";

function AccountScreen({user}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    signOut(auth).then(() =>{
      dispatch(logout())
      setTimeout(() => navigate('/'),300)
    })
      .catch(error => console.log(error.message))

  }

  return (
    <div className='relative h-[100vh] lg:max-w-screen-lg lg:mx-auto lg:h-[50vh]'>
      <Heading title='Account'/>
      <Header/>
      <div className="lg:grid grid-cols-4 pt-44">
        <div className="mx-5 flex lg:col-start-2 lg:mt-0 ">
          <img className='rounded-full object-cover h-16' src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-business-men-icon-png-image_4222127.jpg" alt=""/>
          <TitleContainer
            className='ml-5 mr-auto'
            title={user && user.displayName}
            description={user && user.email}
          />
        </div>
        <div className="absolute bottom-0 py-6 px-5 shadow-top w-full lg:shadow-none lg:relative lg:w-44 lg:pt-3">
          <button className='w-full bg-tertiary text-primary rounded-lg h-10' onClick={handleClick}>LogOut</button>
        </div>
      </div>
    </div>
  );
}

export default AccountScreen;