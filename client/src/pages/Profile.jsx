import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { setCurrentUser } from "@/redux/features/currentUser.slice";
import axios from "axios";
import {
  Camera,
  Check,
  CircleAlert,
  Eye,
  Loader2,
  Lock,
  Mail,
  Shield,
  Trash,
  TriangleAlert,
  Upload,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
const URL = import.meta.env.VITE_BACKEND_USER_API_URL;

const Profile = () => {
  const { userData } = useSelector((state) => state.currentuserSlice);

  console.log();

  const [personalDetails, setPersonalDetails] = useState({
    fullname: userData?.fullname,
    contact: userData?.contact,
  });
  const [passwordManager, setPasswordManager] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassowrd: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassowrd: false,
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.themeSlice);
  const isDark = theme === "dark";
  const fileRef = useRef(null);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
  };

  const personalDetailsChangeHandler = (e) => {
    const { name, value } = e.target;

    setPersonalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (data) => {
    const regEx = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    if (!data.fullname || data.fullname.length < 4) {
      toast.error("Fullname can not be less than four characters!");
      return false;
    }

    if (data.contact) {
      if (data.contact.length < 10 || data.contact.length > 10) {
        toast.error("Contact number should be 10 digits!");
        return false;
      } else if (!regEx.test(data.contact)) {
        toast.error("Invalid contact number!");
        return false;
      }
    }

    return true;
  };

  const personalDataSubmitHandler = (e) => {
    e.preventDefault();

    if (validateForm(personalDetails)) {
      // api call :

      const personalDetailApi = async () => {
        const { contact, fullname } = personalDetails;
        setLoading(true);
        try {
          const { data } = await axios.put(
            `${URL}/update-user/${userData?._id}`,
            { contact, fullname },
            { withCredentials: true },
          );
          if (data.success) {
            toast.success(data.message || "User has been updated");
            console.log("The data => ", data);
            dispatch(setCurrentUser(data.data));
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      personalDetailApi();
    }
  };

  const validatePassword = (passwordData) => {
    const { currentPassword, newPassword, confirmPassowrd } = passwordData;

    if (currentPassword) {
      if (!newPassword) {
        toast.error("New Paswword is required!");
        return false;
      } else if (!confirmPassowrd) {
        toast.error("Confirm password is required!");
        return false;
      }
    }

    if (
      currentPassword.length < 6 ||
      newPassword.length < 6 ||
      confirmPassowrd.length < 6
    ) {
      toast.error("Password length should be minimum 6 char!");
      return false;
    } else if (newPassword !== confirmPassowrd) {
      toast.error("Confirm password does not match !");
      return false;
    }

    return true;
  };

  const passwordInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setPasswordManager((prev) => ({ ...prev, [name]: value }));
  };

  const passwordSubmitHandler = (e) => {
    e.preventDefault();

    // api call :
    if (validatePassword(passwordManager)) {
      const updateUserPassword = async () => {
        const { currentPassword, newPassword } = passwordManager;
        setLoading(true);
        try {
          const { data } = await axios.put(
            `${URL}/update-password/${userData?._id}`,
            { currentPassword: currentPassword, newPassword: newPassword },
            { withCredentials: true },
          );
          if (data.success) {
            setLoading(false);
            console.log("Password resp => ", data.data);
          }
        } catch (error) {
          setLoading(false);
          toast.error(
            error.response.data.message || "Could not update Password!",
          );
          console.log("Could not update Password!");
        }
      };
      updateUserPassword();
    }
  };

  return (
    <>
      <div className="max-w-5xl  min-h-screen m-auto mt-10">
        <div className="mx-5 mt-5">
          <div className="">
            <h1 className="text-3xl font-semibold">Account Settings</h1>
            <p className="text-muted-foreground">
              Manage your personal information, sign-in credentials and account
              preferences.
            </p>
          </div>

          {/* Avatar banner */}
          <div
            className={`border py-5 rounded-xl  px-5  mt-5 flex flex-wrap items-center gap-10 border-customOrange`}
          >
            {/* Avatar :*/}
            <div className="border w-32 bg-orange-400 h-32 relative flex justify-center items-center rounded-full ">
              {userData.avatar ? (
                <div>
                  <img src={userData.avatar} />
                </div>
              ) : (
                <div className="">
                  <h1 className="text-7xl font-medium">
                    {userData?.fullname[0]}
                  </h1>
                </div>
              )}
              <div className="border rounded-full p-1 absolute -right-1 bottom-2">
                <Camera
                  className="cursor-pointer active:scale-90 duration-200"
                  onClick={() => fileRef.current?.click()}
                />
                <input
                  type="file"
                  className="hidden"
                  ref={fileRef}
                  accept="image/*"
                  onChange={handleFile}
                />
              </div>
            </div>

            {/*  user details : */}
            <div className="flex flex-col gap-2">
              {/* name*/}
              <div className="flex gap-2">
                <h1 className="text-2xl font-semibold">
                  {userData?.fullname}{" "}
                </h1>

                <div className="flex  items-center gap-1 ">
                  <Shield className="text-green-400" size={12} />
                  <Label className={`text-[10px]`}>{userData?.role}</Label>
                </div>
              </div>

              {/* actions : */}
              <div className="flex gap-2">
                <Button
                  className={`flex item-center cursor-pointer rounded-md`}
                  onClick={() => fileRef.current.click()}
                >
                  <Upload className="size-3" />
                  <p className="text-xs">Upload photo</p>
                </Button>
                <Button className="text-xs rounded-md">Remove Photo</Button>
              </div>
            </div>
          </div>

          {/* Personal Details :------------------------------------------------------------ */}

          <form
            className={`border pb-16 rounded-xl px-5 mt-7 ${isDark ? "border-zinc-700" : "border-zinc-100"} `}
            onSubmit={personalDataSubmitHandler}
          >
            <div className="flex mt-5 items-center">
              <div
                className={`border p-1 rounded-md mr-2 bg-orange-950 ${isDark ? "border-zinc-700" : "border-zinc-100"} `}
              >
                <User color="orange" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold">Personal Details</h3>
                <p className="text-xs text-muted-foreground">
                  Update the information associated with your account.
                </p>
              </div>
            </div>

            <Separator
              className={`mt-5 border ${isDark ? "border-zinc-700" : "border-zinc-100"}`}
            />

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* full name : */}
              <div className="flex flex-col gap-3">
                <Label>Full name</Label>

                <div className="flex border border-muted-foreground rounded-md px-2 py-1 items-center ">
                  <User size={18} className="text-muted-foreground" />
                  <Input
                    placeholder="Your full name"
                    className={`border-none`}
                    value={personalDetails.fullname}
                    onChange={personalDetailsChangeHandler}
                    name="fullname"
                  />
                </div>

                <span className="text-xs text-muted-foreground">
                  Shown to teammates across the workspace.
                </span>
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
                  <Mail
                    size={18}
                    className="shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="email"
                    disabled
                    placeholder=""
                    value={userData?.email}
                    className="h-full min-w-0 flex-1 border-0 bg-transparent! px-0 text-sm shadow-none focus-visible:ring-0 cursor-not-allowed"
                  />
                </div>

                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CircleAlert size={13} />
                  <span>
                    Email cannot be changed. Contact support to migrate your
                    account.{" "}
                  </span>
                </span>
              </div>

              {/* Contact NUmber : */}
              <div className="flex flex-col gap-3">
                <Label>Contact number</Label>

                <div className="flex border border-muted-foreground rounded-md px-2 py-1 items-center ">
                  <span className="text-muted-foreground">+91</span>
                  <Input
                    placeholder="Contact"
                    className={`border-none`}
                    onChange={personalDetailsChangeHandler}
                    name="contact"
                    value={personalDetails.contact}
                  />
                </div>

                <span className="text-xs text-muted-foreground">
                  Used for sign-in alerts and account recovery.
                </span>
              </div>

              {/* Role  : */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Role
                  </Label>

                  <span className="flex text-gray-400  items-center gap-1">
                    <Lock size={13} />
                    <span className="text-xs">Locked</span>
                  </span>
                </div>

                <div className="flex h-10 items-center gap-2.5 rounded-lg border border-muted-foreground bg-muted/5 px-3 transition-colors focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/20">
                  <Shield size={18} className="text-muted-foreground" />
                  <Input
                    className="h-full min-w-0 flex-1 border-0 bg-transparent! px-0 text-sm shadow-none focus-visible:ring-0 cursor-not-allowed"
                    placeholder="Role"
                    value={
                      userData?.role.charAt(0).toUpperCase() +
                      userData?.role.slice(1)
                    }
                  />
                </div>

                <span className="text-xs text-muted-foreground">
                  Role is assigned by you, and it is Noneditable
                </span>
              </div>
            </div>

            <Separator
              className={`mt-5 border ${isDark ? "border-zinc-700" : "border-zinc-100"}`}
            />

            {/* buttons : */}
            <div className="float-right flex mt-2 gap-2">
              <Button
                disabled={loading}
                className={`rounded-sm text-xs h-9 bg-customOrange hover:cursor-pointer hover:bg-orange-700 flex item-center gap-1`}
              >
                {loading ? (
                  <div className="flex items-center gap-1 cursor-not-allowed ">
                    <Loader2 className="animate-spin" />
                    <span>Please wait ..</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Check />
                    <span>Save changes</span>
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Password details :-------------------------------------------------------------- */}
          <form
            onSubmit={passwordSubmitHandler}
            className={`border pb-16 rounded-xl px-5 mt-7 ${isDark ? "border-zinc-700" : "border-zinc-100"} `}
          >
            <div className="flex mt-5 items-center">
              <div
                className={`border p-1 rounded-md mr-2 bg-orange-950 ${isDark ? "border-zinc-700" : "border-zinc-100"} `}
              >
                <Lock color="orange" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold">Change Password</h3>
                <p className="text-xs text-muted-foreground">
                  Choose a strong password you don't use anywhere else.
                </p>
              </div>
            </div>

            <Separator
              className={`mt-5 border ${isDark ? "border-zinc-700" : "border-zinc-100"}`}
            />

            <div className="mt-5 gap-10">
              {/* current password : */}
              <div className="flex flex-col gap-3">
                <Label>Current Password</Label>

                <div className="flex relative border border-muted-foreground rounded-md px-2 py-1 items-center ">
                  <User size={18} className="text-muted-foreground" />
                  <Input
                    type={`${isPasswordVisible.currentPassword ? "text" : "password"}`}
                    placeholder="Current Password"
                    className={`border-none`}
                    value={passwordManager.currentPassword}
                    name="currentPassword"
                    onChange={passwordInputChangeHandler}
                  />
                  <Eye
                    size={15}
                    className="cursor-pointer "
                    onClick={() =>
                      setIsPasswordVisible((prev) => ({
                        ...prev,
                        currentPassword: !prev.currentPassword,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {/* New Password : */}
                <div className="flex flex-col gap-3">
                  <Label>New Password</Label>

                  <div className="flex border border-muted-foreground rounded-md px-2 py-1 items-center ">
                    <Lock size={15} className="text-muted-foreground" />
                    <Input
                      type={`${isPasswordVisible.newPassword ? "text" : "password"}`}
                      placeholder="At least 8 characters"
                      className={`border-none`}
                      value={passwordManager.newPassword}
                      name="newPassword"
                      onChange={passwordInputChangeHandler}
                    />
                    <Eye
                      size={15}
                      className="cursor-pointer"
                      onClick={() =>
                        setIsPasswordVisible((prev) => ({
                          ...prev,
                          newPassword: !prev.newPassword,
                        }))
                      }
                    />
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
                    <Input
                      type={`${isPasswordVisible.confirmPassowrd ? "text" : "password"}`}
                      className="border-none "
                      placeholder="Re-enter new password"
                      name="confirmPassowrd"
                      value={passwordManager.confirmPassowrd}
                      onChange={passwordInputChangeHandler}
                    />
                    <Eye
                      size={15}
                      className="cursor-pointer"
                      onClick={() =>
                        setIsPasswordVisible((prev) => ({
                          ...prev,
                          confirmPassowrd: !prev.confirmPassowrd,
                        }))
                      }
                    />
                  </div>

                  <span className="text-xs text-muted-foreground">
                    Must match the new password exactly.
                  </span>
                </div>
              </div>
            </div>

            <Separator
              className={`mt-5 border ${isDark ? "border-zinc-700" : "border-zinc-100"}`}
            />

            {/* buttons : */}
            <div className="float-right flex mt-2 gap-2">
              <Button
                disabled={isPasswordLoading}
                className={`rounded-sm text-xs h-9 bg-customOrange hover:cursor-pointer hover:bg-orange-700 flex item-center gap-1`}
              >
                {loading ? (
                  <div className="flex items-center gap-1 cursor-not-allowed ">
                    <Loader2 className="animate-spin" />
                    <span>Please wait ..</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Check />
                    <span>Save changes</span>
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Delete Account  :-------------------------------------------------------------- */}
          <div
            className={`border pb-16 rounded-xl px-5 mt-7 ${isDark ? "border-zinc-700" : "border-zinc-100"} `}
          >
            <div className="flex mt-5 items-center">
              <div
                className={`border p-1 rounded-md mr-2 bg-orange-950 ${isDark ? "border-zinc-700" : "border-zinc-100"} `}
              >
                <TriangleAlert color="red" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold">Danger Zone</h3>
                <p className="text-xs text-muted-foreground">
                  Irreversible actions. Please proceed with caution.
                </p>
              </div>
            </div>

            <Separator
              className={`mt-5 border ${isDark ? "border-zinc-700" : "border-zinc-100"}`}
            />

            <div className="mt-5">
              <div className="flex items-center gap-2">
                <h1>Delete Account</h1>
                <div className="flex bg-yellow-950 items-center gap-1 border w-24 rounded-full px-2 py-px">
                  <TriangleAlert className="text-yellow-600" size={14} />
                  <span className="text-[10px] text-yellow-500">Permanent</span>
                </div>
              </div>

              <div className="">
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all associated data —
                  profile, files and activity history. This action cannot be
                  undone.
                </p>

                <Button className="flex mt-5  items-center gap-2  float-right py-5 bg-red-500">
                  <Trash size={12} />
                  <span className="text-xs">Delete Account</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
