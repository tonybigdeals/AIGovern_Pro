from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.schemas import DiagnosisMetrics, DiagnosisAnalysis
from app.services.diagnosis_service import diagnosis_service
from datetime import datetime

router = APIRouter(prefix="/api/diagnosis", tags=["diagnosis"])


@router.get("/summary")
async def get_diagnosis_summary(db: Session = Depends(get_db)):
    """获取诊断总结"""
    metrics = {
        "order_count": 1250,
        "gmv": 125000,
        "conversion_rate": 3.5,
        "active_users": 5000,
    }
    analysis = await diagnosis_service.analyze_metrics(metrics)

    return {
        "total_issues": analysis["total_issues"],
        "high_priority": sum(1 for i in analysis["issues"] if i.get("severity") == "high"),
        "medium_priority": sum(1 for i in analysis["issues"] if i.get("severity") == "medium"),
        "low_priority": sum(1 for i in analysis["issues"] if i.get("severity") == "low"),
        "generated_at": datetime.now(),
    }


@router.get("/metrics", response_model=DiagnosisMetrics)
async def get_diagnosis_metrics(db: Session = Depends(get_db)):
    """获取诊断指标"""
    return {
        "order_metrics": {
            "name": "订单总数",
            "value": 1250,
            "date": "2024-03-13",
        },
        "gmv_metrics": {
            "name": "GMV",
            "value": 125000,
            "date": "2024-03-13",
        },
        "conversion_metrics": {
            "name": "转化率",
            "value": 3.5,
            "date": "2024-03-13",
        },
        "user_active_metrics": {
            "name": "活跃用户",
            "value": 5000,
            "date": "2024-03-13",
        },
    }


@router.get("/analyze/{metric_name}", response_model=DiagnosisAnalysis)
async def analyze_metric(
    metric_name: str,
    db: Session = Depends(get_db),
):
    """深度分析某个指标"""
    return {
        "issue": f"{metric_name} 出现异常",
        "root_cause": "多种原因导致",
        "recommendation": "建议采取以下措施",
        "priority": "high",
    }

