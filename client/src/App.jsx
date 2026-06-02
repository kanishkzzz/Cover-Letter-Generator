import React, { useEffect, useMemo, useState } from "react";
import { Copy, Download, FileText, FileUp, Sparkles } from "lucide-react";
import { requestCoverLetter } from "./api/coverLetterApi";
import { Button } from "./components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Textarea } from "./components/ui/textarea";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

export default function App() {
  const [jdMode, setJdMode] = useState("text"); // "text" | "pdf"

  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [jdPdfFile, setJdPdfFile] = useState(null);

  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const canGenerate = useMemo(() => {
    if (!resumeFile) return false;
    if (!resumeFile.name.toLowerCase().endsWith(".pdf")) return false;

    if (jdMode === "text") return jdText.trim().length > 0;
    return Boolean(jdPdfFile);
  }, [resumeFile, jdMode, jdText, jdPdfFile]);

  const validateFiles = () => {
    if (!resumeFile) return "Please upload your resume (PDF).";
    if (!resumeFile.name.toLowerCase().endsWith(".pdf")) {
      return "Resume must be a PDF file.";
    }
    if (resumeFile.size > MAX_FILE_BYTES) {
      return `Resume file is too large (max ${Math.round(MAX_FILE_BYTES / 1024 / 1024)}MB).`;
    }

    if (jdMode === "text") {
      if (!jdText.trim()) return "Paste the job description text (JD).";
      return "";
    }

    if (!jdPdfFile) return "Please upload the JD PDF.";
    if (!jdPdfFile.name.toLowerCase().endsWith(".pdf")) {
      return "JD PDF must be a PDF file.";
    }
    if (jdPdfFile.size > MAX_FILE_BYTES) {
      return `JD PDF is too large (max ${Math.round(MAX_FILE_BYTES / 1024 / 1024)}MB).`;
    }
    return "";
  };

  const handleGenerate = async () => {
    setError("");
    const msg = validateFiles();
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);
    try {
      const data = await requestCoverLetter({
        resumeFile,
        jdText: jdMode === "text" ? jdText : undefined,
        jdPdfFile: jdMode === "pdf" ? jdPdfFile : undefined,
      });

      setCoverLetter(data?.cover_letter || "");
      if (!data?.cover_letter) {
        setError("No cover letter returned. Please try again.");
      }
    } catch (e) {
      setError(e?.message || "Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    setError("");
    if (!coverLetter) return;

    try {
      await navigator.clipboard.writeText(coverLetter);
    } catch {
      // Fallback for environments where clipboard API is blocked.
      const ta = document.createElement("textarea");
      ta.value = coverLetter;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  const handleDownload = () => {
    setError("");
    if (!coverLetter) return;
    const blob = new Blob([coverLetter], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="brand-glow inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600/10">
                  <Sparkles className="text-brand-300" size={20} />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
                  AI Cover Letter Generator
                </h1>
              </div>
              <p className="mt-2 text-sm text-zinc-300">
                Upload your resume, add the JD (text or PDF), and generate a tailored cover letter.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileUp size={18} /> Inputs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume (PDF)</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null;
                      setResumeFile(f);
                    }}
                  />
                  {resumeFile ? (
                    <div className="text-xs text-zinc-400">
                      Selected: <span className="text-zinc-200">{resumeFile.name}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-zinc-500">
                      PDF only. Max {Math.round(MAX_FILE_BYTES / 1024 / 1024)}MB.
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Job Description (JD)</Label>
                  <Tabs value={jdMode} onValueChange={setJdMode}>
                    <TabsList>
                      <TabsTrigger value="text">JD Text</TabsTrigger>
                      <TabsTrigger value="pdf">JD PDF</TabsTrigger>
                    </TabsList>

                    <TabsContent value="text">
                      <Textarea
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        placeholder="Paste the job description here..."
                      />
                      <div className="mt-2 text-xs text-zinc-500">
                        Tip: Include role, responsibilities, required skills, and any key tools mentioned.
                      </div>
                    </TabsContent>

                    <TabsContent value="pdf">
                      <Input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          setJdPdfFile(f);
                        }}
                      />
                      {jdPdfFile ? (
                        <div className="text-xs text-zinc-400">
                          Selected: <span className="text-zinc-200">{jdPdfFile.name}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-zinc-500">
                          PDF only. Max {Math.round(MAX_FILE_BYTES / 1024 / 1024)}MB.
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>

                {error ? (
                  <Alert variant="error">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : null}

                <Button
                  className="w-full brand-glow"
                  onClick={handleGenerate}
                  disabled={!canGenerate || loading}
                >
                  {loading ? "Generating..." : "Generate Cover Letter"}
                </Button>

                <div className="text-xs text-zinc-500">
                  The app calls your FastAPI endpoint: <span className="text-zinc-200">/api/generate-cover-letter</span>.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={18} /> Output
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea value={coverLetter} readOnly placeholder="Your cover letter will appear here..." />

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={handleCopy}
                  disabled={!coverLetter}
                  className="flex-1 sm:flex-none"
                >
                  <Copy size={16} /> Copy
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDownload}
                  disabled={!coverLetter}
                  className="flex-1 sm:flex-none"
                >
                  <Download size={16} /> Download
                </Button>
              </div>

              <div className="text-xs text-zinc-500">
                If generation fails, check backend logs and your browser console (network/CORS).
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

