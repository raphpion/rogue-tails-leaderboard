import { Fragment } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
};

function HiscoresPagination({ page, hasPreviousPage, hasNextPage, onPageChange }: Props) {
  return (
    <Fragment>
      <p className='mb-2'>Page {page}</p>
      <div className='flex gap-2'>
        <Button className='px-2.5' disabled={!hasPreviousPage} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft size={16} />
        </Button>
        <Button className='px-2.5' disabled={!hasNextPage} onClick={() => onPageChange(page + 1)}>
          <ChevronRight size={16} />
        </Button>
      </div>
    </Fragment>
  );
}

export default HiscoresPagination;
