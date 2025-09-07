'use client';

import { Copy, Save, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface PostCardProps {
  content: string;
  topic: string;
  tone: string;
  index: number;
  onSave: (content: string) => void;
  onRegenerate: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  content,
  topic,
  tone,
  index,
  onSave,
  onRegenerate,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(content);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Post {index + 1}</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50"
            title="Save post"
          >
            <Save className="h-4 w-4" />
          </button>
          <button
            onClick={onRegenerate}
            className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
            title="Regenerate all posts"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="prose prose-sm max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {content}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex space-x-4 text-xs text-gray-500">
          <span>Topic: <span className="font-medium">{topic}</span></span>
          <span>Tone: <span className="font-medium capitalize">{tone}</span></span>
        </div>
      </div>

      {isCopied && (
        <div className="mt-2 text-sm text-green-600 font-medium">
          ✓ Copied to clipboard!
        </div>
      )}
      
      {isSaving && (
        <div className="mt-2 text-sm text-blue-600 font-medium">
          Saving...
        </div>
      )}
    </div>
  );
};

export default PostCard;
