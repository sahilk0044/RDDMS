import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const detectDamage = async (req, res) => {
  try {

    const formData = new FormData();

    formData.append(
      "image",
      fs.createReadStream(req.file.path)
    );

    const response = await axios.post(
      "http://localhost:5000/detect",
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    res.json(response.data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "AI detection failed"
    });

  }
};