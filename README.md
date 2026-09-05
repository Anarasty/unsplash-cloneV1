# Unsplash clone

## Deployment link

[https://unsplash-clone-v1.vercel.app/](https://unsplash-clone-v1.vercel.app/)

## Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Anarasty/unsplash-cloneV1.git
   cd unsplash-cloneV1
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your Unsplash Access Key:

   ```env
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   ```

   You can create an Unsplash developer application and get an Access Key from
   [Unsplash Developers](https://unsplash.com/developers).

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal, usually
   [http://localhost:5173](http://localhost:5173).

## Demo login

Enter a name with up to 10 characters and a password containing 3–12 characters.
Repeat the same password to sign in. This is a client-side demo authentication flow.

## Production build

Create and test a production build locally:

```bash
npm run lint
npm run build
npm run preview
```

The production files will be generated in the `dist` directory.

## Environment variables on Vercel

Add `VITE_UNSPLASH_ACCESS_KEY` under **Project Settings → Environment Variables**,
enable it for Production, and redeploy the project.
