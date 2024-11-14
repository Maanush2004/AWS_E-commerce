const rmDB = async (item) => {
    try {
      const response = await fetch(`${process.env.RMDBAPI}/?name=${item}`)
      if (!response.ok) throw new Error('Fetch error');
      return await response.json()
    } catch (error) {
      return {};
    }
  }

export default async function handler(req,res) {
    try {
        const {name} = req.query
        console.log(name)
        await rmDB(name);
        res.status(200).json({success:true})
    } catch (error) {
        console.error('Error removing from DB', error);
        res.status(500).json({ error: 'Error removing from DB' });
    }


}