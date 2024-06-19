import csvParser from "csv-parser";
import * as fs from "fs";
import path from "path";
import randomstring from "randomstring";

export async function updateAndCreateFile(filePath: string, existingFileName: string, newFileName: string, updates: Record<string, string>) {
    return new Promise<void>((resolve, reject) => {
        const data: Record<string, string>[] = [];
        let headerRow: string[] | null = null;
        // Read the existing CSV file
        fs.createReadStream(path.join(filePath, existingFileName))
            .pipe(csvParser())
            .on("data", (row) => {
                // Save the header row
                if (!headerRow) {
                    headerRow = Object.keys(row);
                }
                // Push each row to the data array
                data.push(row);
            })
            .on("end", () => {
                // Update the rows based on the provided updates
                data.forEach((row) => {
                    for (const column in updates) {
                        if (Object.prototype.hasOwnProperty.call(updates, column)) {
                            // Check if the column exists in the row before updating
                            if (column in row) {
                                row[column] = updates[column];
                            }
                        }
                    }
                });
                // Combine the header row, existing data, and the updated data
                const updatedCsvData = [headerRow!.join(","), ...data.map((row) => Object.values(row).join(","))].join("\n");
                // Write the combined data back to the new CSV file
                fs.writeFileSync(path.join(filePath, newFileName), updatedCsvData, { flush: true });
                console.log(`New file created: ${newFileName}`);
                // Resolve the promise to indicate successful completion
                resolve();
            })
            .on("error", (error) => {
                // Reject the promise if there is an error during file reading
                reject(error);
            });
    });
}

export async function removeFile(filePath: string, fileName: string) {
    fs.unlink(path.join(filePath, fileName), (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
        } else {
            console.log(`File ${fileName} deleted successfully`);
        }
    });
}

export function generateRandomString(): string {
    return randomstring.generate({
        length: 6,
        charset: "alphanumeric",
        capitalization: "uppercase",
    });
}

export function userEmailGeneration(email: string): string {
    const newEmail = generateRandomString().concat(email);
    return newEmail;
}
export const randomEmail = userEmailGeneration("test-user@hotmail.com");
