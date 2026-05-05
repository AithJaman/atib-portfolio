export type Language = 'en' | 'zh';

export const personalInfo = {
  fullName: 'MD Monjur A Alahi Atib',
  shortName: 'Atib',
  chineseName: '艾缇',
  emails: ['aitbzaman@gmail.com', 'jamanatib@qq.com', 'ls2303201@buaa.edu.cn'],
  primaryEmail: 'aitbzaman@gmail.com',
  phone: '+8613264910246',
  wechat: 'Atibjaman',
  location: 'Beijing, China',
  address: '29 Haidian Road, Haidian District, Beijing',
  addressZh: '北京市海淀区海淀路29号，北京航空航天大学',
  nationality: 'Bangladesh',
  dob: '2000',
  passport: 'A19237023',
    researchGate: 'https://www.researchgate.net/profile/Monjur-A-Alahi-Atib',
  googleScholar: 'https://scholar.google.com/citations?view_op=list_works&hl=en&user=mWzQf5UAAAAJ',
  linkedIn: 'https://www.linkedin.com/in/atib-zaman',
  github: 'https://github.com/atibzaman',
  cvPdfUrl: '/cv-atib.pdf',
};

export const institutions = {
  buaa: { name: 'Beihang University (BUAA)', nameZh: '北京航空航天大学', url: 'https://is.buaa.edu.cn/en/' },
  ctgu: { name: 'China Three Gorges University (CTGU)', nameZh: '三峡大学', url: 'https://eng.ctgu.edu.cn/' },
  akij: { name: 'Akij Engineering Institute', nameZh: 'Akij 工程学院', url: 'https://aeiag.edu.bd/' },
};

export const socialLinks = [
    { icon: 'Linkedin', href: 'https://www.linkedin.com/in/atib-zaman', label: 'LinkedIn' },
  { icon: 'BookOpen', href: 'https://www.researchgate.net/profile/Monjur-A-Alahi-Atib', label: 'ResearchGate' },
  { icon: 'GraduationCap', href: 'https://scholar.google.com/citations?user=mWzQf5UAAAAJ&hl=en', label: 'Google Scholar' },
  { icon: 'Github', href: 'https://github.com/atibzaman', label: 'GitHub' },
  { icon: 'Mail', href: 'mailto:aitbzaman@gmail.com', label: 'Email' },
];

export const siteConfig = {
  languages: ['en', 'zh'] as Language[],
  defaultLanguage: 'zh' as Language,
  title: { en: 'Atib | Automation & Control Engineer', zh: '艾缇 | 自动化与控制工程师' },
  description: { en: 'Portfolio of MD Monjur A Alahi Atib - Control Engineering, Automation & Research', zh: 'MD Monjur A Alahi Atib的作品集 - 控制工程、自动化与研究' },
};

export const navigationConfig = {
  logo: { en: 'Atib', zh: '艾缇' },
  links: [
    { label: { en: 'About', zh: '关于' }, href: '#about' },
    { label: { en: 'Skills', zh: '技能' }, href: '#skills' },
    { label: { en: 'Achievements', zh: '成就' }, href: '#achievements' },
    { label: { en: 'Projects', zh: '项目' }, href: '#projects' },
    { label: { en: 'Publications', zh: '论文' }, href: '#publications' },
    { label: { en: 'Education', zh: '教育' }, href: '#education' },
  ],
  contactLabel: { en: 'Contact', zh: '联系' },
  contactHref: '#contact',
};

export const heroConfig = {
  name: { en: 'ATIB', zh: '艾缇' },
  roles: { en: ['Control Engineer', 'Automation Specialist', 'Researcher', 'Developer'], zh: ['控制工程师', '自动化专家', '研究员', '开发者'] },
  backgroundImage: '/atib-portfolio/images/hero-bg.jpg',
  tagline: { en: 'Automation & Control Engineer | Researcher', zh: '自动化与控制工程师 | 研究员' },
  subtitle: { en: "Master's in Control Engineering at Beihang University (BUAA). Specializing in robust nonlinear control, airship dynamics, PLC-based automation, and AI for e-commerce. CSC Scholarship recipient with 2 IFAC publications.", zh: '北京航空航天大学控制工程硕士。专攻鲁棒非线性控制、飞艇动力学、PLC自动化及电商AI应用。中国政府奖学金获得者，发表2篇IFAC论文。' },
  badges: [
    { icon: '🏆', text: { en: 'CSC Scholar (2023-2026)', zh: 'CSC奖学金 (2023-2026)' } },
    { icon: '📄', text: { en: '2 IFAC Papers', zh: '2篇IFAC论文' } },
    { icon: '🔧', text: { en: 'CSWP | Six Sigma', zh: 'CSWP | 六西格玛' } },
    { icon: '🎓', text: { en: 'BUAA Researcher', zh: '北航研究员' } },
    { icon: '🌟', text: { en: 'Excellence Award (Tsinghua)', zh: '卓越奖 (清华大学)' } },
  ],
};

export const aboutConfig = {
  label: { en: 'About', zh: '关于' },
  description: { en: "Master's student in Control Engineering at Beihang University (BUAA), CSC Scholarship recipient. Published researcher in robust nonlinear control, airship dynamics, PLC automation and AI applications. Experienced in MATLAB/Simulink, SolidWorks (CSWP), Siemens PLC programming, and industrial control systems. Holder of Six Sigma Green Belt certification with 5 languages proficiency (Bengali, English, Chinese, Hindi, Urdu).", zh: '北京航空航天大学控制工程硕士，中国政府奖学金获得者。在鲁棒非线性控制、飞艇动力学、PLC自动化及AI应用领域有深入研究。精通MATLAB/Simulink、SolidWorks (CSWP)、西门子PLC编程和工业控制系统。持有六西格玛绿带认证，熟练掌握5种语言（孟加拉语、英语、中文、印地语、乌尔都语）。' },
  experienceValue: '6+',
  experienceLabel: { en: 'Years of\nResearch &\nEngineering', zh: '年研究\n与工程\n经验' },
  stats: [
    { value: '2', label: { en: 'IFAC\nPublications', zh: 'IFAC\n论文' } },
    { value: '7+', label: { en: 'Major\nProjects', zh: '主要\n项目' } },
    { value: '5', label: { en: 'Core\nSkill Areas', zh: '核心\n技能领域' } },
    { value: '5', label: { en: 'Languages\nFluent', zh: '流利\n语言' } },
  ],
  images: [
    { src: '/atib-portfolio/images/about-1.jpg', alt: { en: 'PLC Programming', zh: 'PLC编程' } },
    { src: '/atib-portfolio/images/about-2.jpg', alt: { en: 'CAD Design', zh: 'CAD设计' } },
    { src: '/atib-portfolio/images/about-3.jpg', alt: { en: 'Airship Research', zh: '飞艇研究' } },
    { src: '/atib-portfolio/images/about-4.jpg', alt: { en: 'Conference Presentation', zh: '学术会议' } },
  ],
};

export const skillsConfig = {
  label: { en: 'Technical Skills', zh: '技术技能' },
  heading: { en: 'Expertise &\nCapabilities', zh: '专业领域\n与能力' },
  description: { en: 'A multidisciplinary skill set spanning control theory, industrial automation, mechanical design, and artificial intelligence.', zh: '跨学科技能组合，涵盖控制理论、工业自动化、机械设计和人工智能。' },
  categories: [
    { title: { en: 'Control & Robotics', zh: '控制与机器人' }, icon: 'Cpu', skills: ['MATLAB/Simulink', 'SMC / Backstepping', 'PID / LQR / MPC', 'Robust Control', 'Nonlinear Dynamics', 'Monte Carlo Analysis'], image: '/atib-portfolio/images/service-1.jpg' },
    { title: { en: 'PLC & Automation', zh: 'PLC与自动化' }, icon: 'Settings', skills: ['Siemens LOGO! / S7-200', 'Ladder / FBD / IL', 'SCADA / HMI', 'Industrial Wiring', 'Relay Logic', 'HVAC / Fire Safety'], image: '/atib-portfolio/images/service-2.jpg' },
    { title: { en: 'Design & Simulation', zh: '设计与仿真' }, icon: 'Box', skills: ['SolidWorks (CSWP Certified)', 'AutoCAD', 'FEA / CFD', '3D Modeling', 'FEA Structural Analysis'], image: '/atib-portfolio/images/service-3.jpg' },
    { title: { en: 'AI & Programming', zh: 'AI与编程' }, icon: 'Brain', skills: ['Python / FastAPI', 'PyTorch / ResNet-18', 'DeepSeek API', 'Git / GitHub', 'LaTeX / Academic Writing'], image: '/atib-portfolio/images/service-4.jpg' },
  ],
};

export const achievementsConfig = {
  label: { en: 'Achievements', zh: '荣誉成就' },
  heading: { en: 'Awards &\nRecognition', zh: '奖项与\n荣誉' },
  description: { en: 'Click any certificate to view details and full resolution.', zh: '点击任意证书查看详情和高清版本。' },
  items: [
    {
      image: '/atib-portfolio/images/cert-buaa-excellent.png',
      title: { en: 'BUAA Excellent Student Award', zh: '北航优秀学生奖' },
      subtitle: { en: 'Beihang University, 2025', zh: '北京航空航天大学，2025' },
      description: { en: 'Awarded for outstanding academic performance and research contributions among all international students.', zh: '因在自动化科学与电气工程学院所有国际学生中表现优异的学业成绩和研究贡献而荣获优秀学生奖。' },
      year: '2025',
      certificateImage: '/atib-portfolio/images/cert-buaa-excellent.png',
    },
    {
      image: '/atib-portfolio/images/cert-tsinghua-iede.png',
      title: { en: 'Tsinghua IEDE Program', zh: '清华IEDE项目' },
      subtitle: { en: 'Innovation & Entrepreneurship, 2024', zh: '创新创业，2024' },
      description: { en: 'Completed the IEDE Global Program at Tsinghua University in innovation, entrepreneurship and digital economy.', zh: '完成清华大学IEDE全球项目，在创新、创业和数字经济战略方面获得实践经验。' },
      year: '2024',
      certificateImage: '/atib-portfolio/images/cert-tsinghua-iede.png',
    },
    {
      image: '/atib-portfolio/images/cert-NEDL-PLC.png',
      title: { en: 'PLC Automation Training', zh: 'PLC自动化培训' },
      subtitle: { en: 'NEDL Certificate, 2022', zh: 'NEDL证书，2022' },
      description: { en: 'Professional training in Programmable Logic Controller based industrial automation with Siemens S7-1200.', zh: '可编程逻辑控制器（PLC）工业自动化系统专业培训，包括西门子S7-1200和HMI界面设计。' },
      year: '2022',
      certificateImage: '/atib-portfolio/images/cert-NEDL-PLC.png',
    },
    {
      image: '/atib-portfolio/images/cert-ctgu-outstanding-grad.png',
      title: { en: 'Outstanding Graduate Award', zh: '优秀毕业生奖' },
      subtitle: { en: 'CTGU, Class of 2023', zh: '三峡大学，2023届' },
      description: { en: 'Honored for exceptional academic achievements, leadership in research activities, and contributions to the university.', zh: '因出色的学业成绩、科研活动中的领导能力以及对大学社区的贡献而荣获优秀毕业生称号。' },
      year: '2023',
      certificateImage: '/atib-portfolio/images/cert-ctgu-outstanding-grad.png',
    },
    {
      image: '/atib-portfolio/images/cert-ctgu-sci-fest.png',
      title: { en: 'Science Festival - 3rd Prize', zh: '科学节三等奖' },
      subtitle: { en: 'CTGU, 2020', zh: '三峡大学，2020' },
      description: { en: 'Designed a PLC-based kitchen fire prevention system reducing unattended stove fire risks by 70%.', zh: '设计了基于PLC的创新厨房防火系统，通过自动化定时和报警系统将无人看管炉灶火灾风险降低70%。' },
      year: '2020',
      certificateImage: '/atib-portfolio/images/cert-ctgu-sci-fest.png',
    },
    {
      image: '/atib-portfolio/images/cert-ctgu-engg-drawing.png',
      title: { en: 'Engineering Drawing Competition', zh: '工程制图竞赛' },
      subtitle: { en: 'CTGU, 2021', zh: '三峡大学，2021' },
      description: { en: 'Secured top position in CAD software, technical drawing standards, and precision engineering visualization.', zh: '在工程制图竞赛中获得优胜，展示了出色的CAD软件技能、技术制图标准和精密工程可视化能力。' },
      year: '2021',
      certificateImage: '/atib-portfolio/images/cert-ctgu-engg-drawing.png',
    },
    {
      image: '/atib-portfolio/images/cert-akij-world-vocational.png',
      title: { en: 'World Vocational Skills Competition', zh: '世界职业院校技能大赛' },
      subtitle: { en: 'Akij Institute, 2019', zh: 'Akij学院，2019' },
      description: { en: 'Represented Akij Engineering Institute showcasing expertise in industrial electrical systems and automation.', zh: '代表Akij工程学院参加世界职业院校技能大赛，展示工业电气系统和自动化方面的专业知识。' },
      year: '2019',
      certificateImage: '/atib-portfolio/images/cert-akij-world-vocational.png',
    },
  ],
};

export const portfolioConfig = {
  label: { en: 'Featured Projects', zh: '代表性项目' },
  heading: { en: 'Selected\nWorks', zh: '精选\n作品' },
  description: { en: 'A collection of projects showcasing expertise in control systems, automation, AI integration, and sustainable energy.', zh: '展示控制系统、自动化、AI集成和可持续能源专长的项目合集。' },
  projects: [
    {
      title: { en: 'Vector-Thrust Spherical Indoor Airship', zh: '矢量推力球形室内飞艇' },
      category: { en: 'Robust Control / MATLAB', zh: '鲁棒控制 / MATLAB' },
      year: '2025',
      image: '/atib-portfolio/images/portfolio-1.jpg',
      introduction: { en: 'Indoor airships face significant challenges in maintaining precise translational control under wind disturbances. Conventional Backstepping Control (BSC) suffers from large tracking errors.', zh: '室内飞艇在风扰下保持精确平移控制面临重大挑战。传统反步控制(BSC)存在较大跟踪误差。' },
      objective: { en: 'Design a robust Sliding Mode Backstepping Controller (SMBSC) for precise translational control of a vector-thrust spiral indoor airship, validated under 2000+ wind disturbances.', zh: '为矢量推力螺旋室内飞艇设计鲁棒滑模反步控制器(SMBSC)，实现精确平移控制，并在2000+次风扰下验证。' },
      result: { en: 'Published in IFAC-PapersOnLine 2025', zh: '发表于IFAC-PapersOnLine 2025' },
      outcome: { en: 'Achieved 86% reduction in peak tracking error compared to conventional BSC. Novel control architecture with Monte Carlo validation under 2000+ wind scenarios. Published in IFAC 2025 conference.', zh: '与传统BSC相比，峰值跟踪误差降低86%。新型控制架构在2000+次风况下蒙特卡洛验证。发表于IFAC 2025会议。' },
      featured: true,
      link: 'https://www.sciencedirect.com/science/article/pii/S2405896325008278',
    },
    {
      title: { en: 'PLC-Based Intelligent Home Automation', zh: '基于PLC的智能家居自动化' },
      category: { en: 'Siemens LOGO! / Automation', zh: 'Siemens LOGO! / 自动化' },
      year: '2023',
      image: '/atib-portfolio/images/portfolio-2.jpg',
      introduction: { en: 'Traditional homes waste significant energy through inefficient lighting, manual curtain operation, and uncontrolled HVAC systems. Safety hazards exist from unattended stoves and lack of fire detection.', zh: '传统住宅因照明效率低下、手动窗帘操作和不受控的暖通空调系统而浪费大量能源。无人看管的炉灶和缺乏火灾检测存在安全隐患。' },
      objective: { en: 'Design a comprehensive smart home automation system using Siemens LOGO! PLC integrating lighting, curtains, water pump, fire prevention, HVAC, and security with sensor-based control.', zh: '使用西门子LOGO! PLC设计综合智能家居自动化系统，集成照明、窗帘、水泵、消防、暖通空调和安防的传感器控制。' },
      result: { en: 'Bachelor Thesis, CTGU 2023', zh: '本科毕业论文，三峡大学 2023' },
      outcome: { en: 'Reduced standby power consumption by ~25%. Integrated 15+ sensors using relay logic circuits. Complete smart home management achieved with Siemens LOGO! 12/24 RCE PLC.', zh: '待机功耗降低约25%。使用继电器逻辑电路集成15+传感器。通过西门子LOGO! 12/24 RCE PLC实现完整的智能家居管理。' },
    },
    {
      title: { en: 'AI E-Commerce Content Automation', zh: 'AI电商内容自动化' },
      category: { en: 'DeepSeek / PyTorch / FastAPI', zh: 'DeepSeek / PyTorch / FastAPI' },
      year: '2024',
      image: '/atib-portfolio/images/portfolio-3.jpg',
      introduction: { en: 'SMEs in developing countries struggle with digital marketing due to high costs and lack of expertise in creating quality product content for social media platforms.', zh: '发展中国家的中小企业因成本高和缺乏社交媒体优质产品内容创作专长而在数字营销方面挣扎。' },
      objective: { en: 'Build an AI-powered mobile app that automatically classifies product images and generates optimized captions/hashtags using ResNet-18 and DeepSeek API for SME digital marketing.', zh: '构建AI驱动的移动应用，使用ResNet-18和DeepSeek API自动分类产品图像并生成优化的描述/标签，用于中小企业数字营销。' },
      result: { en: 'Team Project - March 2025', zh: '团队项目 - 2025年3月' },
      outcome: { en: '97.8% classification accuracy achieved. Reduced manual content creation effort by 80%. Successfully targeted SMEs in Pakistan and Bangladesh.', zh: '分类准确率达97.8%。减少80%人工内容创作工作量。成功面向巴基斯坦和孟加拉的中小企业。' },
    },
    {
      title: { en: '10 kW Residential Solar Power Plant', zh: '10kW户用太阳能电站' },
      category: { en: 'Renewable Energy / Design', zh: '可再生能源 / 设计' },
      year: '2023',
      image: '/atib-portfolio/images/portfolio-4.jpg',
      introduction: { en: 'Rising electricity costs and environmental concerns drive the need for residential renewable energy solutions in rural communities with unreliable grid access.', zh: '电费上涨和环境问题推动了对电网不可靠的农村社区住宅可再生能源解决方案的需求。' },
      objective: { en: 'Design a complete 10kW residential solar power system with optimal panel configuration, battery sizing, and economic analysis for a 25-year operational period.', zh: '设计完整的10kW户用太阳能发电系统，含优化面板配置、电池选型及25年运营期的经济分析。' },
      result: { en: 'New Energy Project, CTGU 2023', zh: '新能源项目，三峡大学 2023' },
      outcome: { en: 'System saves 241,498 RMB over 25 years with 83% electricity cost reduction. ROI achieved in year 8. Includes complete PSIM simulation with MPPT optimization.', zh: '系统25年节省241,498元，电费降低83%。第8年实现投资回报。包含完整的PSIM仿真和MPPT优化。' },
    },
    {
      title: { en: 'Vending Machine Design (S7-200 PLC)', zh: '自动售货机设计 (S7-200 PLC)' },
      category: { en: 'PLC / STEP 7 / Automation', zh: 'PLC / STEP 7 / 自动化' },
      year: '2023',
      image: '/atib-portfolio/images/portfolio-5.jpg',
      introduction: { en: 'Manual vending operations are inefficient and lack coin validation, change calculation, and product tracking capabilities needed for modern retail environments.', zh: '手动售货操作效率低下，缺乏现代零售环境所需的硬币验证、找零计算和产品跟踪功能。' },
      objective: { en: 'Design and program a 6-product automated vending machine using Siemens S7-200 PLC with coin detection, product selection, motor-driven dispensing, and change return.', zh: '使用西门子S7-200 PLC设计和编程6产品自动售货机，含硬币检测、产品选择、电机驱动出货和找零功能。' },
      result: { en: 'CTGU Course Project 2023', zh: '三峡大学课程项目 2023' },
      outcome: { en: 'Successfully implemented state machine (Idle > Payment > Selection > Dispensing > Completion). Validated with S7-200 Sim and STEP 7 MicroWIN SP9 programming.', zh: '成功实现状态机（空闲>付款>选择>出货>完成）。通过S7-200 Sim和STEP 7 MicroWIN SP9编程验证。' },
      featured: true,
    },
  ],
  cta: { label: { en: "Let's Collaborate", zh: '合作咨询' }, heading: { en: 'Have a project in mind?', zh: '有项目想法？' }, linkText: { en: 'Get in Touch', zh: '联系我' }, linkHref: '#contact' },
  viewAllLabel: { en: 'View All Projects', zh: '查看全部项目' },
};

export const publicationsConfig = {
  label: { en: 'Publications', zh: '学术论文' },
  heading: { en: 'Research\nPapers', zh: '研究\n论文' },
  description: { en: 'Peer-reviewed publications in leading control systems conferences (IFAC).', zh: '领先控制系统会议（IFAC）上的同行评审论文。' },
  items: [
    {
      authors: 'M. A. A. Atib, H. Ambreen, M. Imran, W. Lei',
      title: 'Dual-Gas H\u2082/He Airship Design: Optimized Buoyancy and PID-Based Altitude Control',
      journal: 'IFAC-PapersOnLine',
      details: 'vol. 59, no. 20, pp. 2567-2572',
      year: '2025',
      link: 'https://www.sciencedirect.com/science/article/pii/S2405896325008278',
      keywords: { en: 'Airship design, PID control, dual-gas buoyancy, altitude control', zh: '飞艇设计、PID控制、双气体浮力、高度控制' },
    },
    {
      authors: 'H. Ambreen, M. Imran, M. A. A. Atib, D. Tang',
      title: 'A Digital-Twin-Driven Modeling Approach for System Degradation and Remaining Useful Life Prediction',
      journal: 'IFAC-PapersOnLine',
      details: 'vol. 59, pp. 2177-2182',
      year: '2025',
      link: 'https://www.sciencedirect.com/science/article/pii/S2405896325008279',
      keywords: { en: 'Digital twin, degradation modeling, RUL prediction, prognostics', zh: '数字孪生、退化建模、剩余使用寿命预测、故障预测' },
    },
  ],
};

export const workExperienceConfig = {
  label: { en: 'Experience', zh: '工作经历' },
  heading: { en: 'Work &\nResearch', zh: '工作\n与研究' },
  description: { en: 'Professional experience spanning research, industry, and academic roles across three countries.', zh: '跨越三个国家的研究、工业和学术角色的专业经验。' },
  items: [
    {
      title: { en: 'Master Researcher', zh: '硕士研究员' },
      company: { en: 'Beihang University (BUAA)', zh: '北京航空航天大学' },
      period: '2023 - 2026',
      location: { en: 'Beijing, China', zh: '中国北京' },
      type: { en: 'Full-time Research', zh: '全职研究' },
      description: { en: 'Conducting research on robust nonlinear control systems for indoor airship applications. Developing Sliding Mode Backstepping Controllers (SMBSC) with Monte Carlo validation. Published 2 papers in IFAC conferences.', zh: '开展室内飞艇鲁棒非线性控制系统研究。开发带蒙特卡洛验证的滑模反步控制器(SMBSC)。在IFAC会议上发表2篇论文。' },
      achievements: [
        { en: 'Published 2 IFAC papers on airship control', zh: '发表2篇关于飞艇控制的IFAC论文' },
        { en: 'Achieved 86% peak error reduction vs conventional BSC', zh: '与传统BSC相比峰值误差降低86%' },
        { en: 'CSC Scholarship recipient', zh: '中国政府奖学金获得者' },
      ],
    },
    {
      title: { en: 'PLC Automation Intern', zh: 'PLC自动化实习生' },
      company: { en: 'National Engineering Development Ltd.', zh: '国家工程发展有限公司' },
      period: '2018 - 2019',
      location: { en: 'Gazipur, Bangladesh', zh: '孟加拉国加济布尔' },
      type: { en: 'Internship', zh: '实习' },
      description: { en: 'Hands-on experience with industrial PLC programming, electrical system design, and automation project implementation. Worked with Siemens S7-200 PLCs for manufacturing process control.', zh: '工业PLC编程、电气系统设计和自动化项目实施的实际经验。使用西门子S7-200 PLC进行制造过程控制。' },
      achievements: [
        { en: 'Programmed 8+ PLC experiments successfully', zh: '成功编程8+个PLC实验' },
        { en: 'Designed traffic light and elevator control systems', zh: '设计交通灯和电梯控制系统' },
        { en: 'Gained industrial wiring and SCADA experience', zh: '获得工业布线和SCADA经验' },
      ],
    },
  ],
};

export const documentsConfig = {
  label: { en: 'Documents', zh: '文档资料' },
  heading: { en: 'Transcripts &\nCertificates', zh: '成绩单\n与证书' },
  description: { en: 'Official academic transcripts, certificates, and scholarship documents available for download.', zh: '官方学术成绩单、证书和奖学金文件可供下载。' },
  items: [
    {
      title: { en: 'BSc Academic Transcript', zh: '学士学位成绩单' },
      description: { en: 'Complete academic record from China Three Gorges University (CTGU), Bachelor of Engineering in Automation.', zh: '三峡大学（CTGU）完整学术记录，自动化工程学士。' },
      fileSize: '1.5 MB',
      downloadUrl: '/documents/bsc-transcript.pdf',
      icon: 'FileText',
    },
    {
      title: { en: 'MSc Academic Transcript', zh: '硕士学位成绩单' },
      description: { en: 'Complete academic record from Beihang University (BUAA), Master of Control Engineering.', zh: '北京航空航天大学（BUAA）完整学术记录，控制工程硕士。' },
      fileSize: '1.2 MB',
      downloadUrl: '/documents/msc-transcript.pdf',
      icon: 'FileText',
    },
    {
      title: { en: 'CSWP Certificate', zh: 'CSWP认证' },
      description: { en: 'Certified SolidWorks Professional certification in mechanical design and 3D modeling.', zh: '机械设计和3D建模的认证SolidWorks专业人员。' },
      fileSize: '800 KB',
      downloadUrl: '/documents/cswp-cert.pdf',
      icon: 'Award',
    },
    {
      title: { en: 'Six Sigma Green Belt', zh: '六西格玛绿带' },
      description: { en: 'Process improvement and quality control certification.', zh: '流程改进和质量控制认证。' },
      fileSize: '600 KB',
      downloadUrl: '/documents/six-sigma.pdf',
      icon: 'Award',
    },
    {
      title: { en: 'CSC Scholarship Certificate', zh: 'CSC奖学金证书' },
      description: { en: 'Chinese Government Scholarship certificate for Master studies at BUAA.', zh: '北京航空航天大学硕士中国政府奖学金证书。' },
      fileSize: '900 KB',
      downloadUrl: '/documents/csc-scholarship.pdf',
      icon: 'Award',
    },
    {
      title: { en: 'IFAC Paper 1 - Airship Control', zh: 'IFAC论文1 - 飞艇控制' },
      description: { en: 'Dual-Gas H2/He Airship Design paper published in IFAC-PapersOnLine.', zh: '发表于IFAC-PapersOnLine的双气体H2/He飞艇设计论文。' },
      fileSize: '2.3 MB',
      downloadUrl: 'https://www.sciencedirect.com/science/article/pii/S2405896325008278',
      icon: 'BookOpen',
    },
    {
      title: { en: 'IFAC Paper 2 - Digital Twin', zh: 'IFAC论文2 - 数字孪生' },
      description: { en: 'Digital-Twin-Driven Modeling for System Degradation paper published in IFAC-PapersOnLine.', zh: '发表于IFAC-PapersOnLine的数字孪生驱动系统退化建模论文。' },
      fileSize: '2.1 MB',
      downloadUrl: 'https://www.sciencedirect.com/science/article/pii/S2405896325008279',
      icon: 'BookOpen',
    },
  ],
};

export const educationConfig = {
  label: { en: 'Education', zh: '教育背景' },
  heading: { en: 'Academic\nBackground', zh: '学术\n背景' },
  description: { en: 'A strong academic foundation in control engineering across three countries.', zh: '在三个国家建立的控制系统工程方面的扎实学术基础。' },
  items: [
    {
      degree: { en: 'M.Sc. in Control Engineering', zh: '控制工程硕士' },
      institution: 'Beihang University (BUAA)',
      institutionZh: '北京航空航天大学',
      institutionUrl: 'https://is.buaa.edu.cn/en/',
      period: '2023 - 2026',
      location: { en: 'Beijing, China', zh: '中国北京' },
      thesis: { en: 'Thesis: Design and Control of Vector-Thrust Spiral Indoor Airship for Semi-Indoor Filming and Surveillance', zh: '论文：半室内拍摄与监控的矢量推力螺旋室内飞艇设计与控制' },
      details: { en: 'Deep study of control theory, nonlinear systems, robust control, MATLAB/Simulink, SolidWorks, FPGA. Research focus: Robust & Nonlinear Control. CSC Scholarship.', zh: '深入学习控制理论、非线性系统、鲁棒控制、MATLAB/Simulink、SolidWorks、FPGA。研究方向：鲁棒与非线性控制。中国政府奖学金。' },
    },
    {
      degree: { en: 'B.Eng. in Automation', zh: '自动化本科' },
      institution: 'China Three Gorges University (CTGU)',
      institutionZh: '三峡大学',
      institutionUrl: 'https://eng.ctgu.edu.cn/',
      period: '2019 - 2023',
      location: { en: 'Yichang, China', zh: '中国宜昌' },
      thesis: { en: 'Thesis: Smart Home Automation System Based on PLC and Sensor Integration', zh: '论文：基于PLC和传感器集成的智能家居自动化系统' },
      details: { en: 'PLC programming, HMI/SCADA, sensors and actuators, microcontrollers, power electronics, industrial wiring, AutoCAD. CTGU Excellence Scholarship all 4 years.', zh: 'PLC编程、HMI/SCADA、传感器与执行器、微控制器、电力电子、工业布线、AutoCAD。连续四年获三峡大学卓越奖学金。' },
    },
    {
      degree: { en: 'Diploma in Electrical Technology', zh: '电气技术文凭' },
      institution: 'Akij Engineering Institute',
      institutionZh: 'Akij 工程学院',
      institutionUrl: 'https://aeiag.edu.bd/',
      period: '2016 - 2019',
      location: { en: 'Gazipur, Bangladesh', zh: '孟加拉国加济布尔' },
      thesis: { en: 'Focus: Industrial electrical systems, AC/DC motors, power systems', zh: '方向：工业电气系统、交直流电机、电力系统' },
      details: { en: 'Industrial electrical systems, AC/DC motors, power system analysis, circuit analysis, AutoCAD, Proteus simulation. Internship at NEDL (National Engineering Development Limited).', zh: '工业电气系统、交直流电机、电力系统分析、电路分析、AutoCAD、Proteus仿真。在NEDL（国家工程发展有限公司）实习。' },
    },
  ],
};

export const ctaConfig = {
  tags: { en: ['Control Engineer', 'Automation Specialist', 'Researcher'], zh: ['控制工程师', '自动化专家', '研究员'] },
  heading: { en: "Let's build something\ntogether", zh: '让我们一起\n构建未来' },
  description: { en: 'Open to collaborations in control systems, automation projects, and research partnerships.', zh: '欢迎控制系统、自动化项目和研究合作方面的合作。' },
  buttonText: { en: 'Call Now', zh: '立即致电' },
  buttonHref: 'tel:+8613264910246',
  email: 'aitbzaman@gmail.com',
  email2: 'jamanatib@qq.com',
  email3: 'ls2303201@buaa.edu.cn',
  wechat: 'Atibjaman',
  phone: '+8613264910246',
  backgroundImage: '/atib-portfolio/images/cta-bg.jpg',
};

export const footerConfig = {
  logo: { en: 'Atib', zh: '艾缇' },
  description: { en: 'Automation & Control Engineer passionate about building intelligent systems that bridge theory and practice. CSC Scholar at BUAA.', zh: '热衷于构建连接理论与实践的智能化系统的自动化与控制工程师。北航中国政府奖学金获得者。' },
  columns: [
    {
      title: { en: 'Navigation', zh: '导航' },
      links: [
        { label: { en: 'About', zh: '关于' }, href: '#about' },
        { label: { en: 'Skills', zh: '技能' }, href: '#skills' },
        { label: { en: 'Projects', zh: '项目' }, href: '#projects' },
        { label: { en: 'Publications', zh: '论文' }, href: '#publications' },
      ],
    },
    {
      title: { en: 'Resources', zh: '资源' },
      links: [
        { label: { en: 'Education', zh: '教育' }, href: '#education' },
        { label: { en: 'Contact', zh: '联系' }, href: '#contact' },
        { label: { en: 'Download CV', zh: '下载简历' }, href: '/cv-atib.pdf' },
      ],
    },
  ],
  socialLinks: [
    { iconName: 'Linkedin', href: 'https://www.linkedin.com/in/atib-zaman', label: 'LinkedIn' },
    { iconName: 'BookOpen', href: 'https://www.researchgate.net/profile/Monjur-A-Alahi-Atib', label: 'ResearchGate' },
    { iconName: 'GraduationCap', href: 'https://scholar.google.com/citations?view_op=list_works&hl=en&user=mWzQf5UAAAAJ', label: 'Google Scholar' },
    { iconName: 'Github', href: 'https://github.com/atibzaman', label: 'GitHub' },
    { iconName: 'Mail', href: 'mailto:aitbzaman@gmail.com', label: 'Email' },
  ],
  copyright: { en: '\u00A9 2026 MD Monjur A Alahi Atib. All rights reserved.', zh: '\u00A9 2026 MD Monjur A Alahi Atib. All rights reserved.' },
  credit: { en: 'Built with React, TypeScript & Tailwind CSS', zh: 'Built with React, TypeScript & Tailwind CSS' },
};
