import React, { useState } from 'react';
import { Input, Button, Card, Table, Empty, Space, Badge, Row, Col, Tag, Alert } from 'antd';
import { SendOutlined, CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AppLayout from '../components/Layout';
import styles from './DataQuery.module.css';

const DataQuery: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatedSql, setGeneratedSql] = useState('');
  const [chartType, setChartType] = useState('');

  const mockChartData = [
    { date: '3/7', count: 245 },
    { date: '3/8', count: 310 },
    { date: '3/9', count: 280 },
    { date: '3/10', count: 380 },
    { date: '3/11', count: 420 },
    { date: '3/12', count: 360 },
    { date: '3/13', count: 480 },
  ];

  const handleQuery = async () => {
    if (!query.trim()) return;
    setLoading(true);

    // 模拟SQL生成和查询执行
    setTimeout(() => {
      setGeneratedSql(
        `SELECT DATE(created_at) as date, COUNT(*) as count FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) GROUP BY DATE(created_at) ORDER BY date ASC`,
      );
      setChartType('line');
      setResults(mockChartData);
      setLoading(false);
    }, 1500);
  };

  return (
    <AppLayout currentMenu="query">
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>🔍 数据查询</h1>
          <span className={styles.pageSubtitle}>自然语言转SQL，查询业务数据并生成可视化报表</span>
        </div>

        {/* 查询输入区 */}
        <Card className={styles.queryCard} bordered={false}>
          <div className={styles.queryInput}>
            <Input.TextArea
              placeholder="输入你的查询问题... 例如：过去7天的订单趋势如何？"
              rows={4}
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={styles.textarea}
            />
            <Button
              type="primary"
              size="large"
              icon={<SendOutlined />}
              onClick={handleQuery}
              loading={loading}
              className={styles.queryBtn}
            >
              查询
            </Button>
          </div>
        </Card>

        {generatedSql && (
          <Card className={styles.sqlCard} title="生成的SQL语句" bordered={false} style={{ marginTop: 24 }}>
            <div className={styles.sqlPreview}>
              <code className={styles.sqlCode}>{generatedSql}</code>
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={() => navigator.clipboard.writeText(generatedSql)}
                style={{ marginTop: 12 }}
              >
                复制SQL
              </Button>
            </div>
          </Card>
        )}

        {results.length > 0 && (
          <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
            <Col xs={24} lg={16}>
              <Card className={styles.chartCard} title="数据可视化" bordered={false}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                    <XAxis dataKey="date" stroke="#909399" />
                    <YAxis stroke="#909399" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: 8 }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="count" stroke="#00D9FF" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card className={styles.statsCard} title="数据统计" bordered={false}>
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  <div className={styles.statItem}>
                    <span>总数据行数</span>
                    <span className={styles.statValue}>{results.length}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span>最大值</span>
                    <span className={styles.statValue}>{Math.max(...results.map(r => r.count))}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span>最小值</span>
                    <span className={styles.statValue}>{Math.min(...results.map(r => r.count))}</span>
                  </div>
                  <Button type="primary" block icon={<DownloadOutlined />}>
                    导出数据
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        )}

        {results.length > 0 && (
          <Card className={styles.tableCard} title="结果明细" bordered={false} style={{ marginTop: 24 }}>
            <Table
              dataSource={results}
              columns={[
                { title: '日期', dataIndex: 'date', key: 'date' },
                { title: '数量', dataIndex: 'count', key: 'count' },
              ]}
              rowKey="date"
              pagination={false}
              className={styles.table}
            />
          </Card>
        )}

        {!loading && results.length === 0 && (
          <Empty description="等待查询" style={{ marginTop: 48 }} />
        )}
      </div>
    </AppLayout>
  );
};

export default DataQuery;
