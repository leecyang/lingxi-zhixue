// 滚动进度条交互功能
export function initScrollProgress() {
  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupScrollProgress);
  } else {
    setupScrollProgress();
  }
}

function setupScrollProgress() {
  const scrollAreas = document.querySelectorAll('.agent-scroll-area');
  
  scrollAreas.forEach((scrollArea, index) => {
    const scrollId = scrollArea.id;
    const thumb = document.querySelector(`[data-scroll-target="${scrollId}"]`);
    
    if (!thumb) {
      console.warn(`进度条拖拽元素未找到，滚动区域ID: ${scrollId}`);
      return;
    }
    
    const track = thumb.parentElement;
    const progressContainer = track.parentElement;
    
    // 确保进度条容器存在
    if (!track || !progressContainer) {
      console.warn(`进度条容器结构不完整，滚动区域ID: ${scrollId}`);
      return;
    }
    
    // 为每个进度条创建完全独立的状态对象
    const progressState = {
      isDragging: false,
      startX: 0,
      startScrollLeft: 0,
      scrollArea: scrollArea,
      thumb: thumb,
      track: track,
      progressContainer: progressContainer
    };
    
    console.log(`初始化进度条 ${index + 1}，滚动区域ID: ${scrollId}`);
    
    // 更新进度条位置
    function updateThumbPosition() {
      const scrollLeft = progressState.scrollArea.scrollLeft;
      const maxScroll = progressState.scrollArea.scrollWidth - progressState.scrollArea.clientWidth;
      const scrollPercentage = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const maxThumbLeft = progressState.track.clientWidth - progressState.thumb.clientWidth;
      const thumbLeft = scrollPercentage * maxThumbLeft;
      
      progressState.thumb.style.transform = `translateX(${thumbLeft}px)`;
    }
    
    // 检查是否需要显示进度条
    function checkAndUpdateProgressBar() {
      if (progressState.scrollArea.scrollWidth > progressState.scrollArea.clientWidth) {
        progressState.progressContainer.style.display = 'block';
        updateThumbPosition();
      } else {
        progressState.progressContainer.style.display = 'none';
      }
    }
    
    // 监听滚动事件
    progressState.scrollArea.addEventListener('scroll', updateThumbPosition);
    
    // 为每个进度条创建独立的事件处理器
    function handleMouseMove(e) {
      if (!progressState.isDragging) return;
      
      const deltaX = e.clientX - progressState.startX;
      const trackWidth = progressState.track.clientWidth;
      const thumbWidth = progressState.thumb.clientWidth;
      const maxThumbLeft = trackWidth - thumbWidth;
      
      // 计算新的滚动位置
      const scrollRatio = deltaX / maxThumbLeft;
      const maxScroll = progressState.scrollArea.scrollWidth - progressState.scrollArea.clientWidth;
      const newScrollLeft = progressState.startScrollLeft + (scrollRatio * maxScroll);
      
      // 限制滚动范围
      progressState.scrollArea.scrollLeft = Math.max(0, Math.min(maxScroll, newScrollLeft));
    }
    
    function handleMouseUp() {
      if (progressState.isDragging) {
        progressState.isDragging = false;
        document.body.style.userSelect = '';
        progressState.thumb.style.cursor = 'pointer';
        
        // 移除事件监听器
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    }
    
    // 鼠标按下事件
    progressState.thumb.addEventListener('mousedown', (e) => {
      progressState.isDragging = true;
      progressState.startX = e.clientX;
      progressState.startScrollLeft = progressState.scrollArea.scrollLeft;
      
      // 设置样式
      document.body.style.userSelect = 'none';
      progressState.thumb.style.cursor = 'grabbing';
      
      // 添加事件监听器
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });
    
    // 点击轨道跳转 - 简化逻辑
    progressState.track.addEventListener('click', (e) => {
      if (e.target === progressState.thumb) return;
      
      const rect = progressState.track.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const trackWidth = progressState.track.clientWidth;
      const thumbWidth = progressState.thumb.clientWidth;
      const maxThumbLeft = trackWidth - thumbWidth;
      
      if (maxThumbLeft <= 0) return;
      
      const targetThumbLeft = Math.max(0, Math.min(maxThumbLeft, clickX - thumbWidth / 2));
      const scrollPercentage = targetThumbLeft / maxThumbLeft;
      const maxScroll = progressState.scrollArea.scrollWidth - progressState.scrollArea.clientWidth;
      const targetScrollLeft = scrollPercentage * maxScroll;
      
      progressState.scrollArea.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    });
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkAndUpdateProgressBar);
    
    // 初始检查和设置
    checkAndUpdateProgressBar();
    
    console.log(`进度条初始化完成，滚动区域ID: ${scrollId}`);
  });
  
  console.log(`总共初始化了 ${scrollAreas.length} 个进度条`);
}

// 注释掉自动初始化，由App.jsx手动调用
// initScrollProgress();