import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { Separator } from "./ui/separator";
import { useSelector } from "react-redux";

const Footer = () => {
  const { theme } = useSelector((state) => state.themeSlice);
  const isDark = theme === "dark";
  return (
    <div className={`mt-20 border py-10 shadow ${isDark ? 'border-zinc-700' : 'border-zinc-200'} `}>
     
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  px-5  w-fit mx-auto gap-10">
        {/* first section :  */}
        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold text-3xl font-mono text-customOrange">
            DineFlow
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Thoughtful dining, made simple.
          </p>
          <p className="text-muted-foreground mt-5 text-xs">
            Discover good food and make every meal <br /> a little easier.{" "}
          </p>

          {/* logo :  */}
          <div className="flex gap-10 mt-7">
            <Link to={`https://www.linkedin.com/in/rakeshparida99/`}>
              {" "}
              <BsLinkedin className="text-blue-500" size={20} />
            </Link>

            <Link to={`https://github.com/Rakesh-99/dineflow`}>
              <FaGithub size={20} />
            </Link>
          </div>
        </div>

        {/* second section :  */}
        <div className="">
          <h3 className="text-customOrange font-normal font-sans text-sm">
            EXPLORE
          </h3>
          <ul className="text-muted-foreground text-xs">
            <li className="mt-5">
              <NavLink>How it works</NavLink>
            </li>
            <li className="mt-5">Resigiter as Restaurant</li>
            <li className="mt-5">Resgiter as Delivery agent</li>
          </ul>
        </div>

        {/* Project  */}
        <div className="">
          <div className="flex flex-col">
            <h2 className="text-customOrange font-sans font-normal">Project</h2>
            <Link className="mt-3 text-xs text-muted-foreground">About</Link>
            <Link className="mt-5 text-xs text-muted-foreground">Contact</Link>
          </div>
        </div>

        {/* Get in tpuch :  */}
        <div className="">
          <div>
            <h1 className="text-customOrange font-sans font-normal">
              GET IN TOUCH
            </h1>
            <div className="flex flex-col">
              <Link className="text-xs text-muted-foreground mt-2">
                rakeshkumarparida424@gmail.com
              </Link>
              <Link
                to={`https://www.linkedin.com/in/rakeshparida99/`}
                className="text-xs text-muted-foreground mt-4"
              >
                Linkedin
              </Link>
              <Link
                to={`https://github.com/Rakesh-99`}
                className="text-xs text-muted-foreground mt-5"
              >
                Github
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80%]  m-auto">
        <Separator
          className={`${isDark ? "bg-zinc-500" : "bg-zinc-300"} my-5`}
        />
      </div>

      <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col items-center gap-5 md:gap-0 lg:gap-0 sm:gap-0 justify-evenly text-muted-foreground my-5 text-xs">
        <p>@ 2026 Dineflow. All rights reserved.</p>

        <ul className="flex list-none gap-4">
          <li>
            <NavLink>Privacy</NavLink>
          </li>
          <li>
            <NavLink>Terms</NavLink>
          </li>
          <li>
            <NavLink>Cookies</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
