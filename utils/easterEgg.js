// utils/easterEgg.js
// 隐藏工程模式彩蛋逻辑

let clickCount = 0;
let clickTimer = null;

/**
 * Logo 点击计数器
 * 连续点击 10 次解锁隐藏工程模式
 */
function handleLogoClick() {
  clickCount++;
  
  // 清除之前的计时器
  if (clickTimer) {
    clearTimeout(clickTimer);
  }
  
  // 3秒内未点击则重置计数
  clickTimer = setTimeout(() => {
    clickCount = 0;
  }, 3000);
  
  // 达到 10 次点击
  if (clickCount >= 10) {
    clickCount = 0;
    clearTimeout(clickTimer);
    return true; // 解锁成功
  }
  
  return false;
}

/**
 * 重置点击计数
 */
function resetClickCount() {
  clickCount = 0;
  if (clickTimer) {
    clearTimeout(clickTimer);
  }
}

/**
 * 获取当前点击次数
 */
function getClickCount() {
  return clickCount;
}

module.exports = {
  handleLogoClick,
  resetClickCount,
  getClickCount
};
