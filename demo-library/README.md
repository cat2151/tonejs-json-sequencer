# Demo Library - External Repository Usage Example

This directory contains a minimal implementation that demonstrates how to use `tonejs-json-sequencer` as a library in an external repository, installed via npm GitHub installation.

## Purpose

This demo is stripped down to the minimum implementation that can verify:
- Library installation from GitHub
- Basic build process
- Simple usage example

This serves as a reference for developers who want to use `tonejs-json-sequencer` in their own projects.

## Installation Method: npm GitHub Installation

To use `tonejs-json-sequencer` in your own project directly from GitHub:

### 1. Install from GitHub

```bash
npm install cat2151/tonejs-json-sequencer
```

Or specify a specific branch, tag, or commit:

```bash
# Install from a specific branch
npm install cat2151/tonejs-json-sequencer#main

# Install from a specific tag (check available tags first)
npm install cat2151/tonejs-json-sequencer#vX.Y.Z

# Install from a specific commit
npm install cat2151/tonejs-json-sequencer#commit-hash
```

### 2. Install peer dependencies

```bash
npm install tone
```

### 3. Use in your project

See `index.html` in this directory for a complete working example.

## Files in this Directory

- `index.html` - Minimal working example using the library
- `README.md` - This file (installation and usage instructions)

## Local Development

To test this demo locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/cat2151/tonejs-json-sequencer.git
   cd tonejs-json-sequencer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the library:
   ```bash
   npm run build
   ```

4. Serve the project with a local web server:
   ```bash
   # Example using Python
   python3 -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server
   ```

5. Open the demo in your browser:
   ```
   http://localhost:8000/demo-library/index.html
   ```

## Deployment

This demo is deployed to GitHub Pages at:
https://cat2151.github.io/tonejs-json-sequencer/demo-library/

## Difference from demo/ Directory

The main `demo/` directory contains full-featured demos with:
- Multiple complex examples
- UI components
- Sequence selection
- Live editing features
- Streaming demos

This `demo-library/` directory contains:
- Minimal single-file example
- Focus on library installation and basic usage
- Suitable as a starting point for external projects
- Clear, simple code without extra features

## Next Steps

After successfully running this minimal example:

1. Explore the main demos in the `demo/` directory for more advanced features
2. Check the `examples/` directory for additional usage patterns
3. Read the main README.md for comprehensive documentation
4. Visit the live demos at https://cat2151.github.io/tonejs-json-sequencer/
