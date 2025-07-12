import React, { useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import "./tiptap.css";
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Pilcrow,
    Heading1,
    Heading2,
    Undo2,
    Redo2,
    Underline as UnderlineIcon,
    Quote,
    Minus,
} from "lucide-react";

const extensions = [TextStyle, StarterKit];

function MenuBar({ editor }) {
    const editorState = useEditorState({
        editor,
        selector: (ctx) => ({
            isBold: ctx.editor.isActive("bold"),
            canBold: ctx.editor.can().chain().focus().toggleBold().run(),
            isItalic: ctx.editor.isActive("italic"),
            canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
            isStrike: ctx.editor.isActive("strike"),
            canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
            isCode: ctx.editor.isActive("code"),
            canCode: ctx.editor.can().chain().focus().toggleCode().run(),
            canClearMarks: ctx.editor.can().chain().focus().unsetAllMarks().run(),
            isParagraph: ctx.editor.isActive("paragraph"),
            isHeading1: ctx.editor.isActive("heading", { level: 1 }),
            isHeading2: ctx.editor.isActive("heading", { level: 2 }),
            isHeading3: ctx.editor.isActive("heading", { level: 3 }),
            isBulletList: ctx.editor.isActive("bulletList"),
            isOrderedList: ctx.editor.isActive("orderedList"),
            isCodeBlock: ctx.editor.isActive("codeBlock"),
            isBlockquote: ctx.editor.isActive("blockquote"),
            canUndo: ctx.editor.can().chain().focus().undo().run(),
            canRedo: ctx.editor.can().chain().focus().redo().run(),
        }),
    });
    return (
        <div className="mb-3 flex gap-2 flex-wrap">
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editorState.canBold}
                className={`p-2 rounded ${
                    editorState.isBold ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Bold">
                <Bold size={18} />
            </button>
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editorState.canItalic}
                className={`p-2 rounded ${
                    editorState.isItalic ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Italic">
                <Italic size={18} />
            </button>
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editorState.canStrike}
                className={`p-2 rounded ${
                    editorState.isStrike ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Strike">
                <Strikethrough size={18} />
            </button>
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`p-2 rounded ${
                    editorState.isParagraph ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Paragraph">
                <Pilcrow size={18} />
            </button>
            {[1, 2, 3].map((level) => (
                <button
                    style={{ cursor: "pointer" }}
                    key={`heading-${level}`}
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                    className={`p-2 rounded ${
                        editorState[`isHeading${level}`] ? "text-base-orange" : "text-black-base dark:text-gray-200"
                    }`}
                    title={`Heading ${level}`}>
                    {level === 1 ? (
                        <Heading1 size={18} />
                    ) : level === 2 ? (
                        <Heading2 size={18} />
                    ) : (
                        <span style={{ fontWeight: "bold", fontSize: 16 }}>{`H${level}`}</span>
                    )}
                </button>
            ))}
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded ${
                    editorState.isBulletList ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Bullet List">
                <List size={18} />
            </button>
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded ${
                    editorState.isOrderedList ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Ordered List">
                <ListOrdered size={18} />
            </button>
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded ${
                    editorState.isBlockquote ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Blockquote">
                <Quote size={18} />
            </button>
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={`p-2 rounded ${
                    editorState.isBlockquote ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Horizontal Rule">
                <Minus size={18} />
            </button>
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().setHardBreak().run()}
                className={`p-2 rounded ${
                    editorState.isBlockquote ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Hard Break">
                BR
            </button>
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded ${
                    editor.isActive("underline") ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Underline">
                <UnderlineIcon size={18} />
            </button>
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editorState.canUndo}
                className={`p-2 rounded ${
                    editorState.isBlockquote ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Undo">
                <Undo2 size={18} />
            </button>
            <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editorState.canRedo}
                className={`p-2 rounded ${
                    editorState.isBlockquote ? "text-base-orange" : "text-black-base dark:text-gray-200"
                }`}
                title="Redo">
                <Redo2 size={18} />
            </button>
        </div>
    );
}

const TiptapEditor = ({ name, label }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    // LOCAL_STORAGE_KEY must be inside the component to access the correct name
    const LOCAL_STORAGE_KEY = `tiptap-content-${name}`;

    // Load initial value from localStorage if available
    const getInitialContent = () => {
        if (typeof window === "undefined") return field.value || "";
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved !== null ? saved : field.value || "";
    };

    const editor = useEditor({
        extensions,
        content: getInitialContent(),
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setFieldValue(name, html);
            if (typeof window !== "undefined") {
                localStorage.setItem(LOCAL_STORAGE_KEY, html);
            }
        },
    });

    useEffect(() => {
        if (typeof window === "undefined" || !editor) return;
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!field.value && saved) {
            setFieldValue(name, saved);
            editor.commands.setContent(saved);
        }
    }, [editor]);

    // Keep editor in sync with Formik field, but don't overwrite with empty value on mount
    useEffect(() => {
        if (editor && field.value && field.value !== editor.getHTML()) {
            editor.commands.setContent(field.value);
        }
    }, [field.value, editor]);

    // Only clear localStorage if both Formik and editor are empty
    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            editor &&
            !field.value &&
            !editor
                .getHTML()
                .replace(/<[^>]+>/g, "")
                .trim()
        ) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
    }, [field.value, editor]);

    return (
        <div className="mb-4 col-start-1 col-span-2">
            {label && <label className="block text-sm font-medium mb-2">{label}</label>}
            {editor && <MenuBar editor={editor} />}
            <div
                className={`border rounded-lg px-4 py-3 min-h-[200px] h-full w-full bg-base-white transition-all duration-200 flex flex-col ${
                    meta.touched && meta.error
                        ? "border-red-base bg-red-light dark:bg-red-light/20"
                        : "border-gray-border"
                }`}
                style={{ minHeight: 200 }}>
                <EditorContent
                    editor={editor}
                    className="tiptap-editor-content flex-1 w-full h-full text-base text-pg-base bg-transparent"
                />
            </div>
            {meta.touched && meta.error && <div className="text-red-medium text-sm mt-1">{meta.error}</div>}
        </div>
    );
};

export default TiptapEditor;
