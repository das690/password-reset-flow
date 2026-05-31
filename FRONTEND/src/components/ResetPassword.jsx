import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // 1. Added useNavigate here
import axios from 'axios';

const ResetPassword = () => {
  const navigate = useNavigate(); // 2. Initialized the hook here

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    setMessage('');
    setError('');
  }, [password, confirmPassword]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match. Please try again.');
    }

    setIsLoading(true);

    try {
      const response = await axios.put(`https://reset-backend-hyqf.onrender.com/reset-password/${token}`, { 
        password 
      });
      
      setMessage(response.data.message);
      setPassword('');
      setConfirmPassword('');
      
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
            
            {/* 3. Added the Back Button right here at the top of the card */}
            <div className="text-start mb-2">
              <button 
                type="button"
                onClick={() => navigate(-1)} 
                className="btn btn-link text-light text-decoration-none p-0 opacity-75 custom-back-btn"
              >
                ← Back
              </button>
            </div>

            <div className="text-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-key-fill text-primary mb-2" viewBox="0 0 16 16">
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              </svg>
              <h2 className="h4 fw-bold">Set New Password</h2>
              <p className="text-light opacity-75 small">Your new password must be different from previously used passwords.</p>
            </div>

            {message && (
              <div className="alert alert-success text-center py-2 px-3 my-3">
                {message} <br/>
                <Link to="/login" className="alert-link">Return to Login</Link>
              </div>
            )}
            {error && <div className="alert alert-danger text-center py-2 px-3 my-3">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label fw-semibold">New Password</label>
                
                <input
                  type="password"
                  className="form-control glass-input"
                  id="newPassword"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                
                <input
                  type="password"
                  className="form-control glass-input"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength="6"
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
                    Saving...
                  </>
                ) : 'Reset Password'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;