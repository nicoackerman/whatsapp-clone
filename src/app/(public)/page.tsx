"use client";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "~/components/ui/mode-toggle";

export default function WhatsAppLanding() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="w-full backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-24 px-4">
          {/* left side header */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              WhatsApp Clone
            </span>
          </div>
          {/* right side header */}
          <nav className="flex flex-grow items-center justify-between space-x-8">
            <Link
              href="#about"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-[#25D366] dark:text-white"
            >
              Github Repository
            </Link>
            <div className="flex items-center gap-2">
              <Authenticated>
                <UserButton />
              </Authenticated>
              <AuthLoading>
                <Skeleton className="size-4 bg-gray-500" />
              </AuthLoading>
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>
      {/* Main */}
      <main className="flex flex-grow flex-row justify-center dark:bg-black">
        <section className="w-full self-center">
          <div className="flex-col space-y-4 text-center">
            <Badge className="mb-4">🚀 Coded by nicoackerman</Badge>
            <h1 className="text-4xl font-bold md:text-6xl">
              Simple. Reliable. <span className="text-[#25D366]">Private.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-white">
              This is an open-source project. Send text messages. test it and
              leave a review.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Unauthenticated>
                <SignInButton>
                  <Button
                    size="lg"
                    className="bg-[#25D366] px-8 text-white hover:bg-[#128C7E]"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    size="lg"
                    className="bg-[#25D366] px-8 text-white hover:bg-[#128C7E]"
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </Unauthenticated>
              <Authenticated>
                <Link
                  href="/dashboard"
                  className="flex flex-row items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#25D366] dark:text-white"
                >
                  <ArrowRight />
                  Go to dashboard
                </Link>
              </Authenticated>
              <AuthLoading>
                <Skeleton className="h-10 w-60 rounded-md bg-[#34ba65]" />
              </AuthLoading>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
