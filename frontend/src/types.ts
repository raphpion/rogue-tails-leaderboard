export type PaginatedData<T> = {
  ipp: number;
  page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
};

export type Hiscore = {
  name: string;
  floor_reached: number;
  cards_earned: number;
  animals_freed: number;
  coins_earned: number;
  dmg_dealt: number;
  dmg_taken: number;
  combats_lost: number;
  left_clicks: number;
};

export type HiscoresData = PaginatedData<Hiscore>;

export type HiscoreSearchParams = {
  orderBy: string;
  page: number;
};
