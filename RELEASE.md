# Release Process

This document describes how to create a new release of tonejs-json-sequencer.

## Automatic Release via GitHub Actions

The project uses GitHub Actions to automatically create releases when a version tag is pushed.

### Steps to Create a Release

1. **Update the version in package.json**
   ```bash
   npm version patch  # for 0.0.1 -> 0.0.2
   npm version minor  # for 0.0.1 -> 0.1.0
   npm version major  # for 0.0.1 -> 1.0.0
   ```
   
   Or manually edit `package.json` and update the version number.

2. **Commit the version change**
   ```bash
   git add package.json package-lock.json
   git commit -m "Bump version to x.x.x"
   ```

3. **Create and push a git tag**
   ```bash
   git tag v0.0.2  # Replace with your version
   git push origin main
   git push origin v0.0.2
   ```
   
   **Important:** The tag version must match the version in package.json. The workflow will validate this and fail if they don't match.

4. **GitHub Actions will automatically:**
   - Install dependencies
   - Validate that the tag version matches package.json version
   - Build the distribution files
   - Create a GitHub release with the tag
   - Upload the built files (dist/index.js, dist/index.mjs, etc.) as release assets

5. **CDN Access**
   
   Once the release is created, the files will be automatically available via jsDelivr CDN:
   ```html
   <!-- CommonJS -->
   <script src="https://cdn.jsdelivr.net/gh/cat2151/tonejs-json-sequencer@v0.0.2/dist/index.js"></script>
   
   <!-- ES Module -->
   <script type="module">
     import * as ToneJSONSequencer from 'https://cdn.jsdelivr.net/gh/cat2151/tonejs-json-sequencer@v0.0.2/dist/index.mjs';
   </script>
   ```

## Manual Release

If needed, you can also trigger a release manually:

1. Go to the [Actions tab](https://github.com/cat2151/tonejs-json-sequencer/actions/workflows/release.yml)
2. Click "Run workflow"
3. Select the branch and click "Run workflow"
4. The workflow will use the version from package.json

## Workflow Details

The release workflow is defined in `.github/workflows/release.yml` and:
- Triggers automatically on tags matching `v*.*.*` pattern
- Can also be triggered manually via workflow_dispatch
- Validates that tag version matches package.json version (for tag triggers)
- Builds the project using `npm run build`
- Creates a GitHub release with CDN usage instructions
- Uploads all files from the `dist/` directory as release assets

## Notes

- Always ensure the code is tested before creating a release
- The tag version **must** match the version in package.json (workflow will fail otherwise)
- CDN updates may take a few minutes to propagate after release creation
