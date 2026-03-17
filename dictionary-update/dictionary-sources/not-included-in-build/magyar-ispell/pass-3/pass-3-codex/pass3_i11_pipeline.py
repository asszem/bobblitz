#!/usr/bin/env python3
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
ORIG = BASE_DIR / "hu_HU-ispell-original.dic"

STEP1_OUT = BASE_DIR / "hu_HU-pass3-step1-stripped.txt"
STEP2_KEEP = BASE_DIR / "hu_HU-pass3-step2-cleaned.txt"
STEP2_REM = BASE_DIR / "hu_HU-pass3-step2-removed.txt"
STEP3_KEEP = BASE_DIR / "hu_HU-pass3-step3-unique.txt"
STEP3_REM = BASE_DIR / "hu_HU-pass3-step3-duplicates.txt"
STEP4_OUT = BASE_DIR / "hu_HU-pass3-step4-sorted.txt"
STEP5_OUT = BASE_DIR / "hu_HU-pass3-step5-annotated.txt"
STEP5_MARKED = BASE_DIR / "hu_HU-pass3-step5-marked.txt"
INVALID_3_4_LIST = BASE_DIR / "hu_HU-3-4-letter-invalid-words.txt"

summary_lines = []

# i11-1: strip everything from '/' onwards
step1_in_lines = 0
with ORIG.open("r", encoding="utf-8") as inp, STEP1_OUT.open("w", encoding="utf-8") as out:
    for line in inp:
        step1_in_lines += 1
        s = line.rstrip("\n")
        idx = s.find("/")
        if idx != -1:
            s = s[:idx]
        out.write(s + "\n")

summary_lines.append(f"i11-1: stripped '/' and everything after on {step1_in_lines} lines -> {STEP1_OUT.name}")

# i11-2: remove words containing '-' or '.'; remove 1-2 letter words
removed2 = 0
kept2 = 0
with STEP1_OUT.open("r", encoding="utf-8") as inp, \
     STEP2_KEEP.open("w", encoding="utf-8") as keep, \
     STEP2_REM.open("w", encoding="utf-8") as rem:
    for line in inp:
        s = line.rstrip("\n")
        s_strip = s.strip()
        # criterion: contains '-' or '.', or length <=2 (by characters)
        if "-" in s or "." in s or len(s_strip) <= 2:
            rem.write(s + "\n")
            removed2 += 1
        else:
            keep.write(s + "\n")
            kept2 += 1

summary_lines.append(
    f"i11-2: removed {removed2} items with '-' or '.' or length<=2 -> {STEP2_REM.name}; kept {kept2} -> {STEP2_KEEP.name}"
)

# i11-3: remove duplicate words
seen = set()
removed3 = 0
kept3 = 0
with STEP2_KEEP.open("r", encoding="utf-8") as inp, \
     STEP3_KEEP.open("w", encoding="utf-8") as keep, \
     STEP3_REM.open("w", encoding="utf-8") as rem:
    for line in inp:
        s = line.rstrip("\n")
        if s in seen:
            rem.write(s + "\n")
            removed3 += 1
        else:
            seen.add(s)
            keep.write(s + "\n")
            kept3 += 1

summary_lines.append(
    f"i11-3: removed {removed3} duplicate occurrences -> {STEP3_REM.name}; unique words: {kept3} -> {STEP3_KEEP.name}"
)

# i11-4: order by letter count ascending, then alphabetically
with STEP3_KEEP.open("r", encoding="utf-8") as inp:
    words = [line.rstrip("\n") for line in inp]

words_sorted = sorted(words, key=lambda w: (len(w), w))

with STEP4_OUT.open("w", encoding="utf-8") as out:
    for w in words_sorted:
        out.write(w + "\n")

summary_lines.append(
    f"i11-4: sorted {len(words_sorted)} unique words by length then alphabetically -> {STEP4_OUT.name}"
)

# i11-5: prepend X_ to every 3–4 letter word that is not a valid Hungarian word
# For this pass we treat as invalid:
#   - anything whose base is listed in hu_HU-3-4-letter-invalid-words.txt (existing review), OR
#   - 3–4 char tokens containing digits, OR
#   - 3–4 char tokens with at least 2 uppercase letters (acronym-like).

invalid_seed = set()
if INVALID_3_4_LIST.exists():
    with INVALID_3_4_LIST.open("r", encoding="utf-8") as f:
        for line in f:
            w = line.strip()
            if w:
                invalid_seed.add(w)

marked_bases = []

with STEP4_OUT.open("r", encoding="utf-8") as inp, \
     STEP5_OUT.open("w", encoding="utf-8") as out, \
     STEP5_MARKED.open("w", encoding="utf-8") as marked:
    for line in inp:
        s = line.rstrip("\n")
        base = s
        L = len(base)
        new_word = base
        if 3 <= L <= 4:
            invalid = False
            if base in invalid_seed:
                invalid = True
            else:
                has_digit = any(ch.isdigit() for ch in base)
                upper_count = sum(1 for ch in base if ch.isupper())
                if has_digit or upper_count >= 2:
                    invalid = True
            if invalid:
                new_word = "X_" + base
                marked_bases.append(base)
                marked.write(new_word + "\n")
        out.write(new_word + "\n")

summary_lines.append(
    f"i11-5: marked {len(marked_bases)} 3–4 letter words as invalid (X_ prefix) -> {STEP5_OUT.name}; list of marked: {STEP5_MARKED.name}"
)

# i11-6: write summary markdown
summary_path = BASE_DIR / "codex-cleanup-pass-3.md"
with summary_path.open("w", encoding="utf-8") as f:
    f.write("# Codex cleanup pass 3 (test i11)\n\n")
    for line in summary_lines:
        f.write(f"- {line}\n")

print("Pass 3 pipeline complete.")
for line in summary_lines:
    print(line)
