// Web Audio API Procedural Classical Music Synthesizer for Weddings
// Keeps it 100% offline, lightweight, and bypasses CORS/network block issues!

class WeddingSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.scheduleTimeoutId = null;
    this.nextNoteTime = 0;
    this.currentStep = 0;
    this.activeNodes = [];
    this.songId = 'canon-synth';
    this.tempo = 75; // BPM

    // Canon in D notes (simplified elegant arrangement)
    this.canonBass = [
      36, 43, 48, 52,
      33, 40, 45, 49,
      35, 42, 47, 50,
      30, 37, 42, 45,
      31, 38, 43, 47,
      26, 33, 38, 42,
      31, 38, 43, 47,
      33, 40, 45, 49,
    ];

    this.canonMelody = [
      62, 66, 69, 74,
      61, 64, 69, 73,
      59, 62, 66, 71,
      57, 61, 66, 69,
      55, 59, 62, 67,
      54, 57, 62, 66,
      55, 59, 62, 67,
      57, 61, 64, 69,
      74, 73, 71, 69,
      67, 66, 64, 62,
      64, 66, 67, 69,
      71, 73, 74, 76,
      78, 74, 76, 78,
      79, 78, 76, 74,
      71, 73, 74, 76,
      74, 73, 71, 69,
    ];

    // Chopin Nocturne Op 9 No 2
    this.chopinBass = [
      39, 46, 51, 55,
      39, 46, 51, 55,
      38, 45, 50, 53,
      36, 43, 48, 52,
      34, 41, 46, 50,
      33, 40, 45, 48,
      39, 46, 51, 55,
      39, 46, 51, 55,
    ];

    this.chopinMelody = [
      67, 70, 74, 79,
      79, 78, 79, 81, 79, 77, 74,
      72, 75, 79, 82, 80, 79, 75,
      74, 75, 77, 80, 79, 77, 74,
      70, 74, 77, 82, 82, 81, 79,
      77, 75, 74, 72, 70, 72, 74,
      75, 79, 82, 86, 84, 82, 79,
      77, 80, 82, 84, 82, 80, 79,
    ];
  }

  midiToFreq(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start(songId = 'canon-synth') {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.songId = songId;
    this.currentStep = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this.scheduler();
  }

  stop() {
    this.isPlaying = false;
    if (this.scheduleTimeoutId) {
      clearTimeout(this.scheduleTimeoutId);
      this.scheduleTimeoutId = null;
    }
    this.activeNodes.forEach((node) => {
      try { node.stop(); } catch (e) {}
    });
    this.activeNodes = [];
  }

  setSong(songId) {
    this.songId = songId;
    this.currentStep = 0;
  }

  scheduler() {
    if (!this.isPlaying || !this.ctx) return;
    while (this.nextNoteTime < this.ctx.currentTime + 0.3) {
      this.scheduleNote(this.currentStep, this.nextNoteTime);
      this.advanceNote();
    }
    this.scheduleTimeoutId = setTimeout(() => this.scheduler(), 50);
  }

  advanceNote() {
    const secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime += 0.5 * secondsPerBeat;
    this.currentStep++;
  }

  scheduleNote(step, time) {
    if (!this.ctx) return;
    let bassNotes = this.canonBass;
    let melodyNotes = this.canonMelody;
    this.tempo = 72;

    if (this.songId === 'nocturne-synth') {
      bassNotes = this.chopinBass;
      melodyNotes = this.chopinMelody;
      this.tempo = 65;
    }

    const bassIdx = step % bassNotes.length;
    const bassMidi = bassNotes[bassIdx];
    if (step % 2 === 0) {
      this.playPluck(bassMidi - 12, time, 0.4, 1.2, 0.15);
    }
    this.playPluck(bassMidi, time, 0.3, 0.8, 0.2);

    const melIdx = step % melodyNotes.length;
    const melMidi = melodyNotes[melIdx];
    const playMelody = (step % 4 !== 3) || (step % 16 === 15);
    if (playMelody && melMidi) {
      const humanizedTime = time + (Math.random() * 0.015 - 0.007);
      this.playPluck(melMidi, humanizedTime, 0.28, 1.0, 0.5);
      if (step % 4 === 0) {
        this.playPluck(melMidi + 12, humanizedTime + 0.01, 0.1, 0.6, 0.8);
      }
    }
  }

  playPluck(midiNote, time, volume, decay, resonance) {
    if (!this.ctx) return;
    const freq = this.midiToFreq(midiNote);
    if (isNaN(freq) || freq < 20 || freq > 20000) return;

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, time);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.001, time);

    const gainOsc1 = this.ctx.createGain();
    const gainOsc2 = this.ctx.createGain();
    const mainGain = this.ctx.createGain();

    gainOsc1.gain.setValueAtTime(volume * 0.7, time);
    gainOsc1.gain.exponentialRampToValueAtTime(0.0001, time + decay);
    gainOsc2.gain.setValueAtTime(volume * 0.35, time);
    gainOsc2.gain.exponentialRampToValueAtTime(0.0001, time + decay * 0.5);

    osc1.connect(gainOsc1);
    osc2.connect(gainOsc2);
    gainOsc1.connect(mainGain);
    gainOsc2.connect(mainGain);

    const delay = this.ctx.createDelay(1.0);
    delay.delayTime.setValueAtTime(0.35, time);

    const delayGain = this.ctx.createGain();
    delayGain.gain.setValueAtTime(resonance * 0.35, time);

    mainGain.connect(this.ctx.destination);
    mainGain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(delay);
    delayGain.connect(this.ctx.destination);

    this.activeNodes.push(osc1);
    this.activeNodes.push(osc2);

    osc1.start(time);
    osc1.stop(time + decay);
    osc2.start(time);
    osc2.stop(time + decay);
  }
}

export const weddingSynth = new WeddingSynth();

export const SONGS = [
  {
    id: 'canon-synth',
    title: 'Canon in D (Music Box)',
    artist: 'Pachelbel (Synth)',
    url: 'synth',
  },
  {
    id: 'nocturne-synth',
    title: 'Nocturne Op. 9 No. 2',
    artist: 'Chopin (Synth)',
    url: 'synth',
  },
];
