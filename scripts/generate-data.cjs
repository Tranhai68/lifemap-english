const fs = require('fs');
const path = require('path');

const categories = [
  {
    id: 'business',
    nameEn: 'Business & Commerce',
    nameVi: 'Kinh doanh & Thương mại',
    description: 'Chiến lược, khởi nghiệp, tài chính và đàm phán thương mại.',
    icon: 'Briefcase',
    color: '#DEDBC8',
    order: 1,
  },
  {
    id: 'marketing',
    nameEn: 'Marketing & Growth',
    nameVi: 'Marketing & Tăng trưởng số',
    description: 'Branding, chuyển đổi, quảng cáo số và tiếp thị nội dung.',
    icon: 'TrendingUp',
    color: '#38BDF8',
    order: 2,
  },
  {
    id: 'fitness',
    nameEn: 'Fitness & Physical Power',
    nameVi: 'Thể hình & Rèn luyện Thể lực',
    description: 'Tập luyện cường độ, cơ bắp, sức bền và dinh dưỡng thể thao.',
    icon: 'Dumbbell',
    color: '#10B981',
    order: 3,
  },
  {
    id: 'wellness',
    nameEn: 'Health & Medical Wellness',
    nameVi: 'Chăm sóc Sức khỏe & Y tế',
    description: 'Thói quen lành mạnh, giấc ngủ, kiểm soát căng thẳng và sơ cứu.',
    icon: 'HeartPulse',
    color: '#FB7185',
    order: 4,
  },
  {
    id: 'culinary',
    nameEn: 'Culinary Arts & Cooking',
    nameVi: 'Ẩm thực & Nghệ thuật Nấu nướng',
    description: 'Kỹ thuật chế biến, gia vị, hương vị và văn hóa thưởng thức.',
    icon: 'Utensils',
    color: '#F59E0B',
    order: 5,
  },
  {
    id: 'household',
    nameEn: 'Household & Daily Objects',
    nameVi: 'Đồ vật & Đời sống Thường nhật',
    description: 'Thiết bị gia đình, đồ nội thất và đồ dùng thông minh hằng ngày.',
    icon: 'Home',
    color: '#A78BFA',
    order: 6,
  },
  {
    id: 'nature',
    nameEn: 'Wildlife & Living Ecosystems',
    nameVi: 'Động vật hoang dã & Thiên nhiên',
    description: 'Sinh quyển, tập tính động vật và bảo tồn môi trường sinh thái.',
    icon: 'TreePine',
    color: '#34D399',
    order: 7,
  },
  {
    id: 'travel',
    nameEn: 'Global World & Expeditions',
    nameVi: 'Thế giới & Du lịch Khám phá',
    description: 'Sân bay, khách sạn, di chuyển quốc tế và giao lưu văn hóa.',
    icon: 'Compass',
    color: '#60A5FA',
    order: 8,
  },
  {
    id: 'technology',
    nameEn: 'Tech, AI & Future Worlds',
    nameVi: 'Công nghệ số & Trí tuệ nhân tạo',
    description: 'Thuật toán, tự động hóa, Prompting và chuyển đổi số thời đại mới.',
    icon: 'Cpu',
    color: '#C084FC',
    order: 9,
  },
];

const topicsData = [
  {
    id: 'topic-business-strategy',
    categoryId: 'business',
    nameEn: 'Executive Strategy & Venture Growth',
    nameVi: 'Chiến lược Doanh nghiệp & Khởi nghiệp',
    description: 'Mô hình kinh doanh, gọi vốn đầu tư, tối ưu vận hành và nghệ thuật đàm phán.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    cefrRange: 'B1 - B2',
    status: 'In Progress',
    progress: 72,
    branches: [
      {
        id: 'branch-biz-strategy',
        label: 'Strategy & Market Entry',
        labelVi: 'Chiến lược & Gia nhập thị trường',
        color: '#38BDF8',
        words: [
          { word: 'Disruptive', ipa: '/dɪsˈrʌp.tɪv/', pos: 'adj', vi: 'Mang tính đột phá', ex: 'The startup launched a disruptive business model.', cefr: 'B2' },
          { word: 'Feasibility', ipa: '/ˌfiː.zəˈbɪl.ə.ti/', pos: 'noun', vi: 'Tính khả thi', ex: 'They conducted a detailed feasibility study.', cefr: 'B2' },
          { word: 'Benchmark', ipa: '/ˈbentʃ.mɑːk/', pos: 'noun', vi: 'Tiêu chuẩn đối sánh', ex: 'Their customer satisfaction is the industry benchmark.', cefr: 'B1' },
          { word: 'Differentiation', ipa: '/ˌdɪf.ə.ren.ʃiˈeɪ.ʃən/', pos: 'noun', vi: 'Sự khác biệt hóa', ex: 'Product differentiation secures competitive advantage.', cefr: 'B2' },
          { word: 'Penetration', ipa: '/ˌpen.əˈtreɪ.ʃən/', pos: 'noun', vi: 'Thâm nhập thị trường', ex: 'Market penetration requires competitive pricing.', cefr: 'B2' },
          { word: 'Monopoly', ipa: '/məˈnɒp.əl.i/', pos: 'noun', vi: 'Thị trường độc quyền', ex: 'The firm holds a near monopoly in cloud hosting.', cefr: 'B2' },
          { word: 'Synergy', ipa: '/ˈsɪn.ə.dʒi/', pos: 'noun', vi: 'Sự hiệp lực cộng hưởng', ex: 'The merger achieved positive cost synergies.', cefr: 'B2' },
          { word: 'Pivot', ipa: '/ˈpɪv.ət/', pos: 'verb', vi: 'Chuyển hướng chiến lược', ex: 'The company decided to pivot toward enterprise software.', cefr: 'B2' },
          { word: 'Incumbent', ipa: '/ɪnˈkʌm.bənt/', pos: 'noun', vi: 'Doanh nghiệp thống trị hiện hữu', ex: 'New challengers aim to unseat market incumbents.', cefr: 'C1' },
          { word: 'Ecosystem', ipa: '/ˈiː.kəʊˌsɪs.təm/', pos: 'noun', vi: 'Hệ sinh thái kinh doanh', ex: 'Apple built a sticky developer ecosystem.', cefr: 'B1' },
          { word: 'Consolidation', ipa: '/kənˌsɒl.ɪˈdeɪ.ʃən/', pos: 'noun', vi: 'Sự hợp nhất ngành', ex: 'Industry consolidation reduced the number of rivals.', cefr: 'B2' },
          { word: 'Roadmap', ipa: '/ˈrəʊd.mæp/', pos: 'noun', vi: 'Lộ trình phát triển', ex: 'The product roadmap spans the next four quarters.', cefr: 'B1' },
          { word: 'Value Proposition', ipa: '/ˈvæl.juː ˌprɒp.əˈzɪʃ.ən/', pos: 'noun', vi: 'Tuyên ngôn giá trị cốt lõi', ex: 'A crisp value proposition attracts early adopters.', cefr: 'B2' },
          { word: 'Barrier to Entry', ipa: '/ˈbær.i.ər tuː ˈen.tri/', pos: 'noun', vi: 'Rào cản gia nhập', ex: 'High capital requirements serve as a strong barrier to entry.', cefr: 'B2' },
          { word: 'Moat', ipa: '/məʊt/', pos: 'noun', vi: 'Lợi thế cạnh tranh phòng thủ', ex: 'Strong patent portfolios build a defensible moat.', cefr: 'B2' },
        ]
      },
      {
        id: 'branch-biz-finance',
        label: 'Venture Capital & Finance',
        labelVi: 'Vốn đầu tư & Tài chính doanh nghiệp',
        color: '#10B981',
        words: [
          { word: 'Valuation', ipa: '/ˌvæl.juˈeɪ.ʃən/', pos: 'noun', vi: 'Định giá doanh nghiệp', ex: 'The pre-money valuation reached fifty million dollars.', cefr: 'B2' },
          { word: 'Due Diligence', ipa: '/ˌdʒuː ˈdɪl.ɪ.dʒəns/', pos: 'noun', vi: 'Thẩm định chuyên sâu', ex: 'Investors completed legal and financial due diligence.', cefr: 'B2' },
          { word: 'Equity', ipa: '/ˈek.wɪ.ti/', pos: 'noun', vi: 'Cổ phần sở hữu', ex: 'Founders retained a sixty percent equity stake.', cefr: 'B2' },
          { word: 'Bootstrapping', ipa: '/ˈbuːt.stræp.ɪŋ/', pos: 'noun', vi: 'Tự lực cánh sinh về vốn', ex: 'They scaled through bootstrapping without venture capital.', cefr: 'B2' },
          { word: 'Burn Rate', ipa: '/ˈbɜːn reɪt/', pos: 'noun', vi: 'Tốc độ tiêu hao ngân sách', ex: 'Managing monthly burn rate extends company runway.', cefr: 'B2' },
          { word: 'Runway', ipa: '/ˈrʌn.weɪ/', pos: 'noun', vi: 'Thời gian tồn tại bằng vốn hiện có', ex: 'The startup currently has eighteen months of runway.', cefr: 'B2' },
          { word: 'Liquidity', ipa: '/lɪˈkwɪd.ə.ti/', pos: 'noun', vi: 'Tính thanh khoản', ex: 'Adequate liquidity prevents operational halts.', cefr: 'B2' },
          { word: 'Capital Expenditure', ipa: '/ˌkæp.ɪ.təl ɪkˈspen.dɪ.tʃər/', pos: 'noun', vi: 'Chi phí vốn đầu tư tài sản', ex: 'Building factories demands heavy capital expenditure.', cefr: 'B2' },
          { word: 'Cash Flow', ipa: '/ˈkæʃ ˌfləʊ/', pos: 'noun', vi: 'Dòng tiền lưu chuyển', ex: 'Positive operating cash flow ensures survival.', cefr: 'B1' },
          { word: 'Return on Equity', ipa: '/rɪˈtɜːn ɒn ˈek.wɪ.ti/', pos: 'noun', vi: 'Lợi nhuận trên vốn chủ sở hữu', ex: 'Shareholders monitor return on equity closely.', cefr: 'B2' },
          { word: 'Amortization', ipa: '/əˌmɔː.tɪˈzeɪ.ʃən/', pos: 'noun', vi: 'Khấu hao tài sản vô hình', ex: 'Software assets undergo gradual amortization.', cefr: 'C1' },
          { word: 'Dividend', ipa: '/ˈdɪv.ɪ.dend/', pos: 'noun', vi: 'Cổ tức chia cho cổ đông', ex: 'The board approved a quarterly dividend payout.', cefr: 'B2' },
          { word: 'Underwriting', ipa: '/ˈʌn.dəˌraɪ.tɪŋ/', pos: 'noun', vi: 'Bảo lãnh phát hành', ex: 'Investment banks handled the IPO underwriting.', cefr: 'C1' },
          { word: 'Break-even', ipa: '/ˈbreɪkˌiː.vən/', pos: 'noun', vi: 'Điểm hòa vốn', ex: 'The product line reached break-even in year two.', cefr: 'B1' },
          { word: 'Term Sheet', ipa: '/ˈtɜːm ʃiːt/', pos: 'noun', vi: 'Bản điều khoản đầu tư sơ bộ', ex: 'The lead investor submitted a signed term sheet.', cefr: 'B2' },
        ]
      },
      {
        id: 'branch-biz-operations',
        label: 'Operations & Scalability',
        labelVi: 'Vận hành chuỗi & Khả năng mở rộng',
        color: '#F59E0B',
        words: [
          { word: 'Scalability', ipa: '/ˌskeɪ.ləˈbɪl.ə.ti/', pos: 'noun', vi: 'Khả năng mở rộng quy mô', ex: 'Cloud architecture provides infinite scalability.', cefr: 'B2' },
          { word: 'Bottleneck', ipa: '/ˈbɒt.əl.nek/', pos: 'noun', vi: 'Điểm nghẽn vận hành', ex: 'Automating QA testing eliminated the bottleneck.', cefr: 'B1' },
          { word: 'Logistics', ipa: '/ləˈdʒɪs.tɪks/', pos: 'noun', vi: 'Hậu cần và chuỗi cung ứng', ex: 'Optimizing warehouse logistics cuts delivery times.', cefr: 'B1' },
          { word: 'Outsourcing', ipa: '/ˈaʊtˌsɔː.sɪŋ/', pos: 'noun', vi: 'Thuê ngoài dịch vụ', ex: 'Outsourcing payroll allows focus on core innovation.', cefr: 'B1' },
          { word: 'Procurement', ipa: '/prəˈkjʊə.mənt/', pos: 'noun', vi: 'Thu mua nguyên vật liệu', ex: 'The procurement team negotiated bulk discounts.', cefr: 'B2' },
          { word: 'Compliance', ipa: '/kəmˈplaɪ.əns/', pos: 'noun', vi: 'Tuân thủ quy chuẩn pháp lý', ex: 'Strict compliance with ISO standards is mandatory.', cefr: 'B2' },
          { word: 'Optimization', ipa: '/ˌɒp.tɪ.maɪˈzeɪ.ʃən/', pos: 'noun', vi: 'Tối ưu hóa quy trình', ex: 'Workflow optimization boosted output by 30%.', cefr: 'B2' },
          { word: 'Fulfillment', ipa: '/fʊlˈfɪl.mənt/', pos: 'noun', vi: 'Xử lý và hoàn tất đơn hàng', ex: 'E-commerce fulfillment centers operate round the clock.', cefr: 'B2' },
          { word: 'Vendor', ipa: '/ˈven.dər/', pos: 'noun', vi: 'Nhà cung cấp dịch vụ', ex: 'We selected an approved hardware vendor.', cefr: 'B1' },
          { word: 'Contingency', ipa: '/kənˈtɪn.dʒən.si/', pos: 'noun', vi: 'Kế hoạch dự phòng sự cố', ex: 'Every project plan requires a contingency budget.', cefr: 'B2' },
          { word: 'Throughput', ipa: '/ˈθruː.pʊt/', pos: 'noun', vi: 'Năng suất thông lượng', ex: 'Assembly line throughput doubled after retooling.', cefr: 'C1' },
          { word: 'Overhead', ipa: '/ˈəʊ.və.hed/', pos: 'noun', vi: 'Chi phí gián tiếp cố định', ex: 'Remote work reduces office overhead expenses.', cefr: 'B2' },
          { word: 'Efficiency', ipa: '/ɪˈfɪʃ.ən.si/', pos: 'noun', vi: 'Hiệu suất vận hành', ex: 'Energy efficiency remains a top operational metric.', cefr: 'B1' },
          { word: 'Inventory', ipa: '/ˈɪn.vən.tər.i/', pos: 'noun', vi: 'Hàng tồn kho', ex: 'Just-in-time inventory avoids capital lockup.', cefr: 'B1' },
          { word: 'Milestone', ipa: '/ˈmaɪl.stəʊn/', pos: 'noun', vi: 'Cột mốc tiến độ dự án', ex: 'Delivering the beta version was a major milestone.', cefr: 'B1' },
        ]
      },
      {
        id: 'branch-biz-negotiation',
        label: 'Leadership & Negotiation',
        labelVi: 'Lãnh đạo & Đàm phán thương mại',
        color: '#A78BFA',
        words: [
          { word: 'Consensus', ipa: '/kənˈsen.səs/', pos: 'noun', vi: 'Sự đồng thuận chung', ex: 'The executive committee reached a clear consensus.', cefr: 'B2' },
          { word: 'Leverage', ipa: '/ˈliː.vər.ɪdʒ/', pos: 'noun', vi: 'Đòn bẩy vị thế thương lượng', ex: 'Having multiple offers gives strong bargaining leverage.', cefr: 'B2' },
          { word: 'Stakeholder', ipa: '/ˈsteɪkˌhəʊl.dər/', pos: 'noun', vi: 'Bên liên quan lợi ích', ex: 'Managing stakeholder expectations is crucial.', cefr: 'B2' },
          { word: 'Compromise', ipa: '/ˈkɒm.prə.maɪz/', pos: 'noun', vi: 'Thỏa hiệp hai bên cùng có lợi', ex: 'Both partners accepted a fair compromise.', cefr: 'B1' },
          { word: 'Accountability', ipa: '/əˌkaʊn.təˈbɪl.ə.ti/', pos: 'noun', vi: 'Trách nhiệm giải trình', ex: 'Transparent leadership breeds team accountability.', cefr: 'B2' },
          { word: 'Delegation', ipa: '/ˌdel.ɪˈɡeɪ.ʃən/', pos: 'noun', vi: 'Sự phân quyền giao phó', ex: 'Effective delegation empowers department heads.', cefr: 'B2' },
          { word: 'Mediation', ipa: '/ˌmiː.diˈeɪ.ʃən/', pos: 'noun', vi: 'Hòa giải tranh chấp', ex: 'Commercial disputes often resolve via mediation.', cefr: 'B2' },
          { word: 'Stipulation', ipa: '/ˌstɪp.jəˈleɪ.ʃən/', pos: 'noun', vi: 'Điều khoản ràng buộc hợp đồng', ex: 'The contract includes strict non-disclosure stipulations.', cefr: 'C1' },
          { word: 'Concession', ipa: '/kənˈseʃ.ən/', pos: 'noun', vi: 'Sự nhượng bộ trong thương lượng', ex: 'The seller offered price concessions for early closing.', cefr: 'B2' },
          { word: 'Integrity', ipa: '/ɪnˈteɡ.rə.ti/', pos: 'noun', vi: 'Sự chính trực minh bạch', ex: 'Corporate integrity earns lasting client trust.', cefr: 'B2' },
          { word: 'Arbitration', ipa: '/ˌɑː.bɪˈtreɪ.ʃən/', pos: 'noun', vi: 'Trọng tài thương mại', ex: 'Cross-border deals rely on international arbitration.', cefr: 'C1' },
          { word: 'Synergize', ipa: '/ˈsɪn.ə.dʒaɪz/', pos: 'verb', vi: 'Phối hợp tạo sức mạnh tổng hợp', ex: 'Both engineering teams synergized effectively.', cefr: 'B2' },
          { word: 'Empowerment', ipa: '/ɪmˈpaʊə.mənt/', pos: 'noun', vi: 'Sự trao quyền tự chủ', ex: 'Employee empowerment drives agile decision making.', cefr: 'B2' },
          { word: 'Memorandum', ipa: '/ˌmem.əˈræn.dəm/', pos: 'noun', vi: 'Bản ghi nhớ hợp tác (MOU)', ex: 'The parties signed a memorandum of understanding.', cefr: 'B2' },
          { word: 'Counterpart', ipa: '/ˈkaʊn.tə.pɑːt/', pos: 'noun', vi: 'Đối tác tương đương', ex: 'The CEO met with his foreign government counterpart.', cefr: 'B2' },
        ]
      }
    ]
  },

  {
    id: 'topic-digital-marketing',
    categoryId: 'marketing',
    nameEn: 'Digital Marketing & Conversion Funnels',
    nameVi: 'Marketing Kỹ thuật số & Phễu Chuyển đổi',
    description: 'Chiến dịch quảng cáo, chỉ số hiệu suất, định vị thương hiệu và tối ưu tỷ lệ chuyển đổi.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    cefrRange: 'B1 - B2',
    status: 'In Progress',
    progress: 48,
    branches: [
      {
        id: 'branch-mkt-brand',
        label: 'Brand Identity & Awareness',
        labelVi: 'Nhận diện thương hiệu & Độ phủ',
        color: '#38BDF8',
        words: [
          { word: 'Positioning', ipa: '/pəˈzɪʃ.ən.ɪŋ/', pos: 'noun', vi: 'Định vị thương hiệu', ex: 'Premium positioning justifies higher price tags.', cefr: 'B2' },
          { word: 'Recall', ipa: '/rɪˈkɔːl/', pos: 'noun', vi: 'Mức độ nhớ đến thương hiệu', ex: 'Super Bowl commercials generate massive brand recall.', cefr: 'B2' },
          { word: 'Persona', ipa: '/pəˈsəʊ.nə/', pos: 'noun', vi: 'Chân dung khách hàng mục tiêu', ex: 'Design products for your core buyer persona.', cefr: 'B1' },
          { word: 'Storytelling', ipa: '/ˈstɔː.riˌtel.ɪŋ/', pos: 'noun', vi: 'Kể chuyện truyền cảm hứng', ex: 'Emotional storytelling connects with young demographics.', cefr: 'B1' },
          { word: 'Touchpoint', ipa: '/ˈtʌtʃ.pɔɪnt/', pos: 'noun', vi: 'Điểm chạm khách hàng', ex: 'Every customer touchpoint must reflect brand excellence.', cefr: 'B2' },
          { word: 'Equity', ipa: '/ˈek.wɪ.ti/', pos: 'noun', vi: 'Giá trị tài sản thương hiệu', ex: 'Strong brand equity enables premium margins.', cefr: 'B2' },
          { word: 'Advocate', ipa: '/ˈæd.və.kət/', pos: 'noun', vi: 'Người ủng hộ thương hiệu cuồng nhiệt', ex: 'Delighted buyers become passionate brand advocates.', cefr: 'B2' },
          { word: 'Resonance', ipa: '/ˈrez.ən.əns/', pos: 'noun', vi: 'Sự cộng hưởng cảm xúc', ex: 'Authentic messages find profound resonance online.', cefr: 'C1' },
          { word: 'Guidelines', ipa: '/ˈɡaɪd.laɪnz/', pos: 'noun', vi: 'Bộ quy chuẩn thương hiệu', ex: 'All creatives must adhere to visual guidelines.', cefr: 'B1' },
          { word: 'Endorsement', ipa: '/ɪnˈdɔːs.mənt/', pos: 'noun', vi: 'Sự bảo chứng từ người nổi tiếng', ex: 'Athletic endorsement boosted shoe sales worldwide.', cefr: 'B2' },
          { word: 'Perception', ipa: '/pəˈsep.ʃən/', pos: 'noun', vi: 'Nhận thức của công chúng', ex: 'Public perception shifted toward sustainability.', cefr: 'B2' },
          { word: 'Affinity', ipa: '/əˈfɪn.ə.ti/', pos: 'noun', vi: 'Mức độ gắn kết thân thuộc', ex: 'Community marketing fosters deep brand affinity.', cefr: 'B2' },
          { word: 'Consistency', ipa: '/kənˈsɪs.tən.si/', pos: 'noun', vi: 'Tính nhất quán trên các kênh', ex: 'Maintain messaging consistency across all media.', cefr: 'B1' },
          { word: 'Differentiation', ipa: '/ˌdɪf.ə.ren.ʃiˈeɪ.ʃən/', pos: 'noun', vi: 'Điểm khác biệt nhận biết', ex: 'Visual differentiation stands out on social feeds.', cefr: 'B2' },
          { word: 'Reputation', ipa: '/ˌrep.jəˈteɪ.ʃən/', pos: 'noun', vi: 'Uy tín & danh tiếng', ex: 'Online reviews directly impact brand reputation.', cefr: 'B1' },
        ]
      },
      {
        id: 'branch-mkt-ads',
        label: 'Paid Advertising & Analytics',
        labelVi: 'Quảng cáo trả phí & Đo lường số',
        color: '#10B981',
        words: [
          { word: 'Impression', ipa: '/ɪmˈpreʃ.ən/', pos: 'noun', vi: 'Lượt hiển thị quảng cáo', ex: 'The campaign delivered over five million impressions.', cefr: 'B1' },
          { word: 'Click-Through Rate', ipa: '/ˈklɪk ˌθruː reɪt/', pos: 'noun', vi: 'Tỷ lệ nhấp chuột (CTR)', ex: 'Video ads yielded an exceptional click-through rate.', cefr: 'B2' },
          { word: 'Acquisition', ipa: '/ˌæk.wɪˈzɪʃ.ən/', pos: 'noun', vi: 'Thu hút khách hàng mới', ex: 'Customer acquisition cost dropped by 20%.', cefr: 'B2' },
          { word: 'Attribution', ipa: '/ˌæt.rɪˈbjuː.ʃən/', pos: 'noun', vi: 'Gán nguồn đóng góp chuyển đổi', ex: 'Multi-touch attribution clarifies marketing ROI.', cefr: 'C1' },
          { word: 'Retargeting', ipa: '/riːˈtɑː.ɡɪt.ɪŋ/', pos: 'noun', vi: 'Quảng cáo bám đuổi lại', ex: 'Retargeting cart abandoners recovers lost revenue.', cefr: 'B2' },
          { word: 'Optimization', ipa: '/ˌɒp.tɪ.maɪˈzeɪ.ʃən/', pos: 'noun', vi: 'Tối ưu hóa chiến dịch', ex: 'Algorithmic bid optimization reduces ad spend waste.', cefr: 'B2' },
          { word: 'Segmentation', ipa: '/ˌseɡ.menˈteɪ.ʃən/', pos: 'noun', vi: 'Phân khúc tệp khán giả', ex: 'Audience segmentation improves ad relevance.', cefr: 'B2' },
          { word: 'Bounce Rate', ipa: '/ˈbaʊns reɪt/', pos: 'noun', vi: 'Tỷ lệ thoát trang ngay', ex: 'A fast page load reduces the site bounce rate.', cefr: 'B1' },
          { word: 'Lifetime Value', ipa: '/ˈlaɪf.taɪm ˈvæl.juː/', pos: 'noun', vi: 'Giá trị vòng đời khách hàng (LTV)', ex: 'Subscription models dramatically expand lifetime value.', cefr: 'B2' },
          { word: 'Organic', ipa: '/ɔːˈɡæn.ɪk/', pos: 'adj', vi: 'Lượng truy cập tự nhiên miễn phí', ex: 'SEO strategy drove steady organic traffic growth.', cefr: 'B1' },
          { word: 'Algorithm', ipa: '/ˈæl.ɡə.rɪ.ðəm/', pos: 'noun', vi: 'Thuật toán phân phối hiển thị', ex: 'The feed algorithm favors high-engagement video clips.', cefr: 'B2' },
          { word: 'Benchmarking', ipa: '/ˈbentʃ.mɑːk.ɪŋ/', pos: 'noun', vi: 'Đối sánh chỉ số cạnh tranh', ex: 'Benchmarking ad spend against industry rivals.', cefr: 'B2' },
          { word: 'Funnel', ipa: '/ˈfʌn.əl/', pos: 'noun', vi: 'Phễu hành trình chuyển đổi', ex: 'Prospects drop off at the checkout funnel step.', cefr: 'B1' },
          { word: 'Bidding', ipa: '/ˈbɪd.ɪŋ/', pos: 'noun', vi: 'Đấu thầu từ khóa hiển thị', ex: 'Automated bidding adjusts to user intent.', cefr: 'B2' },
          { word: 'Return on Ad Spend', ipa: '/rɪˈtɜːn ɒn æd spend/', pos: 'noun', vi: 'Lợi tức chi tiêu quảng cáo (ROAS)', ex: 'Our target ROAS for Q4 is four to one.', cefr: 'B2' },
        ]
      },
      {
        id: 'branch-mkt-content',
        label: 'Content Strategy & Copywriting',
        labelVi: 'Chiến lược nội dung & Viết quảng cáo',
        color: '#F59E0B',
        words: [
          { word: 'Compelling', ipa: '/kəmˈpel.ɪŋ/', pos: 'adj', vi: 'Thuyết phục, lôi cuốn khó cưỡng', ex: 'Write a compelling headline that stops the scroll.', cefr: 'B2' },
          { word: 'Call to Action', ipa: '/kɔːl tuː ˈæk.ʃən/', pos: 'noun', vi: 'Lời kêu gọi hành động (CTA)', ex: 'A bright call to action button sparks conversions.', cefr: 'B1' },
          { word: 'Hook', ipa: '/hʊk/', pos: 'noun', vi: 'Điểm nhấn thu hút 3 giây đầu', ex: 'The first three seconds provide a captivating video hook.', cefr: 'B1' },
          { word: 'Persuasion', ipa: '/pəˈsweɪ.ʒən/', pos: 'noun', vi: 'Nghệ thuật thuyết phục', ex: 'Subtle social proof enhances ad persuasion.', cefr: 'B2' },
          { word: 'Scarcity', ipa: '/ˈskeə.sə.ti/', pos: 'noun', vi: 'Tâm lý học về sự khan hiếm', ex: 'Limited batch alerts tap into perceived scarcity.', cefr: 'B2' },
          { word: 'Urgency', ipa: '/ˈɜː.dʒən.si/', pos: 'noun', vi: 'Tính cấp bách thúc đẩy mua ngay', ex: 'Countdown timers create legitimate buyer urgency.', cefr: 'B2' },
          { word: 'Engagement', ipa: '/ɪnˈɡeɪdʒ.mənt/', pos: 'noun', vi: 'Tương tác thảo luận và chia sẻ', ex: 'Interactive polls generate viral community engagement.', cefr: 'B1' },
          { word: 'Viral', ipa: '/ˈvaɪə.rəl/', pos: 'adj', vi: 'Lan truyền chóng mặt trên mạng', ex: 'The creative meme format went viral across TikTok.', cefr: 'B1' },
          { word: 'Curate', ipa: '/kjʊəˈreɪt/', pos: 'verb', vi: 'Tuyển chọn nội dung đặc sắc', ex: 'We curate expert insights in a weekly newsletter.', cefr: 'B2' },
          { word: 'Syndication', ipa: '/ˌsɪn.dɪˈkeɪ.ʃən/', pos: 'noun', vi: 'Phát hành liên kết đa kênh', ex: 'Article syndication widens author reach.', cefr: 'C1' },
          { word: 'Editorial', ipa: '/ˌed.ɪˈtɔː.ri.əl/', pos: 'adj', vi: 'Thuộc biên tập bài bản', ex: 'An editorial calendar keeps creators on schedule.', cefr: 'B2' },
          { word: 'Copywriter', ipa: '/ˈkɒp.iˌraɪ.tər/', pos: 'noun', vi: 'Chuyên viên viết lời quảng cáo', ex: 'The copywriter refined the hero value proposition.', cefr: 'B1' },
          { word: 'Testimonial', ipa: '/ˌtes.tɪˈməʊ.ni.əl/', pos: 'noun', vi: 'Lời nhận xét chứng thực khách quan', ex: 'Video testimonials overcome buyer hesitation.', cefr: 'B2' },
          { word: 'Newsletter', ipa: '/ˈnjuːzˌlet.ər/', pos: 'noun', vi: 'Bản tin email định kỳ', ex: 'The weekly newsletter boasts a 45% open rate.', cefr: 'A2' },
          { word: 'Infographic', ipa: '/ˈɪn.fəʊˌɡræf.ɪk/', pos: 'noun', vi: 'Đồ họa thông tin trực quan', ex: 'Visual infographics simplify complex market data.', cefr: 'B1' },
        ]
      },
      {
        id: 'branch-mkt-retention',
        label: 'Retention & Customer Lifecycle',
        labelVi: 'Giữ chân khách hàng & Vòng đời',
        color: '#A78BFA',
        words: [
          { word: 'Retention', ipa: '/rɪˈten.ʃən/', pos: 'noun', vi: 'Tỷ lệ giữ chân người dùng', ex: 'Gamified features increased 30-day user retention.', cefr: 'B2' },
          { word: 'Churn', ipa: '/tʃɜːn/', pos: 'noun', vi: 'Tỷ lệ rời bỏ dịch vụ', ex: 'Reducing churn is five times cheaper than acquisition.', cefr: 'B2' },
          { word: 'Onboarding', ipa: '/ˈɒnˌbɔː.dɪŋ/', pos: 'noun', vi: 'Quy trình hướng dẫn làm quen ban đầu', ex: 'Interactive onboarding guarantees fast time to value.', cefr: 'B2' },
          { word: 'Gamification', ipa: '/ˌɡeɪ.mɪ.fɪˈkeɪ.ʃən/', pos: 'noun', vi: 'Trò chơi hóa hành động học tập', ex: 'Streaks and badges represent effective gamification.', cefr: 'B2' },
          { word: 'Advocacy', ipa: '/ˈæd.və.kə.si/', pos: 'noun', vi: 'Sự ủng hộ giới thiệu bạn bè', ex: 'Referral rewards stimulate active customer advocacy.', cefr: 'B2' },
          { word: 'Re-engagement', ipa: '/ˌriː.ɪnˈɡeɪdʒ.mənt/', pos: 'noun', vi: 'Kích hoạt lại người dùng ngủ quên', ex: 'Send re-engagement push notifications with special perks.', cefr: 'B2' },
          { word: 'Loyalty', ipa: '/ˈlɔɪ.əl.ti/', pos: 'noun', vi: 'Lòng trung thành với dịch vụ', ex: 'Tiered loyalty clubs reward continuous purchases.', cefr: 'B1' },
          { word: 'Cohort', ipa: '/ˈkəʊ.hɔːt/', pos: 'noun', vi: 'Tập nhóm người dùng cùng kỳ', ex: 'The January signup cohort maintained highest activity.', cefr: 'C1' },
          { word: 'Feedback Loop', ipa: '/ˈfiːd.bæk luːp/', pos: 'noun', vi: 'Vòng phản hồi liên tục', ex: 'Closing the feedback loop improves product roadmap.', cefr: 'B2' },
          { word: 'Upsell', ipa: '/ˈʌp.sel/', pos: 'verb', vi: 'Bán thêm gói cao cấp hơn', ex: 'Account managers upsell enterprise tier security.', cefr: 'B2' },
          { word: 'NPS', ipa: '/ˌen.piːˈes/', pos: 'noun', vi: 'Chỉ số đo lường mức độ hài lòng', ex: 'An NPS score above 60 indicates stellar loyalty.', cefr: 'B2' },
          { word: 'Personalization', ipa: '/ˌpɜː.sən.əl.aɪˈzeɪ.ʃən/', pos: 'noun', vi: 'Cá nhân hóa trải nghiệm', ex: 'AI personalization shows relevant product picks.', cefr: 'B2' },
          { word: 'Reactivation', ipa: '/riːˌæk.tɪˈveɪ.ʃən/', pos: 'noun', vi: 'Tái kích hoạt tài khoản', ex: 'A discount coupon prompted account reactivation.', cefr: 'B2' },
          { word: 'Surplus', ipa: '/ˈsɜː.pləs/', pos: 'noun', vi: 'Giá trị thặng dư cảm nhận', ex: 'Deliver value surplus so clients never look elsewhere.', cefr: 'B2' },
          { word: 'Milestone', ipa: '/ˈmaɪl.stəʊn/', pos: 'noun', vi: 'Cột mốc thành tựu người dùng', ex: 'Celebrate every user milestone with in-app confetti.', cefr: 'B1' },
        ]
      }
    ]
  },

  {
    id: 'topic-gym-fitness',
    categoryId: 'fitness',
    nameEn: 'Strength Training & Body Mechanics',
    nameVi: 'Rèn luyện Thể lực & Cơ chế Thể hình',
    description: 'Kho từ vựng tập tạ kháng lực, sức bền, chuyển hóa năng lượng và phục hồi cơ bắp.',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    cefrRange: 'A2 - B2',
    status: 'In Progress',
    progress: 35,
    branches: [
      {
        id: 'branch-fit-resistance',
        label: 'Resistance Training & Hypertrophy',
        labelVi: 'Tập kháng lực & Phát triển cơ bắp',
        color: '#10B981',
        words: [
          { word: 'Hypertrophy', ipa: '/haɪˈpɜː.trə.fi/', pos: 'noun', vi: 'Sự phì đại phát triển cơ bắp', ex: 'Lifting in the 8-12 rep range targets muscle hypertrophy.', cefr: 'B2' },
          { word: 'Compound', ipa: '/ˈkɒm.paʊnd/', pos: 'adj', vi: 'Đa khớp liên hoàn', ex: 'Compound movements recruit multiple muscle groups.', cefr: 'B1' },
          { word: 'Barbell', ipa: '/ˈbɑː.bel/', pos: 'noun', vi: 'Thanh tạ đòn dài', ex: 'Load Olympic plates onto the barbell securely.', cefr: 'A2' },
          { word: 'Dumbbell', ipa: '/ˈdʌm.bel/', pos: 'noun', vi: 'Tạ tay đơn', ex: 'Perform controlled dumbbell lateral raises for shoulders.', cefr: 'A2' },
          { word: 'Repetition', ipa: '/ˌrep.əˈtɪʃ.ən/', pos: 'noun', vi: 'Số lần lặp lại (Rep)', ex: 'Perform three sets of ten repetitions each.', cefr: 'A2' },
          { word: 'Progressive Overload', ipa: '/prəˈɡres.ɪv ˈəʊ.və.ləʊd/', pos: 'noun', vi: 'Nguyên lý tăng tiến tải trọng', ex: 'Progressive overload stimulates continuous muscle growth.', cefr: 'B2' },
          { word: 'Failure', ipa: '/ˈfeɪ.ljər/', pos: 'noun', vi: 'Ngưỡng kiệt sức cơ bắp', ex: 'Training to mechanical failure sparks neural adaptation.', cefr: 'B2' },
          { word: 'Isometric', ipa: '/ˌaɪ.səˈmet.rɪk/', pos: 'adj', vi: 'Gồng co cơ tĩnh không đổi chiều dài', ex: 'Plank is an excellent isometric abdominal exercise.', cefr: 'B2' },
          { word: 'Concentric', ipa: '/kɒnˈsen.trɪk/', pos: 'adj', vi: 'Pha co ngắn sợi cơ (kéo/đẩy tạ)', ex: 'Exhale steadily during the concentric phase.', cefr: 'B2' },
          { word: 'Eccentric', ipa: '/ekˈsen.trɪk/', pos: 'adj', vi: 'Pha duỗi giãn cơ dưới áp lực (hạ tạ)', ex: 'A slow eccentric tempo creates greater muscle tension.', cefr: 'B2' },
          { word: 'Superset', ipa: '/ˈsuː.pəˌset/', pos: 'noun', vi: 'Hai bài tập liền không nghỉ', ex: 'Pairing biceps and triceps makes a time-saving superset.', cefr: 'B1' },
          { word: 'Deadlift', ipa: '/ˈded.lɪft/', pos: 'noun', vi: 'Bài tập kéo tạ từ mặt sàn', ex: 'Maintain a neutral spine when executing the deadlift.', cefr: 'B1' },
          { word: 'Squat', ipa: '/skwɒt/', pos: 'noun', vi: 'Bài tập gánh đùi mông', ex: 'Full depth squats recruit glutes and quadriceps.', cefr: 'A2' },
          { word: 'Plateau', ipa: '/ˈplæt.əʊ/', pos: 'noun', vi: 'Giai đoạn chững tiến độ', ex: 'Varying workout intensity helps break through a plateau.', cefr: 'B2' },
          { word: 'Spotter', ipa: '/ˈspɒt.ər/', pos: 'noun', vi: 'Người đỡ tạ an toàn', ex: 'Always ask a gym spotter when bench pressing heavy.', cefr: 'B1' },
        ]
      },
      {
        id: 'branch-fit-cardio',
        label: 'Cardiovascular Conditioning',
        labelVi: 'Sức bền & Tim mạch điều hòa',
        color: '#38BDF8',
        words: [
          { word: 'Endurance', ipa: '/ɪnˈdʒʊə.rəns/', pos: 'noun', vi: 'Sức bền thể lực dẻo dai', ex: 'Marathon training builds deep cardiovascular endurance.', cefr: 'B1' },
          { word: 'Aerobic', ipa: '/eəˈrəʊ.bɪk/', pos: 'adj', vi: 'Hiếu khí tiêu thụ oxy', ex: 'Steady-state jogging provides aerobic benefits.', cefr: 'B1' },
          { word: 'Anaerobic', ipa: '/ˌæn.eəˈrəʊ.bɪk/', pos: 'adj', vi: 'Yếm khí cường độ bộc phát', ex: 'Sprint intervals push the anaerobic threshold.', cefr: 'B2' },
          { word: 'Stamina', ipa: '/ˈstæm.ɪ.nə/', pos: 'noun', vi: 'Sinh lực chịu đựng bền bỉ', ex: 'Swimming daily improves overall athletic stamina.', cefr: 'B1' },
          { word: 'Interval', ipa: '/ˈɪn.tə.vəl/', pos: 'noun', vi: 'Khoảng biến thiên cường độ (HIIT)', ex: 'High-intensity interval training burns calories fast.', cefr: 'B1' },
          { word: 'Pacing', ipa: '/ˈpeɪ.sɪŋ/', pos: 'noun', vi: 'Phân phối tốc độ nhịp điệu', ex: 'Proper race pacing prevents premature exhaustion.', cefr: 'B2' },
          { word: 'Treadmill', ipa: '/ˈtred.mɪl/', pos: 'noun', vi: 'Máy chạy bộ thể thao', ex: 'Adjust the incline on the treadmill for hill simulations.', cefr: 'A2' },
          { word: 'Heart Rate', ipa: '/hɑːt reɪt/', pos: 'noun', vi: 'Nhịp đập tim mỗi phút', ex: 'Monitor resting heart rate to detect overtraining.', cefr: 'A2' },
          { word: 'VO2 Max', ipa: '/ˌviː.əʊˈtuː mæks/', pos: 'noun', vi: 'Chỉ số hấp thụ oxy tối đa', ex: 'VO2 max serves as the gold standard for aerobic capacity.', cefr: 'C1' },
          { word: 'Cadence', ipa: '/ˈkeɪ.dəns/', pos: 'noun', vi: 'Nhịp chân bước mỗi phút', ex: 'A cycling cadence of 90 RPM maximizes efficiency.', cefr: 'B2' },
          { word: 'Elevation', ipa: '/ˌel.ɪˈveɪ.ʃən/', pos: 'noun', vi: 'Độ dốc nâng cao', ex: 'Climbing steep elevations tests calf resilience.', cefr: 'B1' },
          { word: 'Conditioning', ipa: '/kənˈdɪʃ.ən.ɪŋ/', pos: 'noun', vi: 'Rèn luyện thích nghi thể trạng', ex: 'Metabolic conditioning sharpens game readiness.', cefr: 'B2' },
          { word: 'Metabolism', ipa: '/məˈtæb.əl.ɪ.zəm/', pos: 'noun', vi: 'Quá trình trao đổi chất', ex: 'Strength training elevates resting basal metabolism.', cefr: 'B2' },
          { word: 'Circulation', ipa: '/ˌsɜː.kjəˈleɪ.ʃən/', pos: 'noun', vi: 'Tuần hoàn máu cơ thể', ex: 'Cold baths stimulate vascular blood circulation.', cefr: 'B2' },
          { word: 'Sprint', ipa: '/sprɪnt/', pos: 'noun', vi: 'Cú bứt tốc đoạn ngắn', ex: 'Finish the track session with four 100m sprints.', cefr: 'A2' },
        ]
      },
      {
        id: 'branch-fit-recovery',
        label: 'Recovery & Sports Nutrition',
        labelVi: 'Phục hồi cơ bắp & Dinh dưỡng',
        color: '#F59E0B',
        words: [
          { word: 'Hydration', ipa: '/haɪˈdreɪ.ʃən/', pos: 'noun', vi: 'Bổ sung nước cho cơ thể', ex: 'Adequate hydration prevents muscle cramps in hot weather.', cefr: 'B1' },
          { word: 'Electrolyte', ipa: '/iˈlek.trə.laɪt/', pos: 'noun', vi: 'Chất điện giải thiết yếu', ex: 'Sweating depletes sodium and potassium electrolytes.', cefr: 'B2' },
          { word: 'Protein', ipa: '/ˈprəʊ.tiːn/', pos: 'noun', vi: 'Đạm tái tạo mô cơ', ex: 'Consume 1.6 grams of protein per kilogram of body weight.', cefr: 'A2' },
          { word: 'Supplement', ipa: '/ˈsʌp.lɪ.mənt/', pos: 'noun', vi: 'Thực phẩm bổ sung vi chất', ex: 'Creatine monohydrate is a proven sports supplement.', cefr: 'B1' },
          { word: 'Soreness', ipa: '/ˈsɔː.nəs/', pos: 'noun', vi: 'Hiện tượng đau nhức cơ bắp (DOMS)', ex: 'Delayed onset muscle soreness peaks at 48 hours.', cefr: 'B1' },
          { word: 'Regeneration', ipa: '/rɪˌdʒen.əˈreɪ.ʃən/', pos: 'noun', vi: 'Tái sinh phục hồi tế bào', ex: 'Deep stage sleep accelerates tissue regeneration.', cefr: 'B2' },
          { word: 'Glycogen', ipa: '/ˈɡlaɪ.kə.dʒən/', pos: 'noun', vi: 'Dự trữ đường năng lượng trong cơ', ex: 'Post-workout carbs replenish depleted glycogen stores.', cefr: 'B2' },
          { word: 'Macro', ipa: '/ˈmæk.rəʊ/', pos: 'noun', vi: 'Nhóm chất đa lượng (đạm, đường, béo)', ex: 'Track daily macros to stay on caloric target.', cefr: 'B1' },
          { word: 'Calorie Deficit', ipa: '/ˈkæl.ər.i ˈdef.ɪ.sɪt/', pos: 'noun', vi: 'Thâm hụt calo để giảm mỡ', ex: 'A gentle calorie deficit preserves lean muscle mass.', cefr: 'B2' },
          { word: 'Mobility', ipa: '/məʊˈbɪl.ə.ti/', pos: 'noun', vi: 'Độ linh hoạt hoạt động khớp', ex: 'Hip mobility drills improve squat depth safety.', cefr: 'B2' },
          { word: 'Inflammation', ipa: '/ˌɪn.fləˈmeɪ.ʃən/', pos: 'noun', vi: 'Phản ứng viêm sưng mô', ex: 'Omega-3 fatty acids help moderate chronic inflammation.', cefr: 'B2' },
          { word: 'Overtraining', ipa: '/ˌəʊ.vəˈtreɪ.nɪŋ/', pos: 'noun', vi: 'Hội chứng quá tải tập luyện', ex: 'Chronic fatigue and insomnia signal overtraining.', cefr: 'B2' },
          { word: 'Antioxidant', ipa: '/ˌæn.tiˈɒk.sɪ.dənt/', pos: 'noun', vi: 'Chất chống oxy hóa tế bào', ex: 'Berries and dark leafy greens supply rich antioxidants.', cefr: 'B2' },
          { word: 'Whey', ipa: '/weɪ/', pos: 'noun', vi: 'Đạm váng sữa tinh chất', ex: 'Whey isolate digests rapidly following intense workouts.', cefr: 'B1' },
          { word: 'Rehabilitation', ipa: '/ˌriː.həˌbɪl.ɪˈteɪ.ʃən/', pos: 'noun', vi: 'Vật lý trị liệu phục hồi chấn thương', ex: 'Rotator cuff rehabilitation takes patience and consistency.', cefr: 'B2' },
        ]
      },
      {
        id: 'branch-fit-biomechanics',
        label: 'Biomechanics & Lifting Posture',
        labelVi: 'Cơ sinh học & Tư thế phát lực',
        color: '#A78BFA',
        words: [
          { word: 'Posture', ipa: '/ˈpɒs.tʃər/', pos: 'noun', vi: 'Tư thế cột sống và dáng vóc', ex: 'Maintaining upright posture protects the lower back.', cefr: 'B1' },
          { word: 'Kinematics', ipa: '/ˌkɪn.ɪˈmæt.ɪks/', pos: 'noun', vi: 'Động học cử động khớp xương', ex: 'Sensors track barbell kinematics in professional lifters.', cefr: 'C1' },
          { word: 'Alignment', ipa: '/əˈlaɪn.mənt/', pos: 'noun', vi: 'Sự thẳng hàng chuẩn trục', ex: 'Check knee and toe alignment before descending.', cefr: 'B2' },
          { word: 'Flexibility', ipa: '/ˌflek.səˈbɪl.ə.ti/', pos: 'noun', vi: 'Độ mềm dẻo của sợi cơ', ex: 'Dynamic stretching enhances hamstring flexibility.', cefr: 'B1' },
          { word: 'Bracing', ipa: '/ˈbreɪ.sɪŋ/', pos: 'noun', vi: 'Gồng cứng cơ hoành bụng bảo vệ cột sống', ex: 'Abdominal bracing creates intra-abdominal pressure.', cefr: 'B2' },
          { word: 'Leverage', ipa: '/ˈliː.vər.ɪdʒ/', pos: 'noun', vi: 'Cánh tay đòn phát lực', ex: 'Long femur lifters adjust foot stance for better leverage.', cefr: 'B2' },
          { word: 'Tendon', ipa: '/ˈten.dən/', pos: 'noun', vi: 'Gân nối cơ vào xương', ex: 'Tendons adapt slower than muscle tissue to heavy load.', cefr: 'B2' },
          { word: 'Ligament', ipa: '/ˈlɪɡ.ə.mənt/', pos: 'noun', vi: 'Dây chằng nối hai đầu xương', ex: 'Warm-up routines protect knee ligaments from sprains.', cefr: 'B2' },
          { word: 'Neutral Spine', ipa: '/ˈnjuː.trəl spaɪn/', pos: 'noun', vi: 'Đường cong sinh lý cột sống tự nhiên', ex: 'Locking into a neutral spine prevents lumbar disc herniation.', cefr: 'B2' },
          { word: 'Proprioception', ipa: '/ˌprəʊ.pri.əʊˈsep.ʃən/', pos: 'noun', vi: 'Cảm giác vị thế không gian cơ thể', ex: 'Single-leg balance exercises sharpen proprioception.', cefr: 'C1' },
          { word: 'Extension', ipa: '/ɪkˈsten.ʃən/', pos: 'noun', vi: 'Động tác duỗi thẳng khớp', ex: 'Full hip extension finishes the kettlebell swing cleanly.', cefr: 'B2' },
          { word: 'Flexion', ipa: '/ˈflek.ʃən/', pos: 'noun', vi: 'Động tác gập góc khớp', ex: 'Avoid excessive lumbar flexion during bent-over rows.', cefr: 'B2' },
          { word: 'Torque', ipa: '/tɔːk/', pos: 'noun', vi: 'Mô-men lực xoay khớp', ex: 'Screwing feet into the floor creates stabilizing hip torque.', cefr: 'B2' },
          { word: 'Equilibrium', ipa: '/ˌek.wɪˈlɪb.ri.əm/', pos: 'noun', vi: 'Trạng thái cân bằng trọng tâm', ex: 'Heavy overhead squats require perfect equilibrium.', cefr: 'B2' },
          { word: 'Symmetry', ipa: '/ˈsɪm.ə.tri/', pos: 'noun', vi: 'Tính đối xứng cân đối hai bên cơ thể', ex: 'Unilateral dumbbell work corrects muscular asymmetry.', cefr: 'B2' },
        ]
      }
    ]
  },

  {
    id: 'topic-health-wellness',
    categoryId: 'wellness',
    nameEn: 'Mindful Health & Longevity Habits',
    nameVi: 'Chăm sóc Sức khỏe & Thói quen Trường thọ',
    description: 'Y khoa dự phòng, chu kỳ sinh học giấc ngủ, cân bằng tâm lý và giải pháp tăng tuổi thọ.',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    cefrRange: 'A2 - B2',
    status: 'In Progress',
    progress: 20,
    branches: [
      {
        id: 'branch-hlth-preventive',
        label: 'Preventive Care & Vital Signs',
        labelVi: 'Y tế dự phòng & Chỉ số sinh tồn',
        color: '#FB7185',
        words: [
          { word: 'Hypertension', ipa: '/ˌhaɪ.pəˈten.ʃən/', pos: 'noun', vi: 'Huyết áp cao mạn tính', ex: 'Reducing sodium intake lowers risk of hypertension.', cefr: 'B2' },
          { word: 'Screening', ipa: '/ˈskriː.nɪŋ/', pos: 'noun', vi: 'Tầm soát phát hiện bệnh sớm', ex: 'Annual medical screening detects anomalies early.', cefr: 'B1' },
          { word: 'Diagnosis', ipa: '/ˌdaɪ.əɡˈnəʊ.sɪs/', pos: 'noun', vi: 'Chẩn đoán bệnh lý chính xác', ex: 'The doctor confirmed the diagnosis via blood tests.', cefr: 'B2' },
          { word: 'Cholesterol', ipa: '/kəˈles.tər.ɒl/', pos: 'noun', vi: 'Mỡ máu cholesterol', ex: 'Regular cardio balances good HDL cholesterol.', cefr: 'B1' },
          { word: 'Glucose', ipa: '/ˈɡluː.kəʊs/', pos: 'noun', vi: 'Lượng đường huyết trong máu', ex: 'Fasting glucose levels indicate metabolic health.', cefr: 'B2' },
          { word: 'Vaccination', ipa: '/ˌvæk.sɪˈneɪ.ʃən/', pos: 'noun', vi: 'Tiêm chủng phòng ngừa', ex: 'Flu vaccination shields elderly populations.', cefr: 'B1' },
          { word: 'Prescription', ipa: '/prɪˈskrɪp.ʃən/', pos: 'noun', vi: 'Đơn thuốc điều trị của bác sĩ', ex: 'Always complete the full antibiotic prescription.', cefr: 'A2' },
          { word: 'Consultation', ipa: '/ˌkɒn.sʌlˈteɪ.ʃən/', pos: 'noun', vi: 'Buổi thăm khám tư vấn y khoa', ex: 'Book a consultation with a certified dermatologist.', cefr: 'B1' },
          { word: 'Biomarker', ipa: '/ˈbaɪ.əʊˌmɑː.kər/', pos: 'noun', vi: 'Chỉ dấu sinh học sức khỏe', ex: 'Inflammatory biomarkers fell following diet changes.', cefr: 'C1' },
          { word: 'Dosage', ipa: '/ˈdəʊ.sɪdʒ/', pos: 'noun', vi: 'Liều lượng dùng thuốc', ex: 'Exceeding the recommended dosage causes side effects.', cefr: 'B1' },
          { word: 'Prognosis', ipa: '/prɒɡˈnəʊ.sɪs/', pos: 'noun', vi: 'Tiên lượng diễn tiến bệnh', ex: 'Early treatment ensures an excellent long-term prognosis.', cefr: 'C1' },
          { word: 'Checkup', ipa: '/ˈtʃek.ʌp/', pos: 'noun', vi: 'Khám sức khỏe tổng quát', ex: 'Schedule an annual dental checkup every six months.', cefr: 'A2' },
          { word: 'Remedy', ipa: '/ˈrem.ə.di/', pos: 'noun', vi: 'Phương thuốc xoa dịu triệu chứng', ex: 'Honey and warm lemon water is a soothing cough remedy.', cefr: 'B1' },
          { word: 'Pathogen', ipa: '/ˈpæθ.ə.dʒən/', pos: 'noun', vi: 'Mầm bệnh vi sinh vật', ex: 'Washing hands destroys airborne pathogens.', cefr: 'B2' },
          { word: 'Therapy', ipa: '/ˈθer.ə.pi/', pos: 'noun', vi: 'Liệu pháp điều trị khoa học', ex: 'Physical therapy restored full shoulder mobility.', cefr: 'B1' },
        ]
      },
      {
        id: 'branch-hlth-mental',
        label: 'Mental Wellbeing & Circadian Sleep',
        labelVi: 'Sức khỏe tinh thần & Giấc ngủ sinh học',
        color: '#38BDF8',
        words: [
          { word: 'Mindfulness', ipa: '/ˈmaɪnd.fəl.nəs/', pos: 'noun', vi: 'Chánh niệm hiện diện trong giây phút', ex: 'Ten minutes of mindfulness calms racing thoughts.', cefr: 'B1' },
          { word: 'Circadian', ipa: '/sɜːˈkeɪ.di.ən/', pos: 'adj', vi: 'Nhịp sinh học ngày đêm 24 giờ', ex: 'Morning sunlight synchronizes your circadian rhythm.', cefr: 'B2' },
          { word: 'Melatonin', ipa: '/ˌmel.əˈtəʊ.nɪn/', pos: 'noun', vi: 'Hormone điều hòa cơn buồn ngủ', ex: 'Dimming blue light triggers natural melatonin release.', cefr: 'B2' },
          { word: 'Cortisol', ipa: '/ˈkɔː.tɪ.zɒl/', pos: 'noun', vi: 'Hormone gây căng thẳng và cảnh giác', ex: 'Chronic stress leads to elevated cortisol spikes.', cefr: 'B2' },
          { word: 'Resilience', ipa: '/rɪˈzɪl.jəns/', pos: 'noun', vi: 'Khả năng phục hồi vượt nghịch cảnh', ex: 'Psychological resilience helps navigate workplace burnout.', cefr: 'B2' },
          { word: 'Anxiety', ipa: '/æŋˈzaɪ.ə.ti/', pos: 'noun', vi: 'Cảm giác âu lo bồn chồn', ex: 'Controlled box breathing eases acute social anxiety.', cefr: 'B1' },
          { word: 'Meditation', ipa: '/ˌmed.ɪˈteɪ.ʃən/', pos: 'noun', vi: 'Thiền định tĩnh tâm', ex: 'Daily meditation thickens gray matter in the brain.', cefr: 'B1' },
          { word: 'Insomnia', ipa: '/ɪnˈsɒm.ni.ə/', pos: 'noun', vi: 'Chứng mất ngủ mạn tính', ex: 'Cognitive behavioral therapy effectively cures insomnia.', cefr: 'B2' },
          { word: 'Serotonin', ipa: '/ˌser.əˈtəʊ.nɪn/', pos: 'noun', vi: 'Chất dẫn truyền thần kinh hạnh phúc', ex: 'Outdoor walks stimulate mood-boosting serotonin.', cefr: 'B2' },
          { word: 'Burnout', ipa: '/ˈbɜːn.aʊt/', pos: 'noun', vi: 'Kiệt sức tinh thần do công việc', ex: 'Taking mandatory vacations prevents executive burnout.', cefr: 'B1' },
          { word: 'Dopamine', ipa: '/ˈdəʊ.pə.miːn/', pos: 'noun', vi: 'Chất dẫn truyền động lực tưởng thưởng', ex: 'Completing goals triggers healthy dopamine surges.', cefr: 'B2' },
          { word: 'Equanimity', ipa: '/ˌek.wəˈnɪm.ə.ti/', pos: 'noun', vi: 'Tâm thái an nhiên điềm tĩnh', ex: 'Stoic philosophy cultivates lasting emotional equanimity.', cefr: 'C1' },
          { word: 'Restoration', ipa: '/ˌres.tərˈeɪ.ʃən/', pos: 'noun', vi: 'Sự hồi sinh năng lượng', ex: 'A weekend in nature brings mental restoration.', cefr: 'B2' },
          { word: 'Subconscious', ipa: '/ˌsʌbˈkɒn.ʃəs/', pos: 'adj', vi: 'Thuộc tiềm thức thầm kín', ex: 'Dreams process subconscious memories during REM sleep.', cefr: 'B2' },
          { word: 'Catharsis', ipa: '/kəˈθɑː.sɪs/', pos: 'noun', vi: 'Sự thanh tẩy giải tỏa cảm xúc', ex: 'Journaling raw emotions provides therapeutic catharsis.', cefr: 'C1' },
        ]
      },
      {
        id: 'branch-hlth-immunity',
        label: 'Immunity & Cellular Longevity',
        labelVi: 'Miễn dịch tế bào & Tuổi thọ trường tồn',
        color: '#10B981',
        words: [
          { word: 'Autophagy', ipa: '/ɔːˈtɒf.ə.dʒi/', pos: 'noun', vi: 'Cơ chế tự thực bào dọn rác tế bào', ex: 'Intermittent fasting induces healthy cellular autophagy.', cefr: 'C1' },
          { word: 'Antibody', ipa: '/ˈæn.tiˌbɒd.i/', pos: 'noun', vi: 'Kháng thể bảo vệ cơ thể', ex: 'Vaccines stimulate specific neutralizing antibodies.', cefr: 'B2' },
          { word: 'Microbiome', ipa: '/ˌmaɪ.krəʊˈbaɪ.əʊm/', pos: 'noun', vi: 'Hệ vi sinh vật đường ruột', ex: 'Fermented foods nourish a diverse gut microbiome.', cefr: 'B2' },
          { word: 'Longevity', ipa: '/lɒnˈdʒev.ə.ti/', pos: 'noun', vi: 'Tuổi thọ và sự sống trường thọ', ex: 'Regular social connection is a key predictor of longevity.', cefr: 'B2' },
          { word: 'Telomere', ipa: '/ˈtel.ə.mɪər/', pos: 'noun', vi: 'Đầu mút nhiễm sắc thể chống lão hóa', ex: 'Healthy lifestyle habits preserve protective telomeres.', cefr: 'C1' },
          { word: 'Mitochondria', ipa: '/ˌmaɪ.təʊˈkɒn.dri.ə/', pos: 'noun', vi: 'Nhà máy năng lượng tế bào', ex: 'Zone 2 cardio training boosts mitochondrial density.', cefr: 'C1' },
          { word: 'Senescence', ipa: '/sɪˈnes.əns/', pos: 'noun', vi: 'Hiện tượng lão hóa tế bào ngừng phân chia', ex: 'Eliminating senescent cells rejuvenates aged organs.', cefr: 'C1' },
          { word: 'Immunity', ipa: '/ɪˈmjuː.nə.ti/', pos: 'noun', vi: 'Khả năng miễn dịch tự nhiên', ex: 'Zinc and vitamin C bolster mucosal immunity.', cefr: 'B1' },
          { word: 'Detoxification', ipa: '/diːˌtɒk.sɪ.fɪˈkeɪ.ʃən/', pos: 'noun', vi: 'Thải độc gan và thận', ex: 'The liver is the primary organ for natural detoxification.', cefr: 'B2' },
          { word: 'Regeneration', ipa: '/rɪˌdʒen.əˈreɪ.ʃən/', pos: 'noun', vi: 'Tái tạo tế bào trẻ hóa', ex: 'Cold exposure triggers stem cell regeneration.', cefr: 'B2' },
          { word: 'Inflammaging', ipa: '/ɪnˈflæmˌeɪ.dʒɪŋ/', pos: 'noun', vi: 'Lão hóa do viêm âm ỉ kéo dài', ex: 'Anti-inflammatory diets combat premature inflammaging.', cefr: 'C1' },
          { word: 'Homeostasis', ipa: '/ˌhəʊ.mi.əʊˈsteɪ.sɪs/', pos: 'noun', vi: 'Cân bằng nội môi sinh học', ex: 'The human body constantly seeks physiological homeostasis.', cefr: 'B2' },
          { word: 'Probiotics', ipa: '/ˌprəʊ.baɪˈɒt.ɪks/', pos: 'noun', vi: 'Lợi khuẩn đường ruột', ex: 'Yogurt and kefir supply live active probiotics.', cefr: 'B1' },
          { word: 'Resveratrol', ipa: '/rezˈver.ə.trɒl/', pos: 'noun', vi: 'Hợp chất chống oxy hóa tự nhiên', ex: 'Resveratrol in grapes activates sirtuin longevity genes.', cefr: 'C1' },
          { word: 'Vigor', ipa: '/ˈvɪɡ.ər/', pos: 'noun', vi: 'Sinh lực dồi dào tráng kiện', ex: 'Daily movement restores youthfulness and physical vigor.', cefr: 'B2' },
        ]
      },
      {
        id: 'branch-hlth-lifestyle',
        label: 'Holistic Habits & Daily Vitality',
        labelVi: 'Thói quen toàn diện & Sức sống thường nhật',
        color: '#F59E0B',
        words: [
          { word: 'Moderation', ipa: '/ˌmɒd.ərˈeɪ.ʃən/', pos: 'noun', vi: 'Sự điều độ chừng mực', ex: 'Enjoy treats in moderation without guilt.', cefr: 'B1' },
          { word: 'Sedentary', ipa: '/ˈsed.ən.tər.i/', pos: 'adj', vi: 'Lối sống ít vận động ngồi nhiều', ex: 'A sedentary lifestyle increases cardiovascular dangers.', cefr: 'B2' },
          { word: 'Ergonomic', ipa: '/ˌɜː.ɡəˈnɒm.ɪk/', pos: 'adj', vi: 'Công thái học hỗ trợ cơ xương', ex: 'An ergonomic chair prevents chronic back tension.', cefr: 'B2' },
          { word: 'Vitality', ipa: '/vaɪˈtæl.ə.ti/', pos: 'noun', vi: 'Sức sống và năng lượng căng tràn', ex: 'Morning hydration fuels immediate mental vitality.', cefr: 'B2' },
          { word: 'Nourishment', ipa: '/ˈnʌr.ɪʃ.mənt/', pos: 'noun', vi: 'Nguồn dinh dưỡng nuôi dưỡng cơ thể', ex: 'Whole real foods provide foundational body nourishment.', cefr: 'B2' },
          { word: 'Equilibrium', ipa: '/ˌek.wɪˈlɪb.ri.əm/', pos: 'noun', vi: 'Sự cân bằng công việc và cuộc sống', ex: 'Set boundaries to preserve work-life equilibrium.', cefr: 'B2' },
          { word: 'Recharge', ipa: '/riːˈtʃɑːdʒ/', pos: 'verb', vi: 'Nạp lại năng lượng phục hồi', ex: 'Take a short afternoon stroll to recharge your focus.', cefr: 'A2' },
          { word: 'Breathing', ipa: '/ˈbriː.ðɪŋ/', pos: 'noun', vi: 'Hơi thở điều khí', ex: 'Slow diaphragmatic breathing activates the vagus nerve.', cefr: 'A2' },
          { word: 'Thermal', ipa: '/ˈθɜː.məl/', pos: 'adj', vi: 'Thuộc nhiệt độ nóng lạnh', ex: 'Saunas provide thermal stress conditioning.', cefr: 'B2' },
          { word: 'Consistency', ipa: '/kənˈsɪs.tən.si/', pos: 'noun', vi: 'Tính kiên trì bền bỉ', ex: 'Consistency trumps intensity in health habits.', cefr: 'B1' },
          { word: 'Fasting', ipa: '/ˈfɑːs.tɪŋ/', pos: 'noun', vi: 'Nhịn ăn gián đoạn', ex: 'Time-restricted fasting improves insulin sensitivity.', cefr: 'B1' },
          { word: 'Posture', ipa: '/ˈpɒs.tʃər/', pos: 'noun', vi: 'Dáng đứng chuẩn không gù lưng', ex: 'Be conscious of shoulder posture while at computers.', cefr: 'B1' },
          { word: 'Flexibility', ipa: '/ˌflek.səˈbɪl.ə.ti/', pos: 'noun', vi: 'Sự linh hoạt mềm dẻo', ex: 'Yoga fosters both mental and muscular flexibility.', cefr: 'B1' },
          { word: 'Hydrate', ipa: '/haɪˈdreɪt/', pos: 'verb', vi: 'Bổ sung nước thường xuyên', ex: 'Hydrate before you feel thirsty throughout the day.', cefr: 'A2' },
          { word: 'Serenity', ipa: '/səˈren.ə.ti/', pos: 'noun', vi: 'Sự thanh bình tĩnh lặng tâm hồn', ex: 'Nature walks invoke profound mental serenity.', cefr: 'B2' },
        ]
      }
    ]
  },

  {
    id: 'topic-culinary-mastery',
    categoryId: 'culinary',
    nameEn: 'Gastronomy & Culinary Techniques',
    nameVi: 'Nghệ thuật Ẩm thực & Kỹ thuật Nấu bếp',
    description: 'Từ vựng đầu bếp chuẩn quốc tế: kỹ thuật nhiệt, phối vị umami, gia vị thế giới và bánh ngọt.',
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
    cefrRange: 'A2 - B2',
    status: 'In Progress',
    progress: 15,
    branches: [
      {
        id: 'branch-cul-techniques',
        label: 'Cooking Methods & Heat Control',
        labelVi: 'Phương pháp nấu & Kiểm soát nhiệt',
        color: '#F59E0B',
        words: [
          { word: 'Simmer', ipa: '/ˈsɪm.ər/', pos: 'verb', vi: 'Ninh nhỏ lửa liu riu', ex: 'Simmer the bone broth gently for six hours.', cefr: 'B1' },
          { word: 'Marinate', ipa: '/ˈmær.ɪ.neɪt/', pos: 'verb', vi: 'Tẩm ướp gia vị ngấm sâu', ex: 'Marinate steak in rosemary and garlic olive oil.', cefr: 'B1' },
          { word: 'Sous-vide', ipa: '/suːˈviːd/', pos: 'noun', vi: 'Nấu hút chân không nhiệt độ chuẩn', ex: 'Sous-vide cooking locks in succulent moisture.', cefr: 'B2' },
          { word: 'Sear', ipa: '/sɪər/', pos: 'verb', vi: 'Áp chảo lửa lớn tạo lớp vỏ thơm', ex: 'Sear the scallops on high heat for two minutes.', cefr: 'B2' },
          { word: 'Poach', ipa: '/pəʊtʃ/', pos: 'verb', vi: 'Chần nước sôi nhẹ không vỡ', ex: 'Poached eggs top the morning avocado toast.', cefr: 'B1' },
          { word: 'Caramelize', ipa: '/ˈkær.ə.məl.aɪz/', pos: 'verb', vi: 'Thắng đường caramen / xào ngọt', ex: 'Slowly caramelize yellow onions until golden brown.', cefr: 'B2' },
          { word: 'Blanch', ipa: '/blɑːntʃ/', pos: 'verb', vi: 'Trần qua nước sôi rồi ngâm đá', ex: 'Blanch green asparagus to preserve crisp vibrant color.', cefr: 'B2' },
          { word: 'Deglaze', ipa: '/diːˈɡleɪz/', pos: 'verb', vi: 'Thêm rượu/nước lấy cặn chảo sốt', ex: 'Deglaze the skillet with red wine for rich pan sauce.', cefr: 'C1' },
          { word: 'Braise', ipa: '/breɪz/', pos: 'verb', vi: 'Om, kho hầm kín nắp lâu', ex: 'Braise short ribs in aromatics until tender.', cefr: 'B2' },
          { word: 'Roast', ipa: '/rəʊst/', pos: 'verb', vi: 'Nướng lò nguyên con hoặc tảng lớn', ex: 'Roast a whole chicken with lemon and thyme.', cefr: 'A2' },
          { word: 'Broil', ipa: '/brɔɪl/', pos: 'verb', vi: 'Nướng nhiệt trực tiếp từ phía trên', ex: 'Broil the salmon skin until delightfully blistered.', cefr: 'B1' },
          { word: 'Steam', ipa: '/stiːm/', pos: 'verb', vi: 'Hấp cách thủy giữ dinh dưỡng', ex: 'Steam delicate fish fillets with ginger slivers.', cefr: 'A2' },
          { word: 'Sauté', ipa: '/ˈsəʊ.teɪ/', pos: 'verb', vi: 'Xào nhanh tay với lượng dầu nhỏ', ex: 'Sauté sliced mushrooms in sweet clarified butter.', cefr: 'B1' },
          { word: 'Reduce', ipa: '/rɪˈdʒuːs/', pos: 'verb', vi: 'Đun cạn cô đặc nước sốt', ex: 'Reduce balsamic vinegar into a syrupy glaze.', cefr: 'B1' },
          { word: 'Infuse', ipa: '/ɪnˈfjuːz/', pos: 'verb', vi: 'Hãm chiết xuất mùi hương thảo mộc', ex: 'Infuse cream with real vanilla bean pods.', cefr: 'B2' },
        ]
      },
      {
        id: 'branch-cul-flavors',
        label: 'Flavor Profiles & Seasonings',
        labelVi: 'Tầng vị giác & Gia vị quốc tế',
        color: '#38BDF8',
        words: [
          { word: 'Umami', ipa: '/uːˈmɑː.mi/', pos: 'noun', vi: 'Vị ngọt thịt đậm đà thứ năm', ex: 'Aged parmesan cheese delivers an explosion of umami.', cefr: 'B1' },
          { word: 'Zest', ipa: '/zest/', pos: 'noun', vi: 'Vỏ bào tinh dầu cam chanh', ex: 'Grate fresh lemon zest over the creamy pasta.', cefr: 'B2' },
          { word: 'Astringent', ipa: '/əˈstrɪn.dʒənt/', pos: 'adj', vi: 'Vị chát làm se gai lưỡi', ex: 'Unripe persimmons possess an astringent mouthfeel.', cefr: 'C1' },
          { word: 'Piquant', ipa: '/ˈpiː.kənt/', pos: 'adj', vi: 'Vị cay nồng kích thích hấp dẫn', ex: 'The piquant mustard balances rich fatty meats.', cefr: 'B2' },
          { word: 'Aromatic', ipa: '/ˌær.əˈmæt.ɪk/', pos: 'adj', vi: 'Tỏa ngát hương thơm thảo mộc', ex: 'Star anise and cinnamon create aromatic pho broth.', cefr: 'B1' },
          { word: 'Acidity', ipa: '/əˈsɪd.ə.ti/', pos: 'noun', vi: 'Độ chua cân bằng độ béo', ex: 'A squeeze of lime adds vibrant acidity to soups.', cefr: 'B2' },
          { word: 'Condiment', ipa: '/ˈkɒn.dɪ.mənt/', pos: 'noun', vi: 'Nước chấm gia vị ăn kèm', ex: 'Dijon mustard is an essential condiment.', cefr: 'B1' },
          { word: 'Herb', ipa: '/hɜːb/', pos: 'noun', vi: 'Thảo mộc lá xanh tạo mùi', ex: 'Fresh basil is an indispensable Italian herb.', cefr: 'A2' },
          { word: 'Spice', ipa: '/spaɪs/', pos: 'noun', vi: 'Gia vị cay từ hạt hoặc vỏ cây', ex: 'Cardamom is a fragrant and prized baking spice.', cefr: 'A2' },
          { word: 'Savory', ipa: '/ˈseɪ.vər.i/', pos: 'adj', vi: 'Có vị mặn mà đậm đà', ex: 'Savory pies satisfy hearty winter cravings.', cefr: 'B1' },
          { word: 'Palate', ipa: '/ˈpæl.ət/', pos: 'noun', vi: 'Khẩu vị vị giác sành ăn', ex: 'Wine tasting refines a connoisseur’s palate.', cefr: 'B2' },
          { word: 'Reduction', ipa: '/rɪˈdʌk.ʃən/', pos: 'noun', vi: 'Nước sốt cô đặc đậm vị', ex: 'Drizzle a rich port wine reduction over duck.', cefr: 'B2' },
          { word: 'Garnish', ipa: '/ˈɡɑː.nɪʃ/', pos: 'noun', vi: 'Rau thơm trang trí món ăn', ex: 'Sprinkle microgreens as a fresh final garnish.', cefr: 'B1' },
          { word: 'Brine', ipa: '/braɪn/', pos: 'noun', vi: 'Nước muối ngâm mặn ướp thịt', ex: 'Submerge turkey in herb brine for Thanksgiving.', cefr: 'B2' },
          { word: 'Emulsion', ipa: '/ɪˈmʌl.ʃən/', pos: 'noun', vi: 'Hỗn hợp nhũ tương hòa quyện dầu nước', ex: 'Hollandaise sauce is a warm butter emulsion.', cefr: 'C1' },
        ]
      },
      {
        id: 'branch-cul-tools',
        label: 'Kitchen Equipment & Mise en Place',
        labelVi: 'Dụng cụ chuyên nghiệp & Chuẩn bị nguyên liệu',
        color: '#10B981',
        words: [
          { word: 'Mandoline', ipa: '/ˈmæn.dəl.ɪn/', pos: 'noun', vi: 'Bàn bào lát mỏng đều tay', ex: 'Slice radishes paper-thin with a mandoline.', cefr: 'B2' },
          { word: 'Colander', ipa: '/ˈkɒl.ɪn.dər/', pos: 'noun', vi: 'Rổ ráo nước có chân đế', ex: 'Drain boiled pasta thoroughly in a colander.', cefr: 'B1' },
          { word: 'Spatula', ipa: '/ˈspætʃ.ə.lə/', pos: 'noun', vi: 'Xẻng lật silicone vét bột chảo', ex: 'Use a silicone spatula to scrape batter cleanly.', cefr: 'A2' },
          { word: 'Skillet', ipa: '/ˈskɪl.ɪt/', pos: 'noun', vi: 'Chảo gang lòng phẳng', ex: 'Preheat a heavy cast-iron skillet for steaks.', cefr: 'B1' },
          { word: 'Mortar and Pestle', ipa: '/ˈmɔː.tər ənd ˈpes.əl/', pos: 'noun', vi: 'Cối và chày giã gia vị', ex: 'Grind whole cumin seeds in a stone mortar and pestle.', cefr: 'B2' },
          { word: 'Whisk', ipa: '/wɪsk/', pos: 'noun', vi: 'Cây đánh trứng lồng thép', ex: 'Beat egg whites with a balloon whisk into stiff peaks.', cefr: 'A2' },
          { word: 'Paring Knife', ipa: '/ˈpeə.rɪŋ naɪf/', pos: 'noun', vi: 'Dao gọt tỉa hoa quả nhỏ', ex: 'Peel apples effortlessly with a razor-sharp paring knife.', cefr: 'B1' },
          { word: 'Casserole', ipa: '/ˈkæs.ər.əʊl/', pos: 'noun', vi: 'Nồi đất đút lò hầm thịt', ex: 'Slow-cook beef stew in an enameled casserole pot.', cefr: 'B1' },
          { word: 'Tongs', ipa: '/tɒŋz/', pos: 'noun', vi: 'Kẹp gắp đồ nóng inox', ex: 'Turn searing chops safely using long kitchen tongs.', cefr: 'A2' },
          { word: 'Ladle', ipa: '/ˈleɪ.dəl/', pos: 'noun', vi: 'Muôi múc canh sâu lòng', ex: 'Ladle hearty vegetable soup into warm bowls.', cefr: 'A2' },
          { word: 'Thermometer', ipa: '/θəˈmɒm.ɪ.tər/', pos: 'noun', vi: 'Nhiệt kế đo lõi thức ăn', ex: 'An instant-read meat thermometer guarantees food safety.', cefr: 'B1' },
          { word: 'Cull', ipa: '/kʌl/', pos: 'verb', vi: 'Loại bỏ nguyên liệu dập hỏng', ex: 'Cull damaged berries before simmering preserves.', cefr: 'C1' },
          { word: 'Blender', ipa: '/ˈblen.dər/', pos: 'noun', vi: 'Máy xay sinh tố công suất cao', ex: 'Purée roasted pumpkin smoothly in a blender.', cefr: 'A2' },
          { word: 'Grater', ipa: '/ˈɡreɪ.tər/', pos: 'noun', vi: 'Dụng cụ mài pho mát sắc bén', ex: 'Shred aged cheddar over nachos with a box grater.', cefr: 'A2' },
          { word: 'Julienne', ipa: '/ˌdʒuː.liˈen/', pos: 'verb', vi: 'Thái sợi mỏng như que diêm', ex: 'Julienne crisp carrots for Vietnamese spring rolls.', cefr: 'B2' },
        ]
      },
      {
        id: 'branch-cul-pastry',
        label: 'Baking & Pastry Precision',
        labelVi: 'Nghệ thuật Làm bánh & Độ chuẩn xác',
        color: '#A78BFA',
        words: [
          { word: 'Fermentation', ipa: '/ˌfɜː.menˈteɪ.ʃən/', pos: 'noun', vi: 'Quá trình lên men bột nở', ex: 'Long sourdough fermentation builds complex flavor.', cefr: 'B2' },
          { word: 'Gluten', ipa: '/ˈɡluː.tən/', pos: 'noun', vi: 'Mạng lưới protein tạo độ dai bánh', ex: 'Kneading develops the elastic gluten structure.', cefr: 'B1' },
          { word: 'Knead', ipa: '/niːd/', pos: 'verb', vi: 'Nhào nặn khối bột bánh mì', ex: 'Knead the bread dough until smooth and springy.', cefr: 'B1' },
          { word: 'Proofing', ipa: '/ˈpruː.fɪŋ/', pos: 'noun', vi: 'Ủ bột lần cuối trước khi nướng', ex: 'Let brioche dough complete proofing in a warm spot.', cefr: 'B2' },
          { word: 'Leavening', ipa: '/ˈlev.ən.ɪŋ/', pos: 'noun', vi: 'Tác nhân làm phồng nở bánh', ex: 'Baking powder serves as a reliable chemical leavening.', cefr: 'B2' },
          { word: 'Meringue', ipa: '/məˈræŋ/', pos: 'noun', vi: 'Kem trứng đánh bông với đường', ex: 'Pipe delicate French meringue onto baking sheets.', cefr: 'B2' },
          { word: 'Fondant', ipa: '/ˈfɒn.dənt/', pos: 'noun', vi: 'Đường dẻo bọc trang trí bánh kem', ex: 'Drape rolled fondant over the multi-tiered cake.', cefr: 'B2' },
          { word: 'Ganache', ipa: '/ɡəˈnæʃ/', pos: 'noun', vi: 'Sốt kem sô-cô-la mịn mượt', ex: 'Glaze chocolate tarts with a glossy dark ganache.', cefr: 'B2' },
          { word: 'Crumble', ipa: '/ˈkrʌm.bəl/', pos: 'noun', vi: 'Vụn bánh nướng giòn ngọt', ex: 'Top warm cinnamon apples with an oat crumble.', cefr: 'B1' },
          { word: 'Drizzle', ipa: '/ˈdrɪz.əl/', pos: 'verb', vi: 'Rưới nhẹ đường siro lên mặt bánh', ex: 'Drizzle salted caramel sauce over warm brownies.', cefr: 'B1' },
          { word: 'Sift', ipa: '/sɪft/', pos: 'verb', vi: 'Rây bột loại bỏ vón cục', ex: 'Always sift cocoa powder to ensure uniform texture.', cefr: 'B1' },
          { word: 'Glaze', ipa: '/ɡleɪz/', pos: 'noun', vi: 'Lớp bóng phủ bề mặt bánh ngọt', ex: 'Brush pastries with egg wash for a golden glaze.', cefr: 'B1' },
          { word: 'Shortcrust', ipa: '/ˈʃɔːt.krʌst/', pos: 'noun', vi: 'Đế bánh bột ngàn lớp giòn tan', ex: 'Bake the buttery shortcrust shell until lightly browned.', cefr: 'B2' },
          { word: 'Aerate', ipa: '/ˈeə.reɪt/', pos: 'verb', vi: 'Đánh sục bọt khí tạo độ xốp', ex: 'Cream butter and sugar vigorously to aerate the batter.', cefr: 'C1' },
          { word: 'Parchment', ipa: '/ˈpɑːtʃ.mənt/', pos: 'noun', vi: 'Giấy nến chống dính khay bánh', ex: 'Line cookie baking trays with silicone parchment paper.', cefr: 'B1' },
        ]
      }
    ]
  },

  {
    id: 'topic-household-modern',
    categoryId: 'household',
    nameEn: 'Smart Living & Household Appliances',
    nameVi: 'Đời sống Hiện đại & Vật dụng Gia đình',
    description: 'Tên gọi chuẩn xác đồ dùng nội thất, thiết bị thông minh, phòng ốc và công cụ bảo dưỡng nhà.',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    cefrRange: 'A1 - B1',
    status: 'Not Started',
    progress: 0,
    branches: [
      {
        id: 'branch-home-living',
        label: 'Living Room & Furniture',
        labelVi: 'Phòng khách & Nội thất tiện nghi',
        color: '#A78BFA',
        words: [
          { word: 'Upholstery', ipa: '/ʌpˈhəʊl.stər.i/', pos: 'noun', vi: 'Vải bọc đệm ghế sofa cao cấp', ex: 'Choose stain-resistant upholstery for the family sofa.', cefr: 'B2' },
          { word: 'Armchair', ipa: '/ˈɑːm.tʃeər/', pos: 'noun', vi: 'Ghế bành đơn có tay vịn', ex: 'Curl up with a good novel in the leather armchair.', cefr: 'A1' },
          { word: 'Chandelier', ipa: '/ˌʃæn.dəˈlɪər/', pos: 'noun', vi: 'Đèn chùm pha lê trần nhà', ex: 'A sparkling crystal chandelier illuminates the foyer.', cefr: 'B1' },
          { word: 'Fireplace', ipa: '/ˈfaɪə.pleɪs/', pos: 'noun', vi: 'Lò sưởi ấm gia đình', ex: 'Logs crackled peacefully inside the stone fireplace.', cefr: 'A2' },
          { word: 'Ottoman', ipa: '/ˈɒt.ə.mən/', pos: 'noun', vi: 'Ghế đẩu bọc đệm kiêm để chân', ex: 'Rest tired feet on the plush velvet ottoman.', cefr: 'B1' },
          { word: 'Curtain', ipa: '/ˈkɜː.tən/', pos: 'noun', vi: 'Rèm cửa chắn sáng', ex: 'Draw the blackout curtains to block midday glare.', cefr: 'A2' },
          { word: 'Coffee Table', ipa: '/ˈkɒf.i ˌteɪ.bəl/', pos: 'noun', vi: 'Bàn trà tiếp khách trung tâm', ex: 'Art magazines rest neatly on the marble coffee table.', cefr: 'A1' },
          { word: 'Rug', ipa: '/rʌɡ/', pos: 'noun', vi: 'Thảm trải sàn phòng khách', ex: 'A hand-woven wool rug warms the hardwood floor.', cefr: 'A2' },
          { word: 'Thermostat', ipa: '/ˈθɜː.mə.stæt/', pos: 'noun', vi: 'Bộ điều nhiệt độ thông minh', ex: 'Program the smart thermostat to lower heat at night.', cefr: 'B1' },
          { word: 'Bookshelf', ipa: '/ˈbʊk.ʃelf/', pos: 'noun', vi: 'Kệ sách nhiều tầng', ex: 'Floor-to-ceiling bookshelves line the library wall.', cefr: 'A2' },
          { word: 'Sideboard', ipa: '/ˈsaɪd.bɔːd/', pos: 'noun', vi: 'Tủ đựng đồ thấp kê sát tường', ex: 'Store formal china and tablecloths inside the sideboard.', cefr: 'B1' },
          { word: 'Ceiling Fan', ipa: '/ˈsiː.lɪŋ fæn/', pos: 'noun', vi: 'Quạt trần làm mát dịu', ex: 'Turn on the quiet ceiling fan during humid evenings.', cefr: 'A2' },
          { word: 'Mirror', ipa: '/ˈmɪr.ər/', pos: 'noun', vi: 'Gương soi viền nghệ thuật', ex: 'A gilded mirror expands the perceived room size.', cefr: 'A2' },
          { word: 'Cushion', ipa: '/ˈkʊʃ.ən/', pos: 'noun', vi: 'Gối tựa lưng êm ái', ex: 'Add decorative throw cushions to liven up the couch.', cefr: 'A2' },
          { word: 'Console', ipa: '/ˈkɒn.səʊl/', pos: 'noun', vi: 'Bàn hẹp kê hành lang / tivi', ex: 'Place decorative vases on the wooden hallway console.', cefr: 'B1' },
        ]
      },
      {
        id: 'branch-home-appliances',
        label: 'Kitchen & Smart Home Tech',
        labelVi: 'Thiết bị bếp & Nhà thông minh',
        color: '#38BDF8',
        words: [
          { word: 'Refrigerator', ipa: '/rɪˈfrɪdʒ.ər.eɪ.tər/', pos: 'noun', vi: 'Tủ lạnh bảo quản thực phẩm', ex: 'Store perishable dairy products inside the refrigerator.', cefr: 'A1' },
          { word: 'Dishwasher', ipa: '/ˈdɪʃˌwɒʃ.ər/', pos: 'noun', vi: 'Máy rửa chén bát tự động', ex: 'Load greasy dishes into the dishwasher after dinner.', cefr: 'A2' },
          { word: 'Microwave', ipa: '/ˈmaɪ.krə.weɪv/', pos: 'noun', vi: 'Lò vi sóng hâm nóng nhanh', ex: 'Reheat leftovers in the microwave for two minutes.', cefr: 'A2' },
          { word: 'Induction Cooktop', ipa: '/ɪnˈdʌk.ʃən ˈkʊk.tɒp/', pos: 'noun', vi: 'Bếp từ cảm ứng an toàn', ex: 'The induction cooktop boils water twice as fast.', cefr: 'B1' },
          { word: 'Range Hood', ipa: '/reɪndʒ hʊd/', pos: 'noun', vi: 'Máy hút mùi khói nhà bếp', ex: 'Switch on the range hood while searing fish.', cefr: 'B1' },
          { word: 'Air Fryer', ipa: '/eər ˈfraɪ.ər/', pos: 'noun', vi: 'Nồi chiên không dầu giòn', ex: 'Crisp chicken wings effortlessly in the air fryer.', cefr: 'A2' },
          { word: 'Toaster', ipa: '/ˈtəʊ.stər/', pos: 'noun', vi: 'Máy nướng bánh mì lát', ex: 'Drop two bread slices into the morning toaster.', cefr: 'A2' },
          { word: 'Kettle', ipa: '/ˈket.əl/', pos: 'noun', vi: 'Ấm đun nước siêu tốc', ex: 'The electric kettle whistles when water reaches boiling.', cefr: 'A2' },
          { word: 'Espresso Machine', ipa: '/eˈspres.əʊ məˈʃiːn/', pos: 'noun', vi: 'Máy pha cà phê áp suất', ex: 'Pull a velvety double shot from the espresso machine.', cefr: 'B1' },
          { word: 'Robot Vacuum', ipa: '/ˈrəʊ.bɒt ˈvæk.juːm/', pos: 'noun', vi: 'Robot hút bụi tự động', ex: 'The robot vacuum maps rooms via laser lidar sensors.', cefr: 'B1' },
          { word: 'Dehumidifier', ipa: '/ˌdiː.hjuːˈmɪd.ɪ.faɪ.ər/', pos: 'noun', vi: 'Máy hút ẩm chống nồm mốc', ex: 'Run the dehumidifier in basement laundry areas.', cefr: 'B2' },
          { word: 'Purifier', ipa: '/ˈpjʊə.rɪ.faɪ.ər/', pos: 'noun', vi: 'Máy lọc không khí bụi mịn HEPA', ex: 'An air purifier removes pet dander and pollen.', cefr: 'B1' },
          { word: 'Smart Plug', ipa: '/smɑːt plʌɡ/', pos: 'noun', vi: 'Ổ cắm điện điều khiển qua wifi', ex: 'Control floor lamps remotely using a smart plug.', cefr: 'B1' },
          { word: 'Garbage Disposal', ipa: '/ˈɡɑː.bɪdʒ dɪˈspəʊ.zəl/', pos: 'noun', vi: 'Máy xay rác thải bồn rửa', ex: 'Never drop avocado stones into the garbage disposal.', cefr: 'B2' },
          { word: 'Water Dispenser', ipa: '/ˈwɔː.tər dɪˈspen.sər/', pos: 'noun', vi: 'Cây cấp nước nóng lạnh', ex: 'Get chilled filtered water from the door dispenser.', cefr: 'A2' },
        ]
      },
      {
        id: 'branch-home-bath',
        label: 'Bathroom & Personal Care',
        labelVi: 'Phòng tắm & Chăm sóc cá nhân',
        color: '#10B981',
        words: [
          { word: 'Bathtub', ipa: '/ˈbɑːθ.tʌb/', pos: 'noun', vi: 'Bồn tắm thư giãn', ex: 'Soak in a hot bubble bathtub after a demanding day.', cefr: 'A2' },
          { word: 'Showerhead', ipa: '/ˈʃaʊ.ə.hed/', pos: 'noun', vi: 'Vòi hoa sen tắm áp lực', ex: 'Install a rainfall showerhead for luxury baths.', cefr: 'B1' },
          { word: 'Vanity', ipa: '/ˈvæn.ə.ti/', pos: 'noun', vi: 'Bàn gương bồn rửa mặt tủ đồ', ex: 'Keep toiletries organized beneath the bathroom vanity.', cefr: 'B2' },
          { word: 'Faucet', ipa: '/ˈfɔː.sɪt/', pos: 'noun', vi: 'Vòi nước nóng lạnh', ex: 'Fix the dripping faucet to conserve domestic water.', cefr: 'B1' },
          { word: 'Towel Rack', ipa: '/ˈtaʊ.əl ræk/', pos: 'noun', vi: 'Giá treo khăn tắm khô thoáng', ex: 'Hang plush towels onto the heated towel rack.', cefr: 'A2' },
          { word: 'Drain', ipa: '/dreɪn/', pos: 'noun', vi: 'Cống thoát nước sàn', ex: 'Clear caught hair from the shower floor drain.', cefr: 'A2' },
          { word: 'Scale', ipa: '/skeɪl/', pos: 'noun', vi: 'Cân điện tử đo trọng lượng', ex: 'Step onto the digital body weight scale weekly.', cefr: 'A2' },
          { word: 'Hamper', ipa: '/ˈhæm.pər/', pos: 'noun', vi: 'Giỏ đựng quần áo bẩn', ex: 'Toss worn gym shirts directly into the laundry hamper.', cefr: 'B1' },
          { word: 'Shaving Kit', ipa: '/ˈʃeɪ.vɪŋ kɪt/', pos: 'noun', vi: 'Bộ dao cạo râu cá nhân', ex: 'Pack your razor and aftershave inside the shaving kit.', cefr: 'A2' },
          { word: 'Hairdryer', ipa: '/ˈheəˌdraɪ.ər/', pos: 'noun', vi: 'Máy sấy tóc ion âm', ex: 'Blow-dry damp hair using a diffuser hairdryer.', cefr: 'A2' },
          { word: 'Exhaust Fan', ipa: '/ɪɡˈzɔːst fæn/', pos: 'noun', vi: 'Quạt thông gió hút ẩm', ex: 'Leave the exhaust fan running to prevent bathroom mold.', cefr: 'B1' },
          { word: 'Toothbrush', ipa: '/ˈtuːθ.brʌʃ/', pos: 'noun', vi: 'Bàn chải đánh răng sóng âm', ex: 'Replace your sonic electric toothbrush head quarterly.', cefr: 'A1' },
          { word: 'Loofah', ipa: '/ˈluː.fə/', pos: 'noun', vi: 'Bông tắm xơ mướp tẩy da chết', ex: 'Exfoliate gently with a natural organic loofah.', cefr: 'B1' },
          { word: 'Bidet', ipa: '/ˈbiː.deɪ/', pos: 'noun', vi: 'Vòi xịt vệ sinh thông minh', ex: 'Modern electronic bidets offer heated water seats.', cefr: 'B2' },
          { word: 'Plunger', ipa: '/ˈplʌn.dʒər/', pos: 'noun', vi: 'Dụng cụ thông tắc bồn cầu', ex: 'Keep a rubber plunger handy for household emergencies.', cefr: 'B1' },
        ]
      },
      {
        id: 'branch-home-maintenance',
        label: 'Home Maintenance & Hardware',
        labelVi: 'Bảo trì gia dụng & Công cụ sửa chữa',
        color: '#F59E0B',
        words: [
          { word: 'Screwdriver', ipa: '/ˈskruːˌdraɪ.vər/', pos: 'noun', vi: 'Tua-vít vặn ốc vít', ex: 'Tighten loose hinge screws with a Phillips screwdriver.', cefr: 'A2' },
          { word: 'Wrench', ipa: '/rentʃ/', pos: 'noun', vi: 'Cờ-lê mỏ lết vặn bu-lông', ex: 'Use an adjustable wrench to loosen the water pipe nut.', cefr: 'B1' },
          { word: 'Hammer', ipa: '/ˈhæm.ər/', pos: 'noun', vi: 'Búa đóng đinh', ex: 'Pound pictures hooks securely into drywall with a hammer.', cefr: 'A2' },
          { word: 'Pliers', ipa: '/ˈplaɪ.əz/', pos: 'noun', vi: 'Kìm kẹp cắt dây điện', ex: 'Grip stubborn nails firmly with heavy-duty pliers.', cefr: 'B1' },
          { word: 'Tape Measure', ipa: '/teɪp ˈmeʒ.ər/', pos: 'noun', vi: 'Thước cuộn đo đạc kích thước', ex: 'Check doorway clearance with a retractable tape measure.', cefr: 'A2' },
          { word: 'Step Stool', ipa: '/step stuːl/', pos: 'noun', vi: 'Thang gấp mini trong nhà', ex: 'Climb a sturdy step stool to change high ceiling bulbs.', cefr: 'B1' },
          { word: 'Circuit Breaker', ipa: '/ˈsɜː.kɪt ˌbreɪ.kər/', pos: 'noun', vi: 'Aptomat ngắt điện quá tải', ex: 'Reset the tripped circuit breaker in the electrical box.', cefr: 'B2' },
          { word: 'Drill', ipa: '/drɪl/', pos: 'noun', vi: 'Máy khoan cầm tay', ex: 'Bore anchor holes into concrete with a cordless drill.', cefr: 'B1' },
          { word: 'Extension Cord', ipa: '/ɪkˈsten.ʃən kɔːd/', pos: 'noun', vi: 'Dây nguồn nối dài', ex: 'Plug the lawnmower into a heavy outdoor extension cord.', cefr: 'B1' },
          { word: 'Flashlight', ipa: '/ˈflæʃ.laɪt/', pos: 'noun', vi: 'Đèn pin khẩn cấp', ex: 'Keep a rechargeable LED flashlight near the main door.', cefr: 'A2' },
          { word: 'Sealant', ipa: '/ˈsiː.lənt/', pos: 'noun', vi: 'Keo silicone trám khe hở', ex: 'Apply waterproof silicone sealant along bathtub seams.', cefr: 'B2' },
          { word: 'Hose', ipa: '/həʊz/', pos: 'noun', vi: 'Vòi ống mềm tưới cây sân vườn', ex: 'Coil the garden watering hose neatly on its reel.', cefr: 'A2' },
          { word: 'Insulation', ipa: '/ˌɪn.sjəˈleɪ.ʃən/', pos: 'noun', vi: 'Lớp vật liệu cách nhiệt chống rét', ex: 'Attic fiberglass insulation lowers winter heating bills.', cefr: 'B2' },
          { word: 'Fire Extinguisher', ipa: '/ˈfaɪər ɪkˌstɪŋ.ɡwɪ.ʃər/', pos: 'noun', vi: 'Bình chữa cháy mini cứu hỏa', ex: 'Mount a certified fire extinguisher in the kitchen.', cefr: 'B1' },
          { word: 'Lubricant', ipa: '/ˈluː.brɪ.kənt/', pos: 'noun', vi: 'Chất bôi trơn bản lề kêu', ex: 'Spray lubricant onto squeaky door hinges.', cefr: 'B2' },
        ]
      }
    ]
  },

  {
    id: 'topic-wildlife-ecosystem',
    categoryId: 'nature',
    nameEn: 'Fauna Kingdom & Wild Habitats',
    nameVi: 'Vương quốc Động vật & Sinh thái Rừng',
    description: 'Tập tính động vật hoang dã, chuỗi thức ăn sinh học, đại dương sâu thẳm và bảo tồn sinh quyển.',
    coverImage: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=1200&auto=format&fit=crop',
    cefrRange: 'A2 - B2',
    status: 'Not Started',
    progress: 0,
    branches: [
      {
        id: 'branch-wild-predators',
        label: 'Apex Predators & Mammals',
        labelVi: 'Động vật ăn thịt & Thú săn mồi đỉnh chuỗi',
        color: '#34D399',
        words: [
          { word: 'Predator', ipa: '/ˈpred.ə.tər/', pos: 'noun', vi: 'Động vật săn mồi ăn thịt', ex: 'Lions act as apex predators on African savannahs.', cefr: 'B1' },
          { word: 'Prey', ipa: '/preɪ/', pos: 'noun', vi: 'Con mồi bị săn đuổi', ex: 'Owls spot scurrying rodent prey in pitch darkness.', cefr: 'B1' },
          { word: 'Camouflage', ipa: '/ˈkæm.ə.flɑːʒ/', pos: 'noun', vi: 'Sự ngụy trang hòa mình vào môi trường', ex: 'Leopard rosette patterns provide seamless camouflage.', cefr: 'B2' },
          { word: 'Territory', ipa: '/ˈter.ɪ.tər.i/', pos: 'noun', vi: 'Lãnh thổ cai quản của bầy đàn', ex: 'Tigers patrol and scent-mark extensive home territory.', cefr: 'B1' },
          { word: 'Nocturnal', ipa: '/nɒkˈtɜː.nəl/', pos: 'adj', vi: 'Hoạt động kiếm ăn về đêm', ex: 'Bats are quintessential nocturnal flying mammals.', cefr: 'B2' },
          { word: 'Carnivore', ipa: '/ˈkɑː.nɪ.vɔːr/', pos: 'noun', vi: 'Động vật ăn thịt hoàn toàn', ex: 'Wolves are pack-hunting obligate carnivores.', cefr: 'B2' },
          { word: 'Herbivore', ipa: '/ˈhɜː.bɪ.vɔːr/', pos: 'noun', vi: 'Động vật chỉ ăn cỏ thực vật', ex: 'Elephants are gentle giant herbivores.', cefr: 'B2' },
          { word: 'Hibernate', ipa: '/ˈhaɪ.bə.neɪt/', pos: 'verb', vi: 'Ngủ đông giảm nhịp tim sinh học', ex: 'Grizzly bears hibernate inside caves during deep winter.', cefr: 'B1' },
          { word: 'Omnivore', ipa: '/ˈɒm.nɪ.vɔːr/', pos: 'noun', vi: 'Động vật ăn tạp đa dạng', ex: 'Brown bears forage berries and catch fish as omnivores.', cefr: 'B2' },
          { word: 'Fangs', ipa: '/fæŋz/', pos: 'noun', vi: 'Răng nanh nhọn hoắt xé thịt', ex: 'The viper injects venom through hollow front fangs.', cefr: 'B1' },
          { word: 'Claws', ipa: '/klɔːz/', pos: 'noun', vi: 'Móng vuốt sắc bén', ex: 'Eagles lock their talons and claws into slippery fish.', cefr: 'A2' },
          { word: 'Stalk', ipa: '/stɔːk/', pos: 'verb', vi: 'Rình mò bám theo con mồi êm ái', ex: 'Cheetahs stalk antelopes through tall golden grass.', cefr: 'B2' },
          { word: 'Pack', ipa: '/pæk/', pos: 'noun', vi: 'Đàn sói săn mồi có tổ chức', ex: 'Alpha wolves coordinate the strategic hunting pack.', cefr: 'A2' },
          { word: 'Mammal', ipa: '/ˈmæm.əl/', pos: 'noun', vi: 'Động vật có vú nuôi con bằng sữa', ex: 'Whales and dolphins are warm-blooded ocean mammals.', cefr: 'A2' },
          { word: 'Dominance', ipa: '/ˈdɒm.ɪ.nəns/', pos: 'noun', vi: 'Vị thế thống trị đầu đàn', ex: 'Gorilla silverbacks display chest beats to signal dominance.', cefr: 'B2' },
        ]
      },
      {
        id: 'branch-wild-marine',
        label: 'Marine Biology & Ocean Depths',
        labelVi: 'Sinh vật biển & Vực sâu đại dương',
        color: '#60A5FA',
        words: [
          { word: 'Bioluminescence', ipa: '/ˌbaɪ.əʊˌluː.mɪˈnes.əns/', pos: 'noun', vi: 'Hiện tượng phát quang sinh học tự nhiên', ex: 'Deep-sea anglerfish lure prey via bioluminescence.', cefr: 'C1' },
          { word: 'Coral Reef', ipa: '/ˈkɒr.əl riːf/', pos: 'noun', vi: 'Rạn san hô rực rỡ', ex: 'The Great Barrier Reef hosts a quarter of marine life.', cefr: 'B1' },
          { word: 'Cetacean', ipa: '/sɪˈteɪ.ʃən/', pos: 'noun', vi: 'Bộ cá voi, cá heo biển', ex: 'Blue whales are the largest cetaceans to ever exist.', cefr: 'C1' },
          { word: 'Echolocation', ipa: '/ˌek.əʊ.ləʊˈkeɪ.ʃən/', pos: 'noun', vi: 'Định vị bằng tiếng vang phản xạ', ex: 'Dolphins navigate murky waters using echolocation.', cefr: 'B2' },
          { word: 'Plankton', ipa: '/ˈplæŋk.tən/', pos: 'noun', vi: 'Sinh vật phù du nền tảng thức ăn', ex: 'Microscopic phytoplankton generate half the earth’s oxygen.', cefr: 'B2' },
          { word: 'Abyss', ipa: '/əˈbɪs/', pos: 'noun', vi: 'Vực sâu thăm thẳm không ánh sáng', ex: 'Bizarre creatures endure crushing pressures in the abyss.', cefr: 'B2' },
          { word: 'Crustacean', ipa: '/krʌsˈteɪ.ʃən/', pos: 'noun', vi: 'Động vật giáp xác có vỏ cứng (tôm, cua)', ex: 'Lobsters and crabs molt their hard crustacean shells.', cefr: 'B2' },
          { word: 'Tentacle', ipa: '/ˈten.tə.kəl/', pos: 'noun', vi: 'Tua vòi xúc giác bạch tuộc', ex: 'The giant squid grasped food with suction-cupped tentacles.', cefr: 'B1' },
          { word: 'Trench', ipa: '/trentʃ/', pos: 'noun', vi: 'Rãnh đại dương sâu nhất', ex: 'The Mariana Trench plunges nearly eleven kilometers down.', cefr: 'B2' },
          { word: 'Symbiosis', ipa: '/ˌsɪm.baɪˈəʊ.sɪs/', pos: 'noun', vi: 'Mối quan hệ cộng sinh tương trợ', ex: 'Clownfish and sea anemones enjoy protective symbiosis.', cefr: 'B2' },
          { word: 'Gills', ipa: '/ɡɪlz/', pos: 'noun', vi: 'Mang thở trích xuất oxy dưới nước', ex: 'Fish absorb dissolved oxygen through delicate gills.', cefr: 'B1' },
          { word: 'Pod', ipa: '/pɒd/', pos: 'noun', vi: 'Đàn cá voi, cá heo bơi cùng nhau', ex: 'A majestic pod of orcas swam along the fjord coast.', cefr: 'B1' },
          { word: 'Submerge', ipa: '/səbˈmɜːdʒ/', pos: 'verb', vi: 'Lặn sâu chìm dưới mặt nước', ex: 'Seals submerge for thirty minutes on a single breath.', cefr: 'B2' },
          { word: 'Spawning', ipa: '/ˈspɔː.nɪŋ/', pos: 'noun', vi: 'Mùa đẻ trứng sinh sản của cá', ex: 'Wild salmon swim upriver to ancestral spawning grounds.', cefr: 'B2' },
          { word: 'Migratory', ipa: '/ˈmaɪ.ɡrə.tər.i/', pos: 'adj', vi: 'Có tập tính di cư xa theo mùa', ex: 'Humpback whales follow extensive migratory ocean routes.', cefr: 'B2' },
        ]
      },
      {
        id: 'branch-wild-birds',
        label: 'Aves & Aerial Adaptation',
        labelVi: 'Loài chim & Thích nghi bầu trời',
        color: '#F59E0B',
        words: [
          { word: 'Plumage', ipa: '/ˈpluː.mɪdʒ/', pos: 'noun', vi: 'Bộ lông vũ muôn màu của loài chim', ex: 'Peacocks fan iridescent plumage to attract mates.', cefr: 'B2' },
          { word: 'Migration', ipa: '/maɪˈɡreɪ.ʃən/', pos: 'noun', vi: 'Hành trình di cư tránh rét xuyên lục địa', ex: 'Arctic terns complete a 44,000-mile annual migration.', cefr: 'B1' },
          { word: 'Talon', ipa: '/ˈtæl.ən/', pos: 'noun', vi: 'Móng vuốt chim săn mồi sắc nhọn', ex: 'The golden eagle seized its target with powerful talons.', cefr: 'B2' },
          { word: 'Beak', ipa: '/biːk/', pos: 'noun', vi: 'Mỏ chim biến hình theo tập tính ăn', ex: 'Darwin studied finch beak shapes on Galapagos islands.', cefr: 'A2' },
          { word: 'Hover', ipa: '/ˈhɒv.ər/', pos: 'verb', vi: 'Bay đứng lơ lửng tại chỗ', ex: 'Hummingbirds hover effortlessly while sipping sweet nectar.', cefr: 'B1' },
          { word: 'Navigation', ipa: '/ˌnæv.ɪˈɡeɪ.ʃən/', pos: 'noun', vi: 'Định vị phương hướng đường bay', ex: 'Pigeons rely on magnetic field cues for long navigation.', cefr: 'B1' },
          { word: 'Soar', ipa: '/sɔːr/', pos: 'verb', vi: 'Liệng cánh bay lượn trên luồng khí nóng', ex: 'Vultures soar on warm rising thermal air currents.', cefr: 'B1' },
          { word: 'Hatchling', ipa: '/ˈhætʃ.lɪŋ/', pos: 'noun', vi: 'Chim non mới nở ra từ vỏ trứng', ex: 'Mother penguins feed vulnerable downy hatchlings.', cefr: 'B2' },
          { word: 'Flock', ipa: '/flɒk/', pos: 'noun', vi: 'Đàn chim bay lượn đồng bộ', ex: 'A flock of starlings created mesmerizing murmurations.', cefr: 'A2' },
          { word: 'Aerodynamic', ipa: '/ˌeə.rəʊ.daɪˈnæm.ɪk/', pos: 'adj', vi: 'Khí động học lướt gió tốc độ cao', ex: 'Falcons tuck wings into an aerodynamic dive posture.', cefr: 'B2' },
          { word: 'Canopy', ipa: '/ˈkæn.ə.pi/', pos: 'noun', vi: 'Tầng tán lá rừng nhiệt đới trên cao', ex: 'Toucans nest high within the dense rainforest canopy.', cefr: 'B2' },
          { word: 'Forage', ipa: '/ˈfɒr.ɪdʒ/', pos: 'verb', vi: 'Tìm kiếm quả hạt sâu bọ ăn', ex: 'Woodpeckers forage for tree-dwelling insect larvae.', cefr: 'B2' },
          { word: 'Roost', ipa: '/ruːst/', pos: 'verb', vi: 'Đậu ngủ đêm trên cành cây', ex: 'Thousands of swallows roost along river reeds.', cefr: 'B2' },
          { word: 'Incubate', ipa: '/ˈɪŋ.kjə.beɪt/', pos: 'verb', vi: 'Ấp trứng giữ ấm phôi thai', ex: 'Both parents take turns to incubate fragile eggs.', cefr: 'B2' },
          { word: 'Wingspan', ipa: '/ˈwɪŋ.spæn/', pos: 'noun', vi: 'Sải cánh dang rộng tối đa', ex: 'The wandering albatross boasts a three-meter wingspan.', cefr: 'B1' },
        ]
      },
      {
        id: 'branch-wild-conservation',
        label: 'Biodiversity & Habitat Conservation',
        labelVi: 'Đa dạng sinh học & Bảo tồn môi trường',
        color: '#A78BFA',
        words: [
          { word: 'Biodiversity', ipa: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/', pos: 'noun', vi: 'Sự phong phú đa dạng sinh học', ex: 'Rainforest deforestation destroys vital biodiversity.', cefr: 'B2' },
          { word: 'Poaching', ipa: '/ˈpəʊ.tʃɪŋ/', pos: 'noun', vi: 'Săn bắn trộm thú trái phép', ex: 'Rangers risk lives to protect rhinos from illicit poaching.', cefr: 'B2' },
          { word: 'Endangered', ipa: '/ɪnˈdeɪn.dʒəd/', pos: 'adj', vi: 'Nguy cấp bên bờ tuyệt chủng', ex: 'Snow leopards remain a critically endangered species.', cefr: 'B1' },
          { word: 'Sanctuary', ipa: '/ˈsæŋk.tʃʊə.ri/', pos: 'noun', vi: 'Khu bảo tồn thiên nhiên hoang dã', ex: 'Rescued elephants thrive in the lush Thai sanctuary.', cefr: 'B2' },
          { word: 'Reforestation', ipa: '/ˌriːˌfɒr.ɪˈsteɪ.ʃən/', pos: 'noun', vi: 'Trồng rừng tái sinh phủ xanh', ex: 'Community reforestation restores degraded riverbanks.', cefr: 'B2' },
          { word: 'Ecosystem', ipa: '/ˈiː.kəʊˌsɪs.təm/', pos: 'noun', vi: 'Hệ sinh thái tự nhiên tuần hoàn', ex: 'Keystone species sustain the health of entire ecosystems.', cefr: 'B1' },
          { word: 'Deforestation', ipa: '/diːˌfɒr.ɪˈsteɪ.ʃən/', pos: 'noun', vi: 'Nạn chặt phá rừng bừa bãi', ex: 'Satellite imagery exposes unlawful Amazon deforestation.', cefr: 'B2' },
          { word: 'Extinction', ipa: '/ɪkˈstɪŋk.ʃən/', pos: 'noun', vi: 'Sự tuyệt chủng vĩnh viễn loài', ex: 'The passenger pigeon was driven to extinction in 1914.', cefr: 'B2' },
          { word: 'Keystone Species', ipa: '/ˈkiː.stəʊn ˈspiː.ʃiːz/', pos: 'noun', vi: 'Loài chủ chốt quyết định hệ sinh thái', ex: 'Sea otters serve as a keystone species for kelp forests.', cefr: 'C1' },
          { word: 'Fragmentation', ipa: '/ˌfræɡ.mənˈteɪ.ʃən/', pos: 'noun', vi: 'Sự phân mảnh chia cắt sinh cảnh', ex: 'Highway construction causes severe habitat fragmentation.', cefr: 'C1' },
          { word: 'Pollination', ipa: '/ˌpɒl.əˈneɪ.ʃən/', pos: 'noun', vi: 'Quá trình thụ phấn hoa sinh sản', ex: 'Honeybee pollination is vital for human agriculture.', cefr: 'B2' },
          { word: 'Indigenous', ipa: '/ɪnˈdɪdʒ.ɪ.nəs/', pos: 'adj', vi: 'Bản địa sinh sống nguyên bản', ex: 'Protecting indigenous plant species curbs invasive weeds.', cefr: 'B2' },
          { word: 'Invasive', ipa: '/ɪnˈveɪ.sɪv/', pos: 'adj', vi: 'Ngoại lai xâm hại nguồn tài nguyên', ex: 'Invasive cane toads disrupted native Australian wildlife.', cefr: 'B2' },
          { word: 'Biosphere', ipa: '/ˈbaɪ.əʊ.sfɪər/', pos: 'noun', vi: 'Sinh quyển bao quanh trái đất', ex: 'Preserving the planetary biosphere safeguards future generations.', cefr: 'B2' },
          { word: 'Sustainable', ipa: '/səˈsteɪ.nə.bəl/', pos: 'adj', vi: 'Bền vững tôn trọng tự nhiên', ex: 'Eco-tourism promotes sustainable wildlife observation.', cefr: 'B1' },
        ]
      }
    ]
  },

  {
    id: 'topic-travel-journey',
    categoryId: 'travel',
    nameEn: 'Air Transit, Lodging & Global Roaming',
    nameVi: 'Hàng không, Lưu trú & Khám phá Toàn cầu',
    description: 'Thuật ngữ xuất nhập cảnh, làm thủ tục khách sạn, định vị danh lam và giao lưu văn hóa quốc tế.',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop',
    cefrRange: 'A2 - B1',
    status: 'In Progress',
    progress: 40,
    branches: [
      {
        id: 'branch-trv-airport',
        label: 'Aviation & Customs Clearance',
        labelVi: 'Hàng không & Xuất nhập cảnh hải quan',
        color: '#60A5FA',
        words: [
          { word: 'Boarding Pass', ipa: '/ˈbɔː.dɪŋ pɑːs/', pos: 'noun', vi: 'Thẻ lên máy bay', ex: 'Scan your mobile boarding pass at the automated gate.', cefr: 'A2' },
          { word: 'Baggage Carousel', ipa: '/ˈbæɡ.ɪdʒ ˌkær.əˈsel/', pos: 'noun', vi: 'Băng chuyền hành lý ký gửi', ex: 'Wait near baggage carousel four to collect your suitcase.', cefr: 'B1' },
          { word: 'Layover', ipa: '/ˈleɪˌəʊ.vər/', pos: 'noun', vi: 'Thời gian quá cảnh chuyển tiếp chuyến bay', ex: 'We enjoyed a comfortable three-hour layover in Tokyo.', cefr: 'B1' },
          { word: 'Customs Declaration', ipa: '/ˈkʌs.təmz ˌdek.ləˈreɪ.ʃən/', pos: 'noun', vi: 'Tờ khai hải quan nhập cảnh', ex: 'Fill out the customs declaration form accurately before landing.', cefr: 'B1' },
          { word: 'Immigration', ipa: '/ˌɪm.ɪˈɡreɪ.ʃən/', pos: 'noun', vi: 'Cửa khẩu kiểm tra thị thực hộ chiếu', ex: 'Present your valid visa at the airport immigration booth.', cefr: 'B1' },
          { word: 'Duty-free', ipa: '/ˌdʒuː.tiˈfriː/', pos: 'adj', vi: 'Miễn thuế tại khu vực quốc tế', ex: 'Browse perfume and chocolates in the duty-free lounge.', cefr: 'A2' },
          { word: 'Turbulence', ipa: '/ˈtɜː.bjə.ləns/', pos: 'noun', vi: 'Sự nhiễu động không khí rung lắc', ex: 'Fasten seatbelts securely during unexpected flight turbulence.', cefr: 'B1' },
          { word: 'Overhead Bin', ipa: '/ˌəʊ.vəˈhed bɪn/', pos: 'noun', vi: 'Hộc đựng hành lý xách tay phía trên', ex: 'Stow your carry-on roller bag into the overhead bin.', cefr: 'A2' },
          { word: 'Terminal', ipa: '/ˈtɜː.mɪ.nəl/', pos: 'noun', vi: 'Nhà ga sân bay quốc tế', ex: 'International departures operate from Terminal 2.', cefr: 'A2' },
          { word: 'Conveyor', ipa: '/kənˈveɪ.ər/', pos: 'noun', vi: 'Băng tải kiểm tra an ninh soi chiếu', ex: 'Place laptops into plastic bins on the x-ray conveyor.', cefr: 'B1' },
          { word: 'Jet Lag', ipa: '/ˈdʒet læɡ/', pos: 'noun', vi: 'Hiện tượng mệt mỏi lệch múi giờ', ex: 'Stay hydrated to minimize symptoms of transpacific jet lag.', cefr: 'B1' },
          { word: 'Connection', ipa: '/kəˈnek.ʃən/', pos: 'noun', vi: 'Chuyến bay chuyển tiếp nối chuyến', ex: 'Hurry through transit security to catch your tight connection.', cefr: 'A2' },
          { word: 'Gate', ipa: '/ɡeɪt/', pos: 'noun', vi: 'Cổng ra máy bay lên đường băng', ex: 'Boarding commences at Gate 42 in fifteen minutes.', cefr: 'A1' },
          { word: 'Allowance', ipa: '/əˈlaʊ.əns/', pos: 'noun', vi: 'Hạn mức cân nặng hành lý quy định', ex: 'Economy tickets include a 23kg checked baggage allowance.', cefr: 'B1' },
          { word: 'Runway', ipa: '/ˈrʌn.weɪ/', pos: 'noun', vi: 'Đường băng cất hạ cánh sân bay', ex: 'The aircraft taxied smoothly toward runway zero-nine.', cefr: 'A2' },
        ]
      },
      {
        id: 'branch-trv-lodging',
        label: 'Hospitality & Accommodations',
        labelVi: 'Dịch vụ khách sạn & Chỗ ở lưu trú',
        color: '#34D399',
        words: [
          { word: 'Concierge', ipa: '/kɒn.siˈeəʒ/', pos: 'noun', vi: 'Nhân viên tiền sảnh hỗ trợ đặt dịch vụ', ex: 'The concierge booked front-row theater tickets for us.', cefr: 'B2' },
          { word: 'Complimentary', ipa: '/ˌkɒm.plɪˈmen.tər.i/', pos: 'adj', vi: 'Miễn phí kèm theo dịch vụ', ex: 'Enjoy complimentary breakfast served daily on the terrace.', cefr: 'B2' },
          { word: 'Reservation', ipa: '/ˌrez.əˈveɪ.ʃən/', pos: 'noun', vi: 'Đặt phòng trước đảm bảo chỗ', ex: 'Confirm your boutique hotel reservation via email.', cefr: 'A2' },
          { word: 'Vacancy', ipa: '/ˈveɪ.kən.si/', pos: 'noun', vi: 'Tình trạng phòng còn trống', ex: 'The inn displayed a neon "No Vacancy" sign.', cefr: 'B1' },
          { word: 'Amenities', ipa: '/əˈmiː.nə.tiz/', pos: 'noun', vi: 'Tiện nghi phòng ốc (hồ bơi, spa, wifi)', ex: 'Resort amenities include a heated infinity pool and sauna.', cefr: 'B1' },
          { word: 'Check-out', ipa: '/ˈtʃek.aʊt/', pos: 'noun', vi: 'Thủ tục trả phòng khách sạn', ex: 'Late check-out is available upon advance request.', cefr: 'A2' },
          { word: 'Bellhop', ipa: '/ˈbel.hɒp/', pos: 'noun', vi: 'Nhân viên hỗ trợ mang vác hành lý', ex: 'The courteous bellhop escorted luggage directly to our suite.', cefr: 'B1' },
          { word: 'Suite', ipa: '/swiːt/', pos: 'noun', vi: 'Phòng khách sạn hạng sang nhiều gian', ex: 'We upgraded to an executive oceanfront penthouse suite.', cefr: 'B1' },
          { word: 'Deposit', ipa: '/dɪˈpɒz.ɪt/', pos: 'noun', vi: 'Tiền đặt cọc phòng ngừa hư hại', ex: 'The front desk pre-authorized a incidental security deposit.', cefr: 'B1' },
          { word: 'Housekeeping', ipa: '/ˈhaʊsˌkiː.pɪŋ/', pos: 'noun', vi: 'Dịch vụ dọn dẹp buồng phòng hằng ngày', ex: 'Housekeeping provided fresh fluffy towels and sheets.', cefr: 'A2' },
          { word: 'Hostel', ipa: '/ˈhɒs.təl/', pos: 'noun', vi: 'Nhà nghỉ bình dân cho du khách bụi', ex: 'Backpackers love meeting fellow explorers in youth hostels.', cefr: 'A2' },
          { word: 'Minibar', ipa: '/ˈmɪn.i.bɑːr/', pos: 'noun', vi: 'Tủ lạnh mini đồ uống trong phòng', ex: 'Snacks consumed from the room minibar appear on the bill.', cefr: 'A2' },
          { word: 'Balcony', ipa: '/ˈbæl.kə.ni/', pos: 'noun', vi: 'Ban công ngắm cảnh thoáng mát', ex: 'Sip morning coffee on the private garden balcony.', cefr: 'A2' },
          { word: 'Valet', ipa: '/ˈvæl.eɪ/', pos: 'noun', vi: 'Dịch vụ đỗ xe hộ của khách sạn', ex: 'Hand car keys to the hotel valet attendant at arrival.', cefr: 'B1' },
          { word: 'Voucher', ipa: '/ˈvaʊ.tʃər/', pos: 'noun', vi: 'Phiếu ưu đãi giảm giá dịch vụ', ex: 'Redeem your welcome cocktail voucher at the sky lounge.', cefr: 'A2' },
        ]
      },
      {
        id: 'branch-trv-navigation',
        label: 'Sightseeing & Urban Navigation',
        labelVi: 'Tham quan thắng cảnh & Định vị di chuyển',
        color: '#F59E0B',
        words: [
          { word: 'Itinerary', ipa: '/aɪˈtɪn.ər.ər.i/', pos: 'noun', vi: 'Lịch trình chi tiết chuyến đi', ex: 'Our seven-day itinerary covers historical temple ruins.', cefr: 'B1' },
          { word: 'Landmark', ipa: '/ˈlænd.mɑːk/', pos: 'noun', vi: 'Địa danh biểu tượng kiến trúc', ex: 'The Eiffel Tower is the world’s most iconic landmark.', cefr: 'B1' },
          { word: 'Excursion', ipa: '/ɪkˈskɜː.ʃən/', pos: 'noun', vi: 'Chuyến du ngoạn ngắn ngày dã ngoại', ex: 'Take a boat excursion out to surrounding limestone islands.', cefr: 'B2' },
          { word: 'Pedestrian', ipa: '/pəˈdes.tri.ən/', pos: 'noun', vi: 'Người đi bộ trên phố', ex: 'Historic city center alleys are strictly pedestrian zones.', cefr: 'B1' },
          { word: 'Souvenir', ipa: '/ˌsuː.vənˈɪər/', pos: 'noun', vi: 'Món quà lưu niệm kỷ niệm xứ người', ex: 'Pick up hand-carved wooden souvenirs at the night market.', cefr: 'A2' },
          { word: 'Breathtaking', ipa: '/ˈbreθˌteɪ.kɪŋ/', pos: 'adj', vi: 'Đẹp nín thở hùng vĩ ngoạn mục', ex: 'The alpine mountain summit offers breathtaking panoramic views.', cefr: 'B1' },
          { word: 'Off-the-beaten-path', ipa: '/ˌɒf ðə ˌbiː.tən ˈpɑːθ/', pos: 'adj', vi: 'Nơi hoang sơ vắng người ít ai biết', ex: 'Discover charming off-the-beaten-path fishing villages.', cefr: 'B2' },
          { word: 'Metro', ipa: '/ˈmet.rəʊ/', pos: 'noun', vi: 'Hệ thống tàu điện ngầm đô thị', ex: 'Purchase an unlimited day pass for the city metro.', cefr: 'A2' },
          { word: 'Guidebook', ipa: '/ˈɡaɪd.bʊk/', pos: 'noun', vi: 'Sách hướng dẫn du lịch bỏ túi', ex: 'Consult your pocket guidebook for authentic dining spots.', cefr: 'A2' },
          { word: 'Monorail', ipa: '/ˈmɒn.əʊ.reɪl/', pos: 'noun', vi: 'Tàu điện trên một ray trên cao', ex: 'The futuristic monorail whisks tourists through downtown.', cefr: 'B1' },
          { word: 'Ferry', ipa: '/ˈfer.i/', pos: 'noun', vi: 'Phà chở người qua sông biển', ex: 'Catch the sunset commuter ferry across Sydney Harbour.', cefr: 'A2' },
          { word: 'Panorama', ipa: '/ˌpæn.ərˈɑː.mə/', pos: 'noun', vi: 'Cảnh quan bao quát 360 độ', ex: 'The rooftop observatory commands a stunning urban panorama.', cefr: 'B2' },
          { word: 'Scenery', ipa: '/ˈsiː.nər.i/', pos: 'noun', vi: 'Phong cảnh non nước hữu tình', ex: 'Marvel at lush terraced rice paddy scenery along roads.', cefr: 'A2' },
          { word: 'Fare', ipa: '/feər/', pos: 'noun', vi: 'Tiền vé tàu xe phương tiện', ex: 'Exact bus transit fare is required in coins.', cefr: 'A2' },
          { word: 'Detour', ipa: '/ˈdiː.tʊər/', pos: 'noun', vi: 'Đường vòng chuyển hướng tham quan', ex: 'Road construction forced an unexpected scenic country detour.', cefr: 'B1' },
        ]
      },
      {
        id: 'branch-trv-culture',
        label: 'Cultural Immersion & Etiquette',
        labelVi: 'Hòa nhập văn hóa & Phép lịch sự quốc tế',
        color: '#A78BFA',
        words: [
          { word: 'Hospitality', ipa: '/ˌhɒs.pɪˈtæl.ə.ti/', pos: 'noun', vi: 'Lòng hiếu khách niềm nở', ex: 'Vietnamese locals welcomed visitors with heartwarming hospitality.', cefr: 'B1' },
          { word: 'Etiquette', ipa: '/ˈet.ɪ.ket/', pos: 'noun', vi: 'Quy tắc ứng xử lịch thiệp tế nhị', ex: 'Learn local dining etiquette before attending banquets.', cefr: 'B2' },
          { word: 'Tradition', ipa: '/trəˈdɪʃ.ən/', pos: 'noun', vi: 'Phong tục tập quán lâu đời', ex: 'Releasing paper lanterns on water is a sacred tradition.', cefr: 'A2' },
          { word: 'Bargain', ipa: '/ˈbɑː.ɡɪn/', pos: 'verb', vi: 'Mặc cả thương lượng giá chợ', ex: 'Practice polite smile-based bargaining at flea stalls.', cefr: 'B1' },
          { word: 'Dialect', ipa: '/ˈdaɪ.ə.lekt/', pos: 'noun', vi: 'Tiếng địa phương bản xứ', ex: 'Northern highland villagers speak a distinctive tonal dialect.', cefr: 'B2' },
          { word: 'Customary', ipa: '/ˈkʌs.tə.mər.i/', pos: 'adj', vi: 'Theo thói quen tục lệ phổ biến', ex: 'It is customary to remove shoes before entering traditional homes.', cefr: 'B2' },
          { word: 'Heritage', ipa: '/ˈher.ɪ.tɪdʒ/', pos: 'noun', vi: 'Di sản văn hóa kiến trúc nhân loại', ex: 'Hoi An is a protected UNESCO World Cultural Heritage site.', cefr: 'B1' },
          { word: 'Authentic', ipa: '/ɔːˈθen.tɪk/', pos: 'adj', vi: 'Nguyên bản chân thực không lai căng', ex: 'Seek out authentic street food stalls bustling with locals.', cefr: 'B1' },
          { word: 'Ceremony', ipa: '/ˈser.ɪ.mə.ni/', pos: 'noun', vi: 'Nghi lễ trang trọng truyền thống', ex: 'Witness a solemn Japanese green tea ceremony.', cefr: 'B1' },
          { word: 'Pilgrimage', ipa: '/ˈpɪl.ɡrɪ.mɪdʒ/', pos: 'noun', vi: 'Hành hương về vùng đất thiêng', ex: 'Millions make the annual spiritual pilgrimage to sacred peaks.', cefr: 'B2' },
          { word: 'Bilingual', ipa: '/baɪˈlɪŋ.ɡwəl/', pos: 'adj', vi: 'Sử dụng song ngữ lưu loát', ex: 'Museum tour guides are fully bilingual in English and French.', cefr: 'B1' },
          { word: 'Gratuity', ipa: '/ɡrəˈtʃuː.ə.ti/', pos: 'noun', vi: 'Tiền tip bồi dưỡng phục vụ', ex: 'In American diners, leaving a fifteen percent gratuity is standard.', cefr: 'B2' },
          { word: 'Curfew', ipa: '/ˈkɜː.fjuː/', pos: 'noun', vi: 'Giờ giới nghiêm quy định ban đêm', ex: 'The island wildlife sanctuary enforces a strict noise curfew.', cefr: 'B2' },
          { word: 'Tolerance', ipa: '/ˈtɒl.ər.əns/', pos: 'noun', vi: 'Sự bao dung đón nhận khác biệt văn hóa', ex: 'Travel deepens open-minded cultural tolerance.', cefr: 'B2' },
          { word: 'Encounter', ipa: '/ɪnˈkaʊn.tər/', pos: 'noun', vi: 'Cuộc gặp gỡ bất ngờ thú vị', ex: 'Memorable travel stems from spontaneous human encounters.', cefr: 'B1' },
        ]
      }
    ]
  },

  {
    id: 'topic-tech-ai-future',
    categoryId: 'technology',
    nameEn: 'Artificial Intelligence & System Engineering',
    nameVi: 'Trí tuệ Nhân tạo & Kỹ thuật Hệ thống',
    description: 'Mô hình ngôn ngữ lớn LLM, kỹ nghệ prompt, điện toán đám mây và an ninh mạng thời đại AI.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    cefrRange: 'B1 - B2',
    status: 'In Progress',
    progress: 55,
    branches: [
      {
        id: 'branch-tech-ai',
        label: 'Generative AI & LLM Models',
        labelVi: 'Trí tuệ nhân tạo tạo sinh & Mô hình ngôn ngữ',
        color: '#C084FC',
        words: [
          { word: 'Hallucination', ipa: '/həˌluː.sɪˈneɪ.ʃən/', pos: 'noun', vi: 'Hiện tượng AI bịa đặt thông tin sai', ex: 'Grounding with search prevents model hallucination.', cefr: 'B2' },
          { word: 'Fine-tuning', ipa: '/faɪn ˈtjuː.nɪŋ/', pos: 'noun', vi: 'Tinh chỉnh mô hình theo dữ liệu riêng', ex: 'Domain fine-tuning adapts LLMs to legal documents.', cefr: 'B2' },
          { word: 'Prompting', ipa: '/ˈprɒmp.tɪŋ/', pos: 'noun', vi: 'Kỹ nghệ đặt câu lệnh gợi ý cho AI', ex: 'Chain-of-thought prompting improves complex reasoning.', cefr: 'B1' },
          { word: 'Embeddings', ipa: '/ɪmˈbed.ɪŋz/', pos: 'noun', vi: 'Véc-tơ hóa biểu diễn ngữ nghĩa của từ', ex: 'Vector embeddings power semantic similarity search.', cefr: 'C1' },
          { word: 'Autonomous', ipa: '/ɔːˈtɒn.ə.məs/', pos: 'adj', vi: 'Tự hành độc lập không cần can thiệp', ex: 'Autonomous AI agents execute end-to-end coding tasks.', cefr: 'B2' },
          { word: 'Inference', ipa: '/ˈɪn.fər.əns/', pos: 'noun', vi: 'Quá trình suy luận chạy mô hình AI', ex: 'Quantization speeds up on-device local model inference.', cefr: 'C1' },
          { word: 'Latency', ipa: '/ˈleɪ.tən.si/', pos: 'noun', vi: 'Độ trễ phản hồi của hệ thống', ex: 'Streaming tokens minimizes perceived user latency.', cefr: 'B2' },
          { word: 'Multimodal', ipa: '/ˌmʌl.tiˈməʊ.dəl/', pos: 'adj', vi: 'Đa phương thức xử lý text, ảnh, video', ex: 'Multimodal models analyze visual radiology scans directly.', cefr: 'B2' },
          { word: 'Retrieval', ipa: '/rɪˈtriː.vəl/', pos: 'noun', vi: 'Truy xuất thông tin dữ liệu (RAG)', ex: 'Retrieval augmented generation verifies factual answers.', cefr: 'B2' },
          { word: 'Parameters', ipa: '/pəˈræm.ɪ.tərz/', pos: 'noun', vi: 'Tham số trọng số trong mạng nơ-ron', ex: 'Models with 70 billion parameters require multi-GPU setups.', cefr: 'B2' },
          { word: 'Convergence', ipa: '/kənˈvɜː.dʒəns/', pos: 'noun', vi: 'Sự hội tụ hàm tối ưu khi huấn luyện', ex: 'Learning rate schedules ensure steady model convergence.', cefr: 'C1' },
          { word: 'Overfitting', ipa: '/ˌəʊ.vəˈfɪt.ɪŋ/', pos: 'noun', vi: 'Hiện tượng học vẹt dữ liệu huấn luyện', ex: 'Dropout and regularization mitigate severe overfitting.', cefr: 'C1' },
          { word: 'Tokenization', ipa: '/ˌtəʊ.kən.aɪˈzeɪ.ʃən/', pos: 'noun', vi: 'Phân đoạn văn bản thành các token', ex: 'Byte pair encoding handles multilingual tokenization.', cefr: 'B2' },
          { word: 'Benchmark', ipa: '/ˈbentʃ.mɑːk/', pos: 'noun', vi: 'Bộ đề kiểm thử năng lực mô hình', ex: 'The frontier model smashed MMLU cognitive benchmarks.', cefr: 'B1' },
          { word: 'Agentic', ipa: '/eɪˈdʒen.tɪk/', pos: 'adj', vi: 'Có năng lực chủ động ra quyết định', ex: 'Agentic workflows plan, browse tools, and write code.', cefr: 'B2' },
        ]
      },
      {
        id: 'branch-tech-cloud',
        label: 'Cloud Infrastructure & Microservices',
        labelVi: 'Điện toán đám mây & Vi dịch vụ hạ tầng',
        color: '#38BDF8',
        words: [
          { word: 'Scalability', ipa: '/ˌskeɪ.ləˈbɪl.ə.ti/', pos: 'noun', vi: 'Khả năng co giãn theo nhu cầu tải', ex: 'Kubernetes clusters deliver automated horizontal scalability.', cefr: 'B2' },
          { word: 'Redundancy', ipa: '/rɪˈdʌn.dən.si/', pos: 'noun', vi: 'Dự phòng bản sao tránh gián đoạn', ex: 'Multi-region database redundancy guarantees zero downtime.', cefr: 'B2' },
          { word: 'Containerization', ipa: '/kənˌteɪ.nər.aɪˈzeɪ.ʃən/', pos: 'noun', vi: 'Đóng gói ứng dụng thành container (Docker)', ex: 'Containerization ensures identical execution across servers.', cefr: 'C1' },
          { word: 'Serverless', ipa: '/ˈsɜː.və.ləs/', pos: 'adj', vi: 'Không máy chủ, tính tiền theo số lần gọi', ex: 'Serverless edge functions execute with microsecond speed.', cefr: 'B2' },
          { word: 'Deployment', ipa: '/dɪˈplɔɪ.mənt/', pos: 'noun', vi: 'Triển khai mã nguồn lên môi trường thực tế', ex: 'Continuous integration automates staging deployment.', cefr: 'B2' },
          { word: 'Pipeline', ipa: '/ˈpaɪp.laɪn/', pos: 'noun', vi: 'Quy trình xử lý dữ liệu tự động', ex: 'The data pipeline ingests telemetry from millions of devices.', cefr: 'B1' },
          { word: 'Throughput', ipa: '/ˈθruː.pʊt/', pos: 'noun', vi: 'Băng thông xử lý số yêu cầu mỗi giây', ex: 'Redis caching boosted database query throughput.', cefr: 'C1' },
          { word: 'Failover', ipa: '/ˈfeɪlˌəʊ.vər/', pos: 'noun', vi: 'Tự động chuyển mạch sang máy chủ dự phòng', ex: 'Automatic failover redirected live traffic during outage.', cefr: 'B2' },
          { word: 'Microservice', ipa: '/ˈmaɪ.krəʊˌsɜː.vɪs/', pos: 'noun', vi: 'Kiến trúc chia nhỏ phần mềm độc lập', ex: 'Decoupling monolithic code into microservices speeds shipping.', cefr: 'B2' },
          { word: 'Orchestration', ipa: '/ˌɔː.kɪˈstreɪ.ʃən/', pos: 'noun', vi: 'Điều phối quản lý cụm dịch vụ tự động', ex: 'Kubernetes handles container orchestration effortlessly.', cefr: 'C1' },
          { word: 'Telemetry', ipa: '/təˈlem.ə.tri/', pos: 'noun', vi: 'Dữ liệu đo đạc giám sát sức khỏe hệ thống', ex: 'Real-time telemetry pinpoints latency spikes instantly.', cefr: 'C1' },
          { word: 'Bandwidth', ipa: '/ˈbænd.wɪtθ/', pos: 'noun', vi: 'Băng thông đường truyền mạng', ex: 'Streaming 4K video consumes significant network bandwidth.', cefr: 'B1' },
          { word: 'Repository', ipa: '/rɪˈpɒz.ɪ.tər.i/', pos: 'noun', vi: 'Kho lưu trữ mã nguồn Git', ex: 'Fork the open-source repository to submit pull requests.', cefr: 'B1' },
          { word: 'Concurrency', ipa: '/kənˈkʌr.ən.si/', pos: 'noun', vi: 'Xử lý đồng thời nhiều luồng tác vụ', ex: 'Go coroutines handle high concurrency with low memory.', cefr: 'B2' },
          { word: 'Idempotent', ipa: '/aɪˈdem.pəʊ.tənt/', pos: 'adj', vi: 'Tính chất lặp lại không làm thay đổi kết quả', ex: 'Ensure payment webhooks are completely idempotent.', cefr: 'C1' },
        ]
      },
      {
        id: 'branch-tech-security',
        label: 'Cybersecurity & Zero Trust',
        labelVi: 'An ninh mạng & Mô hình không tin cậy',
        color: '#10B981',
        words: [
          { word: 'Vulnerability', ipa: '/ˌvʌl.nər.əˈbɪl.ə.ti/', pos: 'noun', vi: 'Lỗ hổng bảo mật phần mềm', ex: 'Patch the zero-day vulnerability before attackers exploit it.', cefr: 'B2' },
          { word: 'Encryption', ipa: '/ɪnˈkrɪp.ʃən/', pos: 'noun', vi: 'Mã hóa dữ liệu bảo vệ bí mật', ex: 'End-to-end encryption shields private messaging privacy.', cefr: 'B2' },
          { word: 'Authentication', ipa: '/ɔːˌθen.tɪˈkeɪ.ʃən/', pos: 'noun', vi: 'Xác thực danh tính người dùng (2FA/Passkey)', ex: 'Biometric passkey authentication replaces weak passwords.', cefr: 'B2' },
          { word: 'Malware', ipa: '/ˈmæl.weər/', pos: 'noun', vi: 'Mã độc hại xâm nhập máy tính', ex: 'Heuristic antivirus shields endpoints against stealthy malware.', cefr: 'B1' },
          { word: 'Firewall', ipa: '/ˈfaɪə.wɔːl/', pos: 'noun', vi: 'Bức tường lửa chặn lưu lượng bất thường', ex: 'Configure strict ingress rules on the enterprise firewall.', cefr: 'B1' },
          { word: 'Phishing', ipa: '/ˈfɪʃ.ɪŋ/', pos: 'noun', vi: 'Tấn công lừa đảo giả mạo email', ex: 'Employee training curbs click-through on phishing lures.', cefr: 'B1' },
          { word: 'Decryption', ipa: '/diːˈkrɪp.ʃən/', pos: 'noun', vi: 'Giải mã dữ liệu đã được bảo vệ', ex: 'Only authorized private keys permit message decryption.', cefr: 'B2' },
          { word: 'Zero-Trust', ipa: '/ˈzɪə.rəʊ trʌst/', pos: 'noun', vi: 'Kiến trúc luôn xác minh mọi yêu cầu', ex: 'Zero-trust architecture enforces continuous token validation.', cefr: 'B2' },
          { word: 'Breach', ipa: '/briːtʃ/', pos: 'noun', vi: 'Sự cố rò rỉ dữ liệu nghiêm trọng', ex: 'The company reported a contained customer data breach.', cefr: 'B2' },
          { word: 'Penetration', ipa: '/ˌpen.əˈtreɪ.ʃən/', pos: 'noun', vi: 'Kiểm thử xâm nhập tìm lỗ hổng (Pentest)', ex: 'White-hat ethical hackers conducted a penetration audit.', cefr: 'B2' },
          { word: 'Ransomware', ipa: '/ˈræn.səm.weər/', pos: 'noun', vi: 'Mã độc tống tiền khóa tập tin', ex: 'Air-gapped offline backups provide defense against ransomware.', cefr: 'B2' },
          { word: 'Exploit', ipa: '/ɪkˈsplɔɪt/', pos: 'noun', vi: 'Đoạn mã lợi dụng lỗi hệ thống', ex: 'Security researchers discovered an unpatched browser exploit.', cefr: 'B2' },
          { word: 'Credential', ipa: '/krəˈden.ʃəl/', pos: 'noun', vi: 'Thông tin đăng nhập tài khoản', ex: 'Never hardcode API secret credentials into public repos.', cefr: 'B2' },
          { word: 'Authorization', ipa: '/ˌɔː.θər.aɪˈzeɪ.ʃən/', pos: 'noun', vi: 'Phân quyền hạn thao tác dữ liệu', ex: 'Role-based authorization prevents unauthorized database access.', cefr: 'B2' },
          { word: 'Certificate', ipa: '/səˈtɪf.ɪ.kət/', pos: 'noun', vi: 'Chứng chỉ bảo mật số SSL/TLS', ex: 'Automated bots renew wildcard SSL security certificates.', cefr: 'B1' },
        ]
      },
      {
        id: 'branch-tech-future',
        label: 'Emerging Tech & Automation',
        labelVi: 'Công nghệ tương lai & Tự động hóa',
        color: '#F59E0B',
        words: [
          { word: 'Quantum', ipa: '/ˈkwɒn.təm/', pos: 'noun', vi: 'Điện toán lượng tử đột phá', ex: 'Quantum processors factor prime numbers exponentially faster.', cefr: 'B2' },
          { word: 'Automation', ipa: '/ˌɔː.təˈmeɪ.ʃən/', pos: 'noun', vi: 'Tự động hóa tác vụ lặp đi lặp lại', ex: 'Robotic process automation eliminates manual bookkeeping.', cefr: 'B1' },
          { word: 'Sensor', ipa: '/ˈsen.sər/', pos: 'noun', vi: 'Cảm biến thu thập tín hiệu vật lý', ex: 'IoT sensors stream temperature vibrations to predictive models.', cefr: 'B1' },
          { word: 'Actuator', ipa: '/ˈæk.tʃu.eɪ.tər/', pos: 'noun', vi: 'Bộ truyền động cơ học của robot', ex: 'Precision electric actuators drive humanoid robotic fingers.', cefr: 'C1' },
          { word: 'Augmented', ipa: '/ɔːɡˈmen.tɪd/', pos: 'adj', vi: 'Tăng cường thực tế ảo (AR)', ex: 'Augmented reality headsets overlay repair blueprints on machinery.', cefr: 'B2' },
          { word: 'Blockchain', ipa: '/ˈblɒk.tʃeɪn/', pos: 'noun', vi: 'Sổ cái phân tán bất biến phi tập trung', ex: 'Supply chain provenance tracks cocoa beans on a blockchain.', cefr: 'B2' },
          { word: 'Neuromorphic', ipa: '/ˌnjʊə.rəʊˈmɔː.fɪk/', pos: 'adj', vi: 'Chip mô phỏng mạng nơ-ron não bộ', ex: 'Neuromorphic chips consume fraction of watts for vision.', cefr: 'C1' },
          { word: 'Biometric', ipa: '/ˌbaɪ.əʊˈmet.rɪk/', pos: 'adj', vi: 'Sinh trắc học nhận dạng mống mắt/vân tay', ex: 'Iris scanning offers foolproof biometric device security.', cefr: 'B2' },
          { word: 'Decentralized', ipa: '/diːˈsen.trə.laɪzd/', pos: 'adj', vi: 'Phi tập trung không phụ thuộc trung gian', ex: 'Decentralized protocols resist censorship and single failure points.', cefr: 'B2' },
          { word: 'Algorithm', ipa: '/ˈæl.ɡə.rɪ.ðəm/', pos: 'noun', vi: 'Thuật toán giải quyết bài toán logic', ex: 'Pathfinding algorithms navigate autonomous delivery drones.', cefr: 'B1' },
          { word: 'Synthetic', ipa: '/sɪnˈθet.ɪk/', pos: 'adj', vi: 'Dữ liệu tổng hợp tạo bởi máy tính', ex: 'Training models on synthetic data preserves user privacy.', cefr: 'B2' },
          { word: 'Prototyping', ipa: '/ˈprəʊ.tə.taɪ.pɪŋ/', pos: 'noun', vi: 'Tạo mẫu thử nghiệm sản phẩm nhanh', ex: 'Rapid 3D printing accelerates hardware prototyping cycles.', cefr: 'B2' },
          { word: 'Disruption', ipa: '/dɪsˈrʌp.ʃən/', pos: 'noun', vi: 'Sự đảo lộn chuyển dịch công nghệ', ex: 'Generative AI represents a monumental platform disruption.', cefr: 'B2' },
          { word: 'Robotics', ipa: '/rəʊˈbɒt.ɪks/', pos: 'noun', vi: 'Kỹ nghệ người máy tự động', ex: 'Warehouse logistics runs on collaborative swarm robotics.', cefr: 'B1' },
          { word: 'Singularity', ipa: '/ˌsɪŋ.ɡjəˈlær.ə.ti/', pos: 'noun', vi: 'Điểm kỳ dị trí tuệ nhân tạo vượt con người', ex: 'Philosophers debate the timeline to the technological singularity.', cefr: 'C1' },
        ]
      }
    ]
  }
];

// Verify word counts
console.log('Validating word counts across topics:');
let totalWords = 0;
topicsData.forEach(t => {
  let count = 0;
  t.branches.forEach(b => {
    count += b.words.length;
  });
  totalWords += count;
  console.log(`Topic: ${t.nameEn} -> ${count} words across ${t.branches.length} branches`);
});
console.log(`TOTAL VOCABULARY WORDS: ${totalWords}`);

// Now generate TypeScript code
const topicsTs = topicsData.map(t => {
  const branchCount = t.branches.length;
  const wordCount = t.branches.reduce((acc, b) => acc + b.words.length, 0);
  return `  {
    id: ${JSON.stringify(t.id)},
    categoryId: ${JSON.stringify(t.categoryId)},
    nameEn: ${JSON.stringify(t.nameEn)},
    nameVi: ${JSON.stringify(t.nameVi)},
    description: ${JSON.stringify(t.description)},
    coverImage: ${JSON.stringify(t.coverImage)},
    cefrRange: ${JSON.stringify(t.cefrRange)},
    status: ${JSON.stringify(t.status)},
    progress: ${t.progress},
    branchCount: ${branchCount},
    wordCount: ${wordCount},
    featured: true,
  }`;
}).join(',\n');

// Mindmap nodes
const mindmapNodesList = [];
const vocabulariesList = [];
const quizQuestionsList = [];

topicsData.forEach((t, tIdx) => {
  const rootNodeId = `root-${t.id}`;
  mindmapNodesList.push(`  {
    id: ${JSON.stringify(rootNodeId)},
    topicId: ${JSON.stringify(t.id)},
    level: 0,
    label: ${JSON.stringify(t.nameEn.split('&')[0].trim())},
    labelVi: ${JSON.stringify(t.nameVi.split('&')[0].trim())},
    color: '#DEDBC8',
    icon: 'Sparkles',
    order: 0,
    isExpanded: true,
  }`);

  t.branches.forEach((b, bIdx) => {
    const branchNodeId = b.id;
    mindmapNodesList.push(`  {
    id: ${JSON.stringify(branchNodeId)},
    topicId: ${JSON.stringify(t.id)},
    parentId: ${JSON.stringify(rootNodeId)},
    level: 1,
    label: ${JSON.stringify(b.label)},
    labelVi: ${JSON.stringify(b.labelVi)},
    color: ${JSON.stringify(b.color)},
    icon: 'Layers',
    order: ${bIdx + 1},
    isExpanded: true,
  }`);

    b.words.forEach((w, wIdx) => {
      const vocabId = `vocab-${w.word.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      const wordNodeId = `node-${t.id}-${bIdx}-${wIdx}`;
      const posMap = { adj: 'adjective', noun: 'noun', verb: 'verb', adv: 'adverb' };
      const fullPos = posMap[w.pos] || 'noun';

      mindmapNodesList.push(`  {
    id: ${JSON.stringify(wordNodeId)},
    topicId: ${JSON.stringify(t.id)},
    parentId: ${JSON.stringify(branchNodeId)},
    level: 2,
    label: ${JSON.stringify(w.word)},
    labelVi: ${JSON.stringify(w.vi)},
    vocabularyId: ${JSON.stringify(vocabId)},
    order: ${wIdx + 1},
  }`);

      vocabulariesList.push(`  {
    id: ${JSON.stringify(vocabId)},
    topicId: ${JSON.stringify(t.id)},
    branchId: ${JSON.stringify(branchNodeId)},
    word: ${JSON.stringify(w.word)},
    ipa: ${JSON.stringify(w.ipa)},
    partOfSpeech: ${JSON.stringify(fullPos)},
    meaningVi: ${JSON.stringify(w.vi)},
    definitionEn: ${JSON.stringify('Essential term related to ' + b.label.toLowerCase())},
    cefr: ${JSON.stringify(w.cefr)},
    context: {
      examples: [
        {
          en: ${JSON.stringify(w.ex)},
          vi: ${JSON.stringify(w.vi + ' trong ngữ cảnh thực tế.')},
        }
      ],
      collocations: [
        ${JSON.stringify('high ' + w.word.toLowerCase())},
        ${JSON.stringify(w.word.toLowerCase() + ' strategy')},
        ${JSON.stringify('effective ' + w.word.toLowerCase())}
      ],
      synonyms: [${JSON.stringify(w.word.toLowerCase())}],
    },
    status: ${wIdx % 3 === 0 ? "'mastered'" : wIdx % 4 === 0 ? "'review_due'" : "'learning'"},
    masteryScore: ${75 + (wIdx * 7) % 25},
    isFavorite: ${wIdx === 0 || wIdx === 3},
    nextReviewDate: '2026-10-22',
  }`);

      // Quiz question
      if (wIdx % 2 === 0) {
        quizQuestionsList.push(`  {
    id: ${JSON.stringify('q-' + vocabId)},
    topicId: ${JSON.stringify(t.id)},
    branchId: ${JSON.stringify(branchNodeId)},
    vocabularyId: ${JSON.stringify(vocabId)},
    type: 'choice_meaning',
    prompt: ${JSON.stringify('Nghĩa tiếng Việt chính xác nhất của từ "' + w.word + '" (' + w.ipa + ') là gì?')},
    targetWord: ${JSON.stringify(w.word)},
    audioText: ${JSON.stringify(w.word)},
    options: [
      ${JSON.stringify(w.vi)},
      ${JSON.stringify('Quy trình kiểm soát không cần thiết')},
      ${JSON.stringify('Sự trì hoãn ngoài dự kiến')},
      ${JSON.stringify('Dấu hiệu suy giảm năng lực')}
    ],
    correctAnswer: ${JSON.stringify(w.vi)},
    explanation: ${JSON.stringify('"' + w.word + '" có nghĩa là: ' + w.vi + '. Ví dụ: ' + w.ex)},
    difficulty: ${JSON.stringify(w.cefr)},
  }`);
      }
    });
  });
});

const fileContent = `import { Category, Topic, MindmapNode, Vocabulary, QuizQuestion, UserProfile } from '../types';

export const initialCategories: Category[] = ${JSON.stringify(categories, null, 2)};

export const initialTopics: Topic[] = [
${topicsTs}
];

export const initialMindmapNodes: MindmapNode[] = [
${mindmapNodesList.join(',\n')}
];

export const initialVocabularies: Vocabulary[] = [
${vocabulariesList.join(',\n')}
];

export const initialQuestions: QuizQuestion[] = [
${quizQuestionsList.join(',\n')}
];

export const initialQuizQuestions = initialQuestions;

export const initialProfile: UserProfile = {
  name: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  currentLevel: 'B1',
  targetGoal: 'Giao tiếp công việc & Xem phim không phụ đề',
  dailyMinutes: 20,
  favoriteCategoryIds: ['business', 'marketing', 'fitness', 'technology'],
  streakDays: 7,
  lastActiveDate: '2026-10-21',
  isOnboarded: true,
};

export const initialUserProfile = initialProfile;
`;

fs.writeFileSync(path.join(__dirname, '../src/data/initialData.ts'), fileContent, 'utf-8');
console.log('Successfully wrote src/data/initialData.ts!');
