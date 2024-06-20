import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { supabase } from "./client";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const response = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    const { data, error } = response;
    if (error) {
      // Handle error
    } else {
      navigate("/home");
    }
  };
  return (
    <>
      <div className="flex bg-black">
        <div className="w-full md:w-2/5 bg-black flex justify-center items-center h-screen max-sm:hidden max-md:hidden">
          <h1 className="text-4xl font-bold mb-4 text-white">Url-Shotner</h1>
        </div>
        <div className="w-full h-screen md:w-3/5 bg-gray-900 flex justify-center items-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl">Create an account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github-url">Email</Label>
                  <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Label htmlFor="github-url">Password</Label>
                  <Input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleSignUp}>
                  Sign up
                </Button>
                <CardDescription className="text-center text-black">
                  Already have an account{" "}
                  <a href={"/login"} className="text-blue-500">
                    Login
                  </a>
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
export default Login;
