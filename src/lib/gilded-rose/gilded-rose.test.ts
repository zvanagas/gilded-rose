import {
  AGED_BRIE,
  BACKSTAGE_PASSES,
  CONJURED,
  SULFURAS,
} from './constants/items';
import { GildedRose, Item } from './gilded-rose';

describe('GildedRose:', () => {
  describe('Aged Brie:', () => {
    it('descreases sale date by `1`', () => {
      // Arrange
      const gildedRose = new GildedRose([
        { name: AGED_BRIE, sellIn: 4, quality: 2 },
      ]);

      // Act
      gildedRose.updateQuality();

      // Assert
      expect(gildedRose.items[0].sellIn).toBe(3);
    });

    it('increases in quality by `1` when sale date approaches', () => {
      const gildedRose = new GildedRose([
        { name: AGED_BRIE, sellIn: 4, quality: 2 },
      ]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(3);
    });

    it('increases in quality by `2` when sale date passes', () => {
      const gildedRose = new GildedRose([
        { name: AGED_BRIE, sellIn: 0, quality: 2 },
      ]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(4);
    });

    it('never increases quality past `50`', () => {
      const gildedRose = new GildedRose([
        { name: AGED_BRIE, sellIn: 10, quality: 50 },
      ]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(50);
    });
  });

  describe('Sulfuras:', () => {
    it('does not decreases sale date', () => {
      const gildedRose = new GildedRose([
        { name: SULFURAS, sellIn: 4, quality: 2 },
      ]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toBe(4);
    });

    it('never changes the quality', () => {
      const gildedRose = new GildedRose([new Item(SULFURAS, 4, 2)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(2);
    });
  });

  describe('Backstage passes:', () => {
    it('descreases sale date by `1`', () => {
      const gildedRose = new GildedRose([
        {
          name: BACKSTAGE_PASSES,
          sellIn: 4,
          quality: 2,
        },
      ]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toBe(3);
    });

    it('increases quality when there are more than `10` days', () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 12, 4)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(5);
    });

    it('increases quality by `2` when there are `10` days or less', () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 10, 2)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(4);
    });

    it('increases quality by `3` when there are `5` days or less', () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 5, 2)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(5);
    });

    it('decreases quality to `0` when sale date passes', () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 0, 2)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(0);
    });

    it('never increases quality past `50`', () => {
      const gildedRose = new GildedRose([
        {
          name: BACKSTAGE_PASSES,
          sellIn: 10,
          quality: 50,
        },
      ]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(50);
    });
  });

  describe('Conjured:', () => {
    it('descreases sale date by `1`', () => {
      const gildedRose = new GildedRose([
        {
          name: CONJURED,
          sellIn: 4,
          quality: 2,
        },
      ]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toBe(3);
    });

    it('decreases quality by `2` when sale date approaches', () => {
      const gildedRose = new GildedRose([
        {
          name: CONJURED,
          sellIn: 10,
          quality: 20,
        },
      ]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(18);
    });

    it('does not go below quality `0` when sale date passes', () => {
      const gildedRose = new GildedRose([
        {
          name: CONJURED,
          sellIn: 10,
          quality: 1,
        },
      ]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(0);
    });
  });

  describe('Default item:', () => {
    it('descreases sale date by `1`', () => {
      const gildedRose = new GildedRose([
        {
          name: 'Default item',
          sellIn: 4,
          quality: 2,
        },
      ]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toBe(3);
    });

    it('decreases quality when sale date approaches', () => {
      const gildedRose = new GildedRose([new Item('Default item', 10, 10)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(9);
    });

    it('decreases quality by `2` when sale date passes', () => {
      const gildedRose = new GildedRose([new Item('Default item', 0, 10)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(8);
    });

    it('never decreases quality past `0`', () => {
      const gildedRose = new GildedRose([new Item('Default item', 10, 0)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(0);
    });
  });

  it('updates quality correctly for all items', () => {
    const gildedRose = new GildedRose([
      new Item(AGED_BRIE, 4, 2),
      new Item(AGED_BRIE, 0, 2),
      new Item(SULFURAS, 4, 2),
      new Item(BACKSTAGE_PASSES, 12, 4),
      new Item(BACKSTAGE_PASSES, 10, 2),
      new Item(BACKSTAGE_PASSES, 5, 2),
      new Item(BACKSTAGE_PASSES, 0, 2),
      new Item('Random item', 10, 10),
      new Item('Random item', 0, 10),
    ]);
    const expected = [
      new Item(AGED_BRIE, 3, 3),
      new Item(AGED_BRIE, -1, 4),
      new Item(SULFURAS, 4, 2),
      new Item(BACKSTAGE_PASSES, 11, 5),
      new Item(BACKSTAGE_PASSES, 9, 4),
      new Item(BACKSTAGE_PASSES, 4, 5),
      new Item(BACKSTAGE_PASSES, -1, 0),
      new Item('Random item', 9, 9),
      new Item('Random item', -1, 8),
    ];

    gildedRose.updateQuality();

    expect(gildedRose.items).toEqual(expected);
  });
});
