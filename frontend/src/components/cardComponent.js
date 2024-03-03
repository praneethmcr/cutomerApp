import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export default function MediaControlCard(props) {
  const { cardName, cardDescription, imgSrc } = props;
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {cardName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          ></Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous"></IconButton>
          <IconButton aria-label="play/pause">{cardDescription}</IconButton>
          <IconButton aria-label="next"></IconButton>
        </Box>
      </Box>
      <CardMedia sx={{ width: 115 }} image={imgSrc} />
    </Card>
  );
}
