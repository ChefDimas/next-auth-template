# Next.js Project with Authentication

This Next.js project template includes an authentication system and is configured with MongoDB, Mongoose, and NextAuth.

## Getting Started

To get started with this project, clone the repository and install the dependencies.

### Prerequisites

- Node.js
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ChefDimas/next-auth-template.git
   cd next-auth
    ```
2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file and add the following environment variables:

   ```bash
   MONGO_URL=[Your MongoDB URL]
   NEXTAUTH_URL=[Your NextAuth URL]
   NEXTAUTH_SECRET=[Your NextAuth Secret]
   GOOGLE_CLIENT_ID=[Your Google Client ID]
   GOOGLE_CLIENT_SECRET=[Your Google Client Secret]
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
# Features
   <ul>
    <li>User Authentication using NextAuth.</li>
    <li>MongoDB integration with Mongoose.</li>
    <li>Password hashing with bcrypt.</li>
    <li>Interactive notifications with React Hot Toast.</li>
   </ul>

# Built with
   <ul>
    <li>Next.js - The React framework for production.</li>
    <li>MongoDB - NoSQL database.</li>
    <li>Mongoose - MongoDB object modeling for Node.js.</li>
    <li>bcrypt - A library to help hash passwords.</li>
    <li>NextAuth.js - Authentication for Next.js.</li>
    <li>React Hot Toast - Smoking hot React notifications.</li>
   </ul>

# Contributing
   Contributions are welcome! Please read the contribution guidelines first.
   
# License
    Distributed under the MIT License. See LICENSE for more information.