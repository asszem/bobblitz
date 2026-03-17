# Codex cleanup pass 3 (test i11)

- i11-1: stripped '/' and everything after on 97582 lines -> hu_HU-pass3-step1-stripped.txt
- i11-2: removed 6346 items with '-' or '.' or length<=2 -> hu_HU-pass3-step2-removed.txt; kept 91236 -> hu_HU-pass3-step2-cleaned.txt
- i11-3: removed 4644 duplicate occurrences -> hu_HU-pass3-step3-duplicates.txt; unique words: 86592 -> hu_HU-pass3-step3-unique.txt
- i11-4: sorted 86592 unique words by length then alphabetically -> hu_HU-pass3-step4-sorted.txt
- i11-5: marked 26 3–4 letter words as invalid (X_ prefix) -> hu_HU-pass3-step5-annotated.txt; list of marked: hu_HU-pass3-step5-marked.txt
