#!/usr/bin/env python3
import os

DICT_FILE = "hu_HU - ispell wordlist.dic"
OUTPUT_FILE = "hu_HU - ispell wordlist.dic.new"
INVALID_OUT = "hu_HU-3-4-letter-invalid-words.txt"

UPPER_HU = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÖŐÚÜŰ"

def is_acronym(base: str) -> bool:
    """Heuristic: treat as acronym if length 3–4, has >1 uppercase letter,
    and is not simple TitleCase (i.e. more than just initial capital).
    Handles Hungarian accented uppercase letters as well.
    """
    if not (3 <= len(base) <= 4):
        return False
    upper_count = sum(1 for c in base if c in UPPER_HU)
    # Title-case: first letter uppercase, rest strictly lowercase
    is_title = base[0] in UPPER_HU and base[1:].lower() == base[1:] and not any(
        c in UPPER_HU for c in base[1:]
    )
    return upper_count > 1 and not is_title

# First pass: rewrite dictionary, demoting acronym NX_ entries to XX_
changed_bases = []

with open(DICT_FILE, "r", encoding="utf-8") as inp, \
     open(OUTPUT_FILE, "w", encoding="utf-8") as out:
    for line in inp:
        s = line.rstrip("\n")
        word = s
        suffix = ""
        # If there are affix flags like word/AB, split them off
        if "/" in s:
            word, suffix = s.split("/", 1)
            suffix = "/" + suffix
        new_word = word
        if word.startswith("NX_"):
            base = word[3:]
            if is_acronym(base):
                new_word = "XX_" + base
                changed_bases.append(base)
        # no change for other prefixes
        out.write(new_word + suffix + "\n")

# Second pass: rebuild invalid-words list from updated dictionary
invalid_bases = set()
with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
    for line in f:
        s = line.rstrip("\n")
        word = s
        if "/" in s:
            word = s.split("/", 1)[0]
        base = None
        if word.startswith("XX_"):
            base = word[3:]
        elif word.startswith("X_") and not word.startswith("XX_"):
            base = word[2:]
        if base is None:
            continue
        if 3 <= len(base) <= 4:
            invalid_bases.add(base)

with open(INVALID_OUT, "w", encoding="utf-8") as f:
    for w in sorted(invalid_bases):
        f.write(w + "\n")

print(f"Updated dictionary written to {OUTPUT_FILE}")
print(f"Acronym NX_→XX_ changes for {len(changed_bases)} bases")
print(f"3–4 letter invalid bases now: {len(invalid_bases)} (written to {INVALID_OUT})")
