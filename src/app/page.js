import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Logout from "@/components/logout"
import Image from "next/image"

export default function Component() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex justify-between items-center">
        <Link href="./main" className="flex items-center justify-center" prefetch={false}>
          <MountainIcon className="size-6" />
          <span className="sr-only">Transcribe</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Pricing
          </Link>
          <Link href="./main#form" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            <Logout />
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Convert videos to text transcripts
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our powerful AI-powered transcription tool makes it easy to convert your videos into searchable,
                  editable text.
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    href="./transcribe"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Try it now
                  </Link>
                  <Link
                    href="#pricing"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Pricing
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="./placeholder.png"
                  width="550"
                  height="310"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful transcription tools</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered transcription engine delivers accurate, searchable text from your videos in minutes.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Automated Transcription</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your videos and let our AI engine do the rest, delivering accurate transcripts in minutes.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Searchable Transcripts</h3>
                <p className="text-sm text-muted-foreground">
                  Your transcripts are fully searchable, making it easy to find specific moments in your videos.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Editing and Formatting</h3>
                <p className="text-sm text-muted-foreground">
                  Edit your transcripts directly in the app and format them for easy sharing and collaboration.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Multiple Output Formats</h3>
                <p className="text-sm text-muted-foreground">
                  Download your transcripts in a variety of formats, including text, SRT, and VTT.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Team Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Invite your team to review and edit transcripts, and track changes in real-time.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Secure and Reliable</h3>
                <p className="text-sm text-muted-foreground">
                  Your videos and transcripts are stored securely, with enterprise-grade encryption and backup.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Affordable pricing for every need
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that fits your budget and transcription requirements.
              </p>
            </div>
            <div className="mx-auto w-full max-w-md space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>Perfect for individuals and small teams.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      100 minutes of transcription per month
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Searchable transcripts
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Multiple output formats
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Basic team collaboration
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button>Get Started</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For teams and businesses with higher volume needs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      1,000 minutes of transcription per month
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Searchable transcripts
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Multiple output formats
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Advanced team collaboration
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Enterprise-grade security and reliability
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button>Get Started</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>Tailored solutions for large organizations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <span className="text-4xl font-bold">Custom</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Unlimited transcription volume
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Customizable workflows and integrations
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Advanced team management and controls
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Dedicated support and SLAs
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button>Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get started with Transcribe</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Upload your first video and let our AI-powered transcription engine do the rest.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="video">Upload Video</Label>
                <Input id="video" type="file" />
              </div>
              <Button>Transcribe Video</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Transcribe. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}