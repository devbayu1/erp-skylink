interface Props {
  files: string[];
  onUpload: (files: string[]) => void;
}

export default function DocumentUpload({ files, onUpload }: Props) {
  const handleUpload = (e: any) => {
    const newFiles = [...files, ...Array.from(e.target.files).map((f: File) => f.name)];
    onUpload(newFiles);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleUpload} />
      <ul className="mt-2 text-sm text-gray-600">
        {files.map((f) => (
          <li key={f}>📄 {f}</li>
        ))}
      </ul>
    </div>
  );
}
