import Header from "./components/headerComponent";
import ActionAreaCard from "./components/cardComponent";
import TableComponent from "./components/tableComponent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import customerIcon from "./static/images/icon.png";
import orderIcon from "./static/images/order.png";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Stack direction="row" spacing={5} marginTop={5}>
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
