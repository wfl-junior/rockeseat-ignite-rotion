import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface OnContentUpdateParams {
  title: string;
  content: string;
}

interface EditorProps {
  content: string;
  onContentUpdate: (params: OnContentUpdateParams) => void | Promise<void>;
}

export const Editor: React.FC<EditorProps> = ({ content, onContentUpdate }) => {
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
    onUpdate: async ({ editor }) => {
      const contentRegex = /^(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/;
      const parsedContent = editor.getHTML().match(contentRegex)?.groups;
      const title = parsedContent?.title ?? "Untitled";
      const content = parsedContent?.content ?? "";

      await onContentUpdate({ title, content });
    },
  });

  return <EditorContent className="w-[65ch]" editor={editor} />;
};
