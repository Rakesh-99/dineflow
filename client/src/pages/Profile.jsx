import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Camera, Check, CircleAlert, Lock, Mail, Shield, Trash, TriangleAlert, Upload, User } from "lucide-react";
import { useSelector } from "react-redux";


const Profile = () => {

  const { userData } = useSelector(state => state.currentuserSlice);
  const { theme } = useSelector(state => state.themeSlice);
  const isDark = theme === 'dark';

  console.log(userData)
  return (
    <>
      <div className="max-w-5xl  min-h-screen m-auto mt-10">

        <div className="mx-5 mt-5">

          <div className="">
            <h1 className="text-3xl font-semibold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your personal information, sign-in credentials and account preferences.</p>
          </div>

          {/* Avatar banner */}
          <div className={`border py-5 rounded-xl  px-5  mt-5 flex flex-wrap items-center gap-10 border-customOrange`}>

            {/* Avatar :*/}
            <div className="border w-32 bg-orange-400 h-32 relative flex justify-center items-center rounded-full ">
              {
                userData.avatar ?
                  <div>
                    <img src={userData.avatar} />
                  </div>
                  :
                  <div className="">
                    <h1 className="text-7xl font-medium">{userData?.fullname[0]}</h1>
                  </div>
              }
              <div className="border rounded-full p-1 absolute -right-1 bottom-2">
                <Camera />
              </div>
            </div>


            {/* user details : */}
            <div className="flex flex-col gap-2">

              {/* name*/}
              <div className="flex gap-2">
                <h1 className="text-2xl font-semibold">{userData?.fullname} </h1>

                <div className="flex  items-center gap-1 ">
                  <Shield className="text-green-400" size={12} />
                  <Label className={`text-[10px]`}>{userData?.role}</Label>
                </div>
              </div>

              {/* actions : */}
              <div className="flex gap-2">
                <Button className={`flex item-center rounded-md`}>
                  <Upload className="size-3" />
                  <p className="text-xs">Upload photo</p>
                </Button>
                <Button className="text-xs rounded-md">Remove Photo</Button>
              </div>
            </div>
            
          </div>




          {/* Personal Details :------------------------------------------------------------ */}

          <form className={`border pb-16 rounded-xl px-5 mt-7 ${isDark ? 'border-zinc-700' : 'border-zinc-100'} `}>

            <div className="flex mt-5 items-center">
              <div className={`border p-1 rounded-md mr-2 bg-orange-950 ${isDark ? 'border-zinc-700' : 'border-zinc-100'} `}>
                <User color="orange" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold">Personal Details</h3>
                <p className="text-xs text-muted-foreground">Update the information associated with your account.</p>
              </div>

            </div>

            <Separator className={`mt-5 border ${isDark ? 'border-zinc-700' : 'border-zinc-100'}`} />


            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* full name : */}
              <div className="flex flex-col gap-3">
                <Label>Full name</Label>

                <div className="flex border border-muted-foreground rounded-md px-2 py-1 items-center ">
                  <User size={18} className="text-muted-foreground" />
                  <Input placeholder="Your full name" className={`border-none`} />
                </div>

                <span className="text-xs text-muted-foreground">Shown to teammates across the workspace.</span>
              </div>

              {/* Email : */}
              <div className="flex flex-col gap-2">

                <div className="flex items-center gap-5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>

                  <span className="flex text-gray-400  items-center gap-1">
                    <Lock size={13} />
                    <span className="text-xs">Locked</span>
                  </span>
                </div>


                <div className="flex h-10 items-center gap-2.5 rounded-lg border border-muted-foreground bg-muted/5 px-3 transition-colors focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/20">
                  <Mail size={18} className="shrink-0 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="email"
                    disabled
                    placeholder=""
                    className="h-full min-w-0 flex-1 border-0 bg-transparent! px-0 text-sm shadow-none focus-visible:ring-0 cursor-not-allowed"
                  />
                </div>

                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CircleAlert size={13} />
                  <span>Email cannot be changed. Contact support to migrate your account. </span>
                </span>
              </div>


              {/* Contact NUmber : */}
              <div className="flex flex-col gap-3">
                <Label>Contact number</Label>

                <div className="flex border border-muted-foreground rounded-md px-2 py-1 items-center ">
                  <span className="text-muted-foreground">+91</span>
                  <Input placeholder="" className={`border-none`} />
                </div>

                <span className="text-xs text-muted-foreground">Used for sign-in alerts and account recovery.</span>
              </div>

              {/* Role  : */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Role
                  </Label>

                  <span className="flex text-gray-400  items-center gap-1">
                    <Lock size={13} />
                    <span className="text-xs">admin-assigned</span>
                  </span>
                </div>

                <div className="flex border gap-1 border-muted-foreground rounded-md px-2 py-1 items-center ">
                  <Shield size={18} className="text-muted-foreground" />
                  <Input className='border-none cursor-not-allowed' placeholder='Administrator' />
                </div>

                <span className="text-xs text-muted-foreground">Roles are assigned by the workspace owner.</span>
              </div>

            </div>

            <Separator className={`mt-5 border ${isDark ? 'border-zinc-700' : 'border-zinc-100'}`} />

            {/* buttons : */}
            <div className="float-right flex mt-2 gap-2">
              <Button className={`rounded-sm text-xs h-9 hover:cursor-pointer`}>Discard</Button>
              <Button className={`rounded-sm text-xs h-9 bg-customOrange hover:cursor-pointer hover:bg-orange-700 flex item-center gap-1`}>
                <Check />
                <span>Save changes</span>
              </Button>
            </div>
          </form>



          {/* Password details :-------------------------------------------------------------- */}
          <form className={`border pb-16 rounded-xl px-5 mt-7 ${isDark ? 'border-zinc-700' : 'border-zinc-100'} `}>

            <div className="flex mt-5 items-center">
              <div className={`border p-1 rounded-md mr-2 bg-orange-950 ${isDark ? 'border-zinc-700' : 'border-zinc-100'} `}>
                <Lock color="orange" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold">Change Password</h3>
                <p className="text-xs text-muted-foreground">Choose a strong password you don't use anywhere else.</p>
              </div>

            </div>

            <Separator className={`mt-5 border ${isDark ? 'border-zinc-700' : 'border-zinc-100'}`} />


            <div className="mt-5 gap-10">

              {/* current password : */}
              <div className="flex flex-col gap-3">
                <Label>Current Password</Label>

                <div className="flex border border-muted-foreground rounded-md px-2 py-1 items-center ">
                  <User size={18} className="text-muted-foreground" />
                  <Input placeholder="Current Password" className={`border-none`} />
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

                {/* New Password : */}
                <div className="flex flex-col gap-3">
                  <Label>New Password</Label>

                  <div className="flex border border-muted-foreground rounded-md px-2 py-1 items-center ">
                    <Lock size={15} className="text-muted-foreground" />
                    <Input type={`password`} placeholder="At least 8 characters" className={`border-none`} />
                  </div>
                </div>

                {/* Confirm Password  : */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Confirm Password
                    </Label>

                  </div>

                  <div className="flex border gap-1 border-muted-foreground rounded-md px-2 py-1 items-center ">
                    <Lock size={15} className="text-muted-foreground" />
                    <Input className='border-none cursor-not-allowed' placeholder='Re-enter new password' />
                  </div>

                  <span className="text-xs text-muted-foreground">Must match the new password exactly.</span>
                </div>
              </div>
            </div>


            <Separator className={`mt-5 border ${isDark ? 'border-zinc-700' : 'border-zinc-100'}`} />

            {/* buttons : */}
            <div className="justify-between flex mt-2 gap-2">
              <span className="text-xs text-muted-foreground">You'll stay signed in on this device.</span>
              <Button className={`rounded-sm text-xs h-9 bg-customOrange hover:cursor-pointer hover:bg-orange-700 flex item-center gap-1`}>
                <Check />
                <span>Update Paswword</span>
              </Button>
            </div>
          </form>




          {/* Delete Account  :-------------------------------------------------------------- */}
          <div className={`border pb-16 rounded-xl px-5 mt-7 ${isDark ? 'border-zinc-700' : 'border-zinc-100'} `}>

            <div className="flex mt-5 items-center">
              <div className={`border p-1 rounded-md mr-2 bg-orange-950 ${isDark ? 'border-zinc-700' : 'border-zinc-100'} `}>
                <TriangleAlert color="red" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold">Danger Zone</h3>
                <p className="text-xs text-muted-foreground">Irreversible actions. Please proceed with caution.</p>
              </div>

            </div>

            <Separator className={`mt-5 border ${isDark ? 'border-zinc-700' : 'border-zinc-100'}`} />

            <div className="mt-5">

              <div className="flex items-center gap-2">
                <h1>Delete Account</h1>
                <div className="flex bg-yellow-950 items-center gap-1 border w-24 rounded-full px-2 py-px">
                  <TriangleAlert className="text-yellow-600" size={14} />
                  <span className="text-[10px] text-yellow-500">Permanent</span>
                </div>
              </div>

              <div className="">
                <p className="text-xs text-muted-foreground">Permanently delete your account and all associated data — profile, files and activity history. This action cannot be undone.</p>

                <Button className='flex mt-5  items-center gap-2  float-right py-5 bg-red-500'>
                  <Trash size={12} />
                  <span className="text-xs">Delete Account</span>
                </Button>
              </div>

            </div>

          </div>


        </div>



      </div>
    </>
  )
};

export default Profile
