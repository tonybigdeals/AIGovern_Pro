from typing import Optional
from app.core.llm import llm_client


class DiagnosisService:
    """经营诊断服务 - OLAP 数据分析"""

    def __init__(self):
        self.llm = llm_client

    async def analyze_metrics(self, metrics: dict[str, float]) -> dict:
        """分析关键指标，识别异常"""

        issues = []

        # 简单规则检测
        if metrics.get("order_count", 0) < 500:
            issues.append({
                "issue": "订单数下降",
                "severity": "high",
                "current": metrics.get("order_count"),
                "threshold": 500,
            })

        if metrics.get("conversion_rate", 0) < 2.0:
            issues.append({
                "issue": "转化率偏低",
                "severity": "medium",
                "current": metrics.get("conversion_rate"),
                "threshold": 2.0,
            })

        if metrics.get("active_users", 0) < 3000:
            issues.append({
                "issue": "活跃用户数下降",
                "severity": "high",
                "current": metrics.get("active_users"),
                "threshold": 3000,
            })

        return {
            "total_issues": len(issues),
            "issues": issues,
            "metrics": metrics,
        }

    async def root_cause_analysis(self, issue: str, context: dict) -> str:
        """根因分析"""

        prompt = f"""作为一个数据分析专家，分析以下经营问题的根本原因。

问题：{issue}

背景数据：
{context}

请提供：
1. 问题的根本原因
2. 影响范围
3. 应采取的措施

使用简洁的中文说明。
"""

        analysis = await self.llm.generate_text(prompt, max_tokens=512)
        return analysis

    async def generate_recommendation(self, analysis: str) -> str:
        """生成决策建议"""

        prompt = f"""基于以下分析，为企业提供可行的改进建议。

分析结果：
{analysis}

要求：
1. 提供 3-5 个具体的改进建议
2. 每个建议说明优先级和预期效果
3. 建议要可落地执行

使用中文说明。
"""

        recommendations = await self.llm.generate_text(prompt, max_tokens=1024)
        return recommendations

    async def generate_diagnosis_report(
        self, metrics: dict[str, float], time_period: str = "最近 7 天"
    ) -> dict:
        """生成完整诊断报告"""

        # 1. 分析指标
        analysis_result = await self.analyze_metrics(metrics)

        # 2. 根因分析
        root_causes = {}
        for issue in analysis_result["issues"]:
            cause = await self.root_cause_analysis(issue["issue"], metrics)
            root_causes[issue["issue"]] = cause

        # 3. 建议生成
        recommendations = await self.generate_recommendation(str(root_causes))

        return {
            "period": time_period,
            "metrics": metrics,
            "analysis": analysis_result,
            "root_causes": root_causes,
            "recommendations": recommendations,
        }


diagnosis_service = DiagnosisService()
