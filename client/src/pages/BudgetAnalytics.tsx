import React, { useContext, useEffect, useState } from "react";
import { Card, Box, Tabs, Tab, Typography } from "@mui/material";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TimeScale,
} from "chart.js";
import { ThemeProvider } from "@mui/material";
import { Line } from "react-chartjs-2";
import { analyticsTheme } from "../styles/BudgetAnalytics";
import { getAnalytics } from "../utils/fetchAnalytics";
import userContext from "../contexts/userContext";
import { userContextType } from "../types/User";
import { budgetAnalytics } from "../types/Budget";
import { calculateMinDate } from "../utils/dateFormat";
import { useNavigate } from "react-router-dom";
function BudgetAnalytics() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const { userData } = useContext(userContext) as userContextType;

  const [budgetAnalytics, setBudgetAnalytics] = useState<budgetAnalytics[]>([]);
  const [dateOffset, setDateOffset] = useState<number>(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getAnalytics(userData, setBudgetAnalytics);
  }, [setBudgetAnalytics, navigate, userData]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Budget Trends",
        align: "start" as "start",
        padding: 30,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        type: "time",
        adapters: {
          date: {
            locale: enUS,
          },
        },
        max: new Date().getTime(),
        min: calculateMinDate(dateOffset),
      },
    },
  };

  const data = {
    label: "Date",
    datasets: [
      {
        data: budgetAnalytics.map((item) => {
          return { x: item.date, y: item.price };
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 1: {
        setDateOffset(30);
        break;
      }
      case 2: {
        setDateOffset(183);
        break;
      }
      case 3: {
        setDateOffset(365);
        break;
      }
    }
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={analyticsTheme}>
      <Box
        minHeight="100vh"
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card
          elevation={2}
          style={{
            padding: "20px 40px 100px 40px",
            width: "80vw",
            height: "60vh",
          }}
        >
          <Typography component="h6" sx={{ marginBottom: "10px" }} variant="h6">
            Budget Analytics
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            TabIndicatorProps={{ style: { background: "black" } }}
          >
            <Tab value={1} label="Last Month" />
            <Tab value={2} label="Last 6 Months" />
            <Tab value={3} label="Last 12 months" />
          </Tabs>
          <Line options={options} data={data} />
        </Card>
      </Box>
    </ThemeProvider>
  );
}
export default BudgetAnalytics;
