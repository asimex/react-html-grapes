import React, { useState } from "react";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

const ReactToHtml = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setOutput(null);

    try {
      const res = await axios.post(`${backendUrl}/render/generate`, { repoUrl });
      setOutput(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="p-10 font-sans max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">React to HTML Renderer</h2>

      <input
        type="text"
        placeholder="Paste your public GitHub repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="w-full p-3 mt-5 border rounded"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !repoUrl}
        className="mt-5 px-5 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Generate HTML"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {output && (
        <div className="mt-8">
          <h4 className="text-green-700 font-semibold">✅ Render Complete</h4>
          <p>{output.files.length} files generated.</p>
          <a
            href={`${backendUrl}/render/download?username=${output.username}&repo=${output.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-black text-white rounded"
          >
            Download ZIP
          </a>
        </div>
      )}
    </main>
  );
};

export default ReactToHtml;
