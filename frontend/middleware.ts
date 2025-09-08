import { clerkMiddleware } from '@clerk/nextjs/server';

// Simple middleware that doesn't protect any routes
// Authentication is handled at the component level
export default clerkMiddleware();

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
