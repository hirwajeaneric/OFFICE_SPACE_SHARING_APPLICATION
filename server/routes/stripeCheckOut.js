const express = require('express');
const router = express.Router();

const stripe = require('stripe')('sk_test_51NMcIBKvflDqv8zX2LgueQ3JRQFoArUzpMX4gPE2ZcUTDPii48uDbXGkFohMQuo5nOz9E1hA4xxdySeJyZfj7aQF00HCbbsZdd');

router.post('/', async (req, res) => {
    const { price, product, slotId, userName, userId } = req.body;
    console.log(req.body)
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'rwf',
              product_data: {
                name: product,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://127.0.0.1:5555/user/${userName}/success/${slotId}/${userId}`,
        cancel_url: 'http://127.0.0.1:5555/',
      });
  
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports = router;