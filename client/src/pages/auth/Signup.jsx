import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { User2, HousePlugIcon, Bike } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button";
import { useState } from "react";
import {toast} from 'sonner';
const URL = import.meta.env.VITE_BACKEND_AUTH_API_URL; 
import axios from 'axios'; 
import {FcGoogle } from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import {Eye} from 'lucide-react'
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/features/currentUser.slice";




const Signup = ({setShowEmailVerifyComp, setUserSignupEmail }) => {

  
  const [userData, setUserData] = useState({
    fullname : '',
    email : '',
    contact : '',
    password : '',
    role : ''
  }); 

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const dispatch = useDispatch() ; 

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
   setUserData((userData)=>({
    ...userData,
    [name] : value
   }))
  }

  const onTabChange = (value)=> {
 setUserData((userData)=>({
    ...userData,
    role : value
 }))  
  }

  const userDataSubmitHandler = (e) => {
    e.preventDefault() ; 

      if(validateForm(userData)){ 
         signupUserApiCall(userData); 
         setUserSignupEmail(userData.email)
      }
  }

  const signupUserApiCall = async(userData) => {
    try {

      
      const {data} = await axios.post(`${URL}/sign-up` , userData); 
      const apiResponse = data ; 

      if(apiResponse.success){ 

       toast.success(apiResponse.message);
       setShowEmailVerifyComp(true);
      }      
    } catch (error) {
      toast.error(error?.response?.data.message);
      console.log("Ther error is -> ", error.response);
    }
  }

  const validateForm = (userData) => {

    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(!userData.fullname || userData.fullname.length < 2) { 
      toast.warning('Fullname can not be less than 2 char.')
      return false; 
    }else if(!regEx.test(userData.email)){ 
      toast.warning('Please enter a valid email address.')
      return false ; 
    }else if(!userData.contact){
      toast.warning('Contact no. is required.');
      return false ; 
    }else if(!/^\d{10}$/.test(userData.contact.trim())) { 
      toast.warning('Invalid contact no.')
      return false ; 
    }else if(!userData.role) { 
      toast.warning('Please select a role to continue.')
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
      if(!userData.role) {
      toast.error("Please select a role to continue");  
      return false ; 
      }else if(!userData.contact) { 
        toast.error('Please enter your contact no')
        return false;
      }
      else{
      const provider = new GoogleAuthProvider(); 
      const apiResponse = await signInWithPopup(auth, provider); 
      const {displayName : fullname , email } = apiResponse.user; 
  
        // here I am preparing the body for google auth : 
        const data = { 
          fullname , 
          email, 
          role : userData.role, 
        }
        // Api call : 
         const response = await googleAuthApiCall(data) ; 
         if(response.user) { 
          dispatch(setCurrentUser(response.user)); 
         }
      }
    } catch (error) {
      console.log('An error occurred while login using google -> ', error.response.data);
      return false; 
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
        toast.success(response.message);  
        return response;    
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }




  return (
    <>
        <div className="w-full ">
            <form action="" className="" onSubmit={userDataSubmitHandler}>
              {/* Username  */}
              <div className="flex flex-col gap-2 my-2">
              <Label>Username</Label>
              <Input className='py-4 px-3 rounded' name='fullname' onChange={inputChangeHandler} value={userData.fullname}  placeholder='i.e John Snow'/>
              </div>
          {/* email  */}
          <div className="flex flex-col gap-2 my-2">
              <Label>Email</Label>
              <Input className='py-4 px-3 rounded' name='email' onChange={inputChangeHandler}  value={userData.email} placeholder='i.e John@gmail.com'/>
              </div>

          {/* contact  */}
          <div className="flex flex-col gap-2 my-2">
              <Label>Contact</Label>
              <Input className='py-4 px-3 rounded' name='contact' onChange={inputChangeHandler}  value={userData.contact} placeholder='Enter your contact no.'/>
              </div>

              {/* Password  */}
              <div className="flex flex-col gap-2  my-2">
              <Label>Password</Label>
              <div className="relative">
                <Input className='py-4 px-3 rounded' name='password' onChange={inputChangeHandler}  type={passwordVisibility ? 'text' : 'password'} value={userData.password} placeholder='Enter your Password'/>
                <Eye size={18} onClick={()=> setPasswordVisibility(!passwordVisibility)} className="cursor-pointer absolute bottom-2 right-5"/>
              </div>
              </div>

              {/* user role  */}
              <div className="my-4 w-full">
                  <Tabs defaultValue="user" onValueChange={onTabChange}>
                    <TabsList className='w-full py-5 rounded'>
                      <TabsTrigger className='py-4 rounded' name='user'  value="user">
                        <User2 />
                        <span className="text-xs">User</span>
                      </TabsTrigger>
                      <TabsTrigger className='py-4 rounded' name='restaurantOwner'  value="restaurantOwner">
                        <HousePlugIcon />
                        <span className="text-xs">Restauranr Owner</span>
                      </TabsTrigger>

                      <TabsTrigger className='py-4 rounded' name='delivery_agent' value="delivery_agent">
                        <Bike />
                      <span className="text-xs">Delivery Agent</span>  
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
              </div>
              <Button  type='submit' className='bg-[#0071e3] rounded w-full py-5'>Create Account</Button>

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

export default Signup