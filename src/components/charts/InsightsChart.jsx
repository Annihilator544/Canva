import { useYoutubeData } from "store/use-youtube-data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const dailyData = [
  { year: "2018", views: 100000, comments: 70000 },
  { year: "2019", views: 150000, comments: 120000 },
  { year: "2020", views: 180000, comments: 150000 },
  { year: "2021", views: 250000, comments: 200000 },
  { year: "2022", views: 130000, comments: 100000 },
  { year: "2023", views: 160000, comments: 140000 },
  { year: "2024", views: 170000, comments: 150000 },
];

function transformData(inputData) {
    
    return Object.entries(inputData).map(([dateString, data]) => {
    const year = dateString;
    return {
        year: year,
        views: data.views,
        comments: data.comments,
    };
    });
}

export function InsightsChart() {
    const { data } = useYoutubeData();
    const [chartData, setChartData] = useState(dailyData);
    useEffect(() => {
      Object.keys(data).length ? setChartData(transformData(data.yearly).slice(-6)): setChartData(dailyData) ;
      },[data]);  
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          {chartData === dailyData ? (
            <>
                <Bar dataKey="comments" fill="#A9A9A9" name="Comments" />
                <Bar dataKey="views" fill="#4A4A4A" name="Views" />
            </>
          ):(
            <>
                <Bar dataKey="comments" fill="#fed4b9" name="Comments" />
                <Bar dataKey="views" fill="#fc958e" name="Views" />
            </>
            )}
        </BarChart>
      </CardContent>
    </Card>
  );
}