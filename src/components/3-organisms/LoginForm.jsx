import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import FormField from "../2-molecules/FormField.jsx";
import Button from "../1-atoms/Button.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 

    const success = await login(email, password);

    if (success) {
      navigate("/");
    }

    setLoading(false); 
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Acesse sua conta
      </h2>
      <FormField
        label="E-MAIL"
        type="email"
        placeholder="Digite o seu e-mail..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        label="SENHA"
        type="password"
        placeholder="Digite a sua senha..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-6 flex justify-center">
        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "ENTRAR"}
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
