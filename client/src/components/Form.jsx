import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from '../components/LoadingIndicator'
import "../styles/Form.css"

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Iniciar Sesion" : "Registrarse";
    const account = method === "login" ?  <p>No tienes una cuenta? <a href="/register">Creala Ahora</a></p> : <p>Tienes una cuenta? <a href="/login">Iniciar Sesion</a></p>

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };


  return (
    <div className="container">
      <div className="form-container">
        <div className="logo">
          <h1>Notas App</h1>
        </div>
        <h2>{name}</h2>

        <form onSubmit={handleSubmit} className="form-container">
          <label>Usuario</label>
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <label>Constraseña</label>
          <div className="password-container">
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          {account}
          {loading && <LoadingIndicator/>}
          <button className="btn" type="submit">
            {name}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
