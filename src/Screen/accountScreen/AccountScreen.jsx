import React from 'react';
import Heading from "../../Component/Heading/Heading";
import TitleContainer from "../../Component/TitleContainer/TitleContainer";
import {signOut} from 'firebase/auth'
import {auth} from "../../FireBase/firebase";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../../reduxSlice/userSlice";

function AccountScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    signOut(auth).then(() =>{
      dispatch(logout())
      navigate('/')
    })
      .catch(error => console.log(error.message))
  }

  return (
    <div>
      <Heading title='Account'/>
      <div className="mx-5 mt-24 flex ">
        <img className='rounded-full object-cover h-16' src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-business-men-icon-png-image_4222127.jpg" alt=""/>
        <TitleContainer
          className='ml-5 mr-auto'
          title='test'
          description='test@gmail.com'
        />
      </div>
      <div className="mx-5 mt-52">
        <button className='w-full bg-tertiary text-primary rounded-lg h-10' onClick={handleClick}>LogOut</button>
      </div>
    </div>
  );
}

export default AccountScreen;