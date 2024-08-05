import { SignUp } from '@clerk/clerk-react';
import './SignUp.css';

export const SingUp = () => {
  return (
    <div className="singUpPage">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
};
