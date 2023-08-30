import Cors from 'cors';
import runMiddleware from '../../../utils/runMiddleware'; // corrected naming convention

const cors = Cors({
    methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
    // The function should await the runMiddleware that would be created later, and this should take three arguments: req, res, and cors
    await runMiddleware(req, res, cors);

    if (req.method === "GET") {
        const projects = [
            {
                name: "Green Pages",
                description: " The ultimate reference sheet for CTF players and Penetration Testers",
                stack: ["Google Sheets"],
                link: "https://docs.google.com/spreadsheets/d/1Z5wluUnxBIZfC7EEvBHn0XDrj6x78ELBVqGQA66yZSc/edit#gid=0"
            },
        ];
        return res.json(projects);

    } else {
        return res.status(400).json({ message: "Only GET requests allowed" }); // corrected the json function call
    }
}
