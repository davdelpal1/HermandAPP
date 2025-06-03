import React from 'react';
import { Editor } from '@tiptap/react';
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote, Eraser, Pilcrow, Heading } from 'lucide-react';

interface ToolbarProps {
  editor: Editor;
}

const TiptapToolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded border mb-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'text-red-700' : ''}>
        <Bold size={20} />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'text-red-700' : ''}>
        <Italic size={20} />
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'text-red-700' : ''} disabled={!editor.can().chain().focus().toggleUnderline().run()} title="Subrayado">
        <Underline size={20} />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'text-red-700' : ''}>
        <Strikethrough size={20} />
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'text-red-700' : ''}>
        <List size={20} />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'text-red-700' : ''}>
        <ListOrdered size={20} />
      </button>
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'text-red-700' : ''}>
        <Pilcrow size={20} />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'text-red-700' : ''}>
        <Heading size={20} />
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'text-red-700' : ''}>
        <Quote size={20} />
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <Eraser size={20} />
      </button>
    </div>
  );
};

export default TiptapToolbar;

