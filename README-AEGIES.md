# Aegies Lead - Local Environment

This repository contains the local environment for **Aegies Lead**, consisting of a headless WordPress backend and a React frontend.

## Getting Started

1. **Start the WordPress Backend**:
   Run the `start-aegies.ps1` script to ensure Apache and MySQL are running and properly linked:
   ```powershell
   .\start-aegies.ps1
   ```
   *This will output the URLs you need to access the site and REST API.*

2. **Accessing WordPress Admin**:
   Use the outputted Auto Login link to instantly log into WordPress as an administrator without a password.
   Link: `http://localhost:8889/?aegies_login=1&token=aegies-dev-token-123`

3. **Stop the Backend**:
   When you have finished development, you can shut down the Apache and MySQL services (if needed) using:
   ```powershell
   .\stop-aegies.ps1
   ```
   *(Note: Stopping will stop the Laragon services, which affects other local sites sharing them).*

4. **Start the React Frontend**:
   Next, you can navigate properties to `react/` and run Vite:
   ```powershell
   cd react
   npm run dev
   ```

## Structure
- `wordpress/` - The headless WordPress core.
- `react/` - The React frontend powered by Vite.
