import React, { useState, useEffect } from "react";
import Header from "./components/HeaderComponent";
import ActionAreaCard from "./components/CardComponent";
import TableComponent from "./components/TableComponent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import customerIcon from "./static/images/icon.png";
import orderIcon from "./static/images/order.png";

function App() {
  const [customerCount, setCustomerCount] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customerDataResponse = await fetch(
        "http://localhost:5000/customer/count"
      );
      const customerDataCount = await customerDataResponse.json();
      setCustomerCount(customerDataCount[0].customercount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <Header />
      <Container sx={{ paddingBottom: 5 }}>
        <Stack
          direction="row"
          spacing={5}
          marginTop={10}
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <ActionAreaCard
            cardName="Customers Count"
            cardDescription={customerCount}
            imgSrc={customerIcon}
          />
          <ActionAreaCard
            cardName="Today's  Orders"
            cardDescription={1000}
            imgSrc={orderIcon}
          />
        </Stack>
        <TableComponent />
      </Container>
    </div>
  );
}

export default App;