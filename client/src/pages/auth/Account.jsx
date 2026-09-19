import Signup from "./Signup"
import Login from "./Login"
import { useState } from "react"
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "../../components/ui/card"
import {Tabs,TabsContent,TabsList,TabsTrigger} from "../../components/ui/tabs"
import VerifyEmail from "./VerifyEmail"
import { useSelector } from "react-redux"


const Account = () => {

    const [showEmailVerifyComp, setShowEmailVerifyComp] = useState(false) ; 
    const [userSignupEmail , setUserSignupEmail] = useState(''); 
    const {theme} = useSelector((state)=> state.themeSlice); 
    const isDark = theme === 'dark'; 
    
    

  return (
    <>
    <div className="max-w-6xl m-auto md:flex-row flex-col justify-center flex">
        {/* left content :  */}
        <div className="max-w-2xl mt-20">
           <h1 className="md:text-6xl md:px-0 px-5 text-3xl font-extralight"> Accounts</h1> 
           <p className="md:text-xl text-lg md:px-0 px-5  mt-5 font-extralight mr-3">Create and manage an account for food, restaurant, and hotels.</p>
        </div>

        {/* right content :  */}

        {
            showEmailVerifyComp 
            ? 
            <div className="">
            <VerifyEmail 
            setShowEmailVerifyComp={setShowEmailVerifyComp}
            userSignupEmail={userSignupEmail}
            /> 
            </div>
            : 
            <div className="  flex md:mt-10 mt-5 justify-center min-h-screen">
                {/* account switch tab :  */}

            <div className="">
                <Tabs  defaultValue="login" className="md:w-125 w-96" >
                <TabsList className={`${isDark ? 'bg-zinc-800 border border-zinc-700 shadow-md' : ''}`}>
                    <TabsTrigger className={`px-10 rounded hover:text-orange-500  ${isDark ? "text-gray-100" : "text-gray-700"}`} value="login">Login</TabsTrigger>
                    <TabsTrigger className={`px-10 rounded hover:text-orange-500  ${isDark ? "text-gray-100" : "text-gray-700"}`} value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card className={`${isDark ? 'bg-zinc-800 border border-zinc-700 shadow-md text-gray-200' : ''}`}>
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                        Enter your registered email id and password to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        <Login/>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card className={`${isDark ? 'bg-zinc-800 border border-zinc-700 shadow-md text-gray-200' : ''}`}>
                    <CardHeader>
                        <CardTitle>Register your account</CardTitle>
                        <CardDescription>
                        Create or register your account as a `User`, an`Owner` or `Delivery Partner` 
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        <Signup 
                            setShowEmailVerifyComp = {setShowEmailVerifyComp}
                            setUserSignupEmail = {setUserSignupEmail} 
                        />
                    </CardContent>
                    </Card>
                </TabsContent>
                </Tabs>
            </div>
            </div>

        } 
        
    </div>
    </>
  )
}

export default Account