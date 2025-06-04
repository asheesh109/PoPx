import { useState, useRef } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useTheme } from '../../Contexts/ThemeContext';
import { Toast } from '../common/Toast';
import { Sun, Moon, Check, Mail, Phone, Building, User, Edit3, TrendingUp, Calendar, Award, Lock, Folder, Clock, CheckCircle, AlertCircle, Play, Users } from 'lucide-react';
import './dashboard.css';

export const ProfileDashboard = () => {
  const { user, logout, updateUser, updatePassword } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [toast, setToast] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [settingsMode, setSettingsMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    logout();
    setToast({ message: 'Logged out successfully!', type: 'success' });
  };

  const handleEditClick = () => {
    setEditMode(true);
    setEditedUser({ ...user });
  };

  const handleSaveClick = async () => {
    try {
      await updateUser(editedUser);
      setEditMode(false);
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: error.message || 'Failed to update profile', type: 'error' });
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSettingsClick = () => {
    setSettingsMode(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setToast({ message: 'New passwords do not match', type: 'error' });
      return;
    }

    try {
      await updatePassword(currentPassword, newPassword);
      setToast({ message: 'Password changed successfully!', type: 'success' });
      setSettingsMode(false);
    } catch (error) {
      setToast({ message: error.message || 'Failed to change password', type: 'error' });
    }
  };

  const handleCancelSettings = () => {
    setSettingsMode(false);
  };

  const completionScore = () => {
    let score = 0;
    if (user.fullName) score += 20;
    if (user.email) score += 20;
    if (user.phone) score += 20;
    if (user.avatar) score += 20;
    if (user.company) score += 20;
    return score;
  };

  const stats = [
    { label: 'Projects', value: Math.floor(Math.random() * 50) + 10, icon: TrendingUp, color: 'blue' },
    { label: 'Clients', value: Math.floor(Math.random() * 20) + 5, icon: Users, color: 'green' },
    { label: 'Tasks', value: Math.floor(Math.random() * 100) + 50, icon: Calendar, color: 'orange' },
    { label: 'Score', value: completionScore(), icon: Award, color: 'purple' }
  ];

  const activities = [
    { action: 'Created new project "Brand Redesign"', time: '2 hours ago', type: 'project' },
    { action: 'Updated profile information', time: '1 day ago', type: 'profile' },
    { action: 'Completed task "UI Mockups"', time: '2 days ago', type: 'task' },
    { action: 'Joined PopX platform', time: '3 days ago', type: 'system' }
  ];

  // Recent Projects data - removed since we're using Performance Overview instead

  // Removed unused helper functions for projects

  return (
    <div className={`dashboard ${isDark ? 'dark' : ''}`}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      {/* Hidden file input for avatar upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back, {user.fullName?.split(' ')[0] || 'User'}</p>
          </div>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Profile Section */}
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {editMode ? (
                  <>
                    {editedUser.avatar ? (
                      <img src={editedUser.avatar} alt="Profile" className="avatar-image" />
                    ) : (
                      <div className="avatar-placeholder">
                        <User size={28} />
                      </div>
                    )}
                    <button className="avatar-edit" onClick={triggerFileInput}>
                      <Edit3 size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="avatar-image" />
                    ) : (
                      <div className="avatar-placeholder">
                        <User size={28} />
                      </div>
                    )}
                    <button className="avatar-edit" onClick={handleEditClick}>
                      <Edit3 size={14} />
                    </button>
                  </>
                )}
              </div>
              
              <div className="profile-info">
                {editMode ? (
                  <>
                    <div className="profile-name-section">
                      <input
                        type="text"
                        name="fullName"
                        value={editedUser.fullName || ''}
                        onChange={handleInputChange}
                        className="profile-edit-input"
                        placeholder="Full Name"
                      />
                      <div className="agency-toggle">
                        <label>
                          <input
                            type="checkbox"
                            name="isAgency"
                            checked={editedUser.isAgency || false}
                            onChange={(e) => setEditedUser(prev => ({ ...prev, isAgency: e.target.checked }))}
                          />
                          <span className="toggle-slider"></span>
                          <span>Agency</span>
                        </label>
                      </div>
                    </div>
                    <div className="profile-contacts">
                      <div className="contact-item">
                        <Mail size={16} />
                        <input
                          type="email"
                          name="email"
                          value={editedUser.email || ''}
                          onChange={handleInputChange}
                          className="profile-edit-input"
                          placeholder="Email"
                        />
                      </div>
                      <div className="contact-item">
                        <Phone size={16} />
                        <input
                          type="tel"
                          name="phone"
                          value={editedUser.phone || ''}
                          onChange={handleInputChange}
                          className="profile-edit-input"
                          placeholder="Phone"
                        />
                      </div>
                      <div className="contact-item">
                        <Building size={16} />
                        <input
                          type="text"
                          name="company"
                          value={editedUser.company || ''}
                          onChange={handleInputChange}
                          className="profile-edit-input"
                          placeholder="Company (optional)"
                        />
                      </div>
                    </div>
                   
                  </>
                ) : settingsMode ? (
                  <div className="settings-form">
                    <h3 className="settings-title">Change Password</h3>
                    <div className="password-input-group">
                      <Lock size={16} />
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current Password"
                        className="password-input"
                      />
                    </div>
                    <div className="password-input-group">
                      <Lock size={16} />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="password-input"
                      />
                    </div>
                    <div className="password-input-group">
                      <Lock size={16} />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm New Password"
                        className="password-input"
                      />
                    </div>
                    
                  </div>
                ) : (
                  <>
                    <div className="profile-name-section">
                      <h2 className="profile-name">{user.fullName || 'Your Name'}</h2>
                      {user.isAgency && <span className="agency-badge">Agency</span>}
                    </div>
                    <div className="profile-contacts">
                      <div className="contact-item">
                        <Mail size={16} />
                        <span>{user.email || 'email@example.com'}</span>
                      </div>
                      {user.phone && (
                        <div className="contact-item">
                          <Phone size={16} />
                          <span>{user.phone}</span>
                        </div>
                      )}
                      {user.company && (
                        <div className="contact-item">
                          <Building size={16} />
                          <span>{user.company}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Completion Progress */}
            {!settingsMode && (
              <div className="completion-section">
                <div className="completion-header">
                  <span className="completion-label">Profile Completion</span>
                  <span className="completion-percentage">{completionScore()}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${completionScore() === 100 ? 'complete' : ''}`}
                    style={{ width: `${completionScore()}%` }}
                  />
                </div>
                {completionScore() === 100 && (
                  <div className="completion-message">
                    <Check size={16} />
                    <span>Profile Complete!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Stats Grid */}
        {!settingsMode && (
          <section className="stats-section">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className={`stat-card stat-${stat.color}`}>
                  <div className="stat-icon">
                    <stat.icon size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Content Grid */}
        {!settingsMode && (
          <div className="content-grid">
            {/* Performance Overview Section */}
            <section className="performance-section">
              <div className="section-card">
                <h3 className="section-title">Performance Overview</h3>
                <div className="performance-list">
                  <div className="performance-item">
                    <div className="performance-metric">
                      <div className="metric-icon metric-success">
                        <CheckCircle size={16} />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Tasks Completed</span>
                        <span className="metric-value">24 this week</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="performance-item">
                    <div className="performance-metric">
                      <div className="metric-icon metric-warning">
                        <Clock size={16} />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Pending Reviews</span>
                        <span className="metric-value">3 awaiting</span>
                      </div>
                    </div>
                  </div>
                  
                  
                  <div className="performance-item">
                    <div className="performance-metric">
                      <div className="metric-icon metric-primary">
                        <Award size={16} />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Goals Achieved</span>
                        <span className="metric-value">8 of 10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="activity-section">
              <div className="section-card">
                <h3 className="section-title">Recent Activity</h3>
                <div className="activity-list">
                  {activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className={`activity-dot activity-${activity.type}`} />
                      <div className="activity-content">
                        <p className="activity-text">{activity.action}</p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};