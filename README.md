# NDN Status API

Simple REST API to expose NDN forwarder status using `nfdc`.

## 🚀 Features

* Get routing table (`nfdc route`)
* Get Content Store info (`nfdc cs`)
* JSON formatted output
* Lightweight & fast (Node.js + Express)

## 📦 Endpoints

### GET `/routes`

Return NDN routing table

### GET `/cs`

Return Content Store statistics:

* capacity
* nEntries
* nHits
* nMisses

## ⚙️ Setup

```bash
git clone https://github.com/your-username/ndn-status-api.git
cd ndn-status-api
npm install
node index.js
```

Server will run on:

```
http://localhost:555
```

## 🔌 Requirements

* Node.js
* NFD (`nfdc` must be available in PATH)

## 🛡️ Notes

* This API executes system commands (`nfdc`)
* Do NOT expose publicly without authentication

## 📌 Future Ideas

* Live monitoring (WebSocket)
* Multi-node aggregation
* Web dashboard integration
* Metrics visualization

## 👤 Author

Built for NDN experimentation & monitoring
