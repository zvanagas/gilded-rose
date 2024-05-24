import {
  DEFAULT_MAXIMUM_QAULITY,
  DEFAULT_MINIMUM_QUALITY,
} from './constants/default-limit';
import { AGED_BRIE, BACKSTAGE_PASSES, SULFURAS } from './constants/items';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(
    name: Item['name'],
    sellIn: Item['sellIn'],
    quality: Item['quality']
  ) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality(): Item[] {
    for (const item of this.items) {
      switch (item.name) {
        case AGED_BRIE: {
          this.updateAgedBrieQuality(item);
          this.decreaseDays(item);
          break;
        }
        case SULFURAS: {
          break;
        }
        case BACKSTAGE_PASSES: {
          this.updateBackstagePassesQuality(item);
          this.decreaseDays(item);
          break;
        }
        default: {
          this.updateDefaultItemQuality(item);
          this.decreaseDays(item);
        }
      }
    }

    return this.items;
  }

  private updateAgedBrieQuality(item: Item): void {
    item.quality = this.getMinValueWithRestrictions(
      item.quality + (item.sellIn ? 1 : 2)
    );
  }

  private updateBackstagePassesQuality(item: Item): void {
    let quality = item.quality;

    if (item.sellIn <= 0) {
      quality = 0;
    } else if (item.sellIn <= 5) {
      quality += 3;
    } else if (item.sellIn <= 10) {
      quality += 2;
    } else {
      quality += 1;
    }

    item.quality = this.getMinValueWithRestrictions(quality);
  }

  private updateDefaultItemQuality(item: Item): void {
    item.quality = this.getMaxValueWithRestrictions(
      item.quality - (item.sellIn ? 1 : 2)
    );
  }

  private getMinValueWithRestrictions(value: number) {
    return Math.min(value, DEFAULT_MAXIMUM_QAULITY);
  }

  private getMaxValueWithRestrictions(value: number) {
    return Math.max(DEFAULT_MINIMUM_QUALITY, value);
  }

  private decreaseDays(item: Item): void {
    item.sellIn -= 1;
  }
}
