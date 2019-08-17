import app from "./app";
const PORT: string = process.env.PORT || "8080";

app.listen(PORT, () => {
  console.log("View modules app listening on port 8080");
});
