import Header from "./components/HeaderComponent";
import ActionAreaCard from "./components/CardComponent";
import TableComponent from "./components/TableComponent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import customerIcon from "./static/images/icon.png";
import orderIcon from "./static/images/order.png";

function App() {
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
            cardDescription="50"
            imgSrc={customerIcon}
          />
          <ActionAreaCard
            cardName="Today's  Orders"
            cardDescription="0"
            imgSrc={orderIcon}
          />
        </Stack>
        <TableComponent />
      </Container>
    </div>
  );
}

export default App;
