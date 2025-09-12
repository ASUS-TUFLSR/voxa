/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Toaster, toast } from 'react-hot-toast';
import { categories } from "@/lib/utils";
import { convertToRaw, EditorState, Modifier } from "draft-js";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const Editor = dynamic(() => import("react-draft-wysiwyg").then(mod => mod.Editor), {
  ssr: false,
});

const WriteBlog = () => {
  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

   
   useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
    }, [imageUrl]);

   useEffect(() => setMounted(true), []);
   if (!mounted) return null;

  const safeSetEditorState = (state: EditorState) => {
  if (mounted) setEditorState(state);
};
 
  const convertEditorDataToHTML = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  const handleEmojiSelect = (emoji: any) => {
    // Insert emoji at current cursor position
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentWithEmoji = Modifier.insertText(
      contentState,
      selection,
      emoji.native
    );
    const newState = EditorState.push(editorState, contentWithEmoji, "insert-characters");
    setEditorState(newState);
    setShowEmojiPicker(false);
  };

  const handlePublish = async (data: any) => {
    
    const formData = new FormData();
    const postData = JSON.stringify(
      { 
        author: session?.user?.name || "Anonymous",
        title, 
        description:convertEditorDataToHTML(),
        location,
        userId: session?.user?.id,
        categoryId: category,

      });

      formData.append("postData", postData);
      if (imageFile) {
       formData.append("image", imageFile);
      }

      try {
        toast.loading("Sending your post to world 🌍", { id: "postData" });
        
        await fetch("http://localhost:3000/api/blogs", {method: "POST", body: formData, cache:'no-store'})


        toast.success("Sent your post to world 🌍", { id: "postData" })
      } catch (error) {
        toast.error("Failed to send", { id: "postData" });
        console.log(error)
      }


  };


  return (
    <section className="w-full py-10 px-6 bg-orange-200">
      <Toaster position="top-right" />
      {/* Header */}
      <div
        className="flex justify-between p-4 items-center"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/d19037_a4a215b82b8c4063aaddf256b7a35653~mv2.jpg/v1/fill/w_1024,h_458,al_c,q_85,enc_avif,quality_auto/d19037_a4a215b82b8c4063aaddf256b7a35653~mv2.jpg')`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-1/4">
          <span className="font-extrabold mx-3 text-white">Author:</span>
          <span className="font-semibold uppercase text-white">
            {session?.user?.name ?? "Guest"}
          </span>
        </div>
        <button
          onClick={handlePublish}
          className="bg-red-700 text-orange-200 px-6 focus:ring-red-900 py-3 rounded-xl 
            font-semibold shadow-xl hover:bg-red-800"
        >
          Publish
        </button>
      </div>

      {/* Uploaded Image */}
      {imageUrl && (
        <div className="flex justify-center my-10">
          <Image
            src={imageUrl}
            alt="New Post"
            width={600}
            height={400}
            className="rounded-lg shadow-xl border-[3px] border-slate-100 
              max-w-[600px] max-h-[400px] w-auto h-auto object-contain"
          />
        </div>
      )}

      {/* Title Input */}
      <div className="w-full flex my-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title!"
          className="outline-none border-none font-serif mx-auto p-4 text-2xl 
       text-center font-bold text-red-900 w-full h-28"
        />
      </div>

      {/* File Input */}
      <div className="w-full flex my-5">
        <input
          onChange={handleImageChange}
          type="file"
          className="md:w-[500px] sm:w-[300px] m-auto text-red-900 bg-orange-100 p-4 rounded-xl font-semibold"
        />
      </div>

      {/* Location */}
      <div className="w-full flex my-5">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Location Ex: Germany"
          className="md:w-[500px] sm:w-[300px] m-auto text-red-900 bg-orange-100 p-4 rounded-xl font-semibold"
        />
      </div>

      {/* Category Select */}
      <div className="w-full flex my-5">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="md:w-[500px] sm:w-[300px] m-auto text-red-900 bg-orange-100 p-4 rounded-xl font-semibold"
        >
          <option value="">-- Select Category --</option>
          {categories.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Editor */}
      <Editor
         toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "image",
            "remove",
            "history",
          ],
        }}
        editorState={editorState}
        onEditorStateChange={safeSetEditorState}
        editorStyle={{
          width: "100%",
          minHeight: "50vh",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "10px",
          background: "#fff",
        }}
      />
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="mt-2 px-4 py-2 bg-orange-200 text-red-900 rounded"
      >
        😀 Emoji
      </button>

      {showEmojiPicker && (
        <div className="mt-2">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </section>
  );
};

export default WriteBlog;
