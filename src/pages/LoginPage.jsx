import React from "react";
import LoginForm from "../components/3-organisms/LoginForm";

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="flex w-full h-128 max-w-6xl bg-white rounded-[20px] shadow-lg overflow-hidden my-4">
        <div className="hidden md:flex flex-col items-center justify-center md:w-2/5 bg-[#34D399] p-8 text-white">
          <h1 className="text-5xl font-bold">CourseSphere</h1>
          <p className="mt-2 text-lg font-semibold text-center">
            Sua plataforma de cursos colaborativa
          </p>
        </div>

        <div className="w-full p-8 md:w-3/5">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
