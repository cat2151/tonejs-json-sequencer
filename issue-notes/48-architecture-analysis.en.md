# NDJSON Streaming Architecture Analysis

## Background

This document identifies architectural options for implementing the higher layer that will handle NDJSON streaming functionality, and analyzes the pros and cons of each approach.

As stated in the design philosophy in README.ja.md, the policy is to keep the tonejs-json-sequencer core as a simple implementation that accepts a single element, while handling sequences and NDJSON streaming in higher layers.

## Options

### Option A: Implement Higher Layer in a Separate Repository

Develop the higher layer that handles NDJSON streaming functionality as a new, independent repository.

#### Advantages

1. **Separation of Concerns and Single Responsibility Principle**
   - tonejs-json-sequencer can focus on low-level event processing
   - The higher layer can specialize in streaming, sequence management, loop processing, etc.
   - Each repository has a clear role and is easier to understand

2. **Maintaining Simplicity and Robustness of tonejs-json-sequencer**
   - The core library remains small and lightweight
   - Dependencies are kept to a minimum
   - Smaller attack surface from a security perspective
   - Bug fixes and maintenance are easier

3. **Independent Version Management**
   - Each layer can have its own release cycle
   - The higher layer can evolve even without breaking changes in the core library
   - Semantic versioning becomes clearer

4. **Flexible Implementation Choices**
   - Different technology stacks can be chosen for the higher layer (e.g., React, Vue, Node.js)
   - Implementation without being constrained by core library restrictions
   - Multiple higher layer implementations (e.g., for browser, for Node.js) can be developed separately

5. **Gradual Adoption**
   - Users can install only the functionality they need
   - Users who only want the core library don't include unnecessary features
   - Bundle size is optimized

6. **Ecosystem Extensibility**
   - Community can easily develop different higher layers
   - Easy to create higher layers for different purposes, like tonejs-mml-to-json
   - Ecosystem can naturally expand

#### Disadvantages

1. **Development and Maintenance Complexity**
   - Multiple repositories need to be managed (CI/CD, issue tracking, PRs, etc.)
   - Synchronization between repositories can be challenging
   - Integration testing setup becomes complex

2. **Fragmented User Experience**
   - Users need to install multiple packages
   - Documentation may be scattered
   - Version compatibility management is complex (which versions are compatible with each other)

3. **Increased Initial Development Cost**
   - Setting up a new repository (CI, test environment, documentation, etc.)
   - Configuring package publishing (npm, version management, etc.)
   - Initial learning curve may be steeper

4. **Reduced Discoverability**
   - Users may not be aware of the higher layer's existence
   - Search-ability decreases (separate repository names)
   - Proper linking from the main repository is necessary

### Option B: Implement Higher Layer in This Repository

Add NDJSON streaming functionality within the tonejs-json-sequencer repository.

#### Advantages

1. **Integrated Development Experience**
   - Simple management with one repository
   - Issues and PRs are consolidated
   - Unified CI/CD pipeline

2. **User Convenience**
   - All features available by installing one package
   - Documentation in one place
   - No version compatibility concerns

3. **Development Efficiency**
   - Monorepo-like approach makes refactoring easy
   - Interface changes are easy to coordinate
   - Integration tests are easier to write

4. **Improved Discoverability**
   - Users can find all features in one place
   - Search and documentation exploration are simple
   - Example sharing is easy

5. **Initial Development Speed**
   - Can start development immediately (no new repository setup needed)
   - Easy to try experimental features
   - Quick prototype creation

#### Disadvantages

1. **Scope Expansion**
   - Library's scope of responsibility expands
   - "Lightweight library" concept may be diluted
   - Codebase to understand becomes larger

2. **Increased Dependencies**
   - More dependency packages needed for the higher layer
   - Bundle size may increase
   - Security risks increase

3. **Version Management Complexity**
   - Core and higher layer changes are mixed
   - Impact of breaking changes expands
   - Semantic versioning may become ambiguous

4. **Reduced Flexibility**
   - Higher layer implementation is fixed to one
   - Implementing different approaches is difficult
   - Users include unnecessary features

5. **Design Complexity**
   - Need to clarify boundaries between core and higher layer
   - Risk of tight coupling if module separation is not appropriate
   - Test isolation may become difficult

## Comparison Table

| Aspect | Separate Repository (A) | Same Repository (B) |
|--------|------------------------|---------------------|
| Core Simplicity | ◎ Can be kept simplest | △ May become complex |
| Development Ease | △ Multiple repo management needed | ◎ Complete in one place |
| User Experience | △ Multiple packages needed | ◎ Complete with one package |
| Bundle Size | ◎ Only what's needed | △ All features included |
| Extensibility | ◎ Easy to create new implementations | △ Fixed to one implementation |
| Maintainability | △ Management in multiple places | ◎ Centralized management |
| Initial Cost | △ Setup required | ◎ Can start immediately |
| Security | ◎ Smaller attack surface | △ More dependencies |

## Recommended Approach

### Phase 1 (Current): Experiment in the Same Repository

**Recommendation: Option B (Implement in this repository)**

Reasons:
1. The project is still in its early stages, and rapid experimentation and validation are important
2. The optimal implementation method for NDJSON streaming is not yet established
3. Need to improve the design while gathering user feedback
4. Can reduce initial development costs and quickly provide value

Implementation Policy:
- Create `src/streaming/` directory and place NDJSON-related functionality
- Clearly separate from core `event-scheduler.ts`
- Design with module boundaries in mind
- Interface design considering future separation

### Phase 2 (Future): Consider Separation After Maturation

Consider separation when NDJSON streaming functionality stabilizes and the following conditions are met:

1. **Feature Stability**
   - API is stable with fewer breaking changes
   - Use cases are clarified

2. **Ecosystem Growth**
   - Need for multiple higher layer implementations emerges
   - Community contributions increase

3. **Threat to Core Simplicity**
   - Core library becomes complex
   - Bundle size becomes an issue

Migration Strategy During Separation:
1. Create new repository `tonejs-json-sequencer-streaming`
2. Consider monorepo structure (using lerna or nx)
3. Provide migration guide for existing users
4. Implement gradual migration with deprecation period

## Specific Implementation Approach (Phase 1)

### Directory Structure

```
src/
├── index.ts              # Main exports
├── types.ts              # Common type definitions
├── sequencer-nodes.ts    # Node management (core)
├── node-factory.ts       # Node creation (core)
├── event-scheduler.ts    # Event execution (core)
├── streaming/            # Higher layer (new)
│   ├── index.ts          # Streaming-related exports
│   ├── ndjson-player.ts  # NDJSON player
│   ├── sequence-loop.ts  # Loop functionality
│   └── types.ts          # Streaming type definitions
└── demo/                 # Demo application
```

### Package Export Strategy

Clearly separated exports for core and higher layer:

```typescript
// Main exports (core functionality)
export * from './sequencer-nodes';
export * from './node-factory';
export * from './event-scheduler';
export * from './types';

// Optional exports (higher layer)
export * as streaming from './streaming';
```

This allows:
- Users who only want core functionality can use it as before
- Users who want streaming functionality can import from the `streaming` namespace
- Similar interface structure when migrating during future separation

### Documentation Strategy

1. README.md
   - Explain core functionality
   - Explain streaming functionality in a separate section
   - Explicitly state it is a "higher layer"

2. docs/streaming.md (new)
   - Detailed documentation on NDJSON streaming
   - Usage examples and best practices
   - Note the possibility of future separation

3. examples/
   - Core functionality examples: examples/basic/
   - Streaming examples: examples/streaming/

## Summary

**Current Recommendation**: Implement in the same repository (Option B)

Reasons:
1. Enables rapid development and validation
2. Integrated development experience is important in early stages
3. Design considering future separation allows later migration
4. Can respond flexibly to project growth

**Important Design Principles**:
- Clarify module boundaries
- Aim for loosely coupled design
- Interface design with future separation in mind
- Document explicitly as a "higher layer"

This strategy prioritizes development speed currently while preserving the option for future separation. When the project matures and the ecosystem grows, we can re-evaluate and decide on separation.
