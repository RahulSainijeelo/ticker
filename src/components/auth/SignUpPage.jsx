import { useAuth } from '@clerk/clerk-react';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
const SignUp = lazy(() => import('@clerk/clerk-react').then(mod => ({ default: mod.SignUp })));

const SignUpPage = () => {
    const { isLoaded } = useAuth();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="sign-in-container">
            <Suspense fallback={<div>Loading Sign In...</div>}></Suspense>
            <SignUp routing="path" path="/sign-up" signInpUrl="/sign-in" />
            <Suspense />

            <div className='sign-up-footer'>
                <p>
                    Don’t have an account?
                </p>
                <a href="/sign-in">Sign In</a>
            </div>
        </div>
    );
};

export default SignUpPage;


