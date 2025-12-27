import fs from "fs";
import path from "path";

const UNDO_LOG = path.join(
    __dirname,
    "../data/undo-log.json"
);

export const logUndo = (
    from: string,
    to: string
) => {
    const entry = {
        from,
        to,
        movedAt: new Date().toISOString()
    };

    let logs = [];

    if (fs.existsSync(UNDO_LOG)) {
        logs = JSON.parse(fs.readFileSync(UNDO_LOG, "utf-8"));
    }

    logs.push(entry);

    fs.writeFileSync(
        UNDO_LOG,
        JSON.stringify(logs, null, 2)
    );
};
