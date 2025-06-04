import { useState } from 'react';
import { Camera } from 'lucide-react';
import { useTheme } from '../../Contexts/ThemeContext';

export const AvatarUpload = ({ avatar, onAvatarChange }) => {
  const { isDark } = useTheme();
  const [preview, setPreview] = useState(avatar);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setPreview(dataUrl);
        onAvatarChange(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-upload-container">
      <label className="avatar-upload-label">
        <div className="avatar-preview">
          {preview ? (
            <img 
              src={preview} 
              alt="Profile" 
              className="avatar-image" 
            />
          ) : (
            <div className="avatar-placeholder">
              <Camera size={24} />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="avatar-input"
        />
        <div className="avatar-upload-text">Upload photo</div>
      </label>
    </div>
  );
};