export default function handler(req, res) {
  try {
    const { email, eventId } = req.body;
    console.log("api", email, eventId);
    res.json({
      status: "ok",
      message: `email ${email} for event id ${eventId}`,
    });
  } catch (err) {
    res.json({ status: "error", message: err });
  }
}
