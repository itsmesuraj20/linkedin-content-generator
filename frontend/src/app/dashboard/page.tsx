'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postApi, GeneratePostResponse } from '@/lib/api-types';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import { Sparkles, Send } from 'lucide-react';

export default function Dashboard() {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'storytelling'>('professional');
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);
  const [currentRequest, setCurrentRequest] = useState<{ topic: string; tone: string } | null>(null);

  // Handle authentication redirect in useEffect
  useEffect(() => {
    if (isSignedIn === false) {
      router.push('/sign-in');
    }
  }, [isSignedIn, router]);

  const generateMutation = useMutation({
    mutationFn: async (data: { topic: string; tone: 'professional' | 'casual' | 'storytelling' }) => {
      const token = await getToken();
      return postApi.generatePost(data, token || undefined);
    },
    onSuccess: (data: GeneratePostResponse) => {
      setGeneratedPosts(data.posts);
      setCurrentRequest({ topic: data.topic, tone: data.tone });
    },
    onError: (error) => {
      console.error('Error generating posts:', error);
      alert('Failed to generate posts. Please try again.');
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: { topic: string; tone: string; content: string }) => {
      const token = await getToken();
      return postApi.savePost(data, token || undefined);
    },
    onSuccess: () => {
      alert('Post saved successfully!');
    },
    onError: (error) => {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    },
  });

  // Show loading or return null while authentication is being checked
  if (isSignedIn === false) {
    return null; // Will redirect in useEffect
  }

  // Show loading state while Clerk is still determining auth status
  if (isSignedIn === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    generateMutation.mutate({
      topic: topic.trim(),
      tone,
    });
  };

  const handleSavePost = (content: string) => {
    if (!currentRequest) return;

    saveMutation.mutate({
      topic: currentRequest.topic,
      tone: currentRequest.tone,
      content,
    });
  };

  const handleRegenerate = () => {
    if (!currentRequest) return;

    generateMutation.mutate({
      topic: currentRequest.topic,
      tone: currentRequest.tone as 'professional' | 'casual' | 'storytelling',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'there'}!
          </h1>
          <p className="text-lg text-gray-600">
            Enter a topic and choose your tone to create engaging LinkedIn posts
          </p>
        </div>

        {/* Generation Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                What topic would you like to write about?
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-500"
                placeholder="e.g., The importance of continuous learning in tech careers"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose your tone
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'professional', label: 'Professional', desc: 'Formal and business-focused' },
                  { value: 'casual', label: 'Casual', desc: 'Friendly and conversational' },
                  { value: 'storytelling', label: 'Storytelling', desc: 'Narrative and engaging' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
                      tone === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tone"
                      value={option.value}
                      checked={tone === option.value}
                      onChange={(e) => setTone(e.target.value as 'professional' | 'casual' | 'storytelling')}
                      className="sr-only"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={generateMutation.isPending || !topic.trim()}
              className="w-full md:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {generateMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Posts</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Posts */}
        {generatedPosts.length > 0 && currentRequest && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Generated Posts
            </h2>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {generatedPosts.map((post, index) => (
                <PostCard
                  key={index}
                  content={post}
                  topic={currentRequest.topic}
                  tone={currentRequest.tone}
                  index={index}
                  onSave={handleSavePost}
                  onRegenerate={handleRegenerate}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {generatedPosts.length === 0 && !generateMutation.isPending && (
          <div className="text-center py-12">
            <Send className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ready to create amazing content?
            </h3>
            <p className="text-gray-600">
              Enter a topic above and choose your tone to get started with AI-generated LinkedIn posts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
