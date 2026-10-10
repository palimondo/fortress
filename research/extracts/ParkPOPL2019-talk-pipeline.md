<!-- How ParkPOPL2019-talk.md was made: the talk's audio, the two speech models and their settings, and how their transcripts were aligned and their disagreements settled. The scripts and the two models' scores are in research/tools/transcribe/. -->

# How the talk's transcript was made

## The audio

The curator downloaded the ACM video of the talk, `a11-park.webm`, and cut its audio with ffmpeg: `ffmpeg -i a11-park.webm -vn -ac 1 -c:a aac -b:a 48k talk.m4a`. It runs 21 min 54 s. For the models it was decoded by ffmpeg to 16 kHz mono 16-bit WAV. Both files stay uncommitted, in `research/decks/popl2019-park-talk/audio/` and the gitignored `tmp/`. YouTube's captions were not used.

## The two models

- **Whisper large-v3**, through faster-whisper 1.2.1 on CTranslate2 4.8.2: CPU, int8, 4 threads, beam 5, Silero VAD on, word timestamps, conditioned on the previous text, language English. Its initial prompt named the paper's title, the four authors, KAIST and Oracle Labs, and the paper's terms: "Fortress, Julia, FGFV, symmetric multiple dispatch, asymmetric dispatch, overloading, overloaded method declarations, covariant, contravariant, invariant, variance, type parameters, existential types, universal types, No Duplicates Rule, Meet Rule, Return Type Rule, most specific, subtype, List, SortedList, type soundness". It took 1,439 s and gave 356 segments.
- **Qwen3-ASR-1.7B**, the transformers port `Qwen/Qwen3-ASR-1.7B-hf` (transformers 5.19.0, torch 2.14.1): CPU, float32, 4 threads, no prompt, language detected by the model. It hears about 30 s at a time, so the audio was cut into 49 windows of up to 28 s at Whisper's segment boundaries, each padded by 0.2 s on both sides. It took 803 s.

Both times are wall-clock on the cloud container's 4 cores, one run each, model loading included.

## Alignment

Each model's text was normalized: case and punctuation dropped, CamelCase split, hyphens split, numerals spelled out, um and uh dropped, and a few spellings merged, such as "run time" and "runtime". Qwen's "language English<asr_text>" prefix was stripped from each window. Python's difflib then aligned the two word sequences. They differ in 82 places.

## How disagreements were settled

Where the two models agree, the transcript takes their words. Each of the 82 differences was settled in one of these ways.

- The paper's names and terms, 16: the authors' names, "variance" against "variants", "Featherweight" and "FGFV", "type-sound", "quantified over the method type parameters".
- The slides, 11: "List List, List SortedList, and SortedList List", "List P", "SortedList C", "contravariant", "overloaded method declarations", "No Duplicates Rule", "invariant SortedList".
- The sense of the sentence, 13, often by the speaker's own wording elsewhere in the talk: "tasks" against "tests", "roles" against "rules", "a valid set" as at 5:03.
- The transcript's rule on disfluency, 15: it drops um and uh, a word said twice in a row, and the first try of a phrase that the speaker at once starts again ("both the call, both the methods" becomes "both the methods"). It keeps every other word, "yeah" and "okay" included.
- Qwen's window overlap, 17: a word at a cut fell in the padding of both windows and came out twice.
- Doubtful, 10: neither the slides, the paper nor the sense settles them. They are marked inline, `[yeah?]` for a word that only one model heard and `[prove/proved?]` for two readings.

Two passages of Whisper's have no speech under them. "Okay. Let's take a look at the first one." (11:21) is nine words in about one second where Qwen heard nothing. At 12:20 it repeated "so this rule is to rule out the trivial cases", with zero-length word timestamps, over "quantified over the method type parameters", which Qwen heard and the paper's domain types confirm.

No one listened to the audio. Neither model tells speakers apart, so the speaker labels follow the turns of the talk.

## The slides

The slides' text comes from the speaker's Keynote deck, attached to the talk page and kept uncommitted in `research/decks/popl2019-park-talk/`. The text boxes were read from the deck's files. The code and the formulas are pictures in the deck, and were read by eye against the deck's image of each slide. The pictures of the overloading rules hold more rules than the slides show: Keynote crops [No-Dup-Triv], [Meet-Triv], [Meet-Excl], [Return-Triv] and [Return-Not-Less] out of view.

## The scripts

`research/tools/transcribe/`: `whisper_transcribe.py` and `qwen_transcribe.py` made the two transcripts, and `compare.py` lists the disagreements and scores each model against this transcript. Its `README.md` gives the commands and the two models' head-to-head on this talk.
