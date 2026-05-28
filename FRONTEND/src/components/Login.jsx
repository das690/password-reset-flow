import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="container-fluid min-vh-100 text-light p-0 m-0">
      <div className="row justify-content-center align-items-center min-vh-100 g-0">
        <div className="col-12 col-md-8 col-lg-5 col-xl-4 p-3">
          
          
          <div className="card glass-card text-light p-4 rounded-4 animate__animated animate__fadeIn">
            
            <div className="text-center mb-4">
              <h2 className="h4 fw-bold">Welcome Back</h2>
              <p className="text-light opacity-75 small">Please login to your account.</p>
            </div>

            {error && <div className="alert alert-danger text-center py-2 px-3 my-3">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                
                <input 
                  type="email" 
                  className="form-control glass-input" 
                  value={email} 
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input 
                  type="password" 
                  className="form-control glass-input" 
                  value={password} 
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              
              <button type="submit" className="btn btn-primary w-100 fw-bold py-2 rounded-3" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="text-center mt-3 mb-2">
              <Link to="/forgot-password" className="small text-light opacity-75 text-decoration-none">
                Forgot your password?
              </Link>
            </div>

            <hr className="border-secondary my-3 opacity-25" />

            <div className="text-center mt-2">
              <p className="small text-light opacity-75 mb-0">
                Don't have an account? <Link to="/register" className="text-primary text-decoration-none fw-bold">Register here</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;