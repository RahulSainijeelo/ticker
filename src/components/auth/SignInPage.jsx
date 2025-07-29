import { useAuth } from '@clerk/clerk-react';
import { lazy, Suspense } from 'react';
const SignIn = lazy(() => import('@clerk/clerk-react').then(mod => ({ default: mod.SignIn })));

const SignInPage = () => {
    const { isLoaded } = useAuth(); // isLoaded indicates Clerk auth state is ready

    if (!isLoaded) {
        return <div>Loading...</div>; // show loading while Clerk is initializing
    }

    return (
        <div className="sign-in-container">
            <Suspense fallback={<div>Loading Sign In...</div>}></Suspense>
            <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
            <Suspense />
            <div className='sign-up-footer'>
                <p>
                    Don’t have an account?
                </p>
                <Link href="/sign-up">Sign up</Link>
            </div>
        </div>

    );
};

export default SignInPage;
