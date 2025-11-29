import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function DocViewer() {
  const { docName } = useParams<{ docName: string }>();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!docName) return;

    fetch(`/docs/${docName}.md`)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => setContent("Failed to load document."));
  }, [docName]);

  return (
    <div className="p-4 mt-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4">{docName?.replaceAll("_", " ")}</h1>

      <div className="prose prose-slate max-w-full">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
            p: ({ node, ...props }) => <p className="mb-4 leading-7" {...props} />,
            code: ({ node, inline, ...props }) =>
              inline ? (
                <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />
              ) : (
                <code className="block bg-gray-100 p-4 rounded-lg overflow-x-auto" {...props} />
              ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
