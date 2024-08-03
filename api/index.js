const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const cron = require('node-cron');
const DataModel = require('./models/DataModel');

const app = express();
const PORT = 3000;
app.use(cors());
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB")).catch(error => console.log(error));

async function fetchData() {
    let suffix = "/coins/markets?vs_currency=inr&page=1";
    const response = await fetch(`${process.env.COINGECKO_URI}${suffix}`);
    const data = await response.json();
    return data;
}

async function fetchAndStoreData() {
    try {
        let suffix = "/coins/markets?vs_currency=inr&page=1";
        const response = await fetch(`${process.env.COINGECKO_URI}${suffix}`);
        const rawData = await response.json();

        // Log the raw data to understand its structure
        // console.log('API Response:', rawData);

        // Ensure rawData is an array
        if (!Array.isArray(rawData)) {
            throw new Error('API response is not an array');
        }
        const topCoins = rawData.slice(0, 5).map(coin => ({
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            image: coin.image,
            current_price: coin.current_price,
            last_updated: new Date(coin.last_updated)
        }));


        const document = new DataModel({
            fetched_at: new Date(),
            coins: topCoins
        });

        // Save the new document
        await document.save();

        // Ensure only the latest 20 documents are kept
        const count = await DataModel.countDocuments();
        if (count > 20) {
            // Find documents to delete
            const documentsToDelete = await DataModel.find()
                .sort({ fetched_at: 1 }) // Sort by fetched_at in ascending order
                .limit(count - 20); // Get the documents to delete

            const idsToDelete = documentsToDelete.map(doc => doc._id);

            // Delete the old documents
            await DataModel.deleteMany({ _id: { $in: idsToDelete } });
            // console.log(`Deleted ${idsToDelete.length} old documents.`);
        }

        await document.save();

        console.log('Top 5 coins data successfully saved to MongoDB');
    } catch (error) {
        console.error('Error fetching or saving data:', error);
    }
}

async function handler(req, res) {
    try {
        console.log("Fetching started");
        await fetchAndStoreData()
        res.status(200).json({ message: 'Data fetched and stored in MongoDB' });
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err.message });
    }
}

async function cleanupOldEntries() {
    const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours
    await Price.deleteMany({ timestamp: { $lt: cutoffDate } });
}

// Fetched data.
app.get('/fetch-data', handler);

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the root URL of the Server");
});

// Returns data.
app.get('/all-data', async (req, res) => {
    try {
        const allData = await DataModel.find().exec();

        if (!allData || allData.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        // Return all data.
        res.json(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});
