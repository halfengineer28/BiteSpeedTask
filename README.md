📇 Contact Identification Service
A RESTful API built with Node.js, Express, and MongoDB to identify and link user contacts based on email and/or phone number, following specific deduplication rules.

🔧 This project is part of a task submission where a new contact is created as "primary", and all subsequent matches with new info are created as "secondary" and linked to the original.

🧠 How It Works
If no existing contact is found → create a new primary contact

If email or phone number matches an existing contact, but the other field is new → create a secondary contact and link it to the primary

All related contacts are grouped together using linkedId and linkPrecedence

🚀 Tech Stack
Node.js

Express.js

MongoDB

Mongoose
