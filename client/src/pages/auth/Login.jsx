import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
const URL = import.meta.env.VITE_BACKEND_AUTH_API_URL; 
import {Eye, Loader} from 'lucide-react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/features/currentUser.slice";


const Login = () => {

  const dispatch = useDispatch(); 
  const [loading, setLoading] = useState(false); 
  const [userData, setUserData] = useState({
    email : '',
    password : '',
  })

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setUserData({
      ...userData, 
      [name] : value
    })
  }



  const userDataSubmitHandler = (e) => {
    e.preventDefault() ; 
   
    if(validateForm(userData)){ 
      loginApiCall() ; 
    }
  }

  const loginApiCall = async() => { 
      try {
        setLoading(true); 
        const response = await axios.post(`${URL}/login-user`, userData, {
          withCredentials : true   // here i am including it otherwise i will not get thje cookie 
        }); 
        const apiResponse  = await response.data; 
        
        if(apiResponse?.success){ 
          setLoading(false); 
          toast.success(apiResponse.message)
           dispatch(setCurrentUser(apiResponse?.user));   
        }
      } catch (error) {
        setLoading(false); 
        toast.error(error?.response?.data.message)
      }
  }

  const validateForm = (userData) => {

    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if(!regEx.test(userData.email)){ 
      toast.warning('Please enter a valid email address.')
      return false ; 
    }else if(!userData.password || userData.password.length < 6){
      toast.warning('Password should contain at least 6 char ')
      return false; 
    }else if(userData.password.length >= 25 ) { 
      toast.warning('Password can not exceed the length of 25 char')
      return false; 
    }
    return true;
  }



  // github authentication : 
  const githubAuthenticationHandler = async() => { 
      try {
        const provider = new GithubAuthProvider() ; 
        const apiResponse = await signInWithPopup(auth, provider);
        console.log('The response --> ', apiResponse);
        
      } catch (error) {
        console.log("An error occurred when login with Github -> ", error);
      }
  }; 

  // google authentication : 
  const googleAuthenticationHandler = async() => {
    try {
    
      const provider = new GoogleAuthProvider(); 
      const apiResponse = await signInWithPopup(auth, provider); 
      const { email } = apiResponse.user; 
  
        // here I am preparing the body for google auth : 
        const data = { 
          email, 
        }
        // Api call : 
         await googleAuthApiCall(data) ; 
      
    } catch (error) {
      console.log('An error occurred while login using google -> ', error.response);
    }
  }


    // firebase google auth api call :  
  const googleAuthApiCall = async(userData) => {
    try {
      const {data} = await axios.post(`${URL}/google-auth`, userData, {
        withCredentials: true
      }); 
      const response = data
      if(response.success){
        dispatch(setCurrentUser(response?.user));   
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error?.response?.data.message)
      console.log(error.response.data.message);
      return false ; 
    }
  }



  return (
    <>
    <div className="w-full ">
        <form action="" onSubmit={userDataSubmitHandler}>

       {/* email  */}
       <div className="flex flex-col gap-2 my-2">
          <Label>Email</Label>
          <Input className='py-4 px-3 rounded' name='email' onChange={inputChangeHandler}  value={userData.email} placeholder='i.e John@gmail.com'/>
          </div>

  
           {/* Password  */}
          <div className="flex flex-col gap-2  my-2">
          <Label>Password</Label>
          <div className="relative">
            <Input className='py-4 px-3 rounded' name='password' onChange={inputChangeHandler}  type={passwordVisibility ? 'text' : 'password'} value={userData.password} placeholder='Enter your Password'/>
            <Eye size={18} onClick={()=> setPasswordVisibility(!passwordVisibility)} className="cursor-pointer absolute bottom-2 right-5"/>
          </div>
          </div>
      
          <Button 
          disabled={loading}  
          type='submit' 
          className='bg-customOrange w-full transition-all duration-200 py-5'>{loading ? 
          <div className="flex gap-3 items-center">
            <Loader className="animate-spin"/>
            <span>Loading ..</span>
          </div>
          : 'Login'}</Button>

           <p className="text-center my-1">OR</p>
          
          <div className="w-full flex justify-center gap-2">
                    <Button type="button" onClick={googleAuthenticationHandler} className='bg-[#f5f5f7] border-gray-200 cursor-pointer rounded py-4 text-gray-700'>
                      <span><FcGoogle/></span>
                      <p className="text-xs">Google</p>
                    </Button>

                    <Button onClick={githubAuthenticationHandler} type="button" className='bg-[#f5f5f7]  py-4 cursor-pointer border-gray-200 rounded'>
                      <span><FaGithub color="#000"/></span>
                      <p className="text-xs text-gray-700">Github</p>
                    </Button>
            </div>
        </form>
    </div>
    </>
  )
}

export default Login;