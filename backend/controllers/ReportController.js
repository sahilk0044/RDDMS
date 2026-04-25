import Report from "../models/Report.js";
import { calculateDistance } from "../utils/Distance.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

// 🚨 REPORT DAMAGE

// 📍 Get readable location from coordinates
const getLocationName = async (lat, lng) => {
  try {
    const res = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat,
          lon: lng,
          format: "json",
        },
        headers: {
          "User-Agent": "RDDMS-App", // 🔥 REQUIRED (VERY IMPORTANT)
        },
      }
    );

    const addr = res.data.address;

    return `${addr.city || addr.town || addr.village || "Unknown"}, ${
      addr.state || ""
    }`;

  } catch (err) {
    console.log("❌ LOCATION ERROR:", err.message);
    return null; // ❗ DON'T RETURN "Unknown Location"
  }
};
export const reportDamage = async (req, res) => {
  try {
    let { location, latitude, longitude } = req.body;

    // 🔥 Convert to numbers (important)
    latitude = Number(latitude);
    longitude = Number(longitude);

    // ✅ Validation
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Location required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ---------- DUPLICATE CHECK ----------
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

    // ---------- AI DETECTION ----------
    let damageType = "Unknown";
    let severity = "Low";

    try {
      const formData = new FormData();
      formData.append("image", fs.createReadStream(req.file.path));

      const aiResponse = await axios.post(
        "http://10.151.64.147:5000/detect",
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 10000,
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
    }

    // ---------- LOCATION NAME ----------
    const locationName = await getLocationName(latitude, longitude);

    // ---------- IMAGE PATH FIX ----------
    const imagePath = req.file.path.replace(/\\/g, "/");

    // ---------- SAVE REPORT ----------
    const report = new Report({
      userId: req.user?.id || null,
      image: imagePath,
      location, // optional raw location
      locationName: locationName || null, // ✅ better
      latitude,
      longitude,
      damageType,
      severity,
      status: "reported", // 🔥 FIXED (lowercase)
    });

    await report.save();

    res.status(201).json({
      message: "Report submitted successfully",
      report,
    });

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
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const validStatus = ["reported", "in_progress", "repaired"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const report = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({
      message: "Status updated",
      report,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating status" });
  }
};
// controllers/dashboardController.js



export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔥 Get all reports of logged-in user
    const reports = await Report.find({ userId }).sort({ createdAt: -1 });

    // 🔹 Counts
    const total = reports.length;

    const pending = reports.filter(
      (r) => r.status === "Reported" || r.status === "In Progress"
    ).length;

    const resolved = reports.filter(
      (r) => r.status === "Resolved"
    ).length;

    // 🔹 Recent (last 5)
    const recent = reports.slice(0, 5).map((r) => ({
      damageType: r.damageType || "Unknown",
      status: r.status,
      location: r.location,
      createdAt: r.createdAt,
    }));

    // ✅ Final response
    res.status(200).json({
      total,
      pending,
      resolved,
      recent,
    });

  } catch (error) {
    console.log("Dashboard Error:", error);
    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};



export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    await report.deleteOne();

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid report ID" });
    }

    res.status(500).json({ message: "Error deleting report" });
  }
};

export const getRecentReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 }) // 🔥 newest first
      .limit(5); // show latest 5

    res.json(reports);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};