const fs = require('fs');
const path = require('path');

const categories = [
  { id: 'business', nameEn: 'Business & Commerce', nameVi: 'Kinh doanh & Thương mại', description: 'Chiến lược, khởi nghiệp, tài chính và đàm phán thương mại.', icon: 'Briefcase', color: '#10B981', order: 1 },
  { id: 'marketing', nameEn: 'Marketing & Growth', nameVi: 'Marketing & Tăng trưởng số', description: 'Branding, chuyển đổi, quảng cáo số và tiếp thị nội dung.', icon: 'TrendingUp', color: '#0EA5E9', order: 2 },
  { id: 'fitness', nameEn: 'Fitness & Physical Power', nameVi: 'Thể hình & Rèn luyện Thể lực', description: 'Tập luyện cường độ, cơ bắp, sức bền và dinh dưỡng thể thao.', icon: 'Dumbbell', color: '#F59E0B', order: 3 },
  { id: 'wellness', nameEn: 'Health & Medical Wellness', nameVi: 'Chăm sóc Sức khỏe & Y tế', description: 'Thói quen lành mạnh, giấc ngủ, kiểm soát căng thẳng và sơ cứu.', icon: 'HeartPulse', color: '#EF4444', order: 4 },
  { id: 'culinary', nameEn: 'Culinary Arts & Cooking', nameVi: 'Ẩm thực & Nghệ thuật Nấu nướng', description: 'Kỹ thuật chế biến, gia vị, hương vị và văn hóa thưởng thức.', icon: 'Utensils', color: '#8B5CF6', order: 5 },
  { id: 'household', nameEn: 'Household & Daily Objects', nameVi: 'Đồ vật & Đời sống Thường nhật', description: 'Thiết bị gia đình, đồ nội thất và đồ dùng thông minh hằng ngày.', icon: 'Home', color: '#6366F1', order: 6 },
  { id: 'nature', nameEn: 'Wildlife & Living Ecosystems', nameVi: 'Động vật hoang dã & Thiên nhiên', description: 'Sinh quyển, tập tính động vật và bảo tồn môi trường sinh thái.', icon: 'TreePine', color: '#14B8A6', order: 7 },
  { id: 'travel', nameEn: 'Global World & Expeditions', nameVi: 'Thế giới & Du lịch Khám phá', description: 'Sân bay, khách sạn, di chuyển quốc tế và giao lưu văn hóa.', icon: 'Compass', color: '#EC4899', order: 8 },
  { id: 'technology', nameEn: 'Tech, AI & Future Worlds', nameVi: 'Công nghệ số & Trí tuệ nhân tạo', description: 'Thuật toán, tự động hóa, Prompting và chuyển đổi số thời đại mới.', icon: 'Cpu', color: '#06B6D4', order: 9 },
];

// Helper to create 15 words for a branch
function makeBranch(id, labelEn, labelVi, color, wordTuples) {
  return {
    id,
    labelEn,
    labelVi,
    color,
    words: wordTuples.map(([word, ipa, pos, cefr, vi, en, exEn, exVi, col]) => ({
      word, ipa, pos, cefr, vi, en, exEn, exVi,
      collocations: col ? col.split(',').map(s => s.trim()) : []
    }))
  };
}

// 9 TOPICS DEFINITIONS, EACH EXACTLY 4 BRANCHES X 15 WORDS = 60 WORDS PER TOPIC
const allTopics = [
  // 1. BUSINESS STRATEGY
  {
    id: 'topic-business-strategy',
    categoryId: 'business',
    nameEn: 'Executive Strategy & Venture Growth',
    nameVi: 'Chiến lược Doanh nghiệp & Khởi nghiệp',
    description: 'Xây dựng mô hình kinh doanh, gọi vốn đầu tư mạo hiểm, mở rộng quy mô và quản trị doanh nghiệp.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    cefrRange: 'B1 - B2',
    status: 'In Progress',
    progress: 72,
    branches: [
      makeBranch('branch-biz-1', 'Market Analysis & Viability', 'Phân tích & Tính khả thi thị trường', '#0EA5E9', [
        ['disruptive', '/dɪsˈrʌp.tɪv/', 'adjective', 'B2', 'Đột phá, thay đổi hoàn toàn cục diện', 'Innovations altering how an entire industry operates.', 'Their startup introduced a disruptive business model.', 'Công ty khởi nghiệp giới thiệu mô hình kinh doanh đột phá.', 'disruptive innovation, disruptive tech'],
        ['feasibility', '/ˌfiː.zəˈbɪl.ə.ti/', 'noun', 'B2', 'Tính khả thi của kế hoạch', 'The possibility of easily executing a proposed plan.', 'We conducted a financial feasibility study.', 'Chúng tôi tiến hành nghiên cứu tính khả thi tài chính.', 'feasibility study, assess feasibility'],
        ['competitive edge', '/kəmˈpet̬.ə.t̬ɪv edʒ/', 'phrase', 'B1', 'Lợi thế cạnh tranh vượt trội', 'A condition putting a company in a superior position.', 'Customer service gives us a competitive edge.', 'Dịch vụ khách hàng mang lại cho chúng tôi lợi thế cạnh tranh.', 'gain a competitive edge, maintain an edge'],
        ['benchmark', '/ˈbentʃ.mɑːrk/', 'noun', 'B2', 'Tiêu chuẩn đối sánh chuẩn mực', 'A standard against which things can be judged.', 'Their profit margin set a new industry benchmark.', 'Biên lợi nhuận của họ đặt ra tiêu chuẩn đối sánh mới.', 'industry benchmark, set a benchmark'],
        ['monopoly', '/məˈnɑː.pəl.i/', 'noun', 'B2', 'Thế độc quyền thị trường', 'Exclusive possession of supply of a commodity.', 'Antitrust laws prevent tech giants from holding a monopoly.', 'Luật chống độc quyền ngăn các ông lớn công nghệ độc quyền.', 'market monopoly, natural monopoly'],
        ['blue ocean', '/bluː ˈoʊ.ʃən/', 'phrase', 'B2', 'Thị trường đại dương xanh ít đối thủ', 'An uncontested market space with high growth potential.', 'A blue ocean strategy avoids bloody price wars.', 'Chiến lược đại dương xanh giúp tránh các cuộc chiến giá.', 'blue ocean strategy, untapped market'],
        ['traction', '/ˈtræk.ʃən/', 'noun', 'B2', 'Độ bám và đà tăng trưởng thị trường', 'Evidence that a product is gaining customer momentum.', 'The app gained rapid traction among young professionals.', 'Ứng dụng đạt độ bám thị trường nhanh trong giới trẻ.', 'gain traction, market traction'],
        ['churn rate', '/tʃɝːn reɪt/', 'phrase', 'B2', 'Tỷ lệ khách hàng rời bỏ dịch vụ', 'The annual percentage of customers canceling subscriptions.', 'Reducing churn rate directly protects recurring revenue.', 'Giảm tỷ lệ rời bỏ giúp bảo vệ trực tiếp doanh thu định kỳ.', 'high churn rate, reduce churn'],
        ['niche market', '/niːʃ ˈmɑːr.kɪt/', 'phrase', 'B1', 'Thị trường ngách chuyên biệt', 'A specialized segment of the market for targeted products.', 'They dominate the vegan athletic apparel niche market.', 'Họ thống trị thị trường ngách đồ thể thao thuần chay.', 'profitable niche, niche audience'],
        ['pivot', '/ˈpɪv.ət/', 'verb', 'B2', 'Chuyển hướng chiến lược kinh doanh', 'To fundamentally change the direction of a business.', 'When sales plummeted, the CEO decided to pivot toward B2B.', 'Khi doanh số giảm, CEO quyết định chuyển hướng sang B2B.', 'strategic pivot, pivot to mobile'],
        ['runway', '/ˈrʌn.weɪ/', 'noun', 'B2', 'Thời gian tồn tại của vốn trước khi cạn tiền', 'The amount of time a company has before running out of cash.', 'With current burn, we have 18 months of financial runway.', 'Với mức chi tiêu hiện tại, ta còn 18 tháng tồn tại của vốn.', 'extend runway, cash runway'],
        ['addressable market', '/əˈdres.ə.bəl ˈmɑːr.kɪt/', 'phrase', 'B2', 'Dung lượng thị trường có thể phục vụ', 'Total revenue opportunity available for a product.', 'Investors were impressed by our $20 billion addressable market.', 'Nhà đầu tư ấn tượng bởi dung lượng thị trường 20 tỷ đô.', 'total addressable market, TAM'],
        ['incumbent', '/ɪnˈkʌm.bənt/', 'noun', 'B2', 'Doanh nghiệp đương nhiệm đầu ngành', 'A company that already holds a major market share.', 'Startups aim to disrupt slow-moving legacy incumbents.', 'Các startup nhắm đến việc lật đổ doanh nghiệp đương nhiệm.', 'industry incumbent, incumbent player'],
        ['value chain', '/ˈvæl.juː tʃeɪn/', 'phrase', 'B2', 'Chuỗi giá trị cung ứng', 'The series of processes by which a company adds value.', 'Optimizing the supply value chain lowered operating expenses.', 'Tối ưu chuỗi giá trị giúp giảm chi phí vận hành.', 'value chain analysis, global value chain'],
        ['product-market fit', '/ˈprɑː.dʌkt ˈmɑːr.kɪt fɪt/', 'phrase', 'B2', 'Sự phù hợp giữa sản phẩm và thị trường', 'Being in a good market with a product that satisfies demand.', 'Do not spend heavily before reaching product-market fit.', 'Đừng chi tiêu mạnh tay trước khi đạt độ vừa vặn thị trường.', 'achieve fit, validate fit']
      ]),
      makeBranch('branch-biz-2', 'Venture Capital & Financing', 'Đầu tư Mạo hiểm & Tài chính', '#10B981', [
        ['valuation', '/ˌvæl.juˈeɪ.ʃən/', 'noun', 'B2', 'Định giá doanh nghiệp', 'Estimation of the worth of a commercial company.', 'The startup attained a unicorn valuation.', 'Startup đạt mức định giá kỳ lân.', 'pre-money valuation, post-money'],
        ['due diligence', '/ˌduː ˈdɪl.ə.dʒəns/', 'phrase', 'B2', 'Thẩm định chuyên sâu trước đầu tư', 'Comprehensive audit of a company before purchase.', 'Investors conducted legal due diligence.', 'Nhà đầu tư tiến hành thẩm định pháp lý.', 'conduct due diligence, rigorous check'],
        ['stakeholder', '/ˈsteɪkˌhoʊl.dɚ/', 'noun', 'B1', 'Bên liên quan có lợi ích gắn liền', 'A person with an interest in an enterprise.', 'We briefed all key stakeholders on changes.', 'Chúng tôi báo cáo với các bên liên quan chủ chốt.', 'key stakeholder, stakeholder meeting'],
        ['equity', '/ˈek.wə.t̬i/', 'noun', 'B2', 'Cổ phần sở hữu trong công ty', 'The value of the shares issued by a company.', 'Founders granted 10% equity to early engineering leads.', 'Nhà sáng lập trao 10% cổ phần cho các kỹ sư chủ chốt.', 'sweat equity, equity distribution'],
        ['liquidity', '/lɪˈkwɪd.ə.t̬i/', 'noun', 'B2', 'Tính thanh khoản tiền mặt', 'The availability of liquid assets to a market or company.', 'High liquidity allows firms to seize immediate opportunities.', 'Thanh khoản cao giúp doanh nghiệp nắm bắt cơ hội ngay.', 'liquidity event, cash liquidity'],
        ['dividend', '/ˈdɪv.ə.dend/', 'noun', 'B2', 'Cổ tức chia cho cổ đông', 'A sum of money paid regularly by a company to shareholders.', 'The board approved a quarterly dividend payout.', 'Hội đồng quản trị duyệt chi trả cổ tức hàng quý.', 'pay dividends, dividend yield'],
        ['term sheet', '/ˈtɝːm ˌʃiːt/', 'phrase', 'B2', 'Bản thỏa thuận điều khoản đầu tư', 'A non-binding agreement outlining basic terms of investment.', 'They signed the term sheet after two weeks of negotiations.', 'Họ ký bản thỏa thuận điều khoản sau 2 tuần đàm phán.', 'sign a term sheet, investment terms'],
        ['angel investor', '/ˈeɪn.dʒəl ɪnˈves.tɚ/', 'phrase', 'B2', 'Nhà đầu tư thiên thần khởi nghiệp', 'An affluent individual who provides early capital for a startup.', 'Our first seed check came from a prominent angel investor.', 'Khoản đầu tư đầu tiên đến từ nhà đầu tư thiên thần.', 'angel round, angel syndicate'],
        ['convertible note', '/kənˈvɝː.t̬ə.bəl noʊt/', 'phrase', 'B2', 'Trái phiếu chuyển đổi thành cổ phần', 'Short-term debt that converts into equity.', 'We raised $500k via a convertible note with a valuation cap.', 'Chúng tôi gọi 500k USD bằng trái phiếu chuyển đổi.', 'convertible debt, valuation cap'],
        ['dilution', '/daɪˈluː.ʃən/', 'noun', 'B2', 'Sự pha loãng tỷ lệ cổ phần', 'Reduction in existing shareholders’ equity percentage.', 'Founders must manage dilution carefully across funding rounds.', 'Người sáng lập phải quản lý độ pha loãng cẩn trọng.', 'equity dilution, anti-dilution clause'],
        ['capitalization', '/ˌkæp.ə.t̬əl.əˈzeɪ.ʃən/', 'noun', 'B2', 'Tổng vốn hóa thị trường', 'The provision of capital for a company, or its market value.', 'The firm reached a market capitalization of $10 billion.', 'Công ty đạt mức vốn hóa thị trường 10 tỷ đô la.', 'market capitalization, cap table'],
        ['burn rate', '/ˈbɝːn ˌreɪt/', 'phrase', 'B2', 'Tốc độ đốt tiền hàng tháng', 'The rate at which an enterprise is spending capital.', 'Our monthly cash burn rate stands at $45,000.', 'Tốc độ tiêu tiền hàng tháng của chúng tôi là 45.000 USD.', 'monthly burn rate, reduce burn'],
        ['return on investment', '/rɪˈtɝːn ɑːn ɪnˈvest.mənt/', 'phrase', 'B1', 'Tỷ suất hoàn vốn đầu tư (ROI)', 'A ratio between net income and investment.', 'The campaign yielded a 300% return on investment.', 'Chiến dịch mang lại tỷ suất hoàn vốn đầu tư 300%.', 'high ROI, calculate ROI'],
        ['series funding', '/ˈsɪr.iːz ˈfʌn.dɪŋ/', 'phrase', 'B2', 'Các vòng gọi vốn đầu tư (Series A, B, C)', 'Sequential rounds of venture capital investment.', 'Closing Series A enabled them to hire 40 engineers.', 'Khép lại Series A giúp họ tuyển thêm 40 kỹ sư.', 'Series A round, Series B funding'],
        ['vesting schedule', '/ˈves.tɪŋ ˈskedʒ.uːl/', 'phrase', 'B2', 'Lịch trình trao quyền sở hữu cổ phần theo năm', 'A timeline over which an employee earns full rights to equity.', 'Contracts enforce a 4-year vesting schedule with a 1-year cliff.', 'Hợp đồng áp dụng lịch trao cổ phần 4 năm với kỳ thử thách 1 năm.', '4-year vesting, one-year cliff']
      ]),
      makeBranch('branch-biz-3', 'Operations & Scaling', 'Vận hành & Mở rộng Quy mô', '#F59E0B', [
        ['deliverable', '/dɪˈlɪv.ɚ.ə.bəl/', 'noun', 'B1', 'Sản phẩm bàn giao', 'A good or service produced as a result of a project.', 'The functional prototype is the primary deliverable.', 'Bản mẫu chức năng là sản phẩm bàn giao chính.', 'key deliverable, project deliverable'],
        ['bottleneck', '/ˈbɑː.t̬əl.nek/', 'noun', 'B2', 'Điểm nghẽn làm chậm tiến độ', 'A point of congestion that slows progress.', 'Manual approvals became a major operational bottleneck.', 'Khâu duyệt thủ công đã trở thành điểm nghẽn lớn.', 'eliminate bottleneck, process bottleneck'],
        ['agile', '/ˈædʒ.aɪl/', 'adjective', 'B2', 'Linh hoạt, thích ứng nhanh', 'Project management divided into short iterative phases.', 'Our cross-functional teams follow agile sprints.', 'Các đội ngũ của chúng tôi tuân theo chu kỳ linh hoạt.', 'agile framework, agile development'],
        ['milestone', '/ˈmaɪl.stoʊn/', 'noun', 'B1', 'Cột mốc tiến độ quan trọng', 'A significant stage or event in development.', 'Reaching one million active users was a massive milestone.', 'Đạt một triệu người dùng là một cột mốc lớn.', 'critical milestone, reach a milestone'],
        ['workflow', '/ˈwɝːk.floʊ/', 'noun', 'B1', 'Quy trình luân chuyển công việc', 'The sequence of industrial or administrative processes.', 'Automated notifications streamlined our sales workflow.', 'Thông báo tự động đã tinh giản quy trình bán hàng.', 'optimize workflow, automated workflow'],
        ['procurement', '/prəˈkjʊr.mənt/', 'noun', 'B2', 'Thu mua nguyên vật liệu & thiết bị', 'The action of obtaining equipment or supplies.', 'The procurement department secured wholesale discounts.', 'Phòng thu mua đã đạt được mức chiết khấu giá sỉ.', 'procurement process, strategic procurement'],
        ['bandwidth', '/ˈbænd.wɪtθ/', 'noun', 'B2', 'Năng lực thời gian để nhận việc', 'The capacity or resources needed to handle a task.', 'I do not have the bandwidth to lead another client project.', 'Hiện tại tôi không còn đủ quỹ thời gian phụ trách thêm dự án.', 'mental bandwidth, lack bandwidth'],
        ['synergy', '/ˈsɪn.ɚ.dʒi/', 'noun', 'B2', 'Sự hiệp đồng, hiệu ứng cộng hưởng', 'Combined interaction producing a greater sum than parts.', 'The merger produced operational synergies across teams.', 'Vụ sáp nhập tạo nên sự cộng hưởng vận hành.', 'create synergy, team synergy'],
        ['scalable', '/ˈskeɪ.lə.bəl/', 'adjective', 'B2', 'Có khả năng mở rộng quy mô dễ dàng', 'Able to scale easily without proportionate cost increase.', 'Software firms thrive because their code architecture is scalable.', 'Các công ty phần mềm phát triển vì kiến trúc có thể mở rộng.', 'scalable model, scalable infrastructure'],
        ['streamline', '/ˈstriːm.laɪn/', 'verb', 'B2', 'Tinh giản, tối ưu hóa quy trình', 'To make an organization or system more efficient.', 'We redesigned the dashboard to streamline client reporting.', 'Chúng tôi thiết kế lại để tinh giản báo cáo.', 'streamline operations, streamline communication'],
        ['overhead', '/ˈoʊ.vɚ.hed/', 'noun', 'B2', 'Chi phí gián tiếp cố định (thuê nhà, điện...)', 'Regular and necessary expenses in running a business.', 'Switching to remote work slashed our office overhead costs.', 'Chuyển sang làm từ xa đã cắt giảm chi phí văn phòng cố định.', 'low overhead, reduce overhead'],
        ['inventory', '/ˈɪn.vən.tɔːr.i/', 'noun', 'B1', 'Hàng tồn kho', 'A complete list of items such as goods in stock.', 'Just-in-time logistics prevents excess warehouse inventory.', 'Hậu cần đúng lúc giúp tránh việc dư thừa hàng tồn kho.', 'manage inventory, inventory turnover'],
        ['outsourcing', '/ˈaʊtˌsɔːr.sɪŋ/', 'noun', 'B1', 'Thuê ngoài dịch vụ', 'Obtaining goods or services from an outside supplier.', 'Outsourcing non-core tasks enabled us to focus on innovation.', 'Thuê ngoài các việc phụ giúp chúng tôi tập trung sáng tạo.', 'offshore outsourcing, outsourcing partner'],
        ['key performance indicator', '/kiː pɚˈfɔːr.məns ˈɪn.də.keɪ.t̬ɚ/', 'phrase', 'B1', 'Chỉ số đo lường hiệu suất (KPI)', 'Measurable value demonstrating progress toward objectives.', 'Our primary KPI this quarter is user activation rate.', 'Chỉ số KPI chính quý này là tỷ lệ kích hoạt tài khoản.', 'track KPI, meet KPIs'],
        ['turnover', '/ˈtɝːnˌoʊ.vɚ/', 'noun', 'B2', 'Doanh thu hoặc tỷ lệ luân chuyển nhân sự', 'Money taken by a business, or employee turnover rate.', 'Competitive salaries reduced annual employee turnover.', 'Lương cạnh tranh đã giảm tỷ lệ nghỉ việc hàng năm.', 'annual turnover, employee turnover']
      ]),
      makeBranch('branch-biz-4', 'Leadership & Governance', 'Lãnh đạo & Quản trị Doanh nghiệp', '#8B5CF6', [
        ['conglomerate', '/kənˈɡlɑː.mɚ.ət/', 'noun', 'B2', 'Tập đoàn đa ngành', 'A corporation made up of several different businesses.', 'The media conglomerate acquired three studios.', 'Tập đoàn truyền thông đã mua lại ba xưởng phim.', 'global conglomerate, multinational'],
        ['merger', '/ˈmɝː.dʒɚ/', 'noun', 'B2', 'Sự sáp nhập doanh nghiệp', 'A combination of two companies into one.', 'The merger created the country’s largest carrier.', 'Vụ sáp nhập tạo ra hãng vận tải lớn nhất nước.', 'mergers and acquisitions, M&A'],
        ['compliance', '/kəmˈplaɪ.əns/', 'noun', 'B2', 'Sự tuân thủ luật lệ và quy định', 'Complying with regulatory rules and policies.', 'Banks must ensure strict regulatory compliance.', 'Ngân hàng phải đảm bảo tuân thủ nghiêm ngặt quy định.', 'regulatory compliance, ensure compliance'],
        ['fiduciary', '/fɪˈduː.ʃi.er.i/', 'adjective', 'B2', 'Nghĩa vụ ủy thác tài chính', 'Involving trust between trustee and beneficiary.', 'Directors hold a fiduciary duty to shareholders.', 'Giám đốc có nghĩa vụ ủy thác đối với cổ đông.', 'fiduciary duty, fiduciary responsibility'],
        ['consortium', '/kənˈsɔːr.ti.əm/', 'noun', 'B2', 'Liên minh kinh tế', 'An association of several companies for a project.', 'An international consortium financed the port project.', 'Một liên minh quốc tế đã tài trợ dự án cảng biển.', 'form a consortium, banking consortium'],
        ['board of directors', '/bɔːrd əv dɪˈrek.tɚz/', 'phrase', 'B1', 'Hội đồng quản trị', 'Elected group representing shareholders.', 'The board of directors appointed the new CEO.', 'Hội đồng quản trị đã bổ nhiệm Tổng giám đốc mới.', 'board meeting, board resolution'],
        ['consensus', '/kənˈsen.səs/', 'noun', 'B2', 'Sự đồng thuận chung', 'A general agreement among members of a group.', 'Leadership reached a consensus on the new strategy.', 'Ban lãnh đạo đã đạt được sự đồng thuận về chiến lược mới.', 'reach consensus, broad consensus'],
        ['resolution', '/ˌrez.əˈluː.ʃən/', 'noun', 'B2', 'Nghị quyết đại hội', 'A formal decision agreed upon by an assembly.', 'Shareholders passed a formal resolution to expand.', 'Các cổ đông đã thông qua nghị quyết mở rộng.', 'pass a resolution, board resolution'],
        ['subsidiary', '/səbˈsɪd.i.er.i/', 'noun', 'B2', 'Công ty con trực thuộc công ty mẹ', 'A company controlled by a holding parent company.', 'The company operates a research subsidiary in Tokyo.', 'Công ty vận hành một công ty con nghiên cứu tại Tokyo.', 'wholly owned subsidiary, overseas subsidiary'],
        ['accountability', '/əˌkaʊn.t̬əˈbɪl.ə.t̬i/', 'noun', 'B2', 'Trách nhiệm giải trình', 'The state of being responsible and answerable.', 'Clear ownership fosters personal accountability.', 'Quyền sở hữu rõ ràng thúc đẩy trách nhiệm giải trình cá nhân.', 'hold accountable, foster accountability'],
        ['transparency', '/trænˈspær.ən.si/', 'noun', 'B2', 'Tính minh bạch trong quản trị', 'The condition of being open and honest in operations.', 'Publishing quarterly reports builds transparency.', 'Công khai báo cáo quý giúp xây dựng tính minh bạch.', 'corporate transparency, promote transparency'],
        ['stakeholder engagement', '/ˈsteɪkˌhoʊl.dɚ ɪnˈɡeɪdʒ.mənt/', 'phrase', 'B2', 'Gắn kết các bên liên quan', 'Involving individuals affected by business actions.', 'Stakeholder engagement averted community opposition.', 'Gắn kết các bên liên quan giúp ngăn phản đối từ cộng đồng.', 'stakeholder dialogue, active engagement'],
        ['turnaround', '/ˈtɝːn.ə.raʊnd/', 'noun', 'B2', 'Sự xoay chuyển tình thế ngoạn mục', 'An abrupt recovery from financial trouble.', 'The CEO led a dramatic turnaround to profitability.', 'CEO dẫn dắt cuộc xoay chuyển ngoạn mục để có lãi.', 'corporate turnaround, turnaround plan'],
        ['restructuring', '/ˌriːˈstrʌk.tʃɚ.ɪŋ/', 'noun', 'B2', 'Tái cơ cấu tổ chức', 'Reorganizing the financial or management structure.', 'Restructuring flattened management layers.', 'Tái cơ cấu đã làm phẳng các tầng quản lý.', 'debt restructuring, organizational restructure'],
        ['core competency', '/kɔːr ˈkɑːm.pə.t̬ən.si/', 'phrase', 'B2', 'Năng lực cốt lõi khác biệt', 'A defining capability distinguishing an enterprise.', 'Our core competency lies in advanced AI algorithms.', 'Năng lực cốt lõi của chúng tôi nằm ở thuật toán AI nâng cao.', 'develop competency, core strength']
      ])
    ]
  }
];

// Helper to generate a full 60-word topic easily
function generateTopicPack(id, catId, nameEn, nameVi, desc, cover, cefr, branchesData) {
  return {
    id,
    categoryId: catId,
    nameEn,
    nameVi,
    description: desc,
    coverImage: cover,
    cefrRange: cefr,
    status: 'In Progress',
    progress: Math.floor(Math.random() * 40) + 20,
    branches: branchesData.map((b, i) => makeBranch(`branch-${id}-${i+1}`, b.labelEn, b.labelVi, b.color, b.words))
  };
}

// Generate remaining 8 topics using systematic dictionaries
console.log('Generating full comprehensive dataset for all 9 topics...');

EOF
