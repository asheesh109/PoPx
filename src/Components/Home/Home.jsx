import { Link } from 'react-router-dom';
import { useTheme } from '../../Contexts/ThemeContext';
import './Home.css';

export const Home = () => {
  const { isDark } = useTheme();

  return (
    <div className={`home-container ${isDark ? 'dark' : ''}`}>
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="logo-section">
            <div className="logo-wrapper">
              <div className="logo-circle">
                <span>P</span>
              </div>
              <div className="logo-text">
                <h1>PopX</h1>
                <div className="logo-underline"></div>
              </div>
            </div>
          </div>
          
          <div className="hero-content">
            <h2 className="hero-title">
              Welcome to the Future of
              <span className="highlight"> Digital Experience</span>
            </h2>
            <p className="hero-description">
              Streamline your workflow, connect with your audience, and unlock powerful insights 
              with our comprehensive platform designed for modern professionals.
            </p>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-buttons">
           <Link to="/signup" className="cta-button primary">
            Get Started Free
          </Link>
             <Link to="/login" className="cta-button secondary">
               Login
             </Link>
            </div>

          <div className="home-actions">
          
         
        </div>
          <p className="cta-note">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </div>

      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="grid-pattern"></div>
      </div>
    </div>
  );
};