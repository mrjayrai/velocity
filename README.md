# Velocity Inventory Management System

A full-stack inventory management solution featuring:

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS (TailAdmin template)
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **ML Microservice:** Flask, Pandas, scikit-learn (for reorder prediction)

---

## Project Structure

```
backend/
  ├── index.js                # Express server entry
  ├── package.json            # Node dependencies
  ├── .env                    # Environment variables
  ├── config/
  ├── controllers/
  ├── models/
  └── routes/
flask-backend/
  ├── reorder_quantity.py     # Flask ML API
  ├── Reorder_Prediction      # ML model files
  ├── requirments.txt         # Python dependencies
  └── src/
frontend/
  ├── src/                    # Next.js app source
  ├── public/
  ├── package.json
  ├── README.md
  └── ... (config, assets)
```

---

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- Python 3.8+
- MongoDB instance

---

### 1. Backend (Express)

```sh
cd backend
npm install
# Configure .env with your MongoDB URI and PORT
npm run start
```

- Main entry: [`backend/index.js`](backend/index.js)
- API routes: `/api/inventory/*` ([`backend/routes/InventroyRoutes.js`](backend/routes/InventroyRoutes.js))

---

### 2. Flask ML Microservice

```sh
cd flask-backend
pip install -r requirments.txt
python reorder_quantity.py
```

- Main entry: [`flask-backend/reorder_quantity.py`](flask-backend/reorder_quantity.py)
- Exposes endpoints for reorder analysis

---

### 3. Frontend (Next.js)

```sh
cd frontend
npm install
npm run dev
```

- Main entry: [`frontend/src/app`](frontend/src/app)
- Uses [TailAdmin Next.js Dashboard Template](frontend/README.md)

---

## Features

- Inventory CRUD and analytics
- Reorder and restock prediction via ML (Flask)
- Modern dashboard UI (dark mode, charts, tables)
- Responsive and accessible design

---

## License

MIT License. See [frontend/LICENSE](frontend/LICENSE).

---

## Credits

- [TailAdmin Next.js Template](https://tailadmin.com)
- [Next.js](https://nextjs.org)
-
