const axios = require("axios");

const reverseGeocode = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/reverse",
      {
        params: {
          lat,
          lon: lng,
          format: "json",
          apiKey: process.env.GEOAPIFY_API_KEY,
        },
      }
    );

    res.json(response.data.results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch address",
    });
  }
};

module.exports = { reverseGeocode };