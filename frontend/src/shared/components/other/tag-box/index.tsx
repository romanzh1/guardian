import React, { memo } from 'react';
import { Chip, Stack } from '@mui/material';
import { Tag } from 'src/api/types';

type Props = {
  tags?: Array<Tag>;
};
export const TagBox = memo(({ tags }: Props) => {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      {tags &&
        tags.map(item => (
          <Chip
            key={item.id}
            label={item.name}
            size="small"
            sx={{ background: item.color, color: 'white', borderRadius: '4px' }}
            variant="filled"
          />
        ))}
    </Stack>
  );
});
