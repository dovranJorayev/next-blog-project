    import express from 'express';
    import fetch from 'node-fetch';

    const router = express.Router();

    // Revalidate the Next.js app cache
    router.post('/', async (req, res) => {
    try {
        // Call the Next.js revalidation endpoint
        const response = await fetch('http://localhost:3000/api/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            secret: process.env.REVALIDATION_SECRET || 'default-secret'
        })
        });

        if (!response.ok) {
        const error = await response.text();
        console.error('Error revalidating Next.js app:', error);
        return res.status(500).json({ error: 'Failed to revalidate Next.js app' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error revalidating Next.js app:', error);
        res.status(500).json({ error: 'Failed to revalidate Next.js app' });
    }
    });

export default router;