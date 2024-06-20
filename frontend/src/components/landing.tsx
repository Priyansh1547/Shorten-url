import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "./client.ts";
import { useEffect, useState } from "react";

export default function Component() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user === null) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    };
    loggedInUser();
  }, [navigate]);
  return (
    <div className="flex flex-col min-h-[100dvh] dark:bg-muted">
      <header className="fixed top-0 left-0 right-0 px-4 lg:px-6 h-14 flex items-center backdrop-blur-md z-50 dark:bg-background dark:border-b dark:border-muted border-b border-gray-700 shadow-lg">
        <a href={"/"}>
          <h1 className="text-white text-xl font-bold">Url-Shortener</h1>
        </a>
        {!loggedIn && (
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Button
              variant="outline"
              className="dark text-white bg-gray-950 hover:bg-gray-900"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button
              variant="outline"
              className="dark text-white bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </nav>
        )}
        {loggedIn && (
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Button
              variant="outline"
              className="dark text-white bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              onClick={() => navigate("/home")}
            >
              Go to Home page
            </Button>
          </nav>
        )}
      </header>
      <main className="flex-1 text-white bg-gray-900">
        <section className="w-full py-12 md:py-12 lg:py-16 xl:py-24 dark:bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none dark:text-primary-foreground">
                    Shorten your links, boost your reach.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl dark:text-secondary-foreground">
                    Our powerful URL shortener helps you create custom, branded
                    links that are easy to share and track.
                  </p>
                </div>
              </div>
              <img
                src="https://ideogram.ai/api/images/direct/Vcvn3dlBTWaSLp4kSDppAQ.jpg"
                width="550"
                height="550"
                alt="URL Shortener"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-16 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl dark:text-primary-foreground">
                  Shortened URLs, Powerful Results
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-secondary-foreground">
                  Our URL shortener helps you create custom, branded links that
                  are easy to share and track. Boost your online presence and
                  drive more traffic to your content.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <Card className="dark:bg-card dark:text-card-foreground">
                      <CardHeader>
                        <CardTitle className="dark:text-primary-foreground">
                          Advanced Analytics
                        </CardTitle>
                        <CardDescription className="dark:text-secondary-foreground">
                          Track clicks, referrers, and other valuable metrics.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground dark:text-secondary-foreground">
                          Get detailed insights into how your links are
                          performing, including click-through rates, referrers,
                          and more.
                        </p>
                      </CardContent>
                    </Card>
                  </li>
                  <li>
                    <Card className="dark:bg-card dark:text-card-foreground">
                      <CardHeader>
                        <CardTitle className="dark:text-primary-foreground">
                          Password Protection
                        </CardTitle>
                        <CardDescription className="dark:text-secondary-foreground">
                          Secure your links with password protection.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground dark:text-secondary-foreground">
                          Protect your sensitive links with password
                          authentication, ensuring only authorized users can
                          access them.
                        </p>
                      </CardContent>
                    </Card>
                  </li>
                </ul>
              </div>
              <img
                src="https://ideogram.ai/api/images/direct/AVvbTNZ7SVOCpY85Xbqscw.png"
                width="550"
                height="500"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-16 dark:border-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight dark:text-primary-foreground">
                Get Started with URL Shortener
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-secondary-foreground">
                Sign up now to start shortening your links and boost your online
                presence.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              {!loggedIn && (
                <>
                  <Button
                    variant="outline"
                    className="dark text-white bg-gray-950 hover:bg-gray-900"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="outline"
                    className="dark text-white bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </>
              )}
              {loggedIn && (
                <>
                  <Button
                    variant="outline"
                    className="dark text-white bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
                    onClick={() => navigate("/home")}
                  >
                    Go to home page
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 dark:bg-muted dark:border-muted bg-gray-900">
        <p className="text-xs text-muted-foreground dark:text-secondary-foreground">
          &copy; 2024 URL Shortener. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
