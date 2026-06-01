import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, "../public/audio");
const sampleRate = 48_000;

mkdirSync(outputDir, { recursive: true });

writeWav("blog-starter-music.wav", synthMusic(42));
writeWav("whoosh.wav", synthWhoosh(1.18));
writeWav("hit.wav", synthHit(0.78));
writeWav("click.wav", synthClick(0.18));
writeWav("shimmer.wav", synthShimmer(1.86));

console.log(`Generated audio assets in ${outputDir}`);

function synthMusic(seconds) {
  const chords = [
    [48, 55, 60, 64],
    [43, 50, 55, 62],
    [45, 52, 57, 60],
    [40, 47, 55, 59],
    [41, 48, 53, 57],
    [43, 50, 55, 62],
    [45, 52, 57, 64],
  ];

  return makeSamples(seconds, (t, i) => {
    const chord = chords[Math.floor(t / 6) % chords.length];
    const chordTime = t % 6;
    const globalEnv = envelope(t, seconds, 2.4, 3.4);
    const pulse = 0.72 + 0.28 * Math.sin(Math.PI * 2 * 0.5 * t);
    const root = midiToHz(chord[0]);

    let pad = 0;
    for (const [noteIndex, midi] of chord.entries()) {
      const hz = midiToHz(midi);
      const detune = 1 + (noteIndex - 1.5) * 0.0018;
      pad +=
        Math.sin(Math.PI * 2 * hz * detune * t + noteIndex * 0.7) * 0.045 +
        Math.sin(Math.PI * 2 * hz * 0.5 * t + noteIndex * 1.8) * 0.032;
    }

    const arpIndex = Math.floor(t * 2.5) % chord.length;
    const arpPhase = (t * 2.5) % 1;
    const arpHz = midiToHz(chord[arpIndex] + 12);
    const arpEnv = Math.exp(-arpPhase * 8);
    const arp = Math.sin(Math.PI * 2 * arpHz * t) * arpEnv * 0.072;

    const bassGate = chordTime < 0.42 ? Math.exp(-chordTime * 4) : 0.18;
    const bass = Math.sin(Math.PI * 2 * root * 0.5 * t) * bassGate * 0.07;

    const shimmer =
      (Math.sin(Math.PI * 2 * midiToHz(chord[2] + 24) * t) +
        Math.sin(Math.PI * 2 * midiToHz(chord[3] + 24) * t)) *
      0.014 *
      (0.4 + 0.6 * Math.sin(Math.PI * 2 * 0.12 * t + 1.8));

    const texture = deterministicNoise(i) * 0.005 * Math.sin(Math.PI * 2 * 0.08 * t);

    return softClip((pad * pulse + arp + bass + shimmer + texture) * globalEnv * 0.82);
  });
}

function synthWhoosh(seconds) {
  return makeSamples(seconds, (t, i) => {
    const p = t / seconds;
    const env = Math.sin(Math.PI * p);
    const sweep = 180 + 1900 * p * p;
    const tone = Math.sin(Math.PI * 2 * sweep * t) * 0.08;
    const air = deterministicNoise(i) * env * (0.12 + p * 0.18);
    return softClip((tone + air) * env * 0.62);
  });
}

function synthHit(seconds) {
  return makeSamples(seconds, (t, i) => {
    const p = t / seconds;
    const boom = Math.sin(Math.PI * 2 * (62 - p * 18) * t) * Math.exp(-t * 7) * 0.72;
    const snap = deterministicNoise(i) * Math.exp(-t * 28) * 0.18;
    const upper = Math.sin(Math.PI * 2 * 420 * t) * Math.exp(-t * 16) * 0.08;
    return softClip((boom + snap + upper) * 0.62);
  });
}

function synthClick(seconds) {
  return makeSamples(seconds, (t, i) => {
    const env = Math.exp(-t * 70);
    const tick = Math.sin(Math.PI * 2 * 1650 * t) * 0.34 + deterministicNoise(i) * 0.18;
    return softClip(tick * env);
  });
}

function synthShimmer(seconds) {
  const notes = [72, 76, 79, 84, 88];

  return makeSamples(seconds, (t, i) => {
    const env = envelope(t, seconds, 0.04, 1.1);
    let tone = 0;

    for (const [index, note] of notes.entries()) {
      const delay = index * 0.11;
      if (t > delay) {
        const local = t - delay;
        tone +=
          Math.sin(Math.PI * 2 * midiToHz(note) * local) *
          Math.exp(-local * 2.6) *
          (0.15 - index * 0.015);
      }
    }

    return softClip((tone + deterministicNoise(i) * 0.01) * env);
  });
}

function makeSamples(seconds, sample) {
  const length = Math.round(seconds * sampleRate);
  const samples = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    samples[i] = sample(i / sampleRate, i);
  }

  return samples;
}

function writeWav(name, samples) {
  const bytesPerSample = 2;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * bytesPerSample, 28);
  buffer.writeUInt16LE(bytesPerSample, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i++) {
    const value = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(value * 32767), 44 + i * bytesPerSample);
  }

  writeFileSync(join(outputDir, name), buffer);
}

function midiToHz(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function envelope(t, length, attack, release) {
  return Math.max(0, Math.min(1, t / attack, (length - t) / release));
}

function deterministicNoise(i) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

function softClip(value) {
  return Math.tanh(value * 1.25);
}
