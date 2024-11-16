import { useEffect, useMemo, useRef } from "react";
import styles from "./ScoreChart.module.css";
import { Chart, ChartData } from "chart.js/auto";
import { ChartRawData } from "../model/types";

interface ScoreChartProps {
  size: "small" | "big";
  data: ChartRawData[];
}

export default function ScoreChart({ size, data }: ScoreChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart>();

  const chartData: ChartData = useMemo(() => {
    const datasets = data.map((score) => ({
      label: score.movieTitle,
      data: [
        score.sceneSkill * 10,
        score.actorSkill * 10,
        score.lineSkill * 10,
        score.directorSkill * 10,
        score.musicSkill * 10,
        score.storySkill * 10,
      ],
      fill: true,
      borderColor: "rgba(243, 187, 75, 1)",
      pointBackgroundColor: "rgba(243, 187, 75, 1)",
      borderWidth: 2,
      pointRadius: 1,
      pointHoverRadius: 1,
    }));

    return {
      labels: ["영상미", "연기력", "대사", "연출", "음악", "스토리"],
      datasets,
    };
  }, [data]);

  useEffect(() => {
    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: "radar",
        data: chartData,
        options: {
          animation: false,
          plugins: {
            title: {
              display: size === "big",
            },
            legend: {
              display: false,
            },
            tooltip: {
              enabled: size === "big",
            },
          },
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: {
                display: false,
                stepSize: 25,
              },
              // grid: {
              //   display: isBig,
              // },
              grid: {
                color: "#8C8478",
              },
              pointLabels: {
                display: size === "big",
              },
              // angleLines: {
              //   display: isBig,
              // },
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [size, chartData]);

  return (
    <div
      className={
        size === "small" ? styles["small-container"] : styles["big-container"]
      }
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
