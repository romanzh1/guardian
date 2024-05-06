export const INIT_PAGE_LIMIT = 10;
export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [
  {
    value: 5,
    label: '5',
  },
  {
    value: INIT_PAGE_LIMIT,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 99999,
    label: 'Все',
  },
];

export const SEARCH_DELAY_TIMEOUT = 300;

export const DEFAULT_KEYS = {
  id: 'id',
  name: 'name',
};

export const BOOLEAN_OPTIONS = [
  { id: 0, name: 'нет' },
  { id: 1, name: 'да' },
];
