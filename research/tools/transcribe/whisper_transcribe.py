"""Transcribe a talk with Whisper large-v3 (faster-whisper, CPU, int8).

usage: whisper_transcribe.py AUDIO.wav OUTDIR [--prompt TEXT | --prompt-file FILE]
                             [--model large-v3] [--model-dir DIR] [--language en]
                             [--beam 5] [--threads 4] [--no-vad]

AUDIO.wav is 16 kHz mono 16-bit PCM (see README.md for the ffmpeg line).
Writes OUTDIR/whisper.json (segments with word timestamps and probabilities),
whisper.txt (one timed line per segment) and whisper.srt.
The prompt is Whisper's initial prompt: the talk's title, the speakers' names and
the paper's terms, which bias the spelling of names and terms.
"""
import argparse, json, os, time, wave
import numpy as np
from faster_whisper import WhisperModel

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("audio")
ap.add_argument("outdir")
g = ap.add_mutually_exclusive_group()
g.add_argument("--prompt", default=None)
g.add_argument("--prompt-file", default=None)
ap.add_argument("--model", default="large-v3")
ap.add_argument("--model-dir", default=None, help="download root for the model (default: the Hugging Face cache)")
ap.add_argument("--language", default="en")
ap.add_argument("--beam", type=int, default=5)
ap.add_argument("--threads", type=int, default=4)
ap.add_argument("--no-vad", action="store_true")
a = ap.parse_args()
prompt = open(a.prompt_file, encoding="utf-8").read().strip() if a.prompt_file else a.prompt
os.makedirs(a.outdir, exist_ok=True)

t0 = time.time()
model = WhisperModel(a.model, device="cpu", compute_type="int8", cpu_threads=a.threads,
                     download_root=a.model_dir)
w = wave.open(a.audio)
assert w.getframerate() == 16000 and w.getnchannels() == 1 and w.getsampwidth() == 2, "need 16 kHz mono s16 wav"
pcm = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
segs, info = model.transcribe(pcm, language=a.language, beam_size=a.beam, initial_prompt=prompt,
                              word_timestamps=True, vad_filter=not a.no_vad,
                              condition_on_previous_text=True)

def ts(x):
    h, r = divmod(x, 3600); m, s = divmod(r, 60)
    return f"{int(h):02d}:{int(m):02d}:{s:06.3f}".replace(".", ",")

out = []
with open(f"{a.outdir}/whisper.txt", "w", encoding="utf-8") as txt, \
     open(f"{a.outdir}/whisper.srt", "w", encoding="utf-8") as srt:
    for i, s in enumerate(segs, 1):
        out.append({"start": s.start, "end": s.end, "text": s.text, "avg_logprob": s.avg_logprob,
                    "no_speech_prob": s.no_speech_prob,
                    "words": [{"w": x.word, "s": x.start, "e": x.end, "p": x.probability} for x in (s.words or [])]})
        txt.write(f"[{ts(s.start)}] {s.text.strip()}\n"); txt.flush()
        srt.write(f"{i}\n{ts(s.start)} --> {ts(s.end)}\n{s.text.strip()}\n\n")
json.dump({"info": {"language": info.language, "duration": info.duration, "prompt": prompt},
           "segments": out}, open(f"{a.outdir}/whisper.json", "w", encoding="utf-8"), indent=1)
print(f"done in {time.time()-t0:.0f} s, {len(out)} segments")
