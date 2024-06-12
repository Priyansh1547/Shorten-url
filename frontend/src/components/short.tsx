import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./client.ts";
import { Button } from "../../src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaHome } from "react-icons/fa";

function App() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [shortId, setShortId] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = "https://api-zkz8.onrender.com";

  useEffect(() => {
    const loggedInUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user === null) {
        navigate("/signup");
      }
    };
    loggedInUser();
  }, [navigate]);

  useEffect(() => {
    if (uploading) {
      setLoading(false);
    }
  }, [uploading]);

  const handleShortenUrl = async () => {
    const res = await axios.post(`${BACKEND_URL}/short`, { websiteUrl: url });
    setLoading(true);
    setTimeout(() => setUploading(true), 2000);
    setShortId(res.data.id);
  };

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <div className="bg-zinc-950 p-3 flex justify-center shadow-md sticky top-0 z-50">
        <div className="text-white text-2xl font-semibold">
          <a href="/">UrlShortener</a>
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
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-900 p-4 dark">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Url Shortener</CardTitle>
            <CardDescription>Enter your long URL</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="github-url">Enter long URL</Label>
                <Input
                  placeholder="https://github.com/Priyansh1547/Shorten-url"
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button className="w-full mt-4" onClick={handleShortenUrl}>
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {loading && (
          <h1 className="text-white mt-8">
            Generating your shortened URL.....
          </h1>
        )}
        {uploading && (
          <Card className="w-full max-w-md mt-8">
            <CardHeader>
              <CardTitle className="text-xl">Status</CardTitle>
              <CardDescription>
                Your shortened URL is successfully generated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="deployed-url">Shortened URL</Label>
                <Input
                  id="deployed-url"
                  readOnly
                  type="url"
                  value={`api-zkz8.onrender.com/${shortId}`}
                />
              </div>
              <br />
              <Button className="w-full" variant="outline">
                <a href={`${BACKEND_URL}/${shortId}`}>Visit Website</a>
              </Button>
              <Button
                className="w-full mt-4"
                onClick={() => {
                  setUploading(false);
                  setLoading(false);
                }}
              >
                New
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}

export default App;
