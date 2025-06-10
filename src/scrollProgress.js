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
  
  scrollAreas.forEach(scrollArea => {
    const scrollId = scrollArea.id;
    const thumb = document.querySelector(`[data-scroll-target="${scrollId}"]`);
    
    if (!thumb) return;
    
    const track = thumb.parentElement;
    const progressContainer = track.parentElement;
    
    // 确保进度条始终显示
    progressContainer.style.display = 'block';
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let startThumbLeft = 0;
    
    // 更新进度条位置
    function updateThumbPosition() {
      const scrollLeft = scrollArea.scrollLeft;
      const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;
      const scrollPercentage = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const maxThumbLeft = track.clientWidth - thumb.clientWidth;
      const thumbLeft = scrollPercentage * maxThumbLeft;
      
      thumb.style.transform = `translateX(${thumbLeft}px)`;
    }
    
    // 监听滚动事件
    scrollArea.addEventListener('scroll', updateThumbPosition);
    
    // 鼠标按下事件
    thumb.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startScrollLeft = scrollArea.scrollLeft;
      startThumbLeft = parseFloat(thumb.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
      thumb.style.cursor = 'grabbing';
      
      e.preventDefault();
      e.stopPropagation();
    });
    
    // 鼠标移动事件
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const maxThumbLeft = track.clientWidth - thumb.clientWidth;
      const newThumbLeft = Math.max(0, Math.min(maxThumbLeft, startThumbLeft + deltaX));
      
      const scrollPercentage = newThumbLeft / maxThumbLeft;
      const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;
      const newScrollLeft = scrollPercentage * maxScroll;
      
      scrollArea.scrollLeft = newScrollLeft;
      
      e.preventDefault();
    });
    
    // 鼠标释放事件
    document.addEventListener('mouseup', (e) => {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        thumb.style.cursor = 'pointer';
      }
    });
    
    // 鼠标离开事件（额外保障）
    document.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        thumb.style.cursor = 'pointer';
      }
    });
    
    // 点击轨道跳转
    track.addEventListener('click', (e) => {
      if (e.target === thumb) return;
      
      const rect = track.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const trackWidth = track.clientWidth;
      const thumbWidth = thumb.clientWidth;
      const maxThumbLeft = trackWidth - thumbWidth;
      
      const targetThumbLeft = Math.max(0, Math.min(maxThumbLeft, clickX - thumbWidth / 2));
      const scrollPercentage = targetThumbLeft / maxThumbLeft;
      const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;
      const targetScrollLeft = scrollPercentage * maxScroll;
      
      scrollArea.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    });
    
    // 初始化位置
    updateThumbPosition();
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      if (checkScrollNeed()) {
        updateThumbPosition();
      }
    });
  });
}

// 自动初始化
initScrollProgress();