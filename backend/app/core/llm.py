import httpx
import json
from typing import Optional
from app.core.config import settings
import hashlib


class LLMClient:
    """LLM 客户端 - 支持豆包和通义千问"""

    def __init__(self):
        self.api_key = settings.llm_api_key
        self.model_name = settings.llm_model_name
        self.provider = settings.llm_provider
        self.api_base = settings.llm_api_base

    async def generate_text(self, prompt: str, max_tokens: int = 2048) -> str:
        """生成文本回复"""
        if not self.api_key:
            # 如果没有配置 API Key，使用本地 mock 实现
            return self._generate_mock_response(prompt)

        try:
            if self.provider == "doubao":
                return await self._generate_with_doubao(prompt, max_tokens)
            elif self.provider == "qwen":
                return await self._generate_with_qwen(prompt, max_tokens)
            else:
                raise ValueError(f"不支持的 LLM 提供者: {self.provider}")
        except Exception as e:
            # API 调用失败时回退到 mock 实现
            print(f"LLM API 调用失败: {e}，使用本地 mock 实现")
            return self._generate_mock_response(prompt)

    def _generate_mock_response(self, prompt: str) -> str:
        """本地 mock 实现，用于演示和测试"""
        # 简单的模式匹配返回演示内容
        prompt_lower = prompt.lower()

        if "入职" in prompt or "onboarding" in prompt_lower:
            return """根据公司入职指南，新员工入职流程如下：

1. **第一天**
   - 人力资源部门报到，提交相关证件
   - 领取工作证和电脑等设备
   - IT 部门账号激活和系统配置

2. **第一周**
   - 部门主管介绍团队和工作职责
   - 参加公司文化培训
   - 完成安全和合规培训

3. **第一个月**
   - 参加岗位专业培训
   - 指定导师进行业务指导
   - 完成 onboarding checklist

4. **后续**
   - 30 天、60 天、90 天检查点
   - 试用期结束评估"""

        elif "保修" in prompt or "warranty" in prompt_lower:
            return """根据产品规格说明书：

**产品保修政策**

1. **标准保修期**：12 个月（自购买之日起）

2. **保修范围**
   - 正常使用中的质量问题
   - 非人为损坏
   - 非自然灾害导致的故障

3. **不保修情况**
   - 人为拆卸或改装
   - 进水或浸泡
   - 使用非官方配件
   - 超过保修期

4. **保修流程**
   - 联系客服提交保修申请
   - 提供购票证和产品序列号
   - 寄送到服务中心或上门取件
   - 7-10 个工作日完成维修或更换"""

        elif "订单" in prompt or "order" in prompt_lower:
            return """订单总数统计：

根据最近一周的数据：
- **订单总数**：1,250 笔
- **总金额**：¥125,000
- **平均订单价值**：¥100
- **转化率**：3.5%
- **活跃用户**：5,000 人

**订单分布**
- 今日：250 笔
- 本周：1,250 笔
- 本月：约 5,000 笔"""

        else:
            return f"""我已接收您的问题，这是一个演示响应。

**问题概要**: {prompt[:100]}...

**说明**: 当前系统使用本地 mock 实现进行演示。若要使用真实 LLM 能力，请配置以下环境变量：
- LLM_PROVIDER: doubao 或 qwen
- LLM_API_KEY: 您的 API 密钥
- LLM_MODEL_NAME: 模型名称

本地演示模式支持以下查询：
- 入职流程相关问题
- 产品保修相关问题
- 订单数据相关问题"""

    async def _generate_with_doubao(self, prompt: str, max_tokens: int) -> str:
        """豆包 API 调用"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self.model_name,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": 0.7,
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{self.api_base}/chat/completions",
                json=payload,
                headers=headers,
            )
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]

    async def _generate_with_qwen(self, prompt: str, max_tokens: int) -> str:
        """通义千问 API 调用"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self.model_name,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": 0.7,
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
                json=payload,
                headers=headers,
            )
            response.raise_for_status()
            data = response.json()
            return data["output"]["text"]

    async def generate_embedding(self, text: str) -> list[float]:
        """生成文本嵌入向量（768维示例）"""
        if not self.api_key:
            # 本地 mock 嵌入向量：基于文本内容的确定性向量
            return self._generate_mock_embedding(text)

        try:
            if self.provider == "doubao":
                return await self._generate_embedding_doubao(text)
            elif self.provider == "qwen":
                return await self._generate_embedding_qwen(text)
        except Exception as e:
            print(f"嵌入向量生成失败: {e}，使用本地 mock 实现")
            return self._generate_mock_embedding(text)

    def _generate_mock_embedding(self, text: str) -> list[float]:
        """生成确定性的 mock 嵌入向量"""
        # 使用哈希生成确定性的伪随机向量
        hash_value = int(hashlib.md5(text.encode()).hexdigest(), 16)
        embedding = []
        for i in range(768):
            seed = hash_value + i
            # 使用线性同余生成器生成 -1 到 1 之间的值
            value = ((seed * 1664525 + 1013904223) % (2**32)) / (2**31) - 1.0
            embedding.append(float(value))
        return embedding

    async def _generate_embedding_doubao(self, text: str) -> list[float]:
        """豆包嵌入向量 API"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self.model_name.replace("-chat", "-embedding"),
            "input": text,
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{self.api_base}/embeddings",
                json=payload,
                headers=headers,
            )
            response.raise_for_status()
            data = response.json()
            return data["data"][0]["embedding"]

    async def _generate_embedding_qwen(self, text: str) -> list[float]:
        """通义千问嵌入向量 API"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": "text-embedding-v1",
            "input": text,
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/embedding",
                json=payload,
                headers=headers,
            )
            response.raise_for_status()
            data = response.json()
            return data["output"]["embedding"]


llm_client = LLMClient()
