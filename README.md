# Budget React 📉

A simple, dynamic, and state-driven budgeting calculator built with React. This tool helps you quickly assess your total leftover cash by subtracting all your upcoming bills and expenses from your current payload (incomes and starting balance).

Featuring a **Markdown Template Importer**, you can save standard weekly/monthly budgeting blocks somewhere else and simply paste them directly into the app to instantly auto-generate your ledger without typing them individually.

## 🚀 Features
- Dynamic addition/removal of incomes and upcoming payments.
- Automatic zero-handling state mapping for blanks vs actual `0.00` amounts.
- React Context global store to flawlessly manage component arithmetic.
- Bulk markdown pasting capabilities to build out standard bills instantly.

## 💻 Running Locally

To get a local development environment running, clone this repository and use `npm` to install and boot the server.

1. **Install dependencies:**
    ```bash
    npm install
    ```
2. **Start the development server:**
    ```bash
    npm start
    ```
    *This will launch the app in development mode on [http://localhost:3000](http://localhost:3000). The page auto-reloads when you make code changes.*

3. **Run the testing suites:** 
    ```bash
    npm test
    ```
    *This executes the React Testing Library suite. It features full integration tests confirming state routing, zero-handling edge cases, and mathematical operations.*

## 🚢 Deployment

This project handles hosting autonomously utilizing **GitHub Pages**. The repository is already pre-configured to bundle the application using relative routing and immediately upload it.

To ship a fresh update cleanly to GitHub Pages, use the `deploy` CLI script:

```bash
npm run deploy
```

**What this command does behind the scenes:**
1. It triggers `predeploy` which runs `react-scripts build`.
2. This creates an optimized, static, and minified production directory inside `build/`.
3. It launches the `gh-pages` helper package which seamlessly commits that directory directly up to the `gh-pages` branch on GitHub.
4. With a configured `public/CNAME` file, GitHub routes your domain flawlessly to the new branch cache.
