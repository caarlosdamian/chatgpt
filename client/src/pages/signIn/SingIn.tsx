import { SignIn } from '@clerk/clerk-react';
import './SignIn.css';

export const SingIn = () => {
  return (
    <div className="singInPage">
      <SignIn
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};
