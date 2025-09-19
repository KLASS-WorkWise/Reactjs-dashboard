import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  CodeOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  BlockOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { forwardRef, useEffect } from "react";

interface MenuBarProps {
  editor: any; // TipTap editor instance
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const menuItems = [
    {
      icon: <BoldOutlined />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      tooltip: "Bold",
    },
    {
      icon: <ItalicOutlined />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      tooltip: "Italic",
    },
    {
      icon: <StrikethroughOutlined />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      tooltip: "Strike",
    },
    {
      icon: <CodeOutlined />,
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
      tooltip: "Code",
    },
    {
      type: "divider",
    },
    {
      icon: <UnorderedListOutlined />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      icon: <OrderedListOutlined />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      tooltip: "Ordered List",
    },
    {
      icon: <BlockOutlined />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      tooltip: "Blockquote",
    },
    {
      type: "divider",
    },
    {
      icon: <UndoOutlined />,
      action: () => editor.chain().focus().undo().run(),
      tooltip: "Undo",
    },
    {
      icon: <RedoOutlined />,
      action: () => editor.chain().focus().redo().run(),
      tooltip: "Redo",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        padding: "8px",
        border: "1px solid #d9d9d9",
        borderBottom: "none",
        borderRadius: "6px 6px 0 0",
        background: "#fafafa",
      }}
    >
      {menuItems.map((item, index) =>
        item.type === "divider" ? (
          <div
            key={index}
            style={{
              width: "1px",
              backgroundColor: "#d9d9d9",
              margin: "0 4px",
            }}
          />
        ) : (
          <Tooltip title={item.tooltip} key={index}>
            <Button
              icon={item.icon}
              onClick={item.action}
              type={item.isActive ? "primary" : "default"}
              size="small"
            />
          </Tooltip>
        )
      )}
    </div>
  );
};

interface TiptapEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

// Define the component using forwardRef
const TiptapEditor = forwardRef<HTMLDivElement, TiptapEditorProps>(
  ({ value = "", onChange, onBlur }, ref) => {
    const editor = useEditor({
      extensions: [StarterKit],
      content: value,
      onUpdate: ({ editor }) => {
        if (onChange) {
          onChange(editor.getHTML());
        }
      },
      onBlur: () => {
        if (onBlur) {
          onBlur();
        }
      },
      editorProps: {
        attributes: {
          class: "tiptap-editor",
        },
      },
    });

    useEffect(() => {
      if (editor && value !== editor.getHTML()) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }, [value, editor]);

    return (
      <div
        style={{ border: "1px solid #d9d9d9", borderRadius: "6px" }}
        ref={ref}
      >
        {editor && <MenuBar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    );
  }
);

TiptapEditor.displayName = "TiptapEditor";

export default TiptapEditor;
