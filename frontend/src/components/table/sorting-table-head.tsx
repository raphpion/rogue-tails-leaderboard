import { ArrowDown } from 'lucide-react';

import { Button } from '$components/ui/button';
import { TableHead } from '$components/ui/table';

type Props = {
  title: string;
  field: string;
  orderBy: string;
  onClick: (field: string) => void;
};

function SortingTableHead({ title, field, orderBy, onClick }: Props) {
  const Icon = field === orderBy ? ArrowDown : null;

  return (
    <TableHead>
      <Button variant='ghost' onClick={() => onClick(field)}>
        {title}
        {Icon && <Icon className='ml-2 h-4 w-4' />}
      </Button>
    </TableHead>
  );
}

export default SortingTableHead;
