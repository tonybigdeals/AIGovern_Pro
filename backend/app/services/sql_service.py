from typing import Optional, Any
from app.core.llm import llm_client


class SQLService:
    """SQL 生成与查询执行服务"""

    def __init__(self):
        self.llm = llm_client

    async def generate_sql(self, natural_query: str, schema_context: Optional[str] = None) -> tuple[str, str]:
        """从自然语言生成 SQL"""

        schema = schema_context or self._get_default_schema()

        prompt = f"""你是一个 SQL 专家。根据以下数据库 schema 和自然语言查询，生成准确的 SQL 语句。

数据库 schema：
{schema}

自然语言查询：{natural_query}

要求：
1. 只返回 SQL 语句，不要有其他说明
2. SQL 必须与 schema 完全匹配
3. 优先使用 SELECT 查询
4. 如果需要聚合，使用 GROUP BY

返回格式：
SELECT ... FROM ... WHERE ...
"""

        sql = await self.llm.generate_text(prompt, max_tokens=512)
        return sql.strip(), self._infer_chart_type(natural_query)

    async def execute_query(self, sql: str, db_connection: Any) -> list[dict]:
        """执行 SQL 查询"""
        try:
            result = []
            # 占位符实现 - 实际应执行 SQL
            return result
        except Exception as e:
            raise RuntimeError(f"SQL 执行失败: {e}")

    def _infer_chart_type(self, query: str) -> str:
        """根据查询内容推断图表类型"""
        query_lower = query.lower()

        if "比较" in query_lower or "对比" in query_lower:
            return "bar"
        elif "趋势" in query_lower or "时间" in query_lower:
            return "line"
        elif "占比" in query_lower or "比例" in query_lower:
            return "pie"
        elif "分布" in query_lower:
            return "scatter"
        else:
            return "table"

    def _get_default_schema(self) -> str:
        """获取默认数据库 schema"""
        return """
-- 订单表
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT,
  amount DECIMAL(10,2),
  status VARCHAR(50),
  created_at TIMESTAMP
);

-- 商品表
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  sku VARCHAR(50),
  price DECIMAL(10,2),
  stock INT,
  category VARCHAR(50),
  created_at TIMESTAMP
);

-- 用户表
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  role VARCHAR(50),
  created_at TIMESTAMP
);

-- 指标表
CREATE TABLE metrics (
  id INT PRIMARY KEY,
  metric_name VARCHAR(100),
  metric_date DATE,
  metric_value DECIMAL(12,2),
  dimension_1 VARCHAR(100)
);
"""


sql_service = SQLService()
