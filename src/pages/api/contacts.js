import Cors from 'cors';
import runMiddleware from '../../../utils/runMiddleware';

const cors = Cors({
    methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
    // The function should await the runMiddleware, and it should take three arguments: req, res, and cors
    await runMiddleware(req, res, cors);

    if (req.method === "GET") {
        const contactMediums = [
            {
                medium: "Github",
                username: "Github",
                // If you don't have a link, you can omit the link field or provide a default value
            },
            {
                medium: "theclassroot.com",
                username: "blog",
                link: "",  // same comment here
            },
            {
                medium: "email",
                username: "ryanmichaelmensah@gmail.com",
                link: "ryanmichaelmensah@gmail.com",
            },
            {
                medium: "Twitter",
                username: "ryanetornam",
                link: "",  // and here
            },
            {
                medium: "Instagram",
                username: "ryanmichaelmensah",
                link: "",  // and here
            },
        ];

        res.json(contactMediums);  // corrected the variable name
    } else {
        return res.status(400).json({ message: "Only GET request allowed!" })
    }

}
