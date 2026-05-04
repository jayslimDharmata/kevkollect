# KevKollect

Personal baseball card collection manager built with Next.js.

## Setup & Deploy

### 1. Push to GitHub
1. Create a new repo at github.com called `kevkollect`
2. In your terminal:
```
cd kevkollect
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/kevkollect.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to vercel.com → New Project
2. Import your `kevkollect` GitHub repo
3. Add these Environment Variables:
   - `ANTHROPIC_API_KEY` = your key (starts with sk-ant-...)
   - `SHEET_ID` = 1PM-0WQf5r4IsKs1QAjnakEAoDSavsGaqe39vpxENVDg
4. Click Deploy

### 3. Google Sheet Setup
Your sheet needs two tabs named exactly:
- `Ohtani` — Shohei Ohtani collection
- `PC` — Full personal collection

Columns for both tabs:
`Year | Set | Name | Insert | Parallel | Number | Graded | Comp | Comp Date`

PC tab also has:
`Rookie` — Y or N

### Local Development
```
npm install
cp .env.example .env.local
# Fill in your values in .env.local
npm run dev
```
Open http://localhost:3000
