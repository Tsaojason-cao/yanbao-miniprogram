import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App" style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <header style={{
        backgroundColor: '#2D5F3F',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h1>Sanmu AI</h1>
        <p>三木 AI - 专业摄影智能修图工具</p>
      </header>
      
      <main style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>欢迎使用 Sanmu AI</h2>
        <p>应用已成功加载！</p>
        
        <div style={{ marginTop: '20px' }}>
          <h3>核心功能</h3>
          <ul>
            <li>智能相机</li>
            <li>AI滤镜</li>
            <li>参数调节</li>
            <li>相册管理</li>
          </ul>
        </div>
        
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e8f5e9',
          borderRadius: '4px'
        }}>
          <p><strong>✅ React应用运行正常</strong></p>
          <p>如果您能看到这个页面，说明白屏问题已解决！</p>
        </div>
      </main>
      
      <footer style={{
        marginTop: '20px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>© 2025 Sanmu AI - 三木 AI</p>
      </footer>
    </div>
  );
}

export default App;
