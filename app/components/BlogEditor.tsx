"use client";
import React from "react";
import {
  RichTextEditorComponent,
  HtmlEditor,
  Toolbar,
  Image,
  Link,
  QuickToolbar,
  EmojiPicker,
  Inject,
} from "@syncfusion/ej2-react-richtexteditor";

interface BlogEditorProps {
  value: string;
  onChange: (val: string) => void;
}

const WriteBlog = ({ value, onChange }: BlogEditorProps) => {
  const toolbarSettings = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "|",
      "Formats",
      "Alignments",
      "|",
      "OrderedList",
      "UnorderedList",
      "|",
      "CreateLink",
      "Image",
      "|",
      "EmojiPicker",
      "|",
      "SourceCode",
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
        <RichTextEditorComponent
          height={400}
          value={value}
          toolbarSettings={toolbarSettings}
          change={(e) => onChange(e.value as string)}
        >
          <Inject
            services={[
              HtmlEditor,
              Toolbar,
              Image,
              Link,
              QuickToolbar,
              EmojiPicker,
            ]}
          />
        </RichTextEditorComponent>
      </div>
    </div>
  );
};

export default WriteBlog;
