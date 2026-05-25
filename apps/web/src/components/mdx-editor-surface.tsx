import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import { useMemo } from "react";

type MdxEditorSurfaceProps = {
  readonly value: string;
  readonly onChange: (value: string) => void;
};

export function MdxEditorSurface({ value, onChange }: MdxEditorSurfaceProps) {
  const plugins = useMemo(
    () => [
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      linkPlugin(),
      linkDialogPlugin(),
      imagePlugin({
        imageUploadHandler: async (file) => {
          const response = await fetch("/api/assets", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              filename: file.name,
              contentType: file.type,
            }),
          });
          const payload = (await response.json()) as { data: { url: string } };
          return payload.data.url;
        },
      }),
      tablePlugin(),
      thematicBreakPlugin(),
      codeBlockPlugin({ defaultCodeBlockLanguage: "ts" }),
      codeMirrorPlugin({
        codeBlockLanguages: {
          css: "CSS",
          js: "JavaScript",
          jsx: "JSX",
          markdown: "Markdown",
          ts: "TypeScript",
          tsx: "TSX",
        },
      }),
      diffSourcePlugin({ viewMode: "rich-text", readOnlyDiff: false }),
      markdownShortcutPlugin(),
      toolbarPlugin({
        toolbarContents: () => (
          <DiffSourceToggleWrapper>
            <UndoRedo />
            <Separator />
            <BlockTypeSelect />
            <BoldItalicUnderlineToggles />
            <CodeToggle />
            <ListsToggle />
            <Separator />
            <CreateLink />
            <InsertImage />
            <InsertTable />
            <InsertThematicBreak />
          </DiffSourceToggleWrapper>
        ),
      }),
    ],
    [],
  );

  return (
    <div className="overflow-hidden rounded-md border border-[#26312c]/10 bg-white dark:border-white/10 dark:bg-[#111614]">
      <MDXEditor
        markdown={value}
        onChange={(nextValue) => onChange(nextValue)}
        plugins={plugins}
        className="min-h-[360px]"
        contentEditableClassName="prose prose-neutral dark:prose-invert min-h-[280px] max-w-none px-4 py-3 leading-7"
      />
    </div>
  );
}
