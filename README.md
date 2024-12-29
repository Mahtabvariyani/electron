# Deployment Guide for Electron App on Vercel

This README provides a step-by-step guide to deploying your Electron app on Vercel while addressing potential issues during the build and deployment process.
I faced some challenges while deploying, especially with the JSON file, package.json, and the Vercel configuration. So, I thought writing this down might be helpful for someone else going through the same!
---

## Prerequisites

1. **Node.js**: Ensure Node.js is installed (recommended version 18+).
2. **Vercel CLI**: Install the Vercel CLI globally using:

   ```bash
   npm install -g vercel
   ```

3. **cross-env**: Install `cross-env` for cross-platform script compatibility:

   ```bash
   npm install cross-env --save-dev
   ```

4. **Project Structure**:
   Ensure your project contains the following files:

   - `main.js` (entry point)
   - `index.html` (HTML file)
   - `styles.css` (optional CSS file)

---

## Step 1: Update `package.json`

Update your `package.json` to include the necessary scripts for building and deploying your app.

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "prebuild": "cross-env-shell \"if not exist dist mkdir dist\"",
    "build": "node copy-files.js",
    "vercel-build": "npm run prebuild && npm run build"
  },
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "electron": "23.1.3",
    "cross-env": "^7.0.3"
  }
}
```

---

## Step 2: Create a `copy-files.js` Script

The `copy-files.js` script ensures compatibility with Unix-like systems and Windows by copying files programmatically using Node.js.

Create a file named `copy-files.js` with the following content:

```javascript
const fs = require('fs');
const path = require('path');

const filesToCopy = ['index.html', 'styles.css', 'main.js'];
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

filesToCopy.forEach((file) => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(distDir, file);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`${file} copied successfully.`);
  } else {
    console.error(`File not found: ${file}`);
  }
});
```

---

## Step 3: Configure `vercel.json`

Create or update your `vercel.json` file to specify the build configuration and routes:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/",
      "dest": "/index.html"
    }
  ]
}
```

---

## Step 4: Verify Locally

1. **Run the Build Script Locally**:

   ```bash
   npm run vercel-build
   ```

2. **Check the `dist` Directory**:
   Ensure the `dist` directory contains:
   - `index.html`
   - `styles.css`
   - `main.js`

---

## Step 5: Deploy to Vercel

1. **Log in to Vercel**:

   ```bash
   vercel login
   ```

2. **Deploy Your App**:

   ```bash
   vercel
   ```

3. **Inspect Logs if Errors Occur**:
   Use the following command to view detailed deployment logs:

   ```bash
   vercel logs <deployment-url>
   ```

---

## Troubleshooting

### 1. "File Not Found" Error:
- Ensure all files (`index.html`, `styles.css`, `main.js`) exist in the root directory.

### 2. "Command exited with 2" Error:
- Check the Vercel logs for detailed error messages using:

  ```bash
  vercel logs <deployment-url>
  ```

### 3. Syntax Errors in Scripts:
- Verify the syntax in your scripts and `copy-files.js`.

### 4. Dependency Issues:
- Ensure all dependencies are installed:

  ```bash
  npm install
  ```

---

By following these steps, you should be able to deploy your Electron app on Vercel successfully. For further assistance, feel free to reach out!

