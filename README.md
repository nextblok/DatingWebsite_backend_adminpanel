# Admin Panel

## Frontend Structure

### Key Files
- `/src/routes.js`
  - Contains route definitions
  - Use `onSidebarMenu: true` to display in sidebar menu
- `/src/shared/apiConfig.js`
  - API configuration settings
- `/src/components/Sidebar/Sidebar.js`
  - Sidebar menu implementation

### Views
- `/src/views/pages/Login.js`
  - Login page implementation
- `/src/views/AppUser.js`
  - App user management
- `/src/views/Feature.js`
  - Standard page template for REST APIs

## Backend Features

### File Management
- File uploads automatically stored in `/uploads` folder
- Avatar update API endpoint: `/admin/appuser_updateAvatar`
  - Implements file upload using multer middleware
