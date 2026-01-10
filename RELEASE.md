# Release Process

This document describes how releases are created for tonejs-json-sequencer.

## Automatic Release via GitHub Actions

The project uses GitHub Actions to automatically create releases when changes are pushed to the main branch.

### How It Works

1. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. **Push to main branch**
   ```bash
   git push origin main
   ```

3. **GitHub Actions will automatically:**
   - Install dependencies
   - Build the distribution files
   - Create or update a GitHub release using the version from package.json (e.g., v0.0.1)
   - Upload the built files (dist/index.js, dist/index.mjs, etc.) as release assets

4. **CDN Access**
   
   Once the release is updated, the files will be automatically available via jsDelivr CDN:
   ```html
   <!-- CommonJS -->
   <script src="https://cdn.jsdelivr.net/gh/cat2151/tonejs-json-sequencer@v0.0.1/dist/index.js"></script>
   
   <!-- ES Module -->
   <script type="module">
     import * as ToneJSONSequencer from 'https://cdn.jsdelivr.net/gh/cat2151/tonejs-json-sequencer@v0.0.1/dist/index.mjs';
   </script>
   ```
   
   You can also reference without version to always get the latest:
   ```html
   <!-- Always use latest version -->
   <script src="https://cdn.jsdelivr.net/gh/cat2151/tonejs-json-sequencer/dist/index.js"></script>
   ```

## Manual Release

If needed, you can also trigger a release manually:

1. Go to the [Actions tab](https://github.com/cat2151/tonejs-json-sequencer/actions/workflows/release.yml)
2. Click "Run workflow"
3. Select the branch and click "Run workflow"
4. The workflow will use the version from package.json

## Updating the Version

When you're ready to bump the version (e.g., from 0.0.1 to 0.0.2):

1. **Update the version in package.json**
   ```bash
   npm version patch  # for 0.0.1 -> 0.0.2
   npm version minor  # for 0.0.1 -> 0.1.0
   npm version major  # for 0.0.1 -> 1.0.0
   ```
   
   Or manually edit `package.json` and update the version number.

2. **Commit and push**
   ```bash
   git add package.json package-lock.json
   git commit -m "Bump version to x.x.x"
   git push origin main
   ```

3. The release will be automatically created with the new version.

## Workflow Details

The release workflow is defined in `.github/workflows/release.yml` and:
- Triggers automatically on pushes to the main branch
- Can also be triggered manually via workflow_dispatch
- Uses the version from package.json to tag the release
- Builds the project using `npm run build`
- Creates a GitHub release with CDN usage instructions
- Uploads all files from the `dist/` directory as release assets

## Notes

- Always ensure the code is tested before pushing to main
- Each push to main will update the release with the current package.json version
- CDN updates may take a few minutes to propagate after release creation
- For Work In Progress projects, keeping the same version (e.g., v0.0.1) allows consistent CDN URLs
