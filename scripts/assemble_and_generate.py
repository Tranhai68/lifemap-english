import sys
import json
import re

from topics_biz_mkt_fit import TOPIC_BIZ, TOPIC_MKT, TOPIC_FIT
from topics_hlth_cook_house import TOPIC_HLTH, TOPIC_COOK, TOPIC_HOUSE
from topics_wild_trv_tech import TOPIC_WILD, TOPIC_TRV, TOPIC_TECH

all_topics_data = [
    TOPIC_BIZ,
    TOPIC_MKT,
    TOPIC_FIT,
    TOPIC_HLTH,
    TOPIC_COOK,
    TOPIC_HOUSE,
    TOPIC_WILD,
    TOPIC_TRV,
    TOPIC_TECH
]

categories = [
  {
    "id": "business",
    "nameEn": "Business & Commerce",
    "nameVi": "Kinh doanh & Thương mại",
    "description": "Chiến lược, khởi nghiệp, tài chính và đàm phán thương mại.",
    "icon": "Briefcase",
    "color": "#DEDBC8",
    "order": 1
  },
  {
    "id": "marketing",
    "nameEn": "Marketing & Growth",
    "nameVi": "Marketing & Tăng trưởng số",
    "description": "Branding, chuyển đổi, quảng cáo số và tiếp thị nội dung.",
    "icon": "TrendingUp",
    "color": "#38BDF8",
    "order": 2
  },
  {
    "id": "fitness",
    "nameEn": "Fitness & Physical Power",
    "nameVi": "Thể hình & Rèn luyện Thể lực",
    "description": "Tập luyện cường độ, cơ bắp, sức bền và dinh dưỡng thể thao.",
    "icon": "Dumbbell",
    "color": "#10B981",
    "order": 3
  },
  {
    "id": "wellness",
    "nameEn": "Health & Medical Wellness",
    "nameVi": "Chăm sóc Sức khỏe & Y tế",
    "description": "Thói quen lành mạnh, giấc ngủ, kiểm soát căng thẳng và sơ cứu.",
    "icon": "HeartPulse",
    "color": "#FB7185",
    "order": 4
  },
  {
    "id": "culinary",
    "nameEn": "Culinary Arts & Cooking",
    "nameVi": "Ẩm thực & Nghệ thuật Nấu nướng",
    "description": "Kỹ thuật chế biến, gia vị, hương vị và văn hóa thưởng thức.",
    "icon": "Utensils",
    "color": "#F59E0B",
    "order": 5
  },
  {
    "id": "household",
    "nameEn": "Household & Daily Objects",
    "nameVi": "Đồ vật & Đời sống Thường nhật",
    "description": "Thiết bị gia đình, đồ nội thất và đồ dùng thông minh hằng ngày.",
    "icon": "Home",
    "color": "#A78BFA",
    "order": 6
  },
  {
    "id": "nature",
    "nameEn": "Wildlife & Living Ecosystems",
    "nameVi": "Động vật Hoang dã & Thiên nhiên",
    "description": "Hệ sinh thái, tập tính động vật và bảo tồn môi trường tự nhiên.",
    "icon": "Trees",
    "color": "#34D399",
    "order": 7
  },
  {
    "id": "travel",
    "nameEn": "Global World & Travel",
    "nameVi": "Du lịch Toàn cầu & Khám phá",
    "description": "Hành trình khám phá, văn hóa thế giới và giao thông vận tải.",
    "icon": "Compass",
    "color": "#60A5FA",
    "order": 8
  },
  {
    "id": "tech",
    "nameEn": "Tech, AI & Future Worlds",
    "nameVi": "Công nghệ số, AI & Tương lai",
    "description": "Trí tuệ nhân tạo, lập trình phần mềm, thiết bị tương lai.",
    "icon": "Cpu",
    "color": "#F472B6",
    "order": 9
  }
]

topics_meta = [
  {
    "id": "topic-business-strategy",
    "categoryId": "business",
    "nameEn": "Executive Strategy & Venture Growth",
    "nameVi": "Chiến lược Doanh nghiệp & Khởi nghiệp",
    "description": "Từ vựng từ văn phòng cơ bản, buôn bán hằng ngày đến gọi vốn và đàm phán cấp cao.",
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 75,
    "branchCount": 4,
    "wordCount": 100,
    "featured": True
  },
  {
    "id": "topic-digital-marketing",
    "categoryId": "marketing",
    "nameEn": "Digital Marketing & Conversion Funnels",
    "nameVi": "Marketing Kỹ thuật số & Phễu Chuyển đổi",
    "description": "Từ vựng quảng cáo cơ bản, mạng xã hội đến phễu chuyển đổi số và định vị thương hiệu.",
    "coverImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 68,
    "branchCount": 4,
    "wordCount": 100,
    "featured": True
  },
  {
    "id": "topic-gym-fitness",
    "categoryId": "fitness",
    "nameEn": "Fitness & Physical Power",
    "nameVi": "Thể hình & Rèn luyện Thể lực",
    "description": "Vận động cơ bản, bài tập thể thao đến sức bền cơ bắp và phục hồi sinh cơ học.",
    "coverImage": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 82,
    "branchCount": 4,
    "wordCount": 100,
    "featured": True
  },
  {
    "id": "topic-health-wellness",
    "categoryId": "wellness",
    "nameEn": "Health & Medical Wellness",
    "nameVi": "Chăm sóc Sức khỏe & Y tế",
    "description": "Triệu chứng thông thường, chăm sóc hằng ngày đến y học phòng ngừa và lâm sàng.",
    "coverImage": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 60,
    "branchCount": 4,
    "wordCount": 100,
    "featured": False
  },
  {
    "id": "topic-culinary-mastery",
    "categoryId": "culinary",
    "nameEn": "Culinary Arts & Cooking",
    "nameVi": "Ẩm thực & Nghệ thuật Nấu nướng",
    "description": "Nhà bếp cơ bản, nguyên liệu hằng ngày đến kỹ thuật chế biến và ẩm thực đỉnh cao.",
    "coverImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 70,
    "branchCount": 4,
    "wordCount": 100,
    "featured": False
  },
  {
    "id": "topic-household-modern",
    "categoryId": "household",
    "nameEn": "Household & Daily Objects",
    "nameVi": "Đồ vật & Đời sống Thường nhật",
    "description": "Đồ dùng gia đình đơn giản, phòng ốc đến thiết bị gia dụng và nhà thông minh.",
    "coverImage": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "Not Started",
    "progress": 0,
    "branchCount": 4,
    "wordCount": 100,
    "featured": False
  },
  {
    "id": "topic-wildlife-ecosystem",
    "categoryId": "nature",
    "nameEn": "Wildlife & Living Ecosystems",
    "nameVi": "Động vật Hoang dã & Thiên nhiên",
    "description": "Động vật quen thuộc, tự nhiên gần gũi đến sinh thái đại dương và bảo tồn đa dạng sinh học.",
    "coverImage": "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "Not Started",
    "progress": 0,
    "branchCount": 4,
    "wordCount": 100,
    "featured": False
  },
  {
    "id": "topic-travel-journey",
    "categoryId": "travel",
    "nameEn": "Global World & Travel",
    "nameVi": "Du lịch Toàn cầu & Khám phá",
    "description": "Phương tiện di chuyển, chuyến đi cơ bản đến sân bay, phong cảnh và thám hiểm thế giới.",
    "coverImage": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 45,
    "branchCount": 4,
    "wordCount": 100,
    "featured": False
  },
  {
    "id": "topic-tech-ai-future",
    "categoryId": "tech",
    "nameEn": "Tech, AI & Future Worlds",
    "nameVi": "Công nghệ số, AI & Tương lai",
    "description": "Thiết bị số cơ bản, ứng dụng hằng ngày đến lập trình, đám mây và trí tuệ nhân tạo tương lai.",
    "coverImage": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 64,
    "branchCount": 4,
    "wordCount": 100,
    "featured": True
  }
]

# Generate Mindmap Nodes & Vocabularies
mindmap_nodes = []
vocabularies = []
quiz_questions = []

topic_id_to_meta = {t["id"]: t for t in topics_meta}

for t_data in all_topics_data:
    t_id = t_data["id"]
    t_meta = topic_id_to_meta[t_id]
    
    # Root node
    root_node_id = f"root-{t_id}"
    mindmap_nodes.append({
        "id": root_node_id,
        "topicId": t_id,
        "level": 0,
        "label": t_meta["nameEn"],
        "labelVi": t_meta["nameVi"],
        "color": "#10B981",
        "icon": "Target",
        "order": 0,
        "isExpanded": True
    })
    
    # Branches (4 per topic)
    for b_idx, branch in enumerate(t_data["branches"]):
        b_id = branch["id"]
        mindmap_nodes.append({
            "id": b_id,
            "topicId": t_id,
            "parentId": root_node_id,
            "level": 1,
            "label": branch["label"],
            "labelVi": branch["labelVi"],
            "color": branch["color"],
            "order": b_idx + 1,
            "isExpanded": True
        })
        
        # Words (25 per branch)
        for w_idx, w_tuple in enumerate(branch["words"]):
            word, ipa, pos, meaningVi, definitionEn, cefr, exampleEn, exampleVi, colls, syns = w_tuple
            v_id = f"vocab-{t_id[:8]}-{re.sub(r'[^a-zA-Z0-9]', '', word).lower()}"
            
            # Ensure unique v_id if collisions occur
            v_id_final = v_id
            counter = 1
            existing_ids = {v["id"] for v in vocabularies}
            while v_id_final in existing_ids:
                v_id_final = f"{v_id}-{counter}"
                counter += 1
            
            vocab_obj = {
                "id": v_id_final,
                "topicId": t_id,
                "branchId": b_id,
                "word": word,
                "ipa": ipa,
                "partOfSpeech": pos,
                "meaningVi": meaningVi,
                "definitionEn": definitionEn,
                "cefr": cefr,
                "context": {
                    "examples": [
                        {
                            "en": exampleEn,
                            "vi": exampleVi
                        }
                    ],
                    "collocations": colls,
                    "synonyms": syns
                },
                "status": "mastered" if cefr == "A1" else ("learning" if cefr in ["A2", "B1"] else "new"),
                "masteryScore": 85 if cefr == "A1" else (65 if cefr == "A2" else (45 if cefr == "B1" else 30)),
                "isFavorite": (w_idx % 7 == 0),
                "nextReviewDate": "2026-10-22"
            }
            vocabularies.append(vocab_obj)
            
            # Level 2 mindmap node
            node_id = f"node-{v_id_final}"
            mindmap_nodes.append({
                "id": node_id,
                "topicId": t_id,
                "parentId": b_id,
                "level": 2,
                "label": word,
                "labelVi": meaningVi,
                "color": branch["color"],
                "vocabularyId": v_id_final,
                "order": w_idx + 1
            })

print(f"Generated {len(mindmap_nodes)} mindmap nodes.")
print(f"Generated {len(vocabularies)} vocabularies.")

# Generate Quiz Questions (8 diverse questions per topic covering A1, A2, B1, B2)
q_counter = 1
for t_data in all_topics_data:
    t_id = t_data["id"]
    t_vocabs = [v for v in vocabularies if v["topicId"] == t_id]
    
    # 2 beginner questions (A1/A2)
    a1_vocabs = [v for v in t_vocabs if v["cefr"] == "A1"]
    a2_vocabs = [v for v in t_vocabs if v["cefr"] == "A2"]
    b1_vocabs = [v for v in t_vocabs if v["cefr"] == "B1"]
    b2_vocabs = [v for v in t_vocabs if v["cefr"] in ["B2", "C1"]]
    
    def make_choice_meaning(v, dist_pool):
        other_meanings = [x["meaningVi"] for x in dist_pool if x["id"] != v["id"]][:3]
        opts = [v["meaningVi"]] + other_meanings
        import random
        # deterministic pseudo-shuffle
        opts_sorted = sorted(opts, key=lambda x: len(x))
        return {
            "id": f"q-{q_counter}",
            "vocabularyId": v["id"],
            "topicId": v["topicId"],
            "branchId": v["branchId"],
            "type": "choice_meaning",
            "prompt": f"Nghĩa đúng nhất của từ \"{v['word']}\" ({v['ipa']}) là gì?",
            "promptDetail": v["context"]["examples"][0]["en"],
            "targetWord": v["word"],
            "audioText": v["word"],
            "options": opts_sorted,
            "correctAnswer": v["meaningVi"],
            "explanation": f"\"{v['word']}\" có nghĩa là: {v['meaningVi']}. Ví dụ: {v['context']['examples'][0]['en']}",
            "difficulty": v["cefr"]
        }

    def make_fill_blank(v, dist_pool):
        ex = v["context"]["examples"][0]
        sentence = ex["en"]
        blanked = re.sub(re.escape(v["word"]), "______", sentence, flags=re.IGNORECASE)
        other_words = [x["word"] for x in dist_pool if x["id"] != v["id"]][:3]
        opts = sorted([v["word"]] + other_words)
        return {
            "id": f"q-{q_counter}",
            "vocabularyId": v["id"],
            "topicId": v["topicId"],
            "branchId": v["branchId"],
            "type": "fill_blank",
            "prompt": "Điền từ thích hợp vào chỗ trống:",
            "promptDetail": blanked,
            "targetWord": v["word"],
            "audioText": sentence,
            "options": opts,
            "correctAnswer": v["word"],
            "explanation": f"Câu hoàn chỉnh: {sentence} ({ex['vi']})",
            "difficulty": v["cefr"]
        }

    # Add 4 questions per topic
    if a1_vocabs:
        quiz_questions.append(make_choice_meaning(a1_vocabs[0], a1_vocabs))
        q_counter += 1
    if a2_vocabs:
        quiz_questions.append(make_fill_blank(a2_vocabs[0], a2_vocabs))
        q_counter += 1
    if b1_vocabs:
        quiz_questions.append(make_choice_meaning(b1_vocabs[0], b1_vocabs))
        q_counter += 1
    if b2_vocabs:
        quiz_questions.append(make_fill_blank(b2_vocabs[0], b2_vocabs))
        q_counter += 1

print(f"Generated {len(quiz_questions)} quiz questions.")

# Format as TypeScript code
ts_output = """import { Category, Topic, MindmapNode, Vocabulary, QuizQuestion, UserProfile } from '../types';

export const initialCategories: Category[] = """ + json.dumps(categories, ensure_ascii=False, indent=2) + """;

export const initialTopics: Topic[] = """ + json.dumps(topics_meta, ensure_ascii=False, indent=2) + """;

export const initialMindmapNodes: MindmapNode[] = """ + json.dumps(mindmap_nodes, ensure_ascii=False, indent=2) + """;

export const initialVocabularies: Vocabulary[] = """ + json.dumps(vocabularies, ensure_ascii=False, indent=2) + """;

export const initialQuizQuestions: QuizQuestion[] = """ + json.dumps(quiz_questions, ensure_ascii=False, indent=2) + """;
export const initialQuestions = initialQuizQuestions;

export const initialUserProfile: UserProfile = {
  name: "Minh Anh",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  currentLevel: "A2",
  targetGoal: "Tự tin giao tiếp và làm chủ 900+ từ vựng theo ngữ cảnh thực tế",
  dailyMinutes: 20,
  favoriteCategoryIds: ["business", "marketing", "tech"],
  streakDays: 5,
  lastActiveDate: "2026-10-21",
  isOnboarded: true,
};
export const initialProfile = initialUserProfile;
"""

output_path = "src/data/initialData.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_output)

print(f"Successfully generated {output_path}! File size: {len(ts_output)} chars.")
