export type DiscoveryInterest = 'game' | 'coding' | 'ai' | 'robotics';
export type DiscoveryProgram = 'SPI Core' | 'SPI Lab' | 'SPI Engineering';

export type DiscoveryEvidence =
  | 'interest'
  | 'experience'
  | 'technology_experience'
  | 'capability_evidence'
  | 'learning_preference'
  | 'interaction_preference'
  | 'goal'
  | 'project_intent'
  | 'engagement';

type Copy = { id: string; en: string; zh: string };

export interface DiscoveryAnswer {
  id: string;
  label: Copy;
  evidence: DiscoveryEvidence;
  impact: Record<DiscoveryProgram, number>;
  nextId?: string;
}

export interface DiscoveryQuestion {
  id: string;
  interest: DiscoveryInterest;
  prompt: Copy;
  answers: DiscoveryAnswer[];
}

export interface DiscoveryProject {
  id: string;
  title: Copy;
  description: Copy;
  program: DiscoveryProgram;
  skills: string[];
}

export interface DiscoveryReportData {
  /** User-provided name, captured during the Discover welcome step. */
  studentName?: string;
  interest: DiscoveryInterest;
  answers: DiscoveryAnswer[];
  recommendedProjects: DiscoveryProject[];
  selectedProject: DiscoveryProject;
  personalization: string;
  program: DiscoveryProgram;
}

const topics: Record<DiscoveryInterest, Copy> = {
  game: { id: 'game', en: 'game', zh: '游戏' },
  coding: { id: 'coding', en: 'coding', zh: '编程' },
  ai: { id: 'AI', en: 'AI', zh: '人工智能' },
  robotics: { id: 'robotics', en: 'robotics', zh: '机器人' },
};

const templates: Array<{ id: string; evidence: DiscoveryEvidence; prompt: Copy; answers: Copy[]; impacts: Array<Record<DiscoveryProgram, number>> }> = [
  { id: 'age', evidence: 'experience', prompt: { id: 'Sudah berapa lama kamu tertarik dengan {topic}?', en: 'How long have you been interested in {topic}?', zh: '你对{topic}感兴趣多久了？' }, answers: [{ id: 'Baru ingin mencoba', en: 'I am just curious', zh: '刚开始好奇' }, { id: 'Beberapa bulan', en: 'A few months', zh: '几个月' }, { id: 'Sudah setahun atau lebih', en: 'A year or more', zh: '一年或更久' }, { id: 'Sudah rutin membuat sesuatu', en: 'I make things regularly', zh: '经常制作作品' }], impacts: [{ 'SPI Core': 2, 'SPI Lab': 1, 'SPI Engineering': 0 }, { 'SPI Core': 2, 'SPI Lab': 2, 'SPI Engineering': 1 }, { 'SPI Core': 1, 'SPI Lab': 2, 'SPI Engineering': 2 }, { 'SPI Core': 0, 'SPI Lab': 2, 'SPI Engineering': 3 }] },
  { id: 'first-step', evidence: 'interest', prompt: { id: 'Bagian mana dari {topic} yang paling ingin kamu coba dulu?', en: 'Which part of {topic} would you try first?', zh: '你最想先尝试{topic}的哪一部分？' }, answers: [{ id: 'Membuat sesuatu yang seru', en: 'Making something fun', zh: '做有趣的东西' }, { id: 'Memahami cara kerjanya', en: 'Understanding how it works', zh: '理解它的原理' }, { id: 'Mendesain tampilannya', en: 'Designing how it looks', zh: '设计外观' }, { id: 'Menyelesaikan tantangan sulit', en: 'Solving a hard challenge', zh: '解决难题' }], impacts: [{ 'SPI Core': 2, 'SPI Lab': 2, 'SPI Engineering': 0 }, { 'SPI Core': 2, 'SPI Lab': 1, 'SPI Engineering': 2 }, { 'SPI Core': 1, 'SPI Lab': 3, 'SPI Engineering': 0 }, { 'SPI Core': 1, 'SPI Lab': 1, 'SPI Engineering': 3 }] },
  { id: 'previous-project', evidence: 'experience', prompt: { id: 'Pernahkah kamu menyelesaikan proyek {topic}?', en: 'Have you completed a {topic} project before?', zh: '你以前完成过{topic}项目吗？' }, answers: [{ id: 'Belum pernah', en: 'Not yet', zh: '还没有' }, { id: 'Pernah mengikuti tutorial', en: 'I followed a tutorial', zh: '跟过教程' }, { id: 'Pernah memodifikasi contoh', en: 'I modified an example', zh: '修改过示例' }, { id: 'Pernah membuat ide sendiri', en: 'I made my own idea', zh: '做过自己的创意' }], impacts: [{ 'SPI Core': 3, 'SPI Lab': 1, 'SPI Engineering': 0 }, { 'SPI Core': 2, 'SPI Lab': 2, 'SPI Engineering': 1 }, { 'SPI Core': 1, 'SPI Lab': 2, 'SPI Engineering': 2 }, { 'SPI Core': 0, 'SPI Lab': 2, 'SPI Engineering': 3 }] },
  { id: 'tools', evidence: 'technology_experience', prompt: { id: 'Saat memakai alat digital, kamu biasanya merasa…', en: 'When using digital tools, you usually feel…', zh: '使用数字工具时，你通常觉得…' }, answers: [{ id: 'Butuh panduan langkah demi langkah', en: 'I need step-by-step guidance', zh: '需要逐步指导' }, { id: 'Nyaman mencoba tombol baru', en: 'Comfortable trying new buttons', zh: '愿意尝试新功能' }, { id: 'Suka mencari tahu sendiri', en: 'I like figuring it out', zh: '喜欢自己研究' }, { id: 'Senang menggabungkan beberapa alat', en: 'I enjoy combining tools', zh: '喜欢组合多个工具' }], impacts: [{ 'SPI Core': 3, 'SPI Lab': 1, 'SPI Engineering': 0 }, { 'SPI Core': 2, 'SPI Lab': 2, 'SPI Engineering': 1 }, { 'SPI Core': 1, 'SPI Lab': 2, 'SPI Engineering': 2 }, { 'SPI Core': 0, 'SPI Lab': 2, 'SPI Engineering': 3 }] },
  { id: 'debugging', evidence: 'capability_evidence', prompt: { id: 'Jika hasil {topic} belum bekerja, apa yang paling mungkin kamu lakukan?', en: 'If your {topic} result does not work, what would you most likely do?', zh: '如果{topic}作品不能运行，你最可能怎么做？' }, answers: [{ id: 'Minta bantuan lalu mencoba lagi', en: 'Ask for help and try again', zh: '求助后再试' }, { id: 'Mengecek satu bagian demi satu', en: 'Check one part at a time', zh: '逐一检查' }, { id: 'Mengubah beberapa kemungkinan', en: 'Try a few possibilities', zh: '尝试几种方法' }, { id: 'Mencari penyebab dan mencatatnya', en: 'Find and note the cause', zh: '找出并记录原因' }], impacts: [{ 'SPI Core': 2, 'SPI Lab': 1, 'SPI Engineering': 1 }, { 'SPI Core': 2, 'SPI Lab': 2, 'SPI Engineering': 2 }, { 'SPI Core': 1, 'SPI Lab': 2, 'SPI Engineering': 3 }, { 'SPI Core': 0, 'SPI Lab': 1, 'SPI Engineering': 4 }] },
  { id: 'learning-style', evidence: 'learning_preference', prompt: { id: 'Cara belajar {topic} mana yang paling membantumu?', en: 'Which way of learning {topic} helps you most?', zh: '哪种学习{topic}的方式最适合你？' }, answers: [{ id: 'Contoh singkat lalu praktik', en: 'A short example then practice', zh: '简短示范后练习' }, { id: 'Proyek kecil dengan panduan', en: 'A small guided project', zh: '带指导的小项目' }, { id: 'Eksperimen dengan pilihan sendiri', en: 'Experimenting with my choices', zh: '自由实验' }, { id: 'Tantangan mendalam untuk dipecahkan', en: 'A deep challenge to solve', zh: '深入挑战' }], impacts: [{ 'SPI Core': 3, 'SPI Lab': 1, 'SPI Engineering': 0 }, { 'SPI Core': 2, 'SPI Lab': 2, 'SPI Engineering': 1 }, { 'SPI Core': 1, 'SPI Lab': 3, 'SPI Engineering': 1 }, { 'SPI Core': 0, 'SPI Lab': 1, 'SPI Engineering': 4 }] },
  { id: 'collaboration', evidence: 'interaction_preference', prompt: { id: 'Saat membuat proyek {topic}, kamu lebih suka…', en: 'When making a {topic} project, you prefer to…', zh: '制作{topic}项目时，你更喜欢…' }, answers: [{ id: 'Bekerja berpasangan', en: 'Work with a partner', zh: '和伙伴合作' }, { id: 'Berbagi ide dalam kelompok', en: 'Share ideas in a group', zh: '在小组中分享想法' }, { id: 'Mencoba sendiri dulu', en: 'Try it alone first', zh: '先自己尝试' }, { id: 'Memimpin pembagian tugas', en: 'Lead the task split', zh: '带领任务分工' }], impacts: [{ 'SPI Core': 2, 'SPI Lab': 2, 'SPI Engineering': 1 }, { 'SPI Core': 2, 'SPI Lab': 3, 'SPI Engineering': 1 }, { 'SPI Core': 1, 'SPI Lab': 1, 'SPI Engineering': 2 }, { 'SPI Core': 0, 'SPI Lab': 1, 'SPI Engineering': 3 }] },
  { id: 'goal', evidence: 'goal', prompt: { id: 'Hasil seperti apa dari {topic} yang ingin kamu banggakan?', en: 'What {topic} outcome would make you proud?', zh: '什么样的{topic}成果会让你自豪？' }, answers: [{ id: 'Sesuatu yang bisa dimainkan', en: 'Something people can play', zh: '别人可以玩的作品' }, { id: 'Sesuatu yang membantu orang', en: 'Something that helps people', zh: '帮助他人的作品' }, { id: 'Sesuatu yang terlihat menarik', en: 'Something that looks great', zh: '好看的作品' }, { id: 'Sesuatu yang memecahkan masalah', en: 'Something that solves a problem', zh: '解决问题的作品' }], impacts: [{ 'SPI Core': 2, 'SPI Lab': 3, 'SPI Engineering': 0 }, { 'SPI Core': 1, 'SPI Lab': 2, 'SPI Engineering': 3 }, { 'SPI Core': 1, 'SPI Lab': 3, 'SPI Engineering': 1 }, { 'SPI Core': 0, 'SPI Lab': 1, 'SPI Engineering': 4 }] },
  { id: 'project-intent', evidence: 'project_intent', prompt: { id: 'Jika kamu punya waktu akhir pekan, proyek {topic} mana yang ingin kamu mulai?', en: 'If you had a weekend, which {topic} project would you start?', zh: '如果有一个周末，你会开始哪个{topic}项目？' }, answers: [{ id: 'Cerita atau permainan interaktif', en: 'An interactive story or game', zh: '互动故事或游戏' }, { id: 'Alat sederhana untuk sehari-hari', en: 'A simple everyday tool', zh: '日常小工具' }, { id: 'Kreasi visual yang unik', en: 'A unique visual creation', zh: '独特的视觉作品' }, { id: 'Eksperimen teknologi yang pintar', en: 'A smart technology experiment', zh: '智能技术实验' }], impacts: [{ 'SPI Core': 2, 'SPI Lab': 3, 'SPI Engineering': 0 }, { 'SPI Core': 2, 'SPI Lab': 1, 'SPI Engineering': 3 }, { 'SPI Core': 1, 'SPI Lab': 3, 'SPI Engineering': 1 }, { 'SPI Core': 0, 'SPI Lab': 1, 'SPI Engineering': 4 }] },
  { id: 'feedback', evidence: 'engagement', prompt: { id: 'Setelah mendapat masukan untuk proyek {topic}, kamu biasanya…', en: 'After receiving feedback on a {topic} project, you usually…', zh: '收到{topic}项目反馈后，你通常会…' }, answers: [{ id: 'Memilih satu hal kecil untuk diperbaiki', en: 'Pick one small thing to improve', zh: '先改进一件小事' }, { id: 'Mencoba saran yang paling menarik', en: 'Try the most interesting suggestion', zh: '尝试最有趣的建议' }, { id: 'Membandingkan beberapa pilihan', en: 'Compare a few options', zh: '比较多个方案' }, { id: 'Merencanakan versi berikutnya', en: 'Plan the next version', zh: '规划下一个版本' }], impacts: [{ 'SPI Core': 2, 'SPI Lab': 1, 'SPI Engineering': 1 }, { 'SPI Core': 2, 'SPI Lab': 2, 'SPI Engineering': 1 }, { 'SPI Core': 1, 'SPI Lab': 3, 'SPI Engineering': 2 }, { 'SPI Core': 0, 'SPI Lab': 2, 'SPI Engineering': 3 }] },
];

// Each interest has its own contextual question chain. The bank contains 120
// reachable, non-looping nodes; a participant only sees the next useful 10–20.
const INTERESTS: DiscoveryInterest[] = ['game', 'coding', 'ai', 'robotics'];

function contextualCopy(template: Copy, topic: Copy): Copy {
  return {
    id: template.id.replace('{topic}', topic.id),
    en: template.en.replace('{topic}', topic.en),
    zh: template.zh.replace('{topic}', topic.zh),
  };
}

export const DISCOVERY_QUESTION_BANK: DiscoveryQuestion[] = INTERESTS.flatMap((interest) => {
  const topic = topics[interest];
  return Array.from({ length: 30 }, (_, index) => {
    const template = templates[index % templates.length];
    const nextIndex = index < 29 ? index + 1 : undefined;
    const alternateNextIndex = index < 28 ? index + 2 : undefined;
    return {
      id: `${interest}-${String(index + 1).padStart(2, '0')}`,
      interest,
      prompt: contextualCopy(template.prompt, topic),
      answers: template.answers.map((answer, answerIndex) => ({
        id: `${interest}-${String(index + 1).padStart(2, '0')}-${answerIndex + 1}`,
        label: answer,
        evidence: template.evidence,
        impact: template.impacts[answerIndex],
        nextId: (answerIndex === 3 ? alternateNextIndex : nextIndex)
          ? `${interest}-${String((answerIndex === 3 ? alternateNextIndex : nextIndex)! + 1).padStart(2, '0')}`
          : undefined,
      })),
    };
  });
});

export const DISCOVERY_QUESTION_COUNT = DISCOVERY_QUESTION_BANK.length;

export const PROJECT_CATALOG: DiscoveryProject[] = [
  { id: 'story-studio', title: { id: 'Story Studio Interaktif', en: 'Interactive Story Studio', zh: '互动故事工作室' }, description: { id: 'Buat cerita yang merespons pilihan pemain.', en: 'Create a story that responds to player choices.', zh: '创作会回应玩家选择的故事。' }, program: 'SPI Core', skills: ['Logic', 'Storytelling', 'Coding'] },
  { id: 'game-playground', title: { id: 'Game Playground', en: 'Game Playground', zh: '游戏乐园' }, description: { id: 'Rancang permainan kecil dengan aturan buatanmu sendiri.', en: 'Design a small game with rules of your own.', zh: '设计一款有自己规则的小游戏。' }, program: 'SPI Core', skills: ['Scratch', 'Logic', 'Iteration'] },
  { id: 'creative-lab', title: { id: 'Creative Lab Showcase', en: 'Creative Lab Showcase', zh: '创意实验室展示' }, description: { id: 'Gabungkan desain, AI tools, dan ide visualmu.', en: 'Combine design, AI tools, and your visual ideas.', zh: '结合设计、AI 工具和你的视觉创意。' }, program: 'SPI Lab', skills: ['Design', 'AI Tools', 'Creativity'] },
  { id: 'smart-helper', title: { id: 'Smart Helper', en: 'Smart Helper', zh: '智能助手' }, description: { id: 'Buat solusi digital sederhana untuk kebutuhan sehari-hari.', en: 'Build a simple digital solution for an everyday need.', zh: '为日常需求制作简单的数字解决方案。' }, program: 'SPI Lab', skills: ['Problem Solving', 'Design', 'AI Tools'] },
  { id: 'robot-mission', title: { id: 'Robot Mission', en: 'Robot Mission', zh: '机器人任务' }, description: { id: 'Program robot untuk menjalankan misi dunia nyata.', en: 'Program a robot to complete a real-world mission.', zh: '为机器人编程以完成真实世界任务。' }, program: 'SPI Engineering', skills: ['Robotics', 'Sensors', 'Python'] },
  { id: 'vision-inventor', title: { id: 'Vision Inventor', en: 'Vision Inventor', zh: '视觉发明家' }, description: { id: 'Eksplorasi data dan computer vision untuk sebuah ide berguna.', en: 'Explore data and computer vision for a useful idea.', zh: '探索数据和计算机视觉，打造实用创意。' }, program: 'SPI Engineering', skills: ['Python', 'Data', 'Computer Vision'] },
];

export function copyFor(copy: Copy, lang: 'id' | 'en' | 'zh') {
  return copy[lang];
}

export function initialScores(interest: DiscoveryInterest): Record<DiscoveryProgram, number> {
  const base: Record<DiscoveryInterest, Record<DiscoveryProgram, number>> = {
    game: { 'SPI Core': 3, 'SPI Lab': 2, 'SPI Engineering': 1 },
    coding: { 'SPI Core': 3, 'SPI Lab': 1, 'SPI Engineering': 2 },
    ai: { 'SPI Core': 1, 'SPI Lab': 3, 'SPI Engineering': 3 },
    robotics: { 'SPI Core': 2, 'SPI Lab': 1, 'SPI Engineering': 4 },
  };
  return { ...base[interest] };
}
