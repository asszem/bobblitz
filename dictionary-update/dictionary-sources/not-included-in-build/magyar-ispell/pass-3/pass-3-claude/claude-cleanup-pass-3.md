# Dictionary Cleanup Pass 3 — Summary

Source file: `hu_HU-ispell-original.dic`

| Step | Action | Result |
|------|--------|--------|
| i11-1 | Strip `/` suffixes from each line | 91,061 lines had content stripped; 97,581 words total |
| i11-2 | Remove words with `-` or `.`; remove 1–2 letter words | 6,646 removed; 90,935 kept |
| i11-3 | Remove duplicates | 4,989 duplicates removed; 85,946 kept |
| i11-4 | Sort by letter count ascending, then alphabetically | 85,946 words sorted |
| i11-5 | Prepend X_ to invalid 3–4 letter words (incl. abbreviations) | 405 marked |

**Final output:** `hu_HU-ispell-original - pass3-final.dic` — **85,946 words**
