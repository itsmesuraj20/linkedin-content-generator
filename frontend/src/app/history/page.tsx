'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { postApi, Post } from '@/lib/api-types';
import Navbar from '@/components/Navbar';
import { Copy, Calendar, Tag, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HistoryPage() {
    const { isSignedIn, getToken } = useAuth();
    const router = useRouter();
    const [copiedId, setCopiedId] = useState<number | null>(null);

    // Handle authentication redirect in useEffect
    useEffect(() => {
        if (isSignedIn === false) {
            router.push('/sign-in');
        }
    }, [isSignedIn, router]);

    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts-history'],
        queryFn: async () => {
            const token = await getToken();
            return postApi.getHistory(token || undefined);
        },
        enabled: isSignedIn === true,
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

    const handleCopy = async (content: string, postId: number) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedId(postId);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-12">
                        <div className="text-red-600 mb-4">Failed to load posts</div>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Your Saved Posts
                    </h1>
                    <p className="text-lg text-gray-600">
                        View and manage all your previously saved LinkedIn posts
                    </p>
                </div>

                {posts && posts.length > 0 ? (
                    <div className="space-y-6">
                        {posts.map((post: Post) => (
                            <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(post.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Tag className="h-4 w-4" />
                                            <span className="capitalize">{post.tone}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(post.content, post.id)}
                                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                        <FileText className="h-5 w-5" />
                                        <span>{post.topic}</span>
                                    </h3>
                                </div>

                                <div className="prose prose-sm max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                        {post.content}
                                    </div>
                                </div>

                                {copiedId === post.id && (
                                    <div className="mt-4 text-sm text-green-600 font-medium">
                                        ✓ Copied to clipboard!
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No saved posts yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Start generating and saving LinkedIn posts to see them here.
                        </p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Create Your First Post
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
