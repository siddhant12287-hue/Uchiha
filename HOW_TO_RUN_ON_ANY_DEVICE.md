# ⛩️ HOW TO RUN UCHIHA REALM ON ANY DEVICE

This guide explains how to run **UCHIHA REALM** either:
1. **From your phone, tablet, or another computer on the same Wi-Fi network right now** (no file copying needed).
2. **By transferring this folder to any other computer** (Windows, Mac, or Linux) using a USB drive or cloud storage.
3. **Running the instant production build** without development tools.

---

## 📱 METHOD 1: Open on Your Phone / Tablet / Laptop (Same Wi-Fi)

You do **not** need to copy any files to view and play Uchiha Realm on your mobile device. Because Vite is configured to broadcast over the local area network (`0.0.0.0`), you can access it directly.

### Step 1: Confirm Both Devices Are on the Same Wi-Fi
Ensure your host computer and your phone/tablet/second laptop are connected to the same Wi-Fi network.

### Step 2: Start the Server on Your Host Computer
Open PowerShell in the project directory and run:
```powershell
npm run dev
```

You will see output similar to this:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.29.244:5173/
```

### Step 3: Open the URL on Your Device
On your phone, iPad, tablet, or other laptop:
1. Open any web browser (Safari, Chrome, Firefox, Edge).
2. In the address bar, type your host computer's Network URL:
   ```
   http://192.168.29.244:5173/
   ```
3. Tap **Go** / **Enter**. The full interactive app will load with touch controls, live SVG rendering, and Web Audio API synthesis!

> **💡 Firewall Note (if page doesn't load on your phone)**:  
> Windows Firewall occasionally blocks incoming connections on port 5173 for unknown devices. To allow it, open PowerShell as Administrator and run:
> ```powershell
> netsh advfirewall firewall add rule name="Vite Port 5173" dir=in action=allow protocol=TCP localport=5173
> ```

---

## 💻 METHOD 2: Move the Project to Another Computer (USB / Cloud Drive)

To transfer the entire project to another Windows PC, Mac, or Linux laptop:

### Step 1: Install Node.js on the New Computer
1. Download and install Node.js (**version 20.19+ or 22.12+**) from [https://nodejs.org/](https://nodejs.org/).
2. Verify in your terminal/command prompt:
   ```bash
   node -v
   npm -v
   ```

### Step 2: Copy the Project Folder
Copy the `Uchiha-Realm-Package` folder (or unzip `Uchiha-Realm-Package.zip`) onto your USB drive or upload it to Google Drive / OneDrive, then place it on the target computer.

### Step 3: Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```
*(On Windows, you can simply double-click `2-INSTALL-DEPENDENCIES.bat`)*

### Step 4: Start the Server
```bash
npm run dev
```
*(On Windows, you can simply double-click `1-START-LOCAL-AND-WIFI.bat`)*

Then open [http://localhost:5173/](http://localhost:5173/) in your browser!

---

## 🚀 METHOD 3: Run the Pre-Built Production Version

The `dist/` folder inside this package is an already-compiled, high-performance static build. You can run it instantly:

### Option A: Using Vite Preview
```bash
npm run preview
```
*(Runs on `http://localhost:4173/` and on your Wi-Fi network)*

### Option B: Using Python (No Node.js Required!)
If the target computer has Python installed:
```bash
python -m http.server 5173 --directory dist
```
Then visit [http://localhost:5173/](http://localhost:5173/).

### Option C: Using `serve`
```bash
npx serve dist
```

---

## 🗂️ Included 1-Click Launchers (Windows)

For convenience on Windows machines, three double-clickable batch files are included:
1. **`1-START-LOCAL-AND-WIFI.bat`**: Starts the dev server with host listening enabled and prints the IP address.
2. **`2-INSTALL-DEPENDENCIES.bat`**: Runs `npm install` on a fresh machine.
3. **`3-START-PRODUCTION-PREVIEW.bat`**: Runs the optimized production build.

---

## 🛡️ Quick Troubleshooting

- **Audio doesn't play immediately**: Browsers require a user interaction before Web Audio emits sound. Click anywhere on the screen or toggle the volume slider to unlock audio.
- **Port 5173 busy**: If port 5173 is already in use, Vite will automatically select `5174` (or you can run `npm run dev -- --port 3000`).
- **IP Address changes**: If your router reboots or assigns a new IP address, run `ipconfig` in Command Prompt to find your current IPv4 address under **Wireless LAN adapter Wi-Fi**.
