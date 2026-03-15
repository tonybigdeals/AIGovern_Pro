/**
 * API 服务层
 * 与后端 FastAPI 通信
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;

// 健康检查
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
}

// 知识问答 API
export async function chatWithKnowledge(
  question: string,
  sessionId: string = 'default',
  topK: number = 5
) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        session_id: sessionId,
        top_k: topK,
      }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Chat API failed:', error);
    throw error;
  }
}

// 数据查询 API
export async function queryData(naturalLanguageQuery: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        natural_language_query: naturalLanguageQuery,
      }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Query API failed:', error);
    throw error;
  }
}

// 获取操作模板列表
export async function getOperationTemplates() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/operations/templates`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Get operation templates failed:', error);
    throw error;
  }
}

// 执行操作
export async function executeOperation(
  operationType: string,
  parameters: Record<string, any>
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/operations/${operationType}/execute`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation_type: operationType,
          parameters,
        }),
      }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Execute operation failed:', error);
    throw error;
  }
}

// 获取诊断总结
export async function getDiagnosisSummary() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/diagnosis/summary`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Get diagnosis summary failed:', error);
    throw error;
  }
}

// 获取诊断指标
export async function getDiagnosisMetrics() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/diagnosis/metrics`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Get diagnosis metrics failed:', error);
    throw error;
  }
}

// 深度分析诊断指标
export async function analyzeDiagnosisMetric(metricName: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/diagnosis/analyze/${metricName}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Analyze diagnosis metric failed:', error);
    throw error;
  }
}

export default {
  checkHealth,
  chatWithKnowledge,
  queryData,
  getOperationTemplates,
  executeOperation,
  getDiagnosisSummary,
  getDiagnosisMetrics,
  analyzeDiagnosisMetric,
};
