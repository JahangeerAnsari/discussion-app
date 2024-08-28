"use client";
// import { UploadDropzone } from "@uploadthing/react";
import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
// import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}
export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  console.log("onChange, value, endpoint:", onChange, value, endpoint);

  // if image exits
  const fileType = value?.split(".").pop();
  if (fileType && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 
      rounded-full absolute top-0 right-0 shadow-sm "
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <div>
      <UploadDropzone
        className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
        endpoint="serverImage"
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log("error", error);
        }}
      />
    </div>
  );
};
