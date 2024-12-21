import { PieChart } from "@mui/x-charts/PieChart";

export default function CustomPieChart({
  valueAccept,
  valuePending,
  valueReject,
  valueResolve,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  const data = [
    {
      id: 1,
      value: parseInt(valueAccept),
      label: "Accepted",
      color: "#4ADE80",
    }, // green
    {
      id: 2,
      value: parseInt(valuePending),
      label: "Pending",
      color: "#FACC15",
    }, // yellow
    {
      id: 0,
      value: parseInt(valueReject),
      label: "Rejected",
      color: "#F87171",
    }, // red
    {
      id: 3,
      value: parseInt(valueResolve),
      label: "Resolved",
      color: "#60A5FA",
    }, // blue
  ];
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const valueFormatter = (item: { value: number }) =>
    `${((item.value / totalValue) * 100).toFixed(1)}%`;

  return (
    <PieChart
      series={[
        {
          data: data,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          valueFormatter,
        },
      ]}
      slotProps={{
        legend: { hidden: true }, // Hide  legend
      }}
      margin={{ right: 0 }}
      width={400}
      height={200}
    />
  );
}
