#!/usr/bin/env node
/**
 * Extract individual demo sequences from combined TypeScript files
 * 
 * This script uses TDD methodology to safely extract 31 demo sequences
 * from 3 combined files into individual files organized by category.
 */

const fs = require('fs');
const path = require('path');

// Test data - sample sequence for validation
const TEST_SEQUENCE = `  {
    name: "Test Sequence",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth",
      }
    ]
  }`;

/**
 * Parse a TypeScript file containing sequence definitions
 * @param {string} content - File content
 * @returns {Array<{name: string, content: string}>} Parsed sequences
 */
function parseSequences(content) {
  const sequences = [];
  
  // Find the array definition
  const arrayMatch = content.match(/export const sequenceDefinitions[^[]*\[(.*)\];/s);
  if (!arrayMatch) {
    throw new Error('Could not find sequenceDefinitions array');
  }
  
  const arrayContent = arrayMatch[1];
  
  // Split by top-level objects using bracket counting
  let currentSeq = '';
  let braceCount = 0;
  let bracketCount = 0;
  let inString = false;
  let stringChar = null;
  
  for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];
    const prevChar = i > 0 ? arrayContent[i-1] : '';
    
    // Handle string literals
    if ((char === '"' || char === "'") && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = null;
      }
    }
    
    if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
      if (char === '[') bracketCount++;
      if (char === ']') bracketCount--;
      
      // Top-level comma between sequences
      if (char === ',' && braceCount === 0 && bracketCount === 0) {
        if (currentSeq.trim()) {
          sequences.push(currentSeq.trim());
        }
        currentSeq = '';
        continue;
      }
    }
    
    currentSeq += char;
  }
  
  // Don't forget the last sequence
  if (currentSeq.trim()) {
    sequences.push(currentSeq.trim());
  }
  
  // Parse each sequence to extract name and content
  return sequences.map(seq => {
    const nameMatch = seq.match(/name:\s*"([^"]+)"/);
    if (!nameMatch) {
      throw new Error('Could not extract sequence name from: ' + seq.substring(0, 100));
    }
    return {
      name: nameMatch[1],
      content: seq
    };
  });
}

/**
 * Convert sequence name to filename
 * @param {string} name - Sequence name
 * @returns {string} Filename
 */
function nameToFilename(name) {
  const mapping = {
    "最小構成": "minimal",
    "ディレイビブラート": "delay-vibrato",
    "マルチティンバー": "multitimbral",
    "SuperSaw": "supersaw",
    "Sampler (Piano)": "sampler-piano",
    "PolySynth (FM Synth)": "polysynth-fm",
    "MonoSynth": "monosynth",
    "AMSynth": "amsynth",
    "DuoSynth": "duosynth",
    "MetalSynth": "metalsynth",
    "MembraneSynth": "membranesynth",
    "PluckSynth": "plucksynth",
    "NoiseSynth": "noisesynth",
    "Reverb": "reverb",
    "Freeverb": "freeverb",
    "JCReverb": "jcreverb",
    "Chorus": "chorus",
    "Phaser": "phaser",
    "Tremolo": "tremolo",
    "Vibrato": "vibrato",
    "AutoFilter": "autofilter",
    "AutoPanner": "autopanner",
    "AutoWah": "autowah",
    "FeedbackDelay": "feedbackdelay",
    "PingPongDelay": "pingpongdelay",
    "Distortion": "distortion",
    "BitCrusher": "bitcrusher",
    "Chebyshev": "chebyshev",
    "PitchShift": "pitchshift",
    "FrequencyShifter": "frequencyshifter",
    "StereoWidener": "stereowidener"
  };
  
  return mapping[name] || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * Determine category (instrument or effect) for a sequence
 * @param {string} name - Sequence name
 * @returns {string} Category ('instrument' or 'effect')
 */
function getCategory(name) {
  const instrumentNames = [
    "最小構成", "ディレイビブラート", "マルチティンバー", "SuperSaw",
    "Sampler (Piano)", "PolySynth (FM Synth)", "MonoSynth", "AMSynth",
    "DuoSynth", "MetalSynth", "MembraneSynth", "PluckSynth", "NoiseSynth"
  ];
  
  return instrumentNames.includes(name) ? 'instrument' : 'effect';
}

/**
 * Generate individual sequence file content
 * @param {string} name - Sequence name
 * @param {string} sequenceContent - Sequence object content
 * @returns {string} File content
 */
function generateFileContent(name, sequenceContent) {
  // Extract just the data array from the sequence object
  const dataMatch = sequenceContent.match(/data:\s*\[(.*)\]/s);
  if (!dataMatch) {
    throw new Error(`Could not extract data array from sequence: ${name}`);
  }
  
  const dataContent = dataMatch[1].trim();
  
  return `// ${name} demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "${name}";

export const sequence: SequenceEvent[] = [
${dataContent}
];
`;
}

/**
 * Run tests on the extraction functions
 */
function runTests() {
  console.log('Running tests...');
  
  // Test 1: Parse test sequence
  try {
    const testContent = `export const sequenceDefinitions: SequenceDefinition[] = [${TEST_SEQUENCE}];`;
    const parsed = parseSequences(testContent);
    if (parsed.length !== 1) throw new Error('Expected 1 sequence');
    if (parsed[0].name !== 'Test Sequence') throw new Error('Name mismatch');
    console.log('✓ Test 1: Parse single sequence');
  } catch (e) {
    console.error('✗ Test 1 failed:', e.message);
    return false;
  }
  
  // Test 2: Name to filename conversion
  try {
    if (nameToFilename('最小構成') !== 'minimal') throw new Error('Filename mismatch');
    if (nameToFilename('PolySynth (FM Synth)') !== 'polysynth-fm') throw new Error('Filename mismatch');
    console.log('✓ Test 2: Name to filename conversion');
  } catch (e) {
    console.error('✗ Test 2 failed:', e.message);
    return false;
  }
  
  // Test 3: Category determination
  try {
    if (getCategory('最小構成') !== 'instrument') throw new Error('Category mismatch');
    if (getCategory('Reverb') !== 'effect') throw new Error('Category mismatch');
    console.log('✓ Test 3: Category determination');
  } catch (e) {
    console.error('✗ Test 3 failed:', e.message);
    return false;
  }
  
  // Test 4: Generate file content
  try {
    const content = generateFileContent('Test', TEST_SEQUENCE);
    if (!content.includes('export const name = "Test"')) throw new Error('Missing name export');
    if (!content.includes('export const sequence: SequenceEvent[]')) throw new Error('Missing sequence export');
    console.log('✓ Test 4: Generate file content');
  } catch (e) {
    console.error('✗ Test 4 failed:', e.message);
    return false;
  }
  
  console.log('\n✓ All tests passed!\n');
  return true;
}

/**
 * Main extraction function
 */
function main() {
  // Run tests first (TDD approach)
  if (!runTests()) {
    console.error('Tests failed. Aborting extraction.');
    process.exit(1);
  }
  
  const baseDir = process.cwd();
  const srcDir = path.join(baseDir, 'src/demo/sequences');
  const outputDirs = {
    instrument: path.join(baseDir, 'src/demo/instrument'),
    effect: path.join(baseDir, 'src/demo/effect')
  };
  
  // Create output directories
  Object.values(outputDirs).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Process each source file
  const sourceFiles = ['basicSequences.ts', 'synthSequences.ts', 'effectSequences.ts'];
  let totalExtracted = 0;
  
  sourceFiles.forEach(filename => {
    const filepath = path.join(srcDir, filename);
    if (!fs.existsSync(filepath)) {
      console.warn(`Warning: ${filepath} not found, skipping`);
      return;
    }
    
    console.log(`\nProcessing ${filename}...`);
    const content = fs.readFileSync(filepath, 'utf8');
    
    try {
      const sequences = parseSequences(content);
      console.log(`  Found ${sequences.length} sequences`);
      
      sequences.forEach(seq => {
        const category = getCategory(seq.name);
        const filename = nameToFilename(seq.name);
        const outputPath = path.join(outputDirs[category], `${filename}.ts`);
        const fileContent = generateFileContent(seq.name, seq.content);
        
        fs.writeFileSync(outputPath, fileContent, 'utf8');
        console.log(`  ✓ ${seq.name} → ${category}/${filename}.ts`);
        totalExtracted++;
      });
    } catch (e) {
      console.error(`  ✗ Error processing ${filename}:`, e.message);
    }
  });
  
  console.log(`\n✓ Successfully extracted ${totalExtracted} sequences`);
  
  // Verify we got all 31
  if (totalExtracted !== 31) {
    console.warn(`⚠ Warning: Expected 31 sequences, but extracted ${totalExtracted}`);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { parseSequences, nameToFilename, getCategory, generateFileContent };
