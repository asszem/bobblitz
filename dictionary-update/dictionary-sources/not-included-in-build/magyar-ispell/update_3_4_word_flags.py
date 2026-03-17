#!/usr/bin/env python3
import os

DICT_FILE = "hu_HU - ispell wordlist.dic"
OUTPUT_FILE = "hu_HU - ispell wordlist.dic.new"
INVALID_OUT = "hu_HU-3-4-letter-invalid-words.txt"

# Words that were previously marked with X_ that we consider VALID Hungarian
nx_bases = {
    "ABC", "BKV", "BME", "BNV", "BTK", "BÉT", "CBA", "CEU",
    "DNy", "EKG", "FHB", "FVM", "FÁK", "HVG", "HÉV", "HÖK",
    "KSH", "KÖM", "LGT", "LMP", "MDF", "MEK", "MNB", "MOB", "MOL",
    "MR1", "MR2", "MR3", "MR4", "MR5", "MÁV", "MÉH", "NAT", "NAV",
    "NDK", "NER", "NOB", "OBH", "OEP", "OKJ", "OTP", "PTE", "RNS",
    "SZU", "TBC", "TDK", "TGM", "TIT", "TTK", "TV2", "TVK", "UHU",
    "URH", "VIT",
    "eho", "gmk", "hmm", "jen", "jón", "kkv", "lej", "luc", "meó",
    "miá", "ovi", "tbc", "dkg", "ÁPV", "ÁSZ", "ÁVH", "ÁVO", "ÉNy",
    "ÜHG", "ühg",
    "APEH", "Anna", "BRFK", "BVSC", "Bill", "BÚÉK", "EHÖK", "ELTE",
    "ENSZ", "Emma", "FKGP", "GATE", "GYIK", "JATE", "JPTE", "John",
    "Juan", "KDNP", "KFKI", "KGST", "KHVM", "KISZ", "KLTE", "Karl",
    "LMBT", "Lisa", "MDNP", "MIÉP", "MLSZ", "MOKK", "MSZP", "Mary",
    "NKÖM", "NSZK", "Nick", "OKTV", "ORFK", "ORTT", "OSZK", "OTKA",
    "OVSZ", "Paul", "Rita", "SOTE", "SZOT", "SZTE",
}

# New 3-4 letter words (without X_ prefix) that we consider NON‑Hungarian and want to mark
new_invalid_bases = {
    "Dux", "New", "Sax", "Wix", "Xen", "Xgl", "Aiwa", "Wizz", "Word",
}

# Process dictionary
invalid_words = []

with open(DICT_FILE, "r", encoding="utf-8") as inp, \
     open(OUTPUT_FILE, "w", encoding="utf-8") as out:
    for line in inp:
        s = line.rstrip("\n")
        new = s
        if s.startswith("X_"):
            base = s[2:]
            if base in nx_bases:
                new = "NX_" + base
            else:
                new = "XX_" + base
                invalid_words.append(base)
        else:
            if s in new_invalid_bases:
                new = "X_" + s
                invalid_words.append(s)
        out.write(new + "\n")

# Write invalid-word list (one base form per line)
with open(INVALID_OUT, "w", encoding="utf-8") as f:
    for w in sorted(set(invalid_words)):
        f.write(w + "\n")

print(f"Updated dictionary written to {OUTPUT_FILE}")
print(f"Marked {len(invalid_words)} 3–4 letter items as non‑Hungarian (see {INVALID_OUT})")
