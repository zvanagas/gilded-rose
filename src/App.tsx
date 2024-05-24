import { useState } from 'react';
import './App.css';
import { GildedRose, Item } from './lib/gilded-rose/gilded-rose';
import {
  AGED_BRIE,
  BACKSTAGE_PASSES,
  CONJURED,
  SULFURAS,
} from './lib/gilded-rose/constants/items';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import { Button } from './components/ui/button';

function App() {
  const [items, setItems] = useState<Item[]>([
    new Item(AGED_BRIE, 4, 2),
    new Item(SULFURAS, 4, 2),
    new Item(BACKSTAGE_PASSES, 15, 2),
    new Item(CONJURED, 4, 10),
  ]);

  const gildedRose = new GildedRose(items);

  const handleUpdate = () => {
    const updatedItems = gildedRose.updateQuality();
    setItems([...updatedItems]);
  };

  const renderItems = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Sell In</TableHead>
          <TableHead>Quality</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gildedRose.items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.sellIn}</TableCell>
            <TableCell>{item.quality}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex flex-col gap-4 items-center">
      {renderItems()}
      <Button onClick={handleUpdate}>Advance by one day</Button>
    </div>
  );
}

export default App;
