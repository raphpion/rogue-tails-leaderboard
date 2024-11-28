import { Skeleton } from '$components/ui/skeleton';
import { TableCell, TableRow } from '$components/ui/table';
import type { HiscoresData } from '$types';
import { COLUMNS, SKELETON_ROWS } from './constants';

type Props = {
  data: HiscoresData | undefined;
  isLoading: boolean;
};

function View({ data, isLoading }: Props) {
  if (isLoading) {
    return Array.from({ length: SKELETON_ROWS }).map((_, i) => (
      <TableRow key={i}>
        {Array.from({ length: COLUMNS }).map((_, j) => (
          <TableCell key={j}>
            <Skeleton className='h-[14px] w-full' />
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  if (!data || data.items.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={COLUMNS} className='text-center'>
          There are currently no hiscores.
        </TableCell>
      </TableRow>
    );
  }

  return data.items.map((hiscore, i) => {
    const medalSrc = (() => {
      if (i === 0) return '/medal_gold.png';
      if (i === 1) return '/medal_silver.png';
      if (i === 2) return '/medal_bronze.png';

      return undefined;
    })();

    return (
      <TableRow key={i}>
        <TableCell>{i + 1}</TableCell>
        <TableCell className='flex gap-2 items-center font-semibold'>
          {medalSrc && <img src={medalSrc} alt={`medal rank ${i + 1}`} />}
          {hiscore.name}
        </TableCell>
        <TableCell>{hiscore.floor_reached}</TableCell>
        <TableCell>{hiscore.cards_earned}</TableCell>
        <TableCell>{hiscore.animals_freed}</TableCell>
        <TableCell>{hiscore.coins_earned}</TableCell>
        <TableCell>{hiscore.dmg_dealt}</TableCell>
        <TableCell>{hiscore.dmg_taken}</TableCell>
        <TableCell>{hiscore.combats_lost}</TableCell>
        <TableCell>{hiscore.left_clicks}</TableCell>
      </TableRow>
    );
  });
}

export default View;
