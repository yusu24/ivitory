class JavaneseGamelanSynth {
  ctx = null;
  delayNode = null;
  feedbackGain = null;
  mainVolume = null;

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.mainVolume = this.ctx.createGain();
      this.mainVolume.gain.value = 0.2;

      this.delayNode = this.ctx.createDelay(2.0);
      this.delayNode.delayTime.value = 0.6;

      this.feedbackGain = this.ctx.createGain();
      this.feedbackGain.gain.value = 0.45;

      this.delayNode.connect(this.feedbackGain);
      this.feedbackGain.connect(this.delayNode);

      this.mainVolume.connect(this.ctx.destination);
      this.delayNode.connect(this.mainVolume);
    } catch (e) {
      console.warn('Failed to initialize Web Audio:', e);
    }
  }

  playChime(frequency, isGong = false, customVolume = 1.0) {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isGong ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(frequency, now);

    const overtones = isGong ? [2.0, 3.0] : [2.76, 5.4, 8.2];
    overtones.forEach((multiplier, idx) => {
      const oOsc = ctx.createOscillator();
      const oGain = ctx.createGain();
      oOsc.type = 'sine';
      oOsc.frequency.setValueAtTime(frequency * multiplier, now);
      oGain.gain.setValueAtTime(((isGong ? 0.08 : 0.12) / (idx + 1)) * customVolume, now);
      oGain.gain.exponentialRampToValueAtTime(0.0001, now + (isGong ? 1.5 : 0.25 + idx * 0.08));
      oOsc.connect(oGain);
      oGain.connect(this.mainVolume);
      oOsc.start(now);
      oOsc.stop(now + 2.5);
    });

    gain.gain.setValueAtTime(0.5 * customVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (isGong ? 4.5 : 2.5));

    osc.connect(gain);
    gain.connect(this.mainVolume);
    if (this.delayNode) gain.connect(this.delayNode);

    osc.start(now);
    osc.stop(now + (isGong ? 5.0 : 3.0));
  }

  playDeepGong() {
    this.playChime(65.41, true, 1.8);
    this.playChime(130.81, true, 1.2);
  }
}

export const gamelanSynth = new JavaneseGamelanSynth();
