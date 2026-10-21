import json
import os

from full_topics_data import topics_data, categories

mindmapNodesList = []
vocabulariesList = []
quizQuestionsList = []
topicsList = []

print(f"Loaded {len(topics_data)} topics.")

total_words = 0
for t in topics_data:
    branch_count = len(t["branches"])
    word_count = sum(len(b["words"]) for b in t["branches"])
    total_words += word_count
    print(f"Topic: {t['nameEn']} -> {word_count} words across {branch_count} branches")
    
    topicsList.append({
        "id": t["id"],
        "categoryId": t["categoryId"],
        "nameEn": t["nameEn"],
        "nameVi": t["nameVi"],
        "description": t["description"],
        "coverImage": t["coverImage"],
        "cefrRange": t["cefrRange"],
        "status": t["status"],
        "progress": t["progress"],
        "branchCount": branch_count,
        "wordCount": word_count,
        "featured": True,
    })

    rootNodeId = f"root-{t['id']}"
    mindmapNodesList.append({
        "id": rootNodeId,
        "topicId": t["id"],
        "level": 0,
        "label": t["nameEn"].split("&")[0].strip(),
        "labelVi": t["nameVi"].split("&")[0].strip(),
        "color": "#10B981",
        "icon": "Sparkles",
        "order": 0,
        "isExpanded": True,
    })

    for bIdx, b in enumerate(t["branches"]):
        branchNodeId = b["id"]
        mindmapNodesList.append({
            "id": branchNodeId,
            "topicId": t["id"],
            "parentId": rootNodeId,
            "level": 1,
            "label": b["label"],
            "labelVi": b["labelVi"],
            "color": b["color"],
            "icon": "Layers",
            "order": bIdx + 1,
            "isExpanded": True,
        })

        for wIdx, (w_word, w_ipa, w_pos, w_vi, w_ex, w_cefr) in enumerate(b["words"]):
            vocabId = f"vocab-{t['id']}-{bIdx}-{wIdx}-{re.sub(r'[^a-z0-9]', '', w_word.lower())}"
            wordNodeId = f"node-{t['id']}-{bIdx}-{wIdx}"
            
            pos_map = {
                "adj": "adjective",
                "noun": "noun",
                "verb": "verb",
                "adv": "adverb"
            }
            full_pos = pos_map.get(w_pos, "noun")

            mindmapNodesList.append({
                "id": wordNodeId,
                "topicId": t["id"],
                "parentId": branchNodeId,
                "level": 2,
                "label": w_word,
                "labelVi": w_vi,
                "vocabularyId": vocabId,
                "order": wIdx + 1,
            })

            vocabulariesList.append({
                "id": vocabId,
                "topicId": t["id"],
                "branchId": branchNodeId,
                "word": w_word,
                "ipa": w_ipa,
                "partOfSpeech": full_pos,
                "meaningVi": w_vi,
                "definitionEn": f"Essential vocabulary related to {b['label'].lower()}.",
                "cefr": w_cefr,
                "context": {
                    "examples": [
                        {
                            "en": w_ex,
                            "vi": f"{w_vi} trong câu ngữ cảnh thực tế."
                        }
                    ],
                    "collocations": [
                        f"basic {w_word.lower()}",
                        f"daily {w_word.lower()}",
                        f"use {w_word.lower()}"
                    ],
                    "synonyms": [w_word.lower()]
                },
                "status": "mastered" if wIdx % 3 == 0 else "review_due" if wIdx % 4 == 0 else "learning",
                "masteryScore": 75 + (wIdx * 7) % 25,
                "isFavorite": (wIdx == 0 or wIdx == 2),
                "nextReviewDate": "2026-10-22"
            })

            # Add quiz question for every 2nd word
            if wIdx % 2 == 0:
                quizQuestionsList.append({
                    "id": f"q-{vocabId}",
                    "topicId": t["id"],
                    "branchId": branchNodeId,
                    "vocabularyId": vocabId,
                    "type": "choice_meaning",
                    "prompt": f'Nghĩa tiếng Việt của từ "{w_word}" ({w_ipa}) là gì?',
                    "targetWord": w_word,
                    "audioText": w_word,
                    "options": [
                        w_vi,
                        "Quy trình kiểm soát không cần thiết",
                        "Sự trì hoãn ngoài dự kiến",
                        "Dấu hiệu suy giảm năng lực"
                    ],
                    "correctAnswer": w_vi,
                    "explanation": f'"{w_word}" có nghĩa là: {w_vi}. Ví dụ: {w_ex}',
                    "difficulty": w_cefr
                })

print(f"TOTAL PROCESSED WORDS: {total_words}")
print(f"Total nodes: {len(mindmapNodesList)}")
print(f"Total quiz questions: {len(quizQuestionsList)}")

# Write to TypeScript file
ts_content = f"""import {{ Category, Topic, MindmapNode, Vocabulary, QuizQuestion, UserProfile }} from '../types';

export const initialCategories: Category[] = {json.dumps(categories, ensure_ascii=False, indent=2)};

export const initialTopics: Topic[] = {json.dumps(topicsList, ensure_ascii=False, indent=2)};

export const initialMindmapNodes: MindmapNode[] = {json.dumps(mindmapNodesList, ensure_ascii=False, indent=2)};

export const initialVocabularies: Vocabulary[] = {json.dumps(vocabulariesList, ensure_ascii=False, indent=2)};

export const initialQuestions: QuizQuestion[] = {json.dumps(quizQuestionsList, ensure_ascii=False, indent=2)};

export const initialQuizQuestions = initialQuestions;

export const initialProfile: UserProfile = {{
  name: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  currentLevel: 'B1',
  targetGoal: 'Giao tiếp công việc & Xem phim không phụ đề',
  dailyMinutes: 20,
  favoriteCategoryIds: ['business', 'marketing', 'fitness', 'technology'],
  streakDays: 7,
  lastActiveDate: '2026-10-21',
  isOnboarded: true,
}};

export const initialUserProfile = initialProfile;
"""

with open("src/data/initialData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Successfully wrote src/data/initialData.ts with 900 words!")
