import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function HeaderComponent() {
  return (
    <>
    <AppBar position="fixed" sx={{ backgroundColor: "#0870A4" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CUSTOMER ANALYTICS APP
        </Typography>
      </Toolbar>
    </AppBar>
    </>
  );
}
