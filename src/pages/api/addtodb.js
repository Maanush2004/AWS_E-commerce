export default async function handler(req,res) {

    const addToDB = async (productDetails) => {
        try {
          const response = await fetch(process.env.AddDBAPI, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
              body: JSON.stringify(productDetails),
          })
          if (!response.ok) throw new Error('Fetch error');
          return await response.json()
        } catch (error) {
          return {};
        }
      }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const {
            name,
            category,
            price,
            description
        } = req.body

        await addToDB({name,category,price,description})

        res.redirect(303, `/`);

    } catch (error) {
        console.error('Error in adding to DB', error);
        res.status(500).json({ error: 'Error adding to DB' });
    }
    
}