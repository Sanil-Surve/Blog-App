// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { register, login } from '../features/authSlice';

// const Auth = () => {
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [isRegister, setIsRegister] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isRegister) {
//       dispatch(register(form));
//     } else {
//       dispatch(login(form));
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" />
//         <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
//         <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
//       </form>
//       <button onClick={() => setIsRegister(!isRegister)}>
//         {isRegister ? 'Switch to Login' : 'Switch to Register'}
//       </button>
//     </div>
//   );
// };

// export default Auth;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, login } from '../features/authSlice';
import './Auth.css'; // Import the SCSS file

const Auth = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(register(form));
    } else {
      dispatch(login(form));
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          value={form.username} 
          onChange={handleChange} 
          placeholder="Username" 
          className="auth-input"
        />
        <input 
          type="password" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
          placeholder="Password" 
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)} className="switch-button">
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
};

export default Auth;

