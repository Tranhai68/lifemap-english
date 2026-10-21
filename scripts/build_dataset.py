import json
import re

# Helper to format words
def mk(word, ipa, pos, vi, ex, cefr):
    return {
        "word": word,
        "ipa": ipa,
        "pos": pos,
        "vi": vi,
        "ex": ex,
        "cefr": cefr
    }

print("Builder ready")
