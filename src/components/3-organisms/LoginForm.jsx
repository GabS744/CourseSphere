import { useState } from "react";
import Button from "../1-atoms/Button";
import FormField from "../2-molecules/FormField";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loggedInUser = await login(email, password);

    if (loggedInUser) {
      console.log("Login bem-sucedido! Redirecionando...", loggedInUser);

      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-sans">
        Acesse sua conta
      </h2>
      <FormField
        label="E-mail"
        type="email"
        value={email}
        placeholder="Digite o seu e-mail..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        label="Senha"
        type="password"
        value={password}
        placeholder="Digite a sua senha..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-6 flex justify-center">
        <Button>Entrar</Button>
      </div>
    </form>
  );
}
export default LoginForm;
