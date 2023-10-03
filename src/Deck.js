import React, { useState, useEffect } from "react";

const NEW_DECK_URL = "https://deckofcardsapi.com/api/deck/new/";
const DRAW_CARD_URL = "https://deckofcardsapi.com/api/deck/new/";

function Deck() {
  const [deck, setDeck] = useState({
    deck: null,
    loaded: false
  });

  const [cardsDrawn, setCardsDrawn] = useState([]);

  // Possibly another state variable that holds pile of drawn cards
  useEffect(function fetchAndSetDeck() {
    async function fetchDeck() {
      const response = await fetch(NEW_DECK_URL);
      const deck = await response.json();
      setDeck({
        deck: deck,
        loaded: true
      });
    }
  }, []);

  async function drawCard() {
    const response = await fetch(DRAW_CARD_URL);
    const cardInfo = await response.json();
    const card = cardInfo.cards[0];
    setCardsDrawn(prevCards => card);
  }

  return (
    <div>
      {(deck.loaded) && <button onClick={drawCard}></button>}
      {(cardsDrawn.length > 0) && <CardsPile />}
    </div>
  );


}

export default Deck;

// {
//   "success": true,
//     "deck_id": "3p40paa87x90",
//       "shuffled": false,
//         "remaining": 52;
// }

// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1


// {
//   "success": true,
//   "deck_id": "kxozasf3edqu",
//   "cards": [
//       {
//           "code": "6H",
//           "image": "https://deckofcardsapi.com/static/img/6H.png",
//           "images": {
//                         "svg": "https://deckofcardsapi.com/static/img/6H.svg",
//                         "png": "https://deckofcardsapi.com/static/img/6H.png"
//                     },
//           "value": "6",
//           "suit": "HEARTS"
//       },
//   ],
//   "remaining": 50
// }