import { SpaceCardDeck } from "../advent-day-twenty-two";

describe("SpaceCardDeck", () => {
  describe("constructor", () => {
    it("sets deck to factory order by default", () => {
      const deck = new SpaceCardDeck(5);
      expect(deck.getDeck()).toStrictEqual([0, 1, 2, 3, 4]);
    });
  });

  describe("dealToNewStack", () => {
    it("reverses the deck", () => {
      const deck = new SpaceCardDeck(5);
      deck.dealToNewStack();
      expect(deck.getDeck()).toStrictEqual([4, 3, 2, 1, 0]);
    });
  });

  describe("cutCards", () => {
    it("handles positive numbers", () => {
      const deck = new SpaceCardDeck(5);
      deck.cutCards(3);
      expect(deck.getDeck()).toStrictEqual([3, 4, 0, 1, 2]);
    });
    it("handles negative numbers", () => {
      const deck = new SpaceCardDeck(5);
      deck.cutCards(-3);
      expect(deck.getDeck()).toStrictEqual([2, 3, 4, 0, 1]);
    });
  });

  describe("dealWithIncrement", () => {
    it("orders the deck properly", () => {
      const deck = new SpaceCardDeck(10);
      deck.dealWithIncrement(3);
      expect(deck.getDeck()).toStrictEqual([0, 7, 4, 1, 8, 5, 2, 9, 6, 3]);
    });
  });

  describe("parseString", () => {
    it("parses out increment command", () => {
      const deck = new SpaceCardDeck(10);
      const spy = jest.spyOn(deck, "dealWithIncrement");
      deck.parseString("deal with increment 7");
      expect(spy).toHaveBeenCalledWith(7);
    });

    it("handles example 1", () => {
      const deck = new SpaceCardDeck(10);
      deck.parseString("deal with increment 7");
      deck.parseString("deal into new stack");
      deck.parseString("deal into new stack");
      expect(deck.getDeck()).toStrictEqual([0, 3, 6, 9, 2, 5, 8, 1, 4, 7]);
    });

    it("handles example 2", () => {
      const deck = new SpaceCardDeck(10);
      deck.parseString("cut 6");
      deck.parseString("deal with increment 7");
      deck.parseString("deal into new stack");
      expect(deck.getDeck()).toStrictEqual([3, 0, 7, 4, 1, 8, 5, 2, 9, 6]);
    });

    it("handles example 3", () => {
      const deck = new SpaceCardDeck(10);
      deck.parseString("deal with increment 7");
      deck.parseString("deal with increment 9");
      deck.parseString("cut -2");
      expect(deck.getDeck()).toStrictEqual([6, 3, 0, 7, 4, 1, 8, 5, 2, 9]);
    });

    it("handles example 4", () => {
      const deck = new SpaceCardDeck(10);
      deck.parseString("deal into new stack");
      deck.parseString("cut -2");
      deck.parseString("deal with increment 7");
      deck.parseString("cut 8");
      deck.parseString("cut -4");
      deck.parseString("deal with increment 7");
      deck.parseString("cut 3");
      deck.parseString("deal with increment 9");
      deck.parseString("deal with increment 3");
      deck.parseString("cut -1");
      expect(deck.getDeck()).toStrictEqual([9, 2, 5, 8, 1, 4, 7, 0, 3, 6]);
    });
  });
});
