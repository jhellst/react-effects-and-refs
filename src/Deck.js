import React, { useState, useEffect } from "react";

const BASE_URL = "https://deckofcardsapi.com/api/deck";



/** Pulls a deck from CardsAPI, then draw a card from API and display in list */
function Deck() {
  const [deck, setDeck] = useState({
    deck: null,
    loaded: false
  });

  const [cardsDrawn, setCardsDrawn] = useState([]);


  useEffect(function fetchAndSetDeck() {
    async function fetchDeck() {
      const response = await fetch(`${BASE_URL}/new/`);
      const deck = await response.json();
      setDeck({
        deck: deck,
        loaded: true
      });
    }
    fetchDeck();
  }, []);



  /** Draws a single card */
  async function drawCard() {
    const response = await fetch(`${BASE_URL}/${deck.deck.deck_id}/draw/?count=1`);
    const cardInfo = await response.json();
    //console.log(cardInfo)
    const card = cardInfo.cards[0];
      //card.style = (our style stuff)
    setCardsDrawn(prevCards => [...prevCards, card]);
  }



  function makeCardList(){
    const jitter = 20;

    const cardPile = cardsDrawn.map(card => {
      let xJitter = Math.round(jitter*Math.random());
      let yJitter = Math.round(jitter*Math.random());
      let currAngle = Math.round(360*Math.random());

      const imgStyle = {
        position: "absolute",
        transform: `rotate(${currAngle}deg)`,
        top: `${180 + yJitter}px`,
        left: `${180 + xJitter}px`,
      }
      return <img src={card.image} style={imgStyle} />;
    });
    return cardPile;
  }

  return (
    <div>
      <h1>Card Display</h1>
      {(deck.loaded) && <button onClick={drawCard}>Draw Card</button>}
      <br />
      {(cardsDrawn.length > 0) &&
      <div className="CardPile">
        {makeCardList()}
      </div>}
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


// function handleClick(evt) {
//   const x = window.innerWidth * Math.random();
//   const y = window.innerHeight * Math.random();
//   setBags(prevBags => [...prevBags, { x, y }]);
// }

// const bagsImages = bags.map((bag, i) => (
//   <img
//     key={i}
//     src={chipsImg}
//     className="bag"
//     style={{ top: `${bag.y}px`, left: `${bag.x}px` }}
//     alt="bag of lay's chips"
//   />
// ));