import { SignIn } from '@clerk/clerk-react';
import './SignIn.css';

export const SingIn = () => {
  return (
    <div className="">
      <SignIn path="/sign-in" />
    </div>
  );
};
