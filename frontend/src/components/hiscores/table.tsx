import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import type { HiscoresData } from '$types';
import { SortingTableHead } from '../table';
import View from './View';

type Props = {
  data: HiscoresData | undefined;
  isLoading: boolean;
  orderBy: string;
  onOrderByChange: (field: string) => void;
};

export const COLUMNS = 10;

function HiscoresTable({ data, isLoading, orderBy, onOrderByChange }: Props) {
  return (
    <Table className='text-center'>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <SortingTableHead title='Floor reached' field='floor_reached' orderBy={orderBy} onClick={onOrderByChange} />
          <SortingTableHead title='Cards earned' field='cards_earned' orderBy={orderBy} onClick={onOrderByChange} />
          <SortingTableHead title='Animals freed' field='animals_freed' orderBy={orderBy} onClick={onOrderByChange} />
          <SortingTableHead title='Coins earned' field='coins_earned' orderBy={orderBy} onClick={onOrderByChange} />
          <SortingTableHead title='Damage dealt' field='dmg_dealt' orderBy={orderBy} onClick={onOrderByChange} />
          <SortingTableHead title='Damage taken' field='dmg_taken' orderBy={orderBy} onClick={onOrderByChange} />
          <SortingTableHead title='Combats lost' field='combats_lost' orderBy={orderBy} onClick={onOrderByChange} />
          <SortingTableHead title='Left clicks' field='left_clicks' orderBy={orderBy} onClick={onOrderByChange} />
        </TableRow>
      </TableHeader>
      <TableBody>
        <View data={data} isLoading={isLoading} />
      </TableBody>
    </Table>
  );
}

export default HiscoresTable;
