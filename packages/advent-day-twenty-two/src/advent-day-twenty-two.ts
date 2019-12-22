type Deck = number[];

export class SpaceCardDeck {
  private deck: Deck;

  constructor(size: number) {
    this.deck = new Array(size);
    for (let i = 0; i < this.deck.length; i++) {
      this.deck[i] = i;
    }
  }

  getDeck() {
    return this.deck;
  }

  setToFactoryOrder() {
    for (let i = 0; i < this.deck.length; i++) {
      this.deck[i] = i;
    }
  }

  dealToNewStack() {
    this.deck.reverse();
  }

  cutCards(numCards: number) {
    let cutPart;
    let rest;
    if (numCards < 0) {
      // Negative case
      cutPart = this.deck.slice(numCards);
      rest = this.deck.slice(0, numCards);
      this.deck = cutPart.concat(rest);
    } else {
      // Positive case
      cutPart = this.deck.slice(0, numCards);
      rest = this.deck.slice(numCards);
      this.deck = rest.concat(cutPart);
    }
  }

  dealWithIncrement(incrementFactor: number) {
    const newDeck = new Array(this.deck.length);
    let cursor = 0;
    for (let i = 0; i < this.deck.length; i++) {
      newDeck[cursor] = this.deck[i];
      cursor += incrementFactor;
      if (cursor > this.deck.length - 1) {
        cursor -= this.deck.length;
      }
    }
    this.deck = newDeck;
  }

  parseString(command: string) {
    const NUM_REGEX = /-?\d+/gm;
    const matches = command.match(NUM_REGEX);
    const number = matches && Number.parseInt(matches[0], 10);
    if (command.includes("increment")) {
      this.dealWithIncrement(number as number);
    } else if (command.includes("new stack")) {
      this.dealToNewStack();
    } else if (command.includes("cut")) {
      this.cutCards(number as number);
    }
  }
}
