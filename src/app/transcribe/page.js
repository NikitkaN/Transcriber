"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState("video");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 50 * 1024 * 1024) { // 50 MB
      setError("File size should be less than 50 MB");
      setFile(null);
    } else {
      setError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("media_type", mediaType);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwOTQ4MDgyLCJpYXQiOjE3MjA5NDcxODIsImp0aSI6ImM4NjE3NTVhOTcxMzRkMzJiYzIzNTE5ZDYzOTcxMWRiIiwidXNlcl9pZCI6Nn0.HWevOQ-2NHGK_x0F3z4NNLi1ZM6EaPN1pZQRSULkBhw`
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setFileUrl(result.file_url);
      } else {
        setError(result.error);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <header className="bg-card py-4 px-6 flex items-center justify-between shadow">
        <div className="flex items-center gap-2">
          <CopyIcon className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Transcribe</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Main
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Account
          </Link>
          <Button variant="secondary">Logout</Button>
        </nav>
      </header>
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Convert Video to Transcript</CardTitle>
              <CardDescription>Drag and drop a video file or click to select.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
                <div>
                  <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-muted rounded-md cursor-pointer">
                    <UploadIcon className="w-8 h-8 text-muted-foreground" />
                    <p className="text-muted-foreground">Drag and drop a video file or click to select.</p>
                  </label>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <Select onValueChange={setMediaType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select media type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" disabled={loading}>Convert to Transcript</Button>
              </form>
              {loading && <Progress value={progress} className="w-full mt-4" />}
              {fileUrl && <p className="mt-4 text-green-500">File uploaded successfully. <a href={fileUrl} target="_blank">View file</a></p>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transcript Preview</CardTitle>
              <CardDescription>Your transcript will be displayed here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <LanguagesIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">English</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">3:45</span>
                </div>
                <ScrollArea className="h-72 overflow-auto">
                  <div className="p-4 text-sm">
                    <p>
                      In this video, we'll discuss the latest trends in the technology industry and how they are shaping
                      the future of business. We'll cover topics such as artificial intelligence, cloud computing, and
                      the Internet of Things.
                    </p>
                    <p className="mt-4">
                      First, let's talk about the rise of artificial intelligence. AI has become a game-changer in many
                      industries, from healthcare to finance. We'll explore how companies are using AI to automate
                      processes, improve decision-making, and enhance customer experiences.
                    </p>
                    <p className="mt-4">
                      Next, we'll dive into the world of cloud computing. Cloud-based solutions have revolutionized the
                      way businesses store, manage, and access their data. We'll discuss the benefits of cloud
                      computing, such as scalability, cost-effectiveness, and improved collaboration.
                    </p>
                    <p className="mt-4">
                      Finally, we'll explore the Internet of Things (IoT) and how it's transforming the way we live and
                      work. IoT devices are connecting our homes, cars, and even our bodies to the internet, creating a
                      wealth of data that can be used to improve efficiency, optimize processes, and enhance our daily
                      lives.
                    </p>
                  </div>
                </ScrollArea>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary">Download as Text</Button>
                  <Button variant="secondary">Download as PDF</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-card py-4 px-6 flex items-center justify-between shadow">
        <p className="text-muted-foreground text-sm">&copy; 2024 Transcribe. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}


// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// import { Progress } from "@/components/ui/progress"
// import { ScrollArea } from "@/components/ui/scroll-area"

// export default function Component() {
//   return (
//     <div className="flex flex-col h-full w-full bg-background">
//       <header className="bg-card py-4 px-6 flex items-center justify-between shadow">
//         <div className="flex items-center gap-2">
//           <CopyIcon className="w-6 h-6 text-primary" />
//           <h1 className="text-2xl font-bold">Transcribe</h1>
//         </div>
//         <nav className="flex items-center gap-4">
//           <Link href="/" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Main
//           </Link>
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Account
//           </Link>
//           <Button variant="secondary">Logout</Button>
//         </nav>
//       </header>
//       <main className="flex-1 p-8">
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Convert Video to Transcript</CardTitle>
//               <CardDescription>Drag and drop a video file or click to select.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form className="flex flex-col items-center justify-center gap-4">
//                 <div>
//                   <div className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-muted rounded-md">
//                     <UploadIcon className="w-8 h-8 text-muted-foreground" />
//                     <p className="text-muted-foreground">Drag and drop a video file or click to select.</p>
//                   </div>
//                 </div>
//                 <Select>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select language" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="en">English</SelectItem>
//                     <SelectItem value="es">Spanish</SelectItem>
//                     <SelectItem value="fr">French</SelectItem>
//                     <SelectItem value="de">German</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Button type="submit">Convert to Transcript</Button>
//               </form>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Transcript Preview</CardTitle>
//               <CardDescription>Your transcript will be displayed here.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center gap-2">
//                   <LanguagesIcon className="w-5 h-5 text-muted-foreground" />
//                   <span className="text-muted-foreground">English</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <ClockIcon className="w-5 h-5 text-muted-foreground" />
//                   <span className="text-muted-foreground">3:45</span>
//                 </div>
//                 <Progress value={75} className="w-full" />
//                 <ScrollArea className="h-72 overflow-auto">
//                   <div className="p-4 text-sm">
//                     <p>
//                       In this video, we'll discuss the latest trends in the technology industry and how they are shaping
//                       the future of business. We'll cover topics such as artificial intelligence, cloud computing, and
//                       the Internet of Things.
//                     </p>
//                     <p className="mt-4">
//                       First, let's talk about the rise of artificial intelligence. AI has become a game-changer in many
//                       industries, from healthcare to finance. We'll explore how companies are using AI to automate
//                       processes, improve decision-making, and enhance customer experiences.
//                     </p>
//                     <p className="mt-4">
//                       Next, we'll dive into the world of cloud computing. Cloud-based solutions have revolutionized the
//                       way businesses store, manage, and access their data. We'll discuss the benefits of cloud
//                       computing, such as scalability, cost-effectiveness, and improved collaboration.
//                     </p>
//                     <p className="mt-4">
//                       Finally, we'll explore the Internet of Things (IoT) and how it's transforming the way we live and
//                       work. IoT devices are connecting our homes, cars, and even our bodies to the internet, creating a
//                       wealth of data that can be used to improve efficiency, optimize processes, and enhance our daily
//                       lives.
//                     </p>
//                   </div>
//                 </ScrollArea>
//                 <div className="flex justify-end gap-2">
//                   <Button variant="secondary">Download as Text</Button>
//                   <Button variant="secondary">Download as PDF</Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//       <footer className="bg-card py-4 px-6 flex items-center justify-between shadow">
//         <p className="text-muted-foreground text-sm">&copy; 2024 Transcribe. All rights reserved.</p>
//         <div className="flex items-center gap-4">
//           <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
//             Terms of Service
//           </Link>
//           <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
//             Privacy Policy
//           </Link>
//         </div>
//       </footer>
//     </div>
//   )
// }

function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function CopyIcon(props) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}


function LanguagesIcon(props) {
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
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  )
}


function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
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