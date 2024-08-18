"use client";

import React, { useCallback, useState } from "react";
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import ProgressBar from "../ui/progress";

interface FileUploadProps {
  name: string;
  control: any;
  rules?: any;
}

interface FileUploadProgress {
  progress: number;
  file: File;
  source: any | null;
}

enum FileTypes {
  Image = "image",
  Pdf = "pdf",
  Audio = "audio",
  Video = "video",
  Other = "other",
}

const fileColors = {
  [FileTypes.Image]: { bgColor: "bg-purple-600", fillColor: "fill-purple-600" },
  [FileTypes.Pdf]: { bgColor: "bg-blue-400", fillColor: "fill-blue-400" },
  [FileTypes.Audio]: { bgColor: "bg-yellow-400", fillColor: "fill-yellow-400" },
  [FileTypes.Video]: { bgColor: "bg-green-400", fillColor: "fill-green-400" },
  [FileTypes.Other]: { bgColor: "bg-gray-400", fillColor: "fill-gray-400" },
};

const FileUpload: React.FC<FileUploadProps> = () => {
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const getFileIconAndColor = (file: File) => {
    const fileType = file.type.includes(FileTypes.Image)
      ? FileTypes.Image
      : file.type.includes(FileTypes.Pdf)
      ? FileTypes.Pdf
      : file.type.includes(FileTypes.Audio)
      ? FileTypes.Audio
      : file.type.includes(FileTypes.Video)
      ? FileTypes.Video
      : FileTypes.Other;

    const { icon, color } = {
      icon: {
        [FileTypes.Image]: (
          <FileImage size={40} className={fileColors[fileType].fillColor} />
        ),
        [FileTypes.Pdf]: (
          <File size={40} className={fileColors[fileType].fillColor} />
        ),
        [FileTypes.Audio]: (
          <AudioWaveform size={40} className={fileColors[fileType].fillColor} />
        ),
        [FileTypes.Video]: (
          <Video size={40} className={fileColors[fileType].fillColor} />
        ),
        [FileTypes.Other]: (
          <FolderArchive size={40} className={fileColors[fileType].fillColor} />
        ),
      }[fileType],
      color: fileColors[fileType].bgColor,
    };

    return { icon, color };
  };

  const removeFile = useCallback((file: File) => {
    setFilesToUpload((prev) => prev.filter((item) => item.file !== file));
    setUploadedFiles((prev) => prev.filter((item) => item !== file));
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFilesToUpload((prev) => [
      ...prev,
      ...acceptedFiles.map((file) => ({
        progress: 0,
        file,
        source: null,
      })),
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="text-center">
          <div className="border p-2 rounded-md max-w-min mx-auto">
            <UploadCloud size={20} />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold">Drag files</span> or click to upload
          </p>
          <p className="text-xs text-gray-500">Files should be under 10 MB</p>
        </div>
        <input
          {...getInputProps()}
          accept="image/png, image/jpeg"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Files to upload
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileUploadProgress) => (
                <div
                  key={fileUploadProgress.file.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div className="text-white">
                      {getFileIconAndColor(fileUploadProgress.file).icon}
                    </div>
                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="text-muted-foreground">
                          {fileUploadProgress.file.name.slice(0, 25)}
                        </p>
                        <span className="text-xs">
                          {fileUploadProgress.progress}%
                        </span>
                      </div>
                      <ProgressBar
                        progress={fileUploadProgress.progress}
                        className={
                          getFileIconAndColor(fileUploadProgress.file).color
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (fileUploadProgress.source) {
                        fileUploadProgress.source.cancel("Upload cancelled");
                      }
                      removeFile(fileUploadProgress.file);
                    }}
                    className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Uploaded Files
          </p>
          <div className="space-y-2 pr-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.lastModified}
                className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center flex-1 p-2">
                  <div className="text-white">
                    {getFileIconAndColor(file).icon}
                  </div>
                  <div className="w-full ml-2 space-y-1">
                    <div className="text-sm flex justify-between">
                      <p className="text-muted-foreground ">
                        {file.name.slice(0, 25)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file)}
                  className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
