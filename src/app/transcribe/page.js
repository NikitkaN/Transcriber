"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logout from "@/components/logout";

export default function Component() {
  const [mediaType, setMediaType] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (file) => {
    if (file.size > 50 * 1024 * 1024) {
      setError('File size exceeds 50 MB');
      setFile(null);
    } else {
      setFile(file);
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    if (!mediaType) {
      setError('Please select a media type');
      return;
    }
    const fileType = file.type.startsWith('video/') ? 'video' : file.type.startsWith('audio/') ? 'audio' : '';
    if (fileType !== mediaType) {
      setError(`Selected file type does not match the chosen media type (${mediaType})`);
      return;
    }
    setLoading(true);
    setProgress(0);

    const fakeUpload = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(fakeUpload);
          setLoading(false);
          setFileUrl(URL.createObjectURL(file));
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('mediaType', mediaType);

    // try {
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwOTQ4MDgyLCJpYXQiOjE3MjA5NDcxODIsImp0aSI6ImM4NjE3NTVhOTcxMzRkMzJiYzIzNTE5ZDYzOTcxMWRiIiwidXNlcl9pZCI6Nn0.HWevOQ-2NHGK_x0F3z4NNLi1ZM6EaPN1pZQRSULkBhw`,
    //     },
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     const data = await response.json();
    //     setError(data.message || 'Upload failed');
    //   } else {
    //     const data = await response.json();
    //     setFileUrl(data.fileUrl);
    //     setProgress(100);
    //   }
    // } catch (error) {
    //   setError('An unexpected error occurred');
    // } finally {
    //   setLoading(false);
    // }
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
          <Link href="/main#form" prefetch={false}>
            <Logout />
          </Link>
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
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed rounded-md cursor-pointer ${
                    dragging ? 'border-primary bg-gray-200' : 'border-muted'
                  }`}
                >
                  <input type="file" onChange={(e) => handleFileChange(e.target.files[0])} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-2 p-8">
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
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" disabled={loading}>Convert to Transcript</Button>
              </form>
              {loading && <Progress value={progress} className="w-full mt-4" />}
              {fileUrl && (
                <p className="mt-4 text-green-500">
                  File uploaded successfully.{' '}
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    View file
                  </a>
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transcript Preview</CardTitle>
              <CardDescription>Your transcript will be displayed here.</CardDescription>
            </CardHeader>
            <CardContent id="result">
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
                      In this video, we`ll discuss the latest trends in the technology industry and how they are shaping
                      the future of business. We`ll cover topics such as artificial intelligence, cloud computing, and
                      the Internet of Things.
                    </p>
                    <p className="mt-4">
                      First, let`s talk about the rise of artificial intelligence. AI has become a game-changer in many
                      industries, from healthcare to finance. We`ll explore how companies are using AI to automate
                      processes, improve decision-making, and enhance customer experiences.
                    </p>
                    <p className="mt-4">
                      Next, we`ll dive into the world of cloud computing. Cloud-based solutions have revolutionized the
                      way businesses store, manage, and access their data. We`ll discuss the benefits of cloud
                      computing, such as scalability, cost-effectiveness, and improved collaboration.
                    </p>
                    <p className="mt-4">
                      Finally, we`ll explore the Internet of Things (IoT) and how it`s transforming the way we live and
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