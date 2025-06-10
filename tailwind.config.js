/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 启用class策略的暗黑模式
  theme: {
    extend: {
      // 扩展字体大小以支持超大文字
      fontSize: {
        '15xl': '12rem', // 支持md:text-15xl
      },
    },
  },
  safelist: [
    // 保留自定义样式类，防止被tree-shaking剔除
    'neon-text',
    'gradient-text', 
    'floating-element',
    'typewriter',
    'hologram',
    'pulse-glow',
    'matrix-grid',
    'agent-card',
    'search-box-container',
    'glass-card',
    'neon-border',
    // 保留所有agent-card相关的类
    'learning-cognitive',
    'creative-design',
    'analytical-research',
    'communication-social',
    'technical-development',
    'business-management',
    // 保留动画相关的类
    'animate-pulse',
    'animate-spin',
    'animate-bounce',
    // 保留暗黑模式相关的类
    {
      pattern: /dark:.*/,
    },
    // 保留所有可能动态生成的工具类
    {
      pattern: /(bg|text|border|ring)-(primary|secondary|accent|destructive|muted|card|popover|border|input|ring|background|foreground).*/, 
    },
  ],
  plugins: [],
}