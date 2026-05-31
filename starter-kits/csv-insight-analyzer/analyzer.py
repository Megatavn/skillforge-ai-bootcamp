#!/usr/bin/env python3
import csv
from pathlib import Path


def read_rows(path=None):
    if path is None:
        path = Path(__file__).with_name("sales.csv")
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def money(value):
    return f"{int(value):,}".replace(",", ".") + "đ"


def analyze(rows):
    parsed = []
    for row in rows:
        revenue = int(row["revenue"])
        cost = int(row["cost"])
        orders = int(row["orders"])
        parsed.append({**row, "revenue": revenue, "cost": cost, "orders": orders, "profit": revenue - cost})

    total_revenue = sum(r["revenue"] for r in parsed)
    total_cost = sum(r["cost"] for r in parsed)
    total_profit = sum(r["profit"] for r in parsed)
    best_day = max(parsed, key=lambda r: r["profit"])

    return {
        "total_revenue": total_revenue,
        "total_cost": total_cost,
        "total_profit": total_profit,
        "best_day": best_day,
        "margin": total_profit / total_revenue if total_revenue else 0
    }


def main():
    rows = read_rows()
    report = analyze(rows)
    print("CSV Insight Analyzer")
    print("Tổng doanh thu:", money(report["total_revenue"]))
    print("Tổng chi phí:", money(report["total_cost"]))
    print("Lợi nhuận:", money(report["total_profit"]))
    print("Biên lợi nhuận:", round(report["margin"] * 100, 2), "%")
    print("Ngày tốt nhất:", report["best_day"]["date"], money(report["best_day"]["profit"]))


if __name__ == "__main__":
    main()
