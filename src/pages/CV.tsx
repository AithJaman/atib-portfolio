import { useLanguage } from '@/contexts/LanguageContext';
import { personalInfo, institutions } from '@/config';
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  BookOpen,
  GraduationCap,
  Github,
  ExternalLink,
  Printer,
  Download,
  ArrowLeft,
  Award,
  FileText,
  Briefcase,
  Code2,
  FlaskConical,
  Globe,
  Star,
} from 'lucide-react';
import { Link } from 'react-router';

export default function CV() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const t = {
    title: isZh ? '简历' : 'Curriculum Vitae',
    contact: isZh ? '联系方式' : 'Contact',
    education: isZh ? '教育背景' : 'Education',
    publications: isZh ? '学术论文' : 'Publications',
    achievements: isZh ? '荣誉奖项' : 'Achievements & Awards',
    skills: isZh ? '专业技能' : 'Technical Skills',
    projects: isZh ? '项目经历' : 'Projects',
    certifications: isZh ? '专业认证' : 'Certifications',
    languages: isZh ? '语言能力' : 'Languages',
    summary: isZh ? '个人简介' : 'Professional Summary',
    print: isZh ? '打印简历' : 'Print CV',
    download: isZh ? '下载 PDF' : 'Download PDF',
    back: isZh ? '返回首页' : 'Back to Portfolio',
    scholarships: isZh ? '奖学金与学术荣誉' : 'Scholarships & Academic Honors',
    experience: isZh ? '实习经历' : 'Work Experience',
  };

  const summaryText = isZh
    ? '北京航空航天大学控制工程硕士，中国政府奖学金（CSC）获得者。在鲁棒非线性控制、飞艇动力学、PLC自动化及AI应用领域有深入研究。发表2篇IFAC论文，具备CSWP认证和六西格玛绿带资质。熟练掌握5种语言（孟加拉语、英语、中文、印地语、乌尔都语）。'
    : "Master's student in Control Engineering at Beihang University (BUAA), CSC Scholarship recipient. Published researcher in robust nonlinear control, airship dynamics, PLC automation and AI applications. 2 IFAC papers, CSWP certified, Six Sigma Green Belt. Fluent in 5 languages (Bengali, English, Chinese, Hindi, Urdu).";

  const educations = [
    {
      degree: isZh ? '控制工程 硕士' : 'M.Sc. in Control Engineering',
      school: `${institutions.buaa.nameZh} | ${institutions.buaa.name}`,
      url: institutions.buaa.url,
      period: '2023 - 2026',
      location: isZh ? '中国北京' : 'Beijing, China',
      detail: isZh
        ? '控制理论、非线性系统、鲁棒控制、MATLAB/Simulink、SolidWorks、FPGA。研究方向：鲁棒与非线性控制。CSC奖学金。'
        : 'Control theory, nonlinear systems, robust control, MATLAB/Simulink, SolidWorks, FPGA. Research: Robust & Nonlinear Control. CSC Scholarship.',
      thesis: isZh
        ? '论文：半室内拍摄与监控的矢量推力螺旋室内飞艇设计与控制'
        : 'Thesis: Design and Control of Vector-Thrust Spiral Indoor Airship for Semi-Indoor Filming and Surveillance',
    },
    {
      degree: isZh ? '自动化 学士' : 'B.Eng. in Automation',
      school: `${institutions.ctgu.nameZh} | ${institutions.ctgu.name}`,
      url: institutions.ctgu.url,
      period: '2019 - 2023',
      location: isZh ? '中国宜昌' : 'Yichang, China',
      detail: isZh
        ? 'PLC编程、HMI/SCADA、传感器与执行器、微控制器、电力电子、工业布线、AutoCAD。连续四年获卓越奖学金。'
        : 'PLC programming, HMI/SCADA, sensors and actuators, microcontrollers, power electronics, industrial wiring, AutoCAD. Excellence Scholarship all 4 years.',
      thesis: isZh
        ? '论文：基于PLC和传感器集成的智能家居自动化系统'
        : 'Thesis: Smart Home Automation System Based on PLC and Sensor Integration',
    },
    {
      degree: isZh ? '电气技术 文凭' : 'Diploma in Electrical Technology',
      school: institutions.akij.name,
      url: institutions.akij.url,
      period: '2016 - 2019',
      location: isZh ? '孟加拉国加济布尔' : 'Gazipur, Bangladesh',
      detail: isZh
        ? '工业电气系统、交直流电机、电力系统分析、电路分析、AutoCAD、Proteus仿真。'
        : 'Industrial electrical systems, AC/DC motors, power system analysis, circuit analysis, AutoCAD, Proteus simulation.',
      thesis: '',
    },
  ];

  const papers = [
    {
      authors: 'M. A. A. Atib, H. Ambreen, M. Imran, W. Lei',
      title:
        'Dual-Gas H\u2082/He Airship Design: Optimized Buoyancy and PID-Based Altitude Control',
      journal: 'IFAC-PapersOnLine, vol. 59, no. 20, pp. 2567-2572, 2025',
      link: 'https://www.sciencedirect.com/science/article/pii/S2405896325008278',
    },
    {
      authors: 'H. Ambreen, M. Imran, M. A. A. Atib, D. Tang',
      title:
        'A Digital-Twin-Driven Modeling Approach for System Degradation and Remaining Useful Life Prediction',
      journal: 'IFAC-PapersOnLine, vol. 59, pp. 2177-2182, 2025',
      link: 'https://www.sciencedirect.com/science/article/pii/S2405896325008279',
    },
  ];

  const awards = [
    {
      title: isZh ? '中国政府奖学金 (CSC)' : 'Chinese Government Scholarship (CSC)',
      subtitle: isZh ? '全额资助硕士 2023-2026' : 'Full M.Sc. Scholarship 2023-2026',
      year: '2023',
    },
    {
      title: isZh ? '优秀学业成绩奖' : 'Excellent Academic Performance Award',
      subtitle: isZh ? '北京航空航天大学 2025' : 'Beihang University, 2025',
      year: '2025',
    },
    {
      title: isZh ? '卓越奖' : 'Excellence Award',
      subtitle: isZh ? '清华大学 IEDE 全球项目 2025' : 'Tsinghua University IEDE Global Program, 2025',
      year: '2025',
    },
    {
      title: isZh ? '世界职业院校技能大赛冠军' : 'World Vocational Skills Competition Winner',
      subtitle: isZh ? '首届世界职业院校技能大赛，武汉' : '1st World Vocational Skills Competition, Wuhan',
      year: '2022',
    },
    {
      title: isZh ? '优秀毕业生奖' : 'Outstanding Graduate Award',
      subtitle: isZh ? '三峡大学' : 'CTGU',
      year: '2019',
    },
    {
      title: isZh ? '三峡大学卓越奖学金' : 'CTGU Excellence Scholarship',
      subtitle: isZh ? '连续四年 (2019-2023)' : 'Four Consecutive Years (2019-2023)',
      year: '2019-2023',
    },
    {
      title: isZh ? '科学节三等奖' : 'Science Festival 3rd Prize',
      subtitle: isZh ? '三峡大学 2020' : 'CTGU, 2020',
      year: '2020',
    },
    {
      title: isZh ? '工程制图竞赛三等奖 (留学生)' : 'Engineering Drawing 3rd Prize (Intl Students)',
      subtitle: isZh ? '三峡大学' : 'CTGU',
      year: '2021',
    },
  ];

  const projects = [
    {
      title: isZh
        ? '矢量推力球形室内飞艇鲁棒控制'
        : 'Vector-Thrust Spiral Indoor Airship Control',
      period: '2023-2025',
      desc: isZh
        ? '硕士论文：设计SMBSC鲁棒滑模反步控制器，峰值误差比传统BSC降低86%。通过2000+次蒙特卡洛验证。发表于IFAC 2025。'
        : 'M.Sc. Thesis: Designed SMBSC controller, 86% peak error reduction vs BSC. Monte Carlo validation under 2000+ disturbances. IFAC 2025.',
    },
    {
      title: isZh
        ? '基于PLC的智能家居自动化'
        : 'PLC-Based Intelligent Home Automation',
      period: '2022-2023',
      desc: isZh
        ? '本科论文：西门子LOGO! PLC控制照明、窗帘、水泵、消防、HVAC、安防系统。集成15+传感器，待机功耗降低25%。'
        : 'B.Eng. Thesis: Siemens LOGO! PLC automated lighting, curtain, pump, fire, HVAC, security. 15+ sensors, 25% power reduction.',
    },
    {
      title: isZh ? 'AI电商内容自动化' : 'AI E-Commerce Content Automation',
      period: '2024-2025',
      desc: isZh
        ? 'ResNet-18+DeepSeek API，产品图像分类与描述生成，准确率97.8%，减少80%人工工作。团队项目。'
        : 'ResNet-18 + DeepSeek API, 97.8% accuracy, 80% effort reduction. Team project with Iqra Batool & Hira Ambreen.',
    },
    {
      title: isZh ? '10kW户用太阳能电站' : '10 kW Residential Solar Power Plant',
      period: '2023',
      desc: isZh
        ? '24块415W光伏板+15块250Ah蓄电池，25年节省241,498元，电费降低83%。含PSIM仿真。'
        : '24 panels + 15 batteries, saves 241,498 RMB over 25 years, 83% electricity cost reduction. PSIM simulation.',
    },
    {
      title: isZh ? 'S7-200 PLC自动售货机' : 'S7-200 PLC Vending Machine',
      period: '2023',
      desc: isZh
        ? '6产品自动售货机，含硬币检测、选择、出货、找零。STEP 7 MicroWIN SP9编程，S7-200 Sim验证。团队负责人。'
        : '6-product vending machine with coin detection, selection, dispensing, change return. STEP 7 programming. Team lead.',
    },
  ];

  const skillGroups = [
    {
      cat: isZh ? '控制与机器人' : 'Control & Robotics',
      items: ['MATLAB/Simulink', 'SMC / Backstepping', 'PID / LQR / MPC', 'Robust Control', 'Nonlinear Dynamics', 'Monte Carlo Analysis'],
    },
    {
      cat: isZh ? 'PLC与自动化' : 'PLC & Automation',
      items: ['Siemens LOGO! / S7-200', 'Ladder / FBD / IL', 'SCADA / HMI', 'Industrial Wiring', 'Relay Logic', 'HVAC / Fire Safety'],
    },
    {
      cat: isZh ? '设计与仿真' : 'Design & Simulation',
      items: ['SolidWorks (CSWP)', 'AutoCAD', 'FEA / CFD', '3D Modeling', 'Proteus', 'PSIM'],
    },
    {
      cat: isZh ? 'AI与编程' : 'AI & Programming',
      items: ['Python / FastAPI', 'PyTorch / ResNet', 'DeepSeek API', 'Git / GitHub', 'LaTeX', 'FPGA'],
    },
  ];

  const certs = [
    'CSWP (Certified SolidWorks Professional)',
    isZh ? '六西格玛绿带' : 'Six Sigma Green Belt',
    isZh ? '剑桥创新创业证书' : 'Cambridge Entrepreneurship Certificate',
  ];

  const langs = [
    { name: isZh ? '孟加拉语' : 'Bengali', level: isZh ? '母语 (C2)' : 'Native (C2)' },
    { name: isZh ? '英语' : 'English', level: isZh ? '流利 (C2)' : 'Fluent (C2)' },
    { name: isZh ? '中文' : 'Chinese', level: isZh ? '会话 (C2)' : 'Conversational (C2)' },
    { name: isZh ? '印地语' : 'Hindi', level: isZh ? '流利 (C2)' : 'Fluent (C2)' },
    { name: isZh ? '乌尔都语' : 'Urdu', level: isZh ? '流利 (C2)' : 'Fluent (C2)' },
  ];

  const workExp = [
    {
      role: isZh ? '实习生' : 'Intern',
      company: 'NEDL (National Engineering Development Limited)',
      location: isZh ? '加济布尔，孟加拉国' : 'Gazipur, Bangladesh',
      period: '2019',
      desc: isZh
        ? 'PLC控制系统、继电器控制柜、工业布线、设备故障排除、AutoCAD工程制图。'
        : 'PLC control systems, relay control cabinets, industrial wiring, troubleshooting, AutoCAD technical drawings.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      {/* Floating Action Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 print:hidden">
        <div className="max-w-[900px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              {t.print}
            </button>
            <a
              href="/cv-atib.pdf"
              download="MD_Monjur_A_Alaahi_Atib_CV.pdf"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              {t.download}
            </a>
          </div>
        </div>
      </div>

      {/* CV Content - A4 optimized */}
      <div className="max-w-[900px] mx-auto px-6 py-20 print:py-0 print:px-0">
        <div className="bg-white print:shadow-none shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#0a1628] to-[#0f2850] text-white p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden border-3 border-blue-400/50 shadow-[0_0_30px_rgba(37,99,235,0.3)] flex-shrink-0">
                <img
                  src="/images/about-1.jpg"
                  alt="Atib"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                  {personalInfo.fullName}
                </h1>
                <p className="text-lg text-blue-200/80 mt-1">
                  {isZh ? '自动化与控制工程师' : 'Automation & Control Engineer'}
                </p>
                <p className="text-sm text-blue-300/60 mt-3 max-w-2xl leading-relaxed">
                  {summaryText}
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-sm">
                  <span className="flex items-center gap-1.5 text-blue-200/70">
                    <Mail className="w-3.5 h-3.5" /> {personalInfo.primaryEmail}
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-200/70">
                    <Phone className="w-3.5 h-3.5" /> {personalInfo.phone}
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-200/70">
                    <MapPin className="w-3.5 h-3.5" /> {isZh ? personalInfo.addressZh : personalInfo.address}
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-200/70">
                    <Globe className="w-3.5 h-3.5" /> {personalInfo.wechat}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href={personalInfo.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-blue-200/80 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                  <a
                    href={personalInfo.researchGate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-blue-200/80 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> ResearchGate
                  </a>
                  <a
                    href={personalInfo.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-blue-200/80 transition-colors"
                  >
                    <GraduationCap className="w-3.5 h-3.5" /> Google Scholar
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-blue-200/80 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 lg:p-12 space-y-10">
            {/* Education */}
            <Section icon={<GraduationCap className="w-5 h-5" />} title={t.education}>
              <div className="space-y-6">
                {educations.map((edu, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="sm:w-28 flex-shrink-0">
                      <span className="text-sm font-geist-mono text-blue-500 font-medium">
                        {edu.period}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">{edu.location}</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {edu.school} <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-sm text-gray-500 mt-1">{edu.detail}</p>
                      {edu.thesis && (
                        <p className="text-sm text-gray-700 mt-1.5 bg-gray-50 p-2 rounded-lg italic">
                          {edu.thesis}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Work Experience */}
            <Section icon={<Briefcase className="w-5 h-5" />} title={t.experience}>
              <div className="space-y-4">
                {workExp.map((exp, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="sm:w-28 flex-shrink-0">
                      <span className="text-sm font-geist-mono text-blue-500 font-medium">
                        {exp.period}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{exp.role}</p>
                      <p className="text-sm text-blue-600">{exp.company}</p>
                      <p className="text-xs text-gray-400">{exp.location}</p>
                      <p className="text-sm text-gray-500 mt-1">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Publications */}
            <Section icon={<FlaskConical className="w-5 h-5" />} title={t.publications}>
              <div className="space-y-4">
                {papers.map((paper, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">{paper.authors}</p>
                    <p className="font-medium text-gray-900 text-sm leading-relaxed">
                      {paper.title}
                    </p>
                    <p className="text-sm text-blue-600 mt-1 italic">{paper.journal}</p>
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 mt-2"
                    >
                      <ExternalLink className="w-3 h-3" /> DOI Link
                    </a>
                  </div>
                ))}
              </div>
            </Section>

            {/* Projects */}
            <Section icon={<Code2 className="w-5 h-5" />} title={t.projects}>
              <div className="space-y-5">
                {projects.map((proj, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-gray-900 text-sm">{proj.title}</p>
                        <span className="text-xs text-gray-400 font-geist-mono">
                          {proj.period}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{proj.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Achievements */}
            <Section icon={<Award className="w-5 h-5" />} title={t.achievements}>
              <div className="grid sm:grid-cols-2 gap-3">
                {awards.map((award, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100"
                  >
                    <Star className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{award.title}</p>
                      <p className="text-xs text-gray-500">{award.subtitle}</p>
                      <p className="text-xs text-blue-400 font-geist-mono mt-0.5">
                        {award.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Skills */}
            <Section icon={<Code2 className="w-5 h-5" />} title={t.skills}>
              <div className="grid sm:grid-cols-2 gap-5">
                {skillGroups.map((group, i) => (
                  <div key={i}>
                    <p className="text-sm font-semibold text-gray-800 mb-2">{group.cat}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((skill, j) => (
                        <span
                          key={j}
                          className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Certifications & Languages */}
            <div className="grid sm:grid-cols-2 gap-8">
              <Section icon={<FileText className="w-5 h-5" />} title={t.certifications}>
                <div className="space-y-2">
                  {certs.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section icon={<Globe className="w-5 h-5" />} title={t.languages}>
                <div className="space-y-2">
                  {langs.map((lang, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{lang.name}</span>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 lg:px-12 py-6 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2026 {personalInfo.fullName} &middot;{' '}
              {isZh ? '简历最后更新' : 'Last updated'}: April 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-blue-500">{icon}</div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}
