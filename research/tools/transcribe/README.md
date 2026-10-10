# Transcribing a talk with two speech models

Three scripts that turn a talk's audio into a checked transcript. Two speech models transcribe the audio, `compare.py` lists where they disagree, and a person or an agent settles each disagreement against the slides and the paper. `compare.py` then scores each model against the settled transcript. They made `research/extracts/ParkPOPL2019-talk.md`, and `research/extracts/ParkPOPL2019-talk-pipeline.md` says how.

- `whisper_transcribe.py`: Whisper large-v3 through faster-whisper, on the CPU, int8.
- `qwen_transcribe.py`: Qwen3-ASR-1.7B through transformers, on the CPU, float32.
- `compare.py`: `diff` lists the two transcripts' disagreements, and `score` gives each model's word error rate against a reference.

## Getting the audio

Take the talk's video, for example the ACM video of a conference talk, and cut its audio with ffmpeg. Then decode it to the 16 kHz mono 16-bit WAV that both scripts read:

    ffmpeg -i talk.webm -vn -ac 1 -c:a aac -b:a 48k talk.m4a
    ffmpeg -i talk.m4a -ac 1 -ar 16000 -c:a pcm_s16le tmp/asr/talk16k.wav

Keep audio and video out of git, in `research/decks/` or `tmp/`. For the POPL 2019 talk, the curator downloaded the ACM video, `a11-park.webm`, and ran the first line on his own device.

## Installing

    python3 -m venv tmp/asr-venv
    tmp/asr-venv/bin/pip install faster-whisper transformers torch

The runs here used Python 3.13, faster-whisper 1.2.1, CTranslate2 4.8.2, transformers 5.19.0 and torch 2.14.1. Each model downloads on first use from Hugging Face: `Systran/faster-whisper-large-v3`, about 3 GB, and `Qwen/Qwen3-ASR-1.7B-hf`, about 4 GB. Give each a folder under `tmp/` so that the downloads stay out of git.

## Running

Whisper first. Its prompt names the talk's title, the speakers and the paper's terms, which biases how it spells them:

    tmp/asr-venv/bin/python -I research/tools/transcribe/whisper_transcribe.py \
        tmp/asr/talk16k.wav tmp/asr/out --model-dir tmp/asr/models --prompt-file tmp/asr/prompt.txt

It writes `whisper.json` (segments, word timestamps, word probabilities), `whisper.txt` and `whisper.srt`.

Then Qwen3-ASR. It hears about 30 s at a time, so the script cuts the audio into windows of at most 28 s at pauses. With `--segments` it cuts at Whisper's segment boundaries, as here; without it, at the pauses that faster-whisper's Silero VAD finds. `--prompt` or `--prompt-file` gives the model the same names and terms, and `--language English` skips its language detection:

    tmp/asr-venv/bin/python -I research/tools/transcribe/qwen_transcribe.py \
        tmp/asr/talk16k.wav tmp/asr/out --segments tmp/asr/out/whisper.json \
        --cache-dir tmp/asr/models --prompt-file tmp/asr/prompt.txt

It writes `qwen.json`, `qwen.txt` and each window's audio under `chunks/`. `--dry-run` prints the windows and stops.

Then the comparison, with the standard library only:

    python3 -I research/tools/transcribe/compare.py diff tmp/asr/out/whisper.json tmp/asr/out/qwen.json
    python3 -I research/tools/transcribe/compare.py score REFERENCE.md tmp/asr/out/whisper.json tmp/asr/out/qwen.json

The reference is the settled transcript in the form of `ParkPOPL2019-talk.md`: speech in plain paragraphs, slides in blockquotes, `[word?]` and `[one/other?]` for doubtful words.

## Time taken here

On the cloud container's 4 cores (Intel Xeon, 2.1 GHz, 16 GB), one run each, wall-clock with model loading, for 21.9 minutes of audio:

- Whisper large-v3: 1,439 s, 1.10 times the audio's length.
- Qwen3-ASR-1.7B: 803 s, 0.61 times the audio's length.

## Head-to-head on the POPL 2019 talk

Gyunghee Park's talk "Polymorphic Symmetric Multiple Dispatch with Variance", 2,488 words of reference speech, one speaker of English as a second language, two questioners and a session chair. Whisper ran with a prompt of the paper's title, authors and terms (quoted in `research/extracts/ParkPOPL2019-talk-pipeline.md`); Qwen ran with no prompt.

The error rate counts substitutions S, deletions D and insertions I against the reference, on text with case, punctuation, numerals and um/uh normalized away in all three.

| | Whisper large-v3 | Qwen3-ASR-1.7B |
|---|---|---|
| Word error rate | 2.29% (57) | 3.09% (77) |
| S / D / I | 18 / 0 / 39 | 28 / 3 / 46 |
| Errors on the authors' names | 0 | 7 |
| Errors on the paper's terms | 18 | 32 |
| Errors on other content words | 12 | 10 |
| Errors on function words | 27 | 28 |

The paper's terms are its vocabulary and notation spoken as words: variance and its three kinds, FGFV and its expansion, the rule names, existential, quantified, type-sound, overloading, dispatch, method, List, SortedList, k, g, d1. Function words are articles, prepositions, pronouns, conjunctions, do, have, be, and yeah, okay and so.

By cause:

| | Whisper | Qwen |
|---|---|---|
| Misheard | 22 (terms 13, content 3, function 6) | 32 (names 7, terms 20, content 3, function 2) |
| Invented: words with no speech under them | 20 | 0 |
| Stammers and restarts written out, which the reference drops | 15 | 26 |
| A word repeated across a cut between windows | 0 | 19 |
| Error rate without the last two rows | 1.69% (42) | 1.29% (32) |

Whisper invented two passages. "Okay. Let's take a look at the first one." is nine words in about one second where Qwen heard nothing. At 12:20 it repeated a phrase from 18 s before, "so this rule is to rule out the trivial cases", over "quantified over the method type parameters", which it lost. Both read as plausible speech; only the alignment with Qwen showed them. Qwen misheard the names ("Youngmi Park", "Geistil" for Guy Steele), "variance" as "variants" six times, and "Featherweight" as "Federated". Whisper, prompted, got the names and "variance" right, but heard "Federate" for "Featherweight", which its prompt lacked, and "FGFE" once for "FGFV".

The confounds:

- Whisper had the paper's terms and the authors' names as its prompt, and Qwen had none. Most of Qwen's misheard words are words the prompt names. On the talk's first 31 s, a later run of Qwen with the same prompt fixed 7 of its 9 errors there, all but "Gyunghee", heard twice as "Youngmi".
- Qwen's windows were cut at Whisper's pauses, from Whisper's segments, and padded 0.2 s on both sides, so 19 of its errors are words heard twice at a cut. Qwen did not run on its own.
- The reference is built partly from the two models' words: where they agree, it takes their words. So it favours where they agree, and an error that both make does not count. Both heard "different names of parameters", where the slide's methods differ in the number of parameters, and "a language with symmetry multiple dispatch".
- The reference drops stammers and restarts. Qwen writes them out more faithfully, and is charged 26 insertions for them against Whisper's 15.
- One talk, one run each.

## Which to use next time

Run both and align them. Make Qwen3-ASR the main reading, with a prompt of the talk's names and terms, and Whisper large-v3 the second. Qwen misheard fewer words without any prompt, invented none, and ran in 0.61 times the audio's length against Whisper's 1.10. Its weak spot, names and terms, is what the prompt fixes. Whisper's invented passages look like speech, and only a second model exposes them. If only one model can run, use Qwen3-ASR with the prompt.
