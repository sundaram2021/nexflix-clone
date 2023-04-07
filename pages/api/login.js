export default async function login(req, res) {
  if (req.method === "POST") {
    try {
        const auth = req.headers.authorizaton;
        const token = auth.substring(8);
        console.log(token);
      res.send({ done: true });
    } catch (error) {
      console.log(error);
      res.status(500).status({ done: false });
    }
  } else {
    res.send({ done: false })
  }
}
