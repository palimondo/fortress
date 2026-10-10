"""Transcribe a talk with Qwen3-ASR-1.7B (transformers, CPU, float32).

usage: qwen_transcribe.py AUDIO.wav OUTDIR [--segments whisper.json] [--model ID_OR_DIR]
                          [--cache-dir DIR] [--prompt TEXT | --prompt-file FILE]
                          [--language English] [--max-window 28] [--pad 0.2]
                          [--threads 4] [--dry-run]

AUDIO.wav is 16 kHz mono 16-bit PCM (see README.md). The model hears at most about
30 s at a time, so the audio is cut into windows of at most --max-window seconds,
cut only at pauses: Whisper's segment boundaries when --segments names
whisper_transcribe.py's whisper.json, otherwise the speech segments that
faster-whisper's Silero VAD finds. Each window is padded by --pad seconds on both
sides, so a word at a cut can come out twice (once in each window).
--prompt is Qwen3-ASR's context (hotwords: names and terms); --language forces the
language, otherwise the model detects it and prefixes each window "language X<asr_text>".
Writes OUTDIR/chunks/cNNN.wav, OUTDIR/qwen.json (each window: start, end, raw output,
text without the language prefix) and OUTDIR/qwen.txt.
--dry-run writes only the windows' times and stops.
"""
import argparse, json, os, re, time, wave
import numpy as np

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("audio")
ap.add_argument("outdir")
ap.add_argument("--segments", default=None)
ap.add_argument("--model", default="Qwen/Qwen3-ASR-1.7B-hf")
ap.add_argument("--cache-dir", default=None)
g = ap.add_mutually_exclusive_group()
g.add_argument("--prompt", default=None)
g.add_argument("--prompt-file", default=None)
ap.add_argument("--language", default=None)
ap.add_argument("--max-window", type=float, default=28.0)
ap.add_argument("--pad", type=float, default=0.2)
ap.add_argument("--threads", type=int, default=4)
ap.add_argument("--dry-run", action="store_true")
a = ap.parse_args()
prompt = open(a.prompt_file, encoding="utf-8").read().strip() if a.prompt_file else a.prompt
os.makedirs(f"{a.outdir}/chunks", exist_ok=True)

w = wave.open(a.audio); sr = w.getframerate()
assert sr == 16000 and w.getnchannels() == 1 and w.getsampwidth() == 2, "need 16 kHz mono s16 wav"
pcm = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)

if a.segments:
    segs = [(s["start"], s["end"]) for s in json.load(open(a.segments, encoding="utf-8"))["segments"]]
else:
    from faster_whisper.vad import VadOptions, get_speech_timestamps
    vad = get_speech_timestamps(pcm.astype(np.float32) / 32768.0,
                                VadOptions(min_silence_duration_ms=300, speech_pad_ms=100,
                                           max_speech_duration_s=a.max_window), sampling_rate=sr)
    segs = [(v["start"] / sr, v["end"] / sr) for v in vad]

# windows of at most --max-window seconds, cut at segment boundaries (pauses)
wins, start, end = [], None, None
for s0, s1 in segs:
    if start is None: start = s0
    if s1 - start > a.max_window and end is not None:
        wins.append((start, end)); start = s0
    end = s1
if start is not None:
    wins.append((start, end))
if a.dry_run:
    for i, (s0, s1) in enumerate(wins):
        print(f"c{i:03d} {s0:8.2f} {s1:8.2f} {s1-s0:5.1f} s")
    raise SystemExit(0)

import torch
from transformers import AutoProcessor, AutoModelForMultimodalLM
t0 = time.time()
torch.set_num_threads(a.threads)
proc = AutoProcessor.from_pretrained(a.model, cache_dir=a.cache_dir)
model = AutoModelForMultimodalLM.from_pretrained(a.model, dtype=torch.float32, cache_dir=a.cache_dir)
out = []
with open(f"{a.outdir}/qwen.txt", "w", encoding="utf-8") as txt:
    for i, (s0, s1) in enumerate(wins):
        a0, b0 = max(0, s0 - a.pad), s1 + a.pad
        path = f"{a.outdir}/chunks/c{i:03d}.wav"
        with wave.open(path, "wb") as o:
            o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr)
            o.writeframes(pcm[int(a0*sr):int(b0*sr)].tobytes())
        inputs = proc.apply_transcription_request(audio=path, language=a.language, prompt=prompt)
        inputs = inputs.to(model.device, model.dtype)
        ids = model.generate(**inputs, max_new_tokens=512)
        raw = proc.batch_decode(ids[:, inputs["input_ids"].shape[1]:], skip_special_tokens=True)[0]
        text = re.sub(r"^language \w+<asr_text>", "", raw.strip())
        out.append({"start": s0, "end": s1, "raw": raw, "text": text})
        m, s = divmod(s0, 60)
        txt.write(f"[{int(m):02d}:{s:05.2f}] {text}\n"); txt.flush()
json.dump({"prompt": prompt, "language": a.language, "windows": out},
          open(f"{a.outdir}/qwen.json", "w", encoding="utf-8"), indent=1)
print(f"done in {time.time()-t0:.0f} s, {len(wins)} windows")
