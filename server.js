const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const EVENTS_FILE = path.join(__dirname, 'data', 'events.json');
const PARTICIPANTS_FILE = path.join(__dirname, 'data', 'participants.json');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // API Routes
    if (req.url === '/api/events' && req.method === 'GET') {
        fs.readFile(EVENTS_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end(JSON.stringify({ error: "Failed to read events." }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
        return;
    }

    if (req.url === '/api/participants' && req.method === 'GET') {
        fs.readFile(PARTICIPANTS_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end(JSON.stringify({ error: "Failed to read participants." }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
        return;
    }

    if (req.url === '/api/register' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const formData = JSON.parse(body);

                // Read current events and participants
                const events = JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8'));
                const participants = JSON.parse(fs.readFileSync(PARTICIPANTS_FILE, 'utf8'));

                const eventId = parseInt(formData.eventId);
                const event = events.find(e => e.id === eventId);

                if (!event) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({ error: "Event not found." }));
                }

                if (event.registered >= event.seats) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({ error: "Sorry, this event is full!" }));
                }

                // Add participant
                const newParticipant = {
                    id: Date.now(),
                    eventId: eventId,
                    name: formData.name,
                    email: formData.email,
                    timestamp: new Date().toISOString()
                };
                participants.push(newParticipant);

                // Update event registered count
                event.registered += 1;

                // Save both files
                fs.writeFileSync(PARTICIPANTS_FILE, JSON.stringify(participants, null, 2));
                fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: "Successfully registered!" }));

            } catch (err) {
                console.error(err);
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Internal server error." }));
            }
        });
        return;
    }

    // Static File Serving
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end(`File not found: ${filePath}`);
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });

});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
