import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface EditorProps {
  content: string;
}

export const Editor: React.FC<EditorProps> = ({ content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ document: false }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: "Untitled",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-rotion-400 before:h-0 before:float-left before:pointer-events-none",
      }),
      Document.extend({
        content: "heading block*",
      }),
    ],
    autofocus: "end",
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none prose prose-invert prose-headings:mt-0",
      },
    },
  });

  return <EditorContent className="w-[65ch]" editor={editor} />;
};
