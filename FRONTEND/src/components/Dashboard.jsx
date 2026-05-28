import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // This is your Route Protection!
  // Every time this page loads, it checks if a token exists.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Kicks them out if no token is found
    }
  }, [navigate]);

  // Handle the logout process
  const handleLogout = () => {
    localStorage.removeItem('token'); // Destroy the token
    navigate('/login'); // Send them back to login
  };

  return (
    <div className="container-fluid min-vh-100 text-light p-0 m-0">
      <div className="row justify-content-center align-items-center min-vh-100 g-0">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 p-3">
          
          <div className="card glass-card text-light shadow-lg p-5 rounded-4 animate__animated animate__zoomIn">
            <div className="text-center mb-4">
              <h1 className="display-5 fw-bold text-primary mb-3">Dashboard</h1>
              <h2 className="h4">You made it! 🚀</h2>
              <p className="text-light opacity-75 mt-3">
                You have successfully authenticated, received a secure JWT, saved it to your browser, and navigated to a protected route. 
              </p>
            </div>

            <hr className="border-secondary my-4 opacity-25" />

            <div className="text-center">
              <button 
                onClick={handleLogout} 
                className="btn btn-outline-danger fw-bold py-2 px-4 rounded-3"
              >
                Secure Logout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;