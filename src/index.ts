import "dotenv/config";
import app from "./app";
import { batchOrganizeFolder } from "./services/batchOrganizer.service";
const TARGET_FOLDER = "C:/Users/samya/OneDrive/Desktop/test-downloads";

app.listen(process.env.PORT || 8000, async () => {
     console.log(`🚀 Server running on port ${process.env.PORT}`);
     console.log("📂 Starting batch organization...");
     await batchOrganizeFolder(TARGET_FOLDER);
});  