# Demo Directory

This directory contains the demo HTML and CSS files for the Tone.js JSON Sequencer.

## Files

- `index.html` - Main demo page
- `streaming.html` - NDJSON streaming demo with live editing and loop playback
- `offline-rendering.html` - Offline rendering demo
- `styles.css` - Shared CSS styles for all demos

## Local Development

To view the demos locally:

1. Build the library and demo:
   ```bash
   npm run build:all
   ```

2. Serve the project root directory with a local web server:
   ```bash
   # Example using Python
   python3 -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server
   ```

3. Open the demo in your browser:
   - Main demo: `http://localhost:8000/demo/index.html`
   - Streaming demo: `http://localhost:8000/demo/streaming.html`
   - Offline rendering demo: `http://localhost:8000/demo/offline-rendering.html`

## Deployment

The demos are automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch. The workflow copies the files from this directory to the root of the deployed site, so they are accessible at:

- https://cat2151.github.io/tonejs-json-sequencer/index.html
- https://cat2151.github.io/tonejs-json-sequencer/streaming.html
- https://cat2151.github.io/tonejs-json-sequencer/offline-rendering.html

See `.github/workflows/deploy-pages.yml` for the deployment configuration.
