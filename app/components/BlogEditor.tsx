"use client";
import React, { useState } from "react";

// TODO create student gmail ID to have free access to Syncfusion

// Syncfusion RichTextEditor
import {
  RichTextEditorComponent,
  HtmlEditor,
  Toolbar,
  Image,
  Link,
  QuickToolbar,
  Inject
} from "@syncfusion/ej2-react-richtexteditor";

const WriteBlog = () => {
  const [content, setContent] = useState<string>("");

  const handleSave = () => {
    console.log("Blog content:", content);
    // Here you can call API to save blog
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* <h1 className="text-2xl font-bold text-red-900 mb-4">Write Your Blog ✍️</h1> */}

      <div className="w-full border border-gray-300 rounded-md overflow-hidden shadow-sm" >
      <RichTextEditorComponent
        height={400}
        value={content}
        change={(e) => setContent(e.value)} // Save editor text in state
      >
        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
      </RichTextEditorComponent>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-red-700 text-amber-100 rounded hover:bg-red-800"
        >
          Save Blog
        </button>
      </div>
    </div>
  );
};

export default WriteBlog;
