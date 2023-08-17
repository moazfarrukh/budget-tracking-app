import React, { useContext, useEffect, useState } from "react";
import { Card, Box, Tabs, Tab, Typography } from "@mui/material";
import "chartjs-adapter-date-fns";
import { ThemeProvider } from "@mui/material";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

import {
  setupChartjs,
  authenticatedContextType,
  authenticatedContext,
  budgetAnalytics,
  getAnalytics,
  analyticsTheme,
} from "../index";

function BudgetAnalytics() {
  // registering chartjs plugins

  const [budgetAnalytics, setBudgetAnalytics] = useState<budgetAnalytics[]>([]);
  const [dateOffset, setDateOffset] = useState<number>(30);
  const [value, setValue] = useState<number>(0);
  const { setAuthenticated } = useContext(
    authenticatedContext
  ) as authenticatedContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
      getAnalytics(setBudgetAnalytics);
    }
  }, [setBudgetAnalytics, setAuthenticated, navigate]);

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
  const options = setupChartjs(dateOffset);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0: {
        setDateOffset(30);
        break;
      }
      case 1: {
        setDateOffset(183);
        break;
      }
      case 2: {
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
            <Tab value={0} label="Last Month" />
            <Tab value={1} label="Last 6 Months" />
            <Tab value={2} label="Last 12 months" />
          </Tabs>
          <Line options={options} data={data} />
        </Card>
      </Box>
    </ThemeProvider>
  );
}
export default BudgetAnalytics;
