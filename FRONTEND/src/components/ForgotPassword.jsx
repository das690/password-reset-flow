import { useState, useEffect } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessage('');
    setError('');
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://reset-backend-hyqf.onrender.com/forgot-password', { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
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
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-lock-fill text-primary mb-2" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg>
              <h2 className="h4 fw-bold">Forgot Password</h2>
              <p className="text-light opacity-75 small">Enter your email and we'll send you a link to reset your password.</p>
            </div>

            {message && <div className="alert alert-success text-center py-2 px-3 my-3" role="alert">{message}</div>}
            {error && <div className="alert alert-danger text-center py-2 px-3 my-3" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                
                <input
                  type="email"
                  className="form-control glass-input"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-100 fw-bold py-2 rounded-3" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : 'Send Reset Link'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;