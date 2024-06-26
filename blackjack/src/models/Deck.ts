import { Card, Value, Suit, VALUES, SUITS } from "../types/CardType"

export class Deck {
  public cards: Card[];

  constructor(deckCount: number = 6, shouldShuffle: boolean = true) {
    this.cards = [];
    this.initializeDeck(deckCount);
    if (shouldShuffle) {
      this.shuffle();
    }
    
    
  }

  clone() {
    const newDeck = new Deck(6, false);
    newDeck.cards = [...this.cards];
    // copy over any other properties if necessary
    return newDeck;
  }
  private initializeDeck(deckCount: number): void {
    for (let deckIndex = 0; deckIndex < deckCount; deckIndex++) {
      for (const suit of SUITS) {
        for (const value of VALUES) {
          const image = this.getImagePath(value, suit); 
          this.cards.push({ value, suit, image });
        }
      }
    }
  } 

  //Fisher-Yates
  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public dealCard(): Card | null {
    console.log("dealt card");
    return this.cards.pop() || null;
  }

  private getImagePath(value: Value, suit: Suit): string {
    return `/assets/${value}${suit}.svg`;
  }

  public needsReshuffle(): boolean {
    const PENETRATION = 52;
    return this.cards.length <= PENETRATION;
  }
}
