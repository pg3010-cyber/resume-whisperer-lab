import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const UploadResume = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadComplete(true);
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <DashboardLayout
      title="Upload Resume"
      subtitle="Upload resumes to analyze with our AI-powered screening tool."
    >
      <div className="max-w-3xl mx-auto">
        {/* Upload Area */}
        <GlassCard className="mb-6" hover={false}>
          <motion.div
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <motion.div
              className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/25"
              animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
            >
              <Upload className="text-white" size={32} />
            </motion.div>

            <h3 className="text-xl font-semibold mb-2">
              {isDragging ? "Drop your files here" : "Drag & Drop Resume"}
            </h3>
            <p className="text-muted-foreground mb-4">
              or click to browse from your computer
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>PDF</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>DOC</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>DOCX</span>
              </div>
            </div>
          </motion.div>
        </GlassCard>

        {/* File List */}
        {files.length > 0 && (
          <GlassCard hover={false}>
            <h3 className="text-lg font-semibold mb-4">
              Selected Files ({files.length})
            </h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="font-medium truncate max-w-[200px] sm:max-w-none">
                        {file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {uploadComplete && (
                      <CheckCircle2 className="text-success" size={20} />
                    )}
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <X size={18} className="text-muted-foreground" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={handleUpload}
                disabled={uploading || uploadComplete}
                className="flex-1 gradient-primary text-white border-0"
              >
                {uploading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Analyzing...
                  </>
                ) : uploadComplete ? (
                  <>
                    <CheckCircle2 className="mr-2" size={18} />
                    Analysis Complete
                  </>
                ) : (
                  "Start Analysis"
                )}
              </Button>
              {uploadComplete && (
                <Button variant="outline" asChild>
                  <a href="/results">View Results</a>
                </Button>
              )}
            </div>
          </GlassCard>
        )}

        {/* Tips */}
        <motion.div
          className="mt-8 grid sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5">
            <CheckCircle2 className="text-primary mt-0.5" size={18} />
            <div>
              <p className="font-medium text-sm">Best Practices</p>
              <p className="text-xs text-muted-foreground">
                Use PDF format for best results. Ensure text is selectable.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/5">
            <AlertCircle className="text-warning mt-0.5" size={18} />
            <div>
              <p className="font-medium text-sm">File Limits</p>
              <p className="text-xs text-muted-foreground">
                Maximum 10 MB per file. Up to 10 files at once.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default UploadResume;
