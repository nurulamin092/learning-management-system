import { SignUpForm } from "../_components/signup-form";

const RegisterPage = ({ params: { role } }) => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <SignUpForm role={role} />
      </div>
    </div>
  );
};
export default RegisterPage;
