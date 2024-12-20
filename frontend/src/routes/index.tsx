import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { HiscoresData, type HiscoreSearchParams } from '$types';
import { HiscoresPagination, HiscoresTable } from '$components/hiscores';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/')({
  component: HomeComponent,
  validateSearch: (search: Record<string, unknown>): HiscoreSearchParams => ({
    page: Number(search.page) || 1,
    orderBy: (search.orderBy as HiscoreSearchParams['orderBy']) || 'floor_reached',
  }),
});

function HomeComponent() {
  const navigate = useNavigate();
  const { page, orderBy } = Route.useSearch();
  const { data, isLoading } = useQuery<HiscoresData>({
    queryKey: ['hiscores', { page, orderBy }],
    queryFn: () => fetch(`/api/hiscores?orderBy=${orderBy}&page=${page}`).then(res => res.json()),
    refetchInterval: 3000,
  });

  const handleOrderByChange = (orderBy: string) => {
    navigate({
      search: { orderBy, page: 1 } as any,
    });
  };

  const handlePageChange = (page: number) => navigate({ search: { page } as any });

  return (
    <div className='px-6 py-8'>
      <div className='flex items-center gap-2 mb-6'>
        <img src='/favicon.png' width={42} />
        <h1 className='text-3xl font-bold'>Rogue Tails Leaderboard</h1>
      </div>
      <HiscoresTable data={data} isLoading={isLoading} orderBy={orderBy} onOrderByChange={handleOrderByChange} />
      <HiscoresPagination
        page={Number(data?.page || page)}
        hasPreviousPage={Boolean(data?.hasPreviousPage)}
        hasNextPage={Boolean(data?.hasNextPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
