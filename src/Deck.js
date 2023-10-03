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
    const card = cardInfo.cards[0];
    setCardsDrawn(prevCards => [...prevCards, card]);
  }

  /** Shuffles the current deck */
  async function shuffleDeck() {
    setDeck({
      deck: null,
      loaded: false
    });

    setCardsDrawn([]);

    const response = await fetch(`${BASE_URL}/new/shuffle/?deck_count=1`);
    const deck = await response.json();
    setDeck({
      deck: deck,
      loaded: true
    });
  }


  /** Render list of all drawn cards */
  function makeCardList() {
    const jitter = 20;

    const cardPile = cardsDrawn.map(card => {
      let xJitter = Math.round(jitter * Math.random());
      let yJitter = Math.round(jitter * Math.random());
      let currAngle = Math.round(360 * Math.random());

      const imgStyle = {
        position: "absolute",
        transform: `rotate(${currAngle}deg)`,
        top: `${180 + yJitter}px`,
        left: `${180 + xJitter}px`,
      };
      return <img src={card.image} style={imgStyle} />;
    });
    return cardPile;
  }

  return (
    <div>
      <h1>Card Display</h1>
      {(deck.loaded) &&
        <>
          <button onClick={drawCard}>Draw Card</button>
        </>
      }
      <button disabled={!deck.loaded} onClick={shuffleDeck}>Shuffle Deck</button>
      <br />
      {(cardsDrawn.length > 0) &&
        <div className="CardPile">
          {makeCardList()}
        </div>}
    </div>
  );
}

export default Deck;