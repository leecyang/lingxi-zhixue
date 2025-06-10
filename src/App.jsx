import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import WebAR from '@/components/WebAR.jsx'
import { 
  Brain, 
  Heart, 
  Activity, 
  TrendingUp, 
  Sparkles, 
  Eye, 
  Users, 
  Zap,
  Github,
  Mail,
  ArrowUp,
  Play,
  Monitor,
  Code,
  Lightbulb,
  MessageCircle,
  Settings,
  ExternalLink,
  BookOpen,
  Palette,
  Calendar,
  HelpCircle,
  Shield,
  UserPlus,
  Utensils,
  Dumbbell,
  Accessibility,
  Clock,
  MessageSquare,
  Target,
  FileText,
  Loader
} from 'lucide-react'
import { initScrollProgress as initCustomScrollProgress } from './scrollProgress'
import './app.css'

// 智能体数据 - 使用用户提供的具体名称
const agentMatrix = {
  '学习认知类智能体': {
    icon: Brain,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    agents: [
      { 
        name: '计算机三级网络小助手', 
        desc: '提供三级网络考试大纲解读、知识图谱、错题本、每日一练等学习支持',
        icon: BookOpen,
        bot_id: '7494597912958074890',
        features: ['考试大纲解读', '知识图谱', '错题本管理', '每日一练']
      },
      { 
        name: '智农绘图活动文字工作者', 
        desc: '为绘图活动生成策划文案、总结材料、科普内容等',
        icon: Palette,
        bot_id: '7498611032803000346',
        features: ['策划文案', '总结材料', '科普内容', '活动支持']
      },
      { 
        name: '活动宣传海报生成器', 
        desc: '根据活动主题生成海报宣传语和排版建议',
        icon: Sparkles,
        bot_id: '7497219848444198964',
        features: ['海报设计', '宣传语生成', '排版建议', '视觉创意']
      },
      { 
        name: '选课推荐小助手', 
        desc: '基于兴趣、难度和课程目标，为大学生智能推荐选修课程',
        icon: Calendar,
        bot_id: '7504883329552891939',
        features: ['兴趣分析', '难度评估', '课程推荐', '学习规划']
      }
    ]
  },
  '心理支持类智能体': {
    icon: Heart,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500/20 to-rose-500/20',
    agents: [
      { 
        name: '青藤心桥', 
        desc: '心理情绪识别与语言安抚，模拟心理咨询师，支持音频交互',
        icon: Shield,
        bot_id: '7504865007398813750',
        features: ['情绪识别', '语言安抚', '心理咨询', '音频交互']
      },
      {
        name: '搭子匹配',
        desc: '帮助学生寻找在校园中兴趣相投的"学习/锻炼/娱乐搭子"，缓解孤独感',
        icon: UserPlus,
        bot_id: '7505030367499010048',
        features: ['兴趣匹配', '社交连接', '孤独缓解', '校园交友']
      }
    ]
  },
  '健康生活类智能体': {
    icon: Activity,
    color: 'text-green-400',
    bgGradient: 'from-green-500/20 to-emerald-500/20',
    agents: [
      { 
        name: '膳食管理', 
        desc: '为大学生提供每日饮食建议，按营养摄入均衡优化推荐',
        icon: Utensils,
        bot_id: '7504889280578813952',
        features: ['饮食建议', '营养均衡', '健康优化', '个性定制']
      },
      { 
        name: '陆吾训练', 
        desc: '根据运动数据，定制个性化训练计划与提醒，结合作息/身体状况优化建议',
        icon: Dumbbell,
        bot_id: '7504945777798774836',
        features: ['训练计划', '运动数据', '个性定制', '健康提醒']
      },
      { 
        name: '无障碍交流', 
        desc: '针对听障学生设计，支持语音/文本转手语，便于课堂或公共空间交流',
        icon: Accessibility,
        bot_id: '7504871180713984063',
        features: ['手语转换', '无障碍支持', '课堂辅助', '交流便利']
      }
    ]
  },
  '自主成长与社交协作类': {
    icon: TrendingUp,
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-violet-500/20',
    agents: [
      { 
        name: '时间管理小助手', 
        desc: '根据学习/生活任务推荐时间规划方案，具备可视化日程输出能力',
        icon: Clock,
        bot_id: '7505244467046416424',
        features: ['时间规划', '任务管理', '可视化日程', '效率提升']
      },
      {
        name: '问答回廊',
        desc: '学生间开放式知识问答场景，既能答疑也能参考他人经验（类知乎）',
        icon: MessageSquare,
        bot_id: '7504930812622569511',
        features: ['知识问答', '经验分享', '开放讨论', '学习社区']
      }
    ]
  }
}

// 项目亮点数据
const highlights = [
  {
    icon: Code,
    title: '低代码实现',
    desc: '基于Coze平台快速构建智能体矩阵，降低开发门槛',
    color: 'text-green-400'
  },
  {
    icon: Brain,
    title: 'AI原生智能体',
    desc: '11+专业智能体协同工作，覆盖学生成长全方位需求',
    color: 'text-blue-400'
  },
  {
    icon: Eye,
    title: '教学闭环融合',
    desc: 'AR技术与智能体深度结合，打造沉浸式学习体验',
    color: 'text-purple-400'
  },
  {
    icon: Monitor,
    title: '打造教育生态',
    desc: '支持开发者自行搭建智能体，共同构建智慧教育社区',
    color: 'text-pink-400'
  }
]

// 团队信息
const teamInfo = {
  leader: '李承阳',
  members: ['李远洋', '吴桐', '苏德宇','范新蕊','陈妍','黄悦','王青','王秉杭','胡宇昊'],
  platforms: ['大语言模型（LLM）驱动', 'Coze 低代码智能体平台', '多智能体协作架构', 'WebAR技术集成', '学习行为追踪与反馈', '智能推荐与干预策略'],
  contact: {
    email: 'yangyangli0426@gmail.com',
    github: 'https://github.com/leecyang/lingxi-zhixue'
  }
}

// Coze API配置
const COZE_API_CONFIG = {
  baseURL: 'https://api.coze.cn/open_api/v2/chat',
  token: 'pat_FjK0j6lwvnXUMC95oQvclJNk4KyCH6Rc3szfhitHdNmHOLb26mGS0bs4lfy9Qgpy', // 用户提供的实际token
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer pat_FjK0j6lwvnXUMC95oQvclJNk4KyCH6Rc3szfhitHdNmHOLb26mGS0bs4lfy9Qgpy'
  }
}

function App() {
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredCard, setHoveredCard] = useState(null) // 卡片悬停状态
  const [hoveredContainer, setHoveredContainer] = useState(null) // 容器悬停状态
  const [chatTips, setChatTips] = useState([]) // 聊天提示框队列
  const [terminalLogs, setTerminalLogs] = useState([
    '> 系统初始化中...',
    '> 加载AR环境...',
    '> 连接智能体矩阵...',
    '> 准备就绪，等待用户交互'
  ])

  const particlesRef = useRef(null)

  // 页面刷新时返回首页
  useEffect(() => {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0)
    
    // 监听页面刷新事件
    const handleBeforeUnload = () => {
      // 在页面卸载前记录需要返回首页
      sessionStorage.setItem('shouldScrollToTop', 'true')
    }
    
    // 页面加载完成后检查是否需要滚动到顶部
    const shouldScrollToTop = sessionStorage.getItem('shouldScrollToTop')
    if (shouldScrollToTop) {
      window.scrollTo(0, 0)
      sessionStorage.removeItem('shouldScrollToTop')
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  // 滚动监听和进度条
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setScrollProgress(progress)
      setShowScrollTop(scrollTop > 300)
    }
    
    // 禁用复制相关的键盘快捷键
    const handleKeyDown = (e) => {
      // 禁用 Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+P, F12, Ctrl+Shift+I, Ctrl+U
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 's' || e.key === 'p' || e.key === 'u')) ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        e.key === 'F12'
      ) {
        e.preventDefault()
        return false
      }
    }
    
    // 禁用拖拽
    const handleDragStart = (e) => {
      e.preventDefault()
      return false
    }
    
    // 禁用选择文本
    const handleSelectStart = (e) => {
      e.preventDefault()
      return false
    }
    
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('selectstart', handleSelectStart)
    
    // 延迟初始化，确保DOM元素已经渲染完成
    const timer = setTimeout(() => {
      initCustomScrollProgress()
    }, 100)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('selectstart', handleSelectStart)
      clearTimeout(timer)
    }
  }, [])

  // 浮动粒子效果
  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current) return
      
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 2 + 's'
      
      particlesRef.current.appendChild(particle)
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, 10000)
    }

    const interval = setInterval(createParticle, 500)
    return () => clearInterval(interval)
  }, [])

  // 模拟AR交互日志
  const simulateARInteraction = () => {
    const interactions = [
      '> 用户点击了交换机模型',
      '> 显示网络拓扑结构',
      '> 配置VLAN设置',
      '> 测试网络连通性',
      '> 任务完成，获得经验值 +50'
    ]
    
    setTerminalLogs(prev => [...prev, ...interactions])
  }

  // SDK方式启动智能体
  const launchAgentSDK = (agent) => {
    if (window.CozeWebSDK) {
      const chatClient = new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: agent.bot_id,
        },
        componentProps: {
          title: agent.name,
          theme: 'light',
          mode: 'light',
          appearance: 'light',
          colorScheme: 'light',
        },
        auth: {
          type: 'token',
          token: COZE_API_CONFIG.token,
          onRefreshToken: function () {
            return COZE_API_CONFIG.token
          }
        }
      });
      
      // 找到智能体所属的类别信息
      let categoryInfo = null;
      for (const [categoryName, categoryData] of Object.entries(agentMatrix)) {
        if (categoryData.agents.some(a => a.bot_id === agent.bot_id)) {
          categoryInfo = {
            name: categoryName,
            icon: categoryData.icon,
            color: categoryData.color,
            bgGradient: categoryData.bgGradient
          };
          break;
        }
      }
      
      // 创建新的对话框对象
      const newChatTip = {
        id: Date.now() + Math.random(), // 唯一ID
        agent: { ...agent, category: categoryInfo },
        animating: false,
        createdAt: Date.now()
      };
      
      // 添加到对话框队列
      setChatTips(prev => {
        const maxVisibleTips = 3; // 最多显示3个聊天框
        let updatedTips = [...prev];
        
        // 如果当前已经达到最大数量，先移除最老的聊天框
        if (updatedTips.length >= maxVisibleTips) {
          // 立即移除最老的聊天框，不等待动画
          updatedTips = updatedTips.slice(1);
        }
        
        // 添加新的聊天框
        updatedTips.push(newChatTip);
        
        return updatedTips;
      });
      
      // 3秒后开始退出动画（作为备用机制）
      setTimeout(() => {
        setChatTips(prev => prev.map(tip => 
          tip.id === newChatTip.id ? { ...tip, animating: true } : tip
        ));
        // 动画完成后移除对话框
        setTimeout(() => {
          setChatTips(prev => prev.filter(tip => tip.id !== newChatTip.id));
        }, 500); // 与退出动画时长一致
      }, 3000);
    } else {
      console.error('CozeWebSDK 未加载');
    }
  }



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToAgents = () => {
    document.getElementById('agents-section').scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTeamInfo = () => {
    document.getElementById('team-section').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* 滚动进度条 */}
      <div 
        className="scroll-indicator"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* 聊天提示框队列 */}
      {chatTips.map((chatTip, index) => (
        <div key={chatTip.id} className="fixed left-0 right-0 flex justify-center" 
             style={{
               top: `${24 + (chatTips.length - 1 - index) * 20}px`, // 新的聊天框在上方，每个间隔20px
               zIndex: 50 + index, // 新的聊天框有更高的z-index
               animation: chatTip.animating ? 'slideOutToTop 0.5s ease-in forwards' : 'slideInFromTop 0.5s ease-out forwards'
             }}>
          <div className={`chat-tip-container ${
            chatTip.agent.category?.name === '学习认知类智能体' ? 'bg-blue-500' :
            chatTip.agent.category?.name === '心理支持类智能体' ? 'bg-pink-500' :
            chatTip.agent.category?.name === '健康生活类智能体' ? 'bg-green-500' :
            chatTip.agent.category?.name === '自主成长与社交协作类' ? 'bg-purple-500' :
            'bg-slate-700'
          } border border-white/30 rounded-xl px-8 py-4 shadow-2xl min-w-96 max-w-2xl transform transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center space-x-4">
              {/* 智能体图标和状态 */}
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-full ${
                  chatTip.agent.category?.name === '学习认知类智能体' ? 'bg-blue-600' :
                  chatTip.agent.category?.name === '心理支持类智能体' ? 'bg-pink-600' :
                  chatTip.agent.category?.name === '健康生活类智能体' ? 'bg-green-600' :
                  chatTip.agent.category?.name === '自主成长与社交协作类' ? 'bg-purple-600' :
                  'bg-slate-600'
                } flex items-center justify-center shadow-lg`}>
                  {chatTip.agent.icon && <chatTip.agent.icon className="h-6 w-6 text-white" />}
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white" />
              </div>
              
              {/* 智能体信息 */}
              <div className="text-white flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="font-bold text-lg">{chatTip.agent.name}</h3>
                  <span className="text-sm text-white/60">•</span>
                  <p className="text-sm text-white/80">{chatTip.agent.category?.name}</p>
                  <span className="text-sm font-medium text-green-300">成功启动</span>
                </div>
                <p className="text-sm text-white/70 mt-1">现在点击右下角悬浮球开始对话吧</p>
              </div>
              
              {/* 动画指示器 */}
              <div className="flex space-x-1 flex-shrink-0">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 浮动粒子背景 */}
      <div ref={particlesRef} className="floating-particles fixed inset-0 z-0" />

      {/* 首页Hero区域 */}
      <section className="hero-section min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4 text-center z-10">
          <div className="space-y-8">
            <h1 className="font-bold neon-text main-title floating-element">
                 灵犀智学
               </h1>
            <div className="search-box-container max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl tech-green-text typewriter">
                多智能体赋能沉浸式教育新生态
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={scrollToAgents}
                variant="outline"
                size="lg" 
                className="project-intro-button text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                开始探索
              </Button>
              <Button 
                onClick={scrollToTeamInfo}
                size="lg" 
                className="cyber-button text-lg px-8 py-4"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                项目介绍
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 多智能体矩阵展示区 */}
      <section id="agents-section" className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text floating-element">
               多智能体矩阵系统
             </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 data-stream">
              11+专业智能体协同工作，为学生提供全方位、个性化的学习支持
            </p>
            <div className="interaction-hint-container max-w-2xl mx-auto mb-8">
              <p className="interaction-hint-text">
                滑动以预览，点击启动对话立刻开始线上体验
              </p>
            </div>

          </div>

          <div className="space-y-16">
            {Object.entries(agentMatrix).map(([category, data]) => {
              const IconComponent = data.icon
              // 根据类别映射主题色类名
              const getThemeClass = (category) => {
                switch(category) {
                  case '学习认知类智能体': return 'learning-cognitive'
                  case '心理支持类智能体': return 'psychological-support'
                  case '健康生活类智能体': return 'healthy-lifestyle'
                  case '自主成长与社交协作类': return 'growth-collaboration'
                  default: return ''
                }
              }
              return (
                <div key={category} className="space-y-6">
                  {/* 类别标题 */}
                  <div className="text-center">
                    <div className={`inline-flex items-center gap-3 p-4 glass-card rounded-2xl ${data.color}`}>
                      <IconComponent className="h-8 w-8" />
                      <h3 className="text-2xl md:text-3xl font-bold">{category}</h3>
                    </div>
                  </div>
                  
                  {/* 科技感容器 */}
                  <div 
                    className={`agent-container ${getThemeClass(category)} ${hoveredContainer === category ? 'container-hovered' : ''}`}
                    onMouseEnter={() => setHoveredContainer(category)}
                    onMouseLeave={() => {}} // 不在这里清除悬停状态
                  >
                    <div className="agent-container-inner">
                      {/* 智能体卡片滚动区域 */}
                      <div className="agent-scroll-area" id={`scroll-${Object.keys(agentMatrix).indexOf(category)}`}>
                        <div className="agent-cards-wrapper">
                          {data.agents.map((agent, index) => {
                            const AgentIcon = agent.icon
                            const cardId = `${category}-${index}`
                            const isHovered = hoveredCard === cardId
                            
                            return (
                              <Card 
                                key={index} 
                                className={`agent-card-compact glass-card hologram ${getThemeClass(category)} ${isHovered ? 'card-hovered' : ''}`}
                                onMouseEnter={() => setHoveredCard(cardId)}
                                onMouseLeave={() => {}} // 不在这里清除悬停状态
                              >
                                <CardHeader className="text-center pb-3">
                                  <div className={`mx-auto mb-3 p-3 rounded-xl bg-gradient-to-br ${data.bgGradient} w-fit`}>
                                    <AgentIcon className={`h-6 w-6 ${data.color}`} />
                                  </div>
                                  <CardTitle className="text-lg font-bold">{agent.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  <p className="text-muted-foreground text-xs leading-relaxed">
                                    {agent.desc}
                                  </p>
                                  
                                  {/* 功能特色标签 */}
                                  <div className="flex flex-wrap gap-1">
                                    {agent.features.slice(0, 2).map((feature, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs border-primary/30 text-primary">
                                        {feature}
                                      </Badge>
                                    ))}
                                    {agent.features.length > 2 && (
                                      <Badge variant="outline" className="text-xs border-primary/20 text-primary/60">
                                        +{agent.features.length - 2}
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  {/* 操作按钮 */}
                                  <div className="flex gap-2 pt-2">
                                    <Button
                                      onClick={() => launchAgentSDK(agent)}
                                      className="flex-1 cyber-button"
                                      size="sm"
                                    >
                                      <MessageCircle className="mr-1 h-3 w-3" />
                                      启动对话
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedAgent(agent)}
                                      className="neon-border border-primary/30 hover:border-primary px-2"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })}
                          
                          {/* 开发中卡片 - 与智能体卡片一起滚动 */}
                          <Card 
                            className={`agent-card-compact glass-card developing-card ${getThemeClass(category)} ${hoveredCard === `${category}-dev` ? 'card-hovered' : ''}`}
                            onMouseEnter={() => setHoveredCard(`${category}-dev`)}
                            onMouseLeave={() => {}} // 不在这里清除悬停状态
                          >
                            <CardHeader className="text-center pb-3">
                              <div className={`mx-auto mb-3 p-3 rounded-xl bg-gradient-to-br ${data.bgGradient} w-fit developing-icon`}>
                                <Settings className={`h-5 w-5 ${data.color} animate-spin`} />
                              </div>
                              <CardTitle className="text-lg font-bold">后续智能体</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                正在开发中，敬请期待...
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                    </div>
                    
                    {/* 滚动进度条 */}
                    <div className="scroll-progress-container">
                      <div className="scroll-progress-track">
                        <div className="scroll-progress-thumb" data-scroll-target={`scroll-${Object.keys(agentMatrix).indexOf(category)}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Coze平台推荐组件 */}
          <div className="coze-recommendation-section">
            <Card className="coze-recommendation-card glass-card hologram">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="coze-logo-container mb-6">
                    <div className="coze-logo-glow">
                      <Sparkles className="h-12 w-12 text-primary mx-auto" />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                    体验完整功能，尽在Coze平台
                  </h3>
                  <div className="coze-divider"></div>
                </div>
                
                <div className="space-y-6">
                  {/* 第一段文字 */}
                  <div className="coze-text-block">
                    <div className="flex items-start gap-4">
                      <div className="coze-bullet-point">
                        <div className="bullet-glow"></div>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        我们强烈建议您通过
                        <span className="coze-highlight">Coze商店</span>
                        使用我们的智能体以便体验到完整的功能。
                      </p>
                    </div>
                  </div>
                  
                  {/* 第二段文字 */}
                  <div className="coze-text-block">
                    <div className="flex items-start gap-4">
                      <div className="coze-bullet-point">
                        <div className="bullet-glow"></div>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        您可以打开智能体详情页面获取
                        <span className="coze-highlight">Bot ID</span>
                        进行快速访问。
                      </p>
                    </div>
                  </div>
                  
                  {/* 按钮区域 */}
                  <div className="coze-buttons-container">
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      {/* Coze商店按钮 */}
                      <div className="coze-button-wrapper">
                        <Button 
                          className="coze-store-button w-full"
                          onClick={() => window.open('https://www.coze.cn/store', '_blank')}
                        >
                          <div className="button-content">
                            <div className="button-icon">
                              <ExternalLink className="h-5 w-5" />
                            </div>
                            <div className="button-text">
                              <span className="button-title">Coze商店</span>
                              <span className="button-subtitle">体验完整功能</span>
                            </div>
                          </div>
                          <div className="button-glow"></div>
                        </Button>
                      </div>
                      
                      {/* Coze平台按钮 */}
                      <div className="coze-button-wrapper">
                        <Button 
                          className="coze-platform-button w-full"
                          onClick={() => window.open('https://www.coze.cn', '_blank')}
                        >
                          <div className="button-content">
                            <div className="button-icon">
                              <Code className="h-5 w-5" />
                            </div>
                            <div className="button-text">
                              <span className="button-title">Coze平台</span>
                              <span className="button-subtitle">0代码开发智能体</span>
                            </div>
                          </div>
                          <div className="button-glow"></div>
                        </Button>
                      </div>
                    </div>
                    
                    {/* 第三段文字 */}
                    <div className="coze-text-block mt-8">
                      <div className="text-center">
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          跃跃欲试了吗？点击进入
                          <span className="coze-highlight">Coze平台</span>
                          体验0代码开发智能体，与我们共建
                          <span className="coze-highlight gradient-text">灵犀社区</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 装饰性元素 */}
                <div className="coze-decoration">
                  <div className="decoration-line decoration-line-1"></div>
                  <div className="decoration-line decoration-line-2"></div>
                  <div className="decoration-particle decoration-particle-1"></div>
                  <div className="decoration-particle decoration-particle-2"></div>
                  <div className="decoration-particle decoration-particle-3"></div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      <div className="section-divider" />

      {/* 沉浸式AR学习体验区 */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text floating-element">
               沉浸式AR学习体验
             </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 data-stream">
            让知识“跃”出屏幕，让知识“飞”进AR世界
            </p>
          </div>
          <WebAR />
        </div>
      </section>

      <div className="section-divider" />

      {/* 项目亮点区 */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text floating-element">
               项目亮点
             </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              与"人工智能+"创意赛赛道完美契合的创新特色
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon
              return (
                <div key={index} className="highlight-card p-8">
               <div className="neon-border"></div>
               <div className="particle"></div>
               <div className="particle"></div>
               <div className="particle"></div>
               <div className="energy-ripple"></div>
               <div className="highlight-icon-container">
                 <IconComponent className={`highlight-icon ${highlight.color}`} />
               </div>
               <h3 className="highlight-title text-white text-center">{highlight.title}</h3>
               <p className="highlight-desc text-center">{highlight.desc}</p>
             </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 团队信息区 */}
      <section id="team-section" className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text floating-element">
               团队信息
             </h2>
          </div>

          {/* 第一行：团队成员和技术支持方向 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 团队成员 */}
            <Card className="glass-card hologram">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="mr-3 h-6 w-6 text-primary" />
                  团队成员
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-primary/20 border-primary/40"></div>
                    <Badge variant="outline" className="border-primary/30 text-primary text-xs font-medium">项目负责人</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed font-semibold">{teamInfo.leader} - 负责项目整体规划与技术架构设计</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-yellow-400/20 border-yellow-400/40"></div>
                    <Badge variant="outline" className="border-yellow-400/30 text-yellow-400 text-xs font-medium">指导老师</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">钱燕、邹修国、封筱 - 提供学术指导与技术支持，确保项目的科学性与创新性</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-accent/20 border-accent/40"></div>
                    <Badge variant="outline" className="border-accent/30 text-accent text-xs font-medium">联合开发</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">{teamInfo.members.join('、')} - 协同开发核心功能模块，共同推进项目实施</p>
                </div>
              </CardContent>
            </Card>

            {/* 技术支持方向 */}
            <Card className="glass-card hologram">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Code className="mr-3 h-6 w-6 text-primary" />
                  技术支持方向
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-primary/20 border-primary/40"></div>
                    <Badge variant="outline" className="border-primary/30 text-primary text-xs font-medium">多智能体系统</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">构建智能体协作网络，实现语义理解与任务分发的自动化调度机制</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-yellow-400/20 border-yellow-400/40"></div>
                    <Badge variant="outline" className="border-yellow-400/30 text-yellow-400 text-xs font-medium">低代码平台（Coze）</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">基于Coze平台的模块化开发，实现教育功能的快速组装与部署</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-accent/20 border-accent/40"></div>
                    <Badge variant="outline" className="border-accent/30 text-accent text-xs font-medium">Web前端开发</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">现代化前端技术栈，打造流畅的用户交互体验与响应式界面设计</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-green-400/20 border-green-400/40"></div>
                    <Badge variant="outline" className="border-green-400/30 text-green-400 text-xs font-medium">WebAR实验构建</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">沉浸式AR教学环境，支持3D模型实时交互与虚实融合的学习体验</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-purple-400/20 border-purple-400/40"></div>
                    <Badge variant="outline" className="border-purple-400/30 text-purple-400 text-xs font-medium">硬件兼容支持</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">面向未来的硬件生态适配，支持AR眼镜等智能穿戴设备的无缝集成</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 第二行：平台工具与依赖和合作目标与开放性 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 平台工具与依赖 */}
            <Card className="glass-card hologram">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Settings className="mr-3 h-6 w-6 text-primary" />
                  平台工具与依赖
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-primary/20 border-primary/40"></div>
                    <Badge variant="outline" className="border-primary/30 text-primary text-xs font-medium">智能体开发平台</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">Coze by ByteDance - 提供强大的智能体构建与部署能力，支持多模态交互</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-yellow-400/20 border-yellow-400/40"></div>
                    <Badge variant="outline" className="border-yellow-400/30 text-yellow-400 text-xs font-medium">模型运行支持</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">OpenAI GPT-4 + DeepSeek - 核心AI推理引擎，保障智能交互质量</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-accent/20 border-accent/40"></div>
                    <Badge variant="outline" className="border-accent/30 text-accent text-xs font-medium">网页开发环境</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">VS Code + GitHub Pages + Netlify - 现代化开发工具链，支持快速迭代与部署</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-green-400/20 border-green-400/40"></div>
                    <Badge variant="outline" className="border-green-400/30 text-green-400 text-xs font-medium">AR系统框架</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">WebAR.js + A-Frame - 跨平台AR解决方案，实现沉浸式学习体验</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-purple-400/20 border-purple-400/40"></div>
                    <Badge variant="outline" className="border-purple-400/30 text-purple-400 text-xs font-medium">演示设备兼容</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">PC / 手机浏览器 / Rokid AR眼镜 - 全设备生态支持，适配多样化使用场景</p>
                </div>
              </CardContent>
            </Card>

            {/* 合作目标与开放性 */}
            <Card className="glass-card hologram">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <UserPlus className="mr-3 h-6 w-6 text-primary" />
                  合作目标与开放性
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-primary/20 border-primary/40"></div>
                    <Badge variant="outline" className="border-primary/30 text-primary text-xs font-medium">多专业共创</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">鼓励多专业学生共创智能体模块，构建跨学科协作的教育创新生态系统</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-yellow-400/20 border-yellow-400/40"></div>
                    <Badge variant="outline" className="border-yellow-400/30 text-yellow-400 text-xs font-medium">开放接口</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">面向校内外团队开放接口文档与轻部署方案，降低技术门槛促进广泛应用</p>
                </div>
                
                <div className="tech-support-item group">
                  <div className="flex items-center mb-2">
                    <div className="tech-icon-dot bg-accent/20 border-accent/40"></div>
                    <Badge variant="outline" className="border-accent/30 text-accent text-xs font-medium">深度集成</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 ml-6 leading-relaxed">可与未来课程、实验室、教师系统深度集成，打造"共建共育"智能教育平台</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 第三行：联系我们（横向长条形） */}
          <div className="w-full">
            <Card className="contact-card contact-card-wide">
              <CardContent className="py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* 标题部分 */}
                  <div className="flex items-center">
                    <Mail className="mr-3 h-6 w-6" />
                    <h3 className="text-xl font-bold contact-title">联系我们</h3>
                  </div>
                  
                  {/* 联系方式部分 */}
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="contact-item-inline flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{teamInfo.contact.email}</span>
                    </div>
                    <div className="contact-item-inline flex items-center">
                      <Github className="mr-2 h-5 w-5 text-muted-foreground" />
                      <a 
                        href={teamInfo.contact.github} 
                        className="text-sm text-primary hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub项目
                      </a>
                    </div>
                    <div className="contact-item-inline flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                      <a 
                        href="/project-document.pdf" 
                        className="text-sm text-primary hover:text-accent transition-colors"
                        download="灵犀智学项目书.pdf"
                      >
                        项目书下载
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 px-4 border-t border-border/50 relative z-10">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-lg">
            ©2025 灵犀智学 · 教育因AI而温暖
          </p>
        </div>
      </footer>

      {/* 回到顶部按钮 */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 rounded-full w-16 h-16 p-0 z-50 bg-gradient-to-br from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80 border-2 border-primary/30 hover:border-primary/50 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 backdrop-blur-sm group"
          size="icon"
        >
          <ArrowUp className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-300" />
        </Button>
      )}

      {/* 智能体详情弹窗 */}
      {selectedAgent && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAgent(null)}
        >
          <Card className="max-w-lg w-full glass-card" onClick={e => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl">
                <span className="gradient-text">{selectedAgent.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedAgent(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">{selectedAgent.desc}</p>
              
              <div>
                <p className="text-sm font-semibold mb-3 text-primary">功能特色：</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.features?.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-primary/30 text-primary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold mb-2 text-accent">Bot ID：</p>
                <code className="text-xs bg-muted/50 p-3 rounded-lg block font-mono">
                  {selectedAgent.bot_id}
                </code>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => launchAgentSDK(selectedAgent)}
                  className="flex-1 cyber-button"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  启动对话
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default App