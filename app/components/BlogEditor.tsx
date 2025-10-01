"use client";
import React from "react";
import {
  RichTextEditorComponent,
  HtmlEditor,
  Toolbar,
  Image,
  Link,
  QuickToolbar,
  Inject,
} from "@syncfusion/ej2-react-richtexteditor";

interface BlogEditorProps {
  value: string; // controlled value
  onChange: (val: string) => void; // callback to parent
}

const WriteBlog = ({ value, onChange }: BlogEditorProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
        <RichTextEditorComponent
          height={400}
          value={value} // controlled
          change={(e) => onChange(e.value as string)} // sync with parent
        >
          <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
        </RichTextEditorComponent>
      </div>
    </div>
  );
};

export default WriteBlog;
