import { SignUp } from '@clerk/clerk-react';
import './SignUp.css';

export const SingUp = () => {
  return (
    <div className="">
      <SignUp path="/sign-up" />
    </div>
  );
};
