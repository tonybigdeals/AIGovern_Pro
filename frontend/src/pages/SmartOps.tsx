import React, { useState } from 'react';
import { Card, Button, Space, Table, Tag, Modal, Form, Input, Select, Empty, Timeline, Alert } from 'antd';
import { PlayCircleOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import AppLayout from '../components/Layout';
import styles from './SmartOps.module.css';

interface Operation {
  id: string;
  type: string;
  description: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  details: string;
}

const SmartOps: React.FC = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const operationTemplates = [
    { id: '1', name: '自动审批', icon: '✅', desc: '审批金额<1000的报销申请' },
    { id: '2', name: '批量导出', icon: '📥', desc: '导出活跃用户列表' },
    { id: '3', name: '库存调整', icon: '📦', desc: '自动调整低库存商品' },
  ];

  const handleExecuteOperation = async (templateId: string) => {
    const newOp: Operation = {
      id: Date.now().toString(),
      type: operationTemplates.find(t => t.id === templateId)?.name || '未知操作',
      description: operationTemplates.find(t => t.id === templateId)?.desc || '',
      status: 'pending',
      timestamp: new Date().toLocaleString('zh-CN'),
      details: '执行中...',
    };

    setOperations([newOp, ...operations]);

    // 模拟操作执行
    setTimeout(() => {
      setOperations(prev =>
        prev.map(op =>
          op.id === newOp.id
            ? { ...op, status: 'success', details: '操作已成功执行' }
            : op,
        ),
      );
    }, 2000);
  };

  return (
    <AppLayout currentMenu="operations">
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>⚙️ 智能操作</h1>
          <span className={styles.pageSubtitle}>AI自动执行业务操作，记录所有操作日志和回滚选项</span>
        </div>

        {/* 操作模板 */}
        <div className={styles.templateSection}>
          <h2 className={styles.sectionTitle}>操作模板</h2>
          <div className={styles.templateGrid}>
            {operationTemplates.map(template => (
              <Card key={template.id} className={styles.templateCard}>
                <div className={styles.templateIcon}>{template.icon}</div>
                <h3 className={styles.templateName}>{template.name}</h3>
                <p className={styles.templateDesc}>{template.desc}</p>
                <Button
                  type="primary"
                  block
                  icon={<PlayCircleOutlined />}
                  onClick={() => handleExecuteOperation(template.id)}
                >
                  执行
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* 操作日志 */}
        <Card title="📋 操作日志" className={styles.logCard} style={{ marginTop: 32 }}>
          {operations.length === 0 ? (
            <Empty description="暂无操作记录" />
          ) : (
            <Timeline>
              {operations.map(op => (
                <Timeline.Item
                  key={op.id}
                  dot={
                    op.status === 'success' ? (
                      <span style={{ color: '#10b981' }}>✓</span>
                    ) : op.status === 'failed' ? (
                      <span style={{ color: '#ef4444' }}>✗</span>
                    ) : (
                      <span style={{ color: '#ffd700' }}>◌</span>
                    )
                  }
                >
                  <div className={styles.logItem}>
                    <div className={styles.logHeader}>
                      <span className={styles.logType}>{op.type}</span>
                      <Tag color={op.status === 'success' ? 'green' : 'orange'}>
                        {op.status === 'success' ? '成功' : '处理中'}
                      </Tag>
                    </div>
                    <p className={styles.logDesc}>{op.description}</p>
                    <p className={styles.logTime}>{op.timestamp}</p>
                    <Space>
                      <Button type="link" size="small" icon={<UndoOutlined />}>
                        回滚
                      </Button>
                      <Button type="link" size="small" danger icon={<DeleteOutlined />}>
                        删除
                      </Button>
                    </Space>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          )}
        </Card>
      </div>
    </AppLayout>
  );
};

export default SmartOps;
