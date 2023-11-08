import React, { useState } from 'react';
import './style.scss'

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="container">
	<div className="screen">
		<div className="screen__content">
			<form className="login" onSubmit={handleLogin}>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<label>Email:</label>
					<input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<label>Jelszó:</label>
					<input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
				</div>
				<button className="button login__submit">
					<span className="button__text">Bejelentkezés</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
  );
};

export default LoginForm;
