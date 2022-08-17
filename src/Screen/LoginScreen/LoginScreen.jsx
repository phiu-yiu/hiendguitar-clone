import React, {useState} from 'react';
import Heading from "../../Component/Heading/Heading";
import {useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import {ErrorMessage} from '@hookform/error-message';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ReverseTitleContainer from "../../Component/ReverseTitleContainer/ReverseTitleContainer";
import SubmitButton from "../../Component/SubmitButton/SubmitButton";
import Description from "../../Component/TitleContainer/Description/Description";
import Title from "../../Component/TitleContainer/Title/Title";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {auth} from '../../FireBase/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {login} from "../../reduxSlice/userSlice";

function LoginScreen() {
  const [passwordShown, setPasswordShown] = useState(false)
  const {register, handleSubmit, setValue, formState: {errors}} = useForm()
  const emailRef = register('email', {required: 'Enter an email.'})
  const passwordRef = register('password', {required: 'Enter an password.'})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        dispatch(login({
          email: user.email,
          id: user.uid,
          displayName: user.displayName,
        }))
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      });

  }

  return (<div>
    <Heading title='Login'/>
    <form className='w-auto mx-5 mt-24' onSubmit={handleSubmit(onSubmit)}>

      <div className="w-full">
        <TextField
          name='email'
          label='Email Address'
          type='email'
          variant='standard'
          sx={{width: '100%'}}
          InputLabelProps={{
            style: {color: "rgba(0,0,0,.56)"},
          }}
          InputProps={{style: {fontWeight: "800"}}}
          onChange={e => setValue('email', e.target.value)}
          inputRef={emailRef.ref}
        />
        <ErrorMessage errors={errors} name="email"
                      render={({message}) => (<div className='text-error mt-2 text-sm'>{message}</div>)}/>
      </div>

      <div className="w-full relative mt-5">
        <TextField
          name='password'
          label='Password'
          type={passwordShown ? 'text' : 'password'}
          variant='standard'
          sx={{width: '100%'}}
          InputLabelProps={{
            style: {color: "rgba(0,0,0,.56)"},
          }}
          InputProps={{style: {fontWeight: "800"}}}
          onChange={e => setValue('password', e.target.value)}
          inputRef={passwordRef.ref}
        />
        {passwordShown ? (<VisibilityOutlinedIcon
          onClick={() => setPasswordShown(!passwordShown)}
          className='absolute right-10 top-5'
        />) : (<VisibilityOffOutlinedIcon
          onClick={() => setPasswordShown(!passwordShown)}
          className='absolute right-10 top-5'
        />)}
        <ErrorMessage errors={errors} name="password"
                      render={({message}) => (<div className='text-error mt-2 text-sm'>{message}</div>)}/>
      </div>

      <div className='flex mt-5'>
        <input className='flex-none' type="checkbox"/>
        <ReverseTitleContainer
          className='ml-1 flex-1 flex justify-between'
          description='Remember password'
          title='Forgot password'
          titleStyle='text-sm'
          descriptionStyle='text-sm'
        />
      </div>
      <SubmitButton name='Sign in' type='submit'/>
      <div className="flex justify-center mt-7 w-11/12 mx-auto">
        <Description element="Don't you have account?" style='text-sm'/>
        <Link to='/account/sign-up'>
          <Title element='Sign up for free.' style='text-sm ml-2 '/>
        </Link>
      </div>
    </form>
  </div>);
}

export default LoginScreen;