export default async function handler(req,res) {
    try {
        const {names} = req.query;
        let response;
        if (!names) {
          response = await fetch(process.env.fetchProductsAPI);
        } else {
          response = await fetch(process.env.fetchProductsAPI+`/?names=${names}`)
        }
        res.json(await response.json())
    } catch (error) {
        res.json({});
    }
  }

export async function fetchProducts(names) {
    try {
        let response;
        if (!names) {
          response = await fetch(process.env.fetchProductsAPI);
        } else {
          response = await fetch(process.env.fetchProductsAPI+`/?names=${names}`)
        }
        if (!response.ok) throw new Error('Fetch error');
        return response.json();
    } catch (error) {
        return {};
    }
  }