import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Card, Spin, Empty, Badge, Space, Divider, Tag } from 'antd';
import { SendOutlined, CloseOutlined, CopyOutlined, LikeOutlined, DislikeOutlined, MessageOutlined } from '@ant-design/icons';
import styles from './ChatPanel.module.css';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{ title: string; url: string; relevance: number }>;
  confidence?: number;
}

interface SuggestedQuestion {
  id: string;
  text: string;
  icon?: string;
}

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '你好！我是AIGovern智能助手，可以帮助你解答企业经营中的各种问题。如：\n• 查询企业知识库\n• 分析业务数据\n• 获取操作指导\n• 经营决策建议',
      timestamp: new Date(),
      sources: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions: SuggestedQuestion[] = [
    { id: '1', text: '最近7天订单趋势如何？', icon: '📊' },
    { id: '2', text: '哪些产品库存不足？', icon: '📦' },
    { id: '3', text: '如何提升转化率？', icon: '📈' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // 模拟AI回复 (实际应调用后端API)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `这是关于"${text}"的AI回复。系统已调用相关知识库和数据源进行分析。\n\n关键发现：\n1. 数据来源于过去7天的业务数据\n2. 基于RAG检索增强生成技术\n3. 置信度较高，可参考此建议`,
        timestamp: new Date(),
        sources: [
          { title: '企业经营手册.pdf', url: '#', relevance: 0.95 },
          { title: '销售规范.docx', url: '#', relevance: 0.87 },
        ],
        confidence: 0.92,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={styles.chatPanelContainer}>
      {/* 悬浮球 */}
      {!isOpen && (
        <div className={styles.floatingBall} onClick={() => setIsOpen(true)}>
          <Badge count={3} color="#00d9ff" className={styles.badge}>
            <MessageOutlined className={styles.ballIcon} />
          </Badge>
        </div>
      )}

      {/* 展开的面板 */}
      {isOpen && (
        <div className={`${styles.chatPanel} ${styles.expanded}`}>
          {/* 面板头部 */}
          <div className={styles.panelHeader}>
            <div className={styles.headerTitle}>
              <Badge color="var(--color-accent-cyan)" />
              <span>智能助手</span>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setIsOpen(false)}
              className={styles.collapseBtn}
            />
          </div>

          {/* 消息列表 */}
          <div className={styles.messageList}>
            {messages.length === 0 ? (
              <Empty description="暂无对话记录" />
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div key={msg.id} className={`${styles.message} ${styles[msg.type]}`}>
                    {msg.type === 'assistant' && (
                      <div className={styles.avatar}>🤖</div>
                    )}

                    <div className={styles.messageContent}>
                      <p className={styles.text}>{msg.content}</p>

                      {/* 置信度指示器 */}
                      {msg.confidence && (
                        <div className={styles.confidence}>
                          <span>置信度:</span>
                          <div className={styles.confidenceBar}>
                            <div
                              className={styles.confidenceFill}
                              style={{ width: `${msg.confidence * 100}%` }}
                            />
                          </div>
                          <span className={styles.confidenceValue}>
                            {(msg.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}

                      {/* 信息来源 */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className={styles.sources}>
                          <div className={styles.sourcesTitle}>📚 信息来源</div>
                          <div className={styles.sourcesList}>
                            {msg.sources.map((source, i) => (
                              <Tag
                                key={i}
                                color="cyan"
                                className={styles.sourceTag}
                                onClick={() => handleCopyMessage(source.title)}
                              >
                                {source.title}
                                <span className={styles.relevance}>
                                  {(source.relevance * 100).toFixed(0)}%
                                </span>
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 操作按钮 */}
                      {msg.type === 'assistant' && (
                        <div className={styles.messageActions}>
                          <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined />}
                            onClick={() => handleCopyMessage(msg.content)}
                            className={styles.actionBtn}
                          />
                          <Button
                            type="text"
                            size="small"
                            icon={<LikeOutlined />}
                            className={styles.actionBtn}
                          />
                          <Button
                            type="text"
                            size="small"
                            icon={<DislikeOutlined />}
                            className={styles.actionBtn}
                          />
                        </div>
                      )}
                    </div>

                    {msg.type === 'user' && (
                      <div className={styles.avatar}>👤</div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className={`${styles.message} ${styles.assistant}`}>
                    <div className={styles.avatar}>🤖</div>
                    <div className={styles.messageContent}>
                      <Spin size="small" tip="AI正在思考..." />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* 推荐问题（当没有消息或开始时显示） */}
          {messages.length <= 1 && !loading && (
            <div className={styles.suggestedQuestions}>
              <p className={styles.suggestedTitle}>建议提问</p>
              <Space direction="vertical" style={{ width: '100%' }}>
                {suggestedQuestions.map(q => (
                  <Button
                    key={q.id}
                    type="text"
                    block
                    className={styles.suggestedBtn}
                    onClick={() => handleSuggestedQuestion(q.text)}
                  >
                    <span className={styles.suggestedIcon}>{q.icon}</span>
                    <span>{q.text}</span>
                  </Button>
                ))}
              </Space>
            </div>
          )}

          <Divider style={{ margin: '12px 0' }} />

          {/* 输入框 */}
          <div className={styles.inputArea}>
            <Input.TextArea
              placeholder="输入你的问题... (Enter发送 Shift+Enter换行)"
              value={input}
              onChange={e => setInput(e.target.value)}
              onPressEnter={e => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              rows={3}
              className={styles.textarea}
              disabled={loading}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              loading={loading}
              onClick={() => handleSendMessage()}
              className={styles.sendBtn}
              disabled={!input.trim() || loading}
            >
              发送
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
