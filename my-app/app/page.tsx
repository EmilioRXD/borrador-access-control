import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './login.css';



export default function Home() {

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-left">
            <div className="university-logo">
              <Image 
                src="/img/logo.png" 
                alt="Logo" 
                width={180} 
                height={180} 
                priority
              />
              <p className="tagline">Sistema de Control de Acceso</p>
            </div>
          </div>
          <div className="login-right">
            <div className="login-header">
              <h1>Bienvenido</h1>
              <p>Inicia sesión en tu cuenta institucional</p>
            </div>

            <form action="dashboard">
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faUser} />
                  <input 
                    type="text" 
                    id="username" 
                    placeholder="Ingrese su usuario"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faLock} />
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Ingrese su contraseña"
                  />
                </div>
              </div>

              <div className="remember-forgot">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="remember"
                  />
                  <label htmlFor="remember">Recordarme</label>
                </div>
              </div>

              <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>

            <div className="login-footer">
              <p>© {new Date().getFullYear()} Sistema Universitario de Control de Acceso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
