import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { supabase } from "./client";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  async function logoutUser() {
    const { error } = await supabase.auth.signOut();
    navigate("/login");
  }

  const getUserEmail = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUserEmail(user ? user.email || "" : "");
  };
  getUserEmail();
  const loggedInUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user === null) {
      navigate("/login");
    }
  };
  loggedInUser();
  return (
    <>
      <div className="bg-zinc-950 p-3 flex justify-center  shadow-md sticky top-0 z-50">
        <div className=" text-white text-2xl font-semibold">
          <a href="/">UrlShotner</a>
        </div>
        <div className="w-full flex items-end justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-900 text-white border-2 border-gray-900">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <FaHome />
                  <span className="ml-3">Home</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutUser}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-screen bg-gray-900 dark ">
        <div className="flex flex-col w-full md:w-64 px-4 py-8 bg-gray-900 border-r">
          <div className="flex flex-col items-center mb-6">
            <Avatar>
              <img src="https://github.com/shadcn.png" alt="Profile picture" />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            <h3 className="mt-2  font-semibold text-white">{userEmail}</h3>
          </div>
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <Button
                variant="ghost"
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-left text-blue-600 bg-blue-100 rounded-lg"
              >
                <CgProfile className="mr-2 h-4 w-4" />
                <span className="ml-4 ">Profile</span>
              </Button>
            </nav>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-10 md:p-16">
          <h1 className="text-4xl font-semibold text-white">Profile</h1>
          <p className="mt-1 text-sm text-white">
            This page shows you your profile and account details
          </p>
          <div className="flex flex-col mt-8 md:mt-12">
            <div className="flex items-center">
              <Avatar className="flex-shrink-0">
                <img
                  src="https://github.com/shadcn.png"
                  alt="Profile picture"
                />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
              <div className="flex-1 ml-6">
                <h2 className="text-sm font-semibold text-white">
                  Profile Picture
                </h2>
              </div>
            </div>
            <div className="mt-4 md:mt-6">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-white"
              >
                Your Email
              </Label>
              <Input
                id="email"
                placeholder={userEmail}
                className="w-full mt-2 cursor-not-allowed"
                type="email"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
