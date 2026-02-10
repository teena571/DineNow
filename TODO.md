# TODO: Hardcode Ports in Fullstack App

## Steps to Complete

- [x] Update frontend/vite.config.js: Change port to 3000, add strictPort: true, update proxy target to 'http://localhost:5000'
- [x] Update backend/server.js: Change port to `process.env.PORT || 5000`, update CORS to allow only 'http://localhost:3000'
- [ ] Update backend/.env: Add `PORT=5000` (Note: .env editing not allowed, but port is set via env)
- [x] Verify changes and return updated config files
