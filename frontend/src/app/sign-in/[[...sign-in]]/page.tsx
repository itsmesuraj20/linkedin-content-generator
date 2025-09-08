import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Access your LinkedIn Content Generator
                    </p>
                </div>
                <div className="flex justify-center">
                    <SignIn />
                </div>
            </div>
        </div>
    )
}
