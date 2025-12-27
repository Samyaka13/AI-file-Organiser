import express from "express";
import scanRoutes from "./routes/scan.routes";
import extractRoutes from "./routes/extract.routes";
import analyzeRoutes from "./routes/analyze.routes";
import organizeRoutes from "./routes/organize.routes";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.get("/health", (_req, res) => {
    res.json({ status: "OK", message: "AI File Organizer running" });
})

app.use("/api", scanRoutes);

app.use("/api", extractRoutes);
app.use("/api", analyzeRoutes);
app.use("/api", organizeRoutes);
export default app;