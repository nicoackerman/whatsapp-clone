import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  MessageCircle,
  Phone,
  Video,
  Users,
  Shield,
  Smartphone,
  Download,
  Star,
  Check,
  Menu,
} from "lucide-react";
import Link from "next/link";

export default function WhatsAppLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              WhatsApp Clone
            </span>
          </div>

          <nav className="hidden items-center space-x-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-[#25D366]"
            >
              Features
            </Link>
            <Link
              href="#download"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-[#25D366]"
            >
              Download
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-[#25D366]"
            >
              About
            </Link>
            <Button className="bg-[#25D366] text-white hover:bg-[#128C7E]">
              Get Started
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#25D366]/5 to-white px-4 py-20">
          <div className="container mx-auto text-center">
            <Badge className="mb-4 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20">
              🚀 Now Available
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
              Simple. Reliable. <span className="text-[#25D366]">Private.</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Connect with friends and family instantly. Send messages, make
              calls, and share moments with end-to-end encryption.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-[#25D366] px-8 text-white hover:bg-[#128C7E]"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#25D366] bg-transparent text-[#25D366] hover:bg-[#25D366] hover:text-white"
              >
                Try Web Version
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Why Choose Our WhatsApp Clone?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Experience all the features you love with enhanced privacy and
                performance
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10">
                    <MessageCircle className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Instant Messaging
                  </h3>
                  <p className="text-gray-600">
                    Send and receive messages instantly with delivery and read
                    receipts
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10">
                    <Phone className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Voice Calls
                  </h3>
                  <p className="text-gray-600">
                    Crystal clear voice calls with your contacts anywhere in the
                    world
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10">
                    <Video className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Video Calls
                  </h3>
                  <p className="text-gray-600">
                    Face-to-face conversations with high-quality video calling
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10">
                    <Users className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Group Chats
                  </h3>
                  <p className="text-gray-600">
                    Create groups with up to 256 people and stay connected with
                    everyone
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10">
                    <Shield className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    End-to-End Encryption
                  </h3>
                  <p className="text-gray-600">
                    Your messages are secured with end-to-end encryption by
                    default
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10">
                    <Smartphone className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Cross-Platform
                  </h3>
                  <p className="text-gray-600">
                    Available on mobile, desktop, and web. Sync across all your
                    devices
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="container mx-auto">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                  Experience the Future of Messaging
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700">
                      Lightning-fast message delivery
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700">
                      Share photos, videos, and documents
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700">
                      Voice messages and location sharing
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700">
                      Status updates and stories
                    </span>
                  </div>
                </div>
                <Button
                  className="mt-8 bg-[#25D366] text-white hover:bg-[#128C7E]"
                  size="lg"
                >
                  Start Chatting Now
                </Button>
              </div>
              <div className="relative">
                <div className="rounded-3xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-8 text-white">
                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                    <div className="mb-4 flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-white/20"></div>
                      <div>
                        <div className="mb-1 h-3 w-20 rounded bg-white/30"></div>
                        <div className="h-2 w-16 rounded bg-white/20"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="ml-8 rounded-lg bg-white/20 p-3">
                        <div className="h-2 w-32 rounded bg-white/40"></div>
                      </div>
                      <div className="mr-8 rounded-lg bg-[#DCF8C6] p-3 text-gray-800">
                        <div className="h-2 w-28 rounded bg-gray-400"></div>
                      </div>
                      <div className="ml-8 rounded-lg bg-white/20 p-3">
                        <div className="h-2 w-24 rounded bg-white/40"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Loved by Millions
              </h2>
              <p className="text-lg text-gray-600">
                See what our users are saying about the experience
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600">
                    "The best messaging app I've ever used. Clean interface and
                    super reliable!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#25D366]/10"></div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Sarah Johnson
                      </p>
                      <p className="text-sm text-gray-500">Product Designer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600">
                    "Amazing call quality and the group features are fantastic
                    for team communication."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#25D366]/10"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Mike Chen</p>
                      <p className="text-sm text-gray-500">Software Engineer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600">
                    "Privacy-focused and user-friendly. Exactly what I was
                    looking for!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#25D366]/10"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Emma Davis</p>
                      <p className="text-sm text-gray-500">Marketing Manager</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="download"
          className="bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-20"
        >
          <div className="container mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to Start Messaging?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
              Join millions of users who trust our platform for their daily
              communication needs.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white px-8 text-[#25D366] hover:bg-gray-100"
              >
                <Download className="mr-2 h-5 w-5" />
                Download for Mobile
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-[#25D366]"
              >
                Open Web App
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 text-white">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">WhatsApp Clone</span>
              </div>
              <p className="text-gray-400">
                Simple, reliable, and private messaging for everyone.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Desktop
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Web
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WhatsApp Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
