import json
import os
import re

# We will generate 9 topics, 4 branches each, exactly 25 words per branch = 100 words per topic (900 words total).
# Branch 1 (A1/A2): 25 words - Basic beginner terms
# Branch 2 (A2/B1): 25 words - Daily communication terms
#   ==> Total 50 beginner/easy words
# Branch 3 (B1/B2): 25 words - Intermediate & domain concepts
# Branch 4 (B2/C1): 25 words - Advanced & professional mastery
#   ==> Total 50 progressively harder words

from dataset_topics import all_topics, categories

print(f"Total topics: {len(all_topics)}")
total_words = 0
for t in all_topics:
    topic_words = sum(len(b["words"]) for b in t["branches"])
    print(f"Topic {t['nameEn']}: {topic_words} words across {len(t['branches'])} branches")
    total_words += topic_words

print(f"TOTAL DATASET WORDS: {total_words}")
