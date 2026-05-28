import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://reset-backend-hyqf.onrender.com/register', { name, email, password });
      setMessage(response.data.message);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="container-fluid min-vh-100 text-light p-0 m-0">
      <div className="row justify-content-center align-items-center min-vh-100 g-0">
        <div className="col-12 col-md-8 col-lg-5 col-xl-4 p-3">
          
          
          <div className="card glass-card text-light shadow-lg p-4 rounded-4 animate__animated animate__fadeIn">
            
            <div className="text-center mb-4">
              <h2 className="h4 fw-bold">Create an Account</h2>
              <p className="text-light opacity-75 small">Sign up to get started.</p>
            </div>

            {message && <div className="alert alert-success text-center py-2 px-3 my-3">{message}</div>}
            {error && <div className="alert alert-danger text-center py-2 px-3 my-3">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                
                <input type="text" className="form-control glass-input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                
                <input type="email" className="form-control glass-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                
                <input type="password" className="form-control glass-input" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
              </div>
              
              <button type="submit" className="btn btn-primary w-100 fw-bold py-2 rounded-3" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Register'}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="small text-light opacity-75">
                Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-bold">Login here</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;