import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import {Check, Loader} from 'lucide-react'
import { toast } from "sonner";
import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_AUTH_API_URL



const VerifyEmail = ({ setShowEmailVerifyComp, userSignupEmail}) => {

  const [loading, setLoading] = useState(false); 
  const [userData, setUserData] = useState({
    email : userSignupEmail, 
    otp : ''
  })

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
      verifyApi(); 
    }
  }; 

  const verifyApi = async() => {
    try {
      setLoading(true)
      const response = await axios.post(`${URL}/verify-otp`, userData); 
      const apiResponse = await response.data; 
      if(apiResponse){ 
        setLoading(false); 
        setShowEmailVerifyComp(false);
        console.log(apiResponse.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.message)
      console.log(error.response.data.message);
    }
  }

  const validateForm = (userData) => {
      if(!userData.otp || userData.otp.length < 6){4
        toast.warning(`Please enter the siz didgit valid otp`);
        return false;
      }
      return true; 
  }


  return (
    <>
    <div className="w-full mt-20">
        <form action="" onSubmit={userDataSubmitHandler} className="border w-fit h-fit p-10 px-5 py-2">

           {/* Otp  */}
          <div className="flex flex-col gap-2   my-2">
          <Label>Verify OTP</Label>
          <p className="text-xs text-green-500 border-dashed gap-1 flex items-center ">
           <span className="border-2 rounded-full bg-green-100"><Check size={15}/></span> 
            An OTP has been sent to you registered email id 
            </p>
          <Input className='py-4 rounded text-center text placeholder:text-xs font-semibold text-gray-500' name='otp' onChange={inputChangeHandler}  type='text' value={userData.otp} placeholder='Enter your One Time Password'/>
          </div>
          <div className=" flex justify-center">
          <Button  
          type='submit' 
          disabled={loading}
          className='bg-customOrange rounded py-4 w-24'>{loading ? 
          <div className="flex items-center gap-3">
            <Loader className="animate-spin"/>
            <span>Verifying ..</span>
          </div>
          : '' }</Button>
          </div>
        </form>
    </div>
    </>
  )
}

export default VerifyEmail;