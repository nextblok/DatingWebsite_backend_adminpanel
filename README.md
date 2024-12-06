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

## Build and Deployment

### Building Admin Panel
1. Navigate to adminpanel directory
2. Run build command:
   ```bash
   npm run build
   ```
3. Build output will be generated in `adminpanel/build` folder

### Serving from Backend
- Backend is configured to serve the admin panel build files:
  - Build files should be copied to `backend/adminpanel_build` directory
  - Express static middleware serves files from this location
  - All routes fallback to `index.html` for client-side routing

### Configuration
- Backend app.js contains required static file serving:
  ```javascript
  app.use(express.static(path.resolve(__dirname, './adminpanel_build')));
  ```
- Catch-all route serves index.html:
  ```javascript 
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './adminpanel_build', 'index.html'));
  });
  ```

### Development
- During development, adminpanel runs on port 3000 with proxy to backend port 8000
- For production, build files are served directly from backend server

