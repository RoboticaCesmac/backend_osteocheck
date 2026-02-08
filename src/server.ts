import app from "./app";

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server is running on port 3000');
})