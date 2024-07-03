import { ResponsiveLine } from "@nivo/line";
import { Serie } from "@nivo/line";
import { Box } from "@mui/material";

interface LineChartProps {
  chartData: Serie[];
}

const LineChart = ({ chartData }: LineChartProps) => {
  return (
    <Box height="700px" width="100%" p={0}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
        xScale={{ type: "time", format: "%Y-%m-%d", precision: "day" }}
        xFormat="time:%Y-%m-%d"
        yScale={{ type: "linear", stacked: false, min: "auto", max: 2250000 }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={{
          tickValues: [
            0, 500000, 750000, 1000000, 1250000, 1500000, 1750000, 2000000,
            2250000,
          ],
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: ".2s",
          legend: "",
          legendOffset: 0,
        }}
        axisBottom={{
          tickValues: "every 1 month",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          format: "%b %y",
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickValues: [
            0, 500000, 750000, 1000000, 1250000, 1500000, 1750000, 2000000,
            2250000,
          ],
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: ".2s",
          legend: "Average price",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        colors={{ scheme: "tableau10" }}
        lineWidth={1}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        gridXValues="every 1 month"
        gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 12,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default LineChart;
