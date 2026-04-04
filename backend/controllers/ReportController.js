import Report from "../models/Report.js";
import { calculateDistance } from "../utils/Distance.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

// 🚨 REPORT DAMAGE
export const reportDamage = async (req, res) => {
  try {
    const { location, latitude, longitude } = req.body;

    // ✅ Basic validation
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Location required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ Duplicate detection (last 24 hrs, 20 meters)
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const recentReports = await Report.find({
      createdAt: { $gte: last24Hours },
    });

    for (let report of recentReports) {
      const distance = calculateDistance(
        latitude,
        longitude,
        report.latitude,
        report.longitude
      );

      if (distance <= 20) {
        return res.status(400).json({
          message: "Duplicate report detected within 20 meters",
        });
      }
    }

    // ---------- AI Detection ----------
    let damageType = "Unknown";
    let severity = "Low";

    try {
      const formData = new FormData();
      formData.append("image", fs.createReadStream(req.file.path));

      const aiResponse = await axios.post(
        "http://10.151.64.147:5000/detect", // ✅ AI SERVER IP
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 10000, // ⏱️ prevent hanging
        }
      );

      const detections = aiResponse.data.detections;

      if (detections && detections.length > 0) {
        damageType = "Pothole";

        const confidence = detections[0].confidence;

        if (confidence > 0.7) severity = "High";
        else if (confidence > 0.4) severity = "Medium";
        else severity = "Low";
      }
    } catch (aiError) {
      console.log("⚠️ AI ERROR:", aiError.message);
      // ✅ DO NOT CRASH → fallback values used
    }
    // ---------- END AI Detection ----------

    // ✅ Fix Windows path issue
    const imagePath = req.file.path.replace(/\\/g, "/");

    // ✅ Save report
    const report = new Report({
      userId: req.user?.id || null, // safe if auth missing
      image: imagePath,
      location,
      latitude,
      longitude,
      damageType,
      severity,
      status: "Reported", // default status
    });

    await report.save();

    res.status(201).json(report);
  } catch (error) {
    console.log("❌ SERVER ERROR:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📄 GET ALL REPORTS
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate(
      "userId",
      "name email"
    );

    res.json(reports);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching reports" });
  }
};

// 📄 GET SINGLE REPORT
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching report" });
  }
};

// 🔄 UPDATE STATUS (ADMIN)
export const updateStatus = async (req, res) => {
  try {
    const { status, reportId } = req.body;

    if (!status || !reportId) {
      return res
        .status(400)
        .json({ message: "Status and reportId required" });
    }

    const report = await Report.findByIdAndUpdate(
      reportId,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating status" });
  }
};