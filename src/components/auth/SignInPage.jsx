import { useAuth } from '@clerk/clerk-react';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Home/Spinner';
const SignIn = lazy(() => import('@clerk/clerk-react').then(mod => ({ default: mod.SignIn })));

const SignInPage = () => {
    const { isLoaded } = useAuth();

    if (!isLoaded) {
        return <div style={{
            position: "absolute",
            left: "50%",
            top: "50%"
        }}><Spinner /></div>;
    }

    return (
        <div className="sign-in-container">
            <Suspense fallback={<div><Spinner></Spinner></div>}></Suspense>
            <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
            <Suspense />
            <div className='sign-up-footer'>
                <p>
                    Don’t have an account?
                </p>
                <a href="/sign-up">Sign up</a>
            </div>
        </div>

    );
};

export default SignInPage;
