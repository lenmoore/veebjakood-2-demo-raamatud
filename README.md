# veebjakood-2-demo-raamatud
Veeb ja kood BTO24 detsember demoprojekt

## Serve the project locally (Python, port 8000) 🔧

You can quickly serve the project from the project root using Python's built-in HTTP server. This makes it easy to view the site at http://localhost:8000 without copying files around.

- Start the server (Python 3):

```bash
python3 -m http.server 8000
```

- If your system maps `python` to Python 3, you can also use:

```bash
python -m http.server 8000
```

- Open your browser at: `http://localhost:8000`
- Stop the server with Ctrl+C in the terminal.

> Note: This simple server does not auto-reload the page when files change — refresh the browser after saving. If you want automatic live-reload, consider using a tool like **Live Server** (VS Code extension) or `live-server` / `browser-sync` from npm.

### Auto-reload (live-reload) options ⚡

If you'd like the browser to refresh automatically when you save files, here are two easy options:

- **VS Code — Live Server extension**
	- Install the **Live Server** extension in VS Code.
	- Open `index.html` and click **Go Live** in the status bar, or right-click the file and choose **Open with Live Server**.
	- The site opens in your browser and will auto-reload when you save files.

- **Command-line — `live-server` (npm)**
	- Requires Node.js / npm. Install globally: `npm install -g live-server` (or run with `npx live-server`).
	- Start in the project root on port 8000:

```bash
live-server --port=8000
# or without installing globally
npx live-server --port=8000
```

	- `live-server` watches files and automatically reloads the page on changes. Stop it with Ctrl+C.

These options remove the need to manually refresh the page after each save. Choose the one that fits your workflow. 💡



