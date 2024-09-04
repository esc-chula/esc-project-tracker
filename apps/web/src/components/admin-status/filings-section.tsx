import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import FilingTab from './filing-tab';

export default function FilingsSection() {
  return (
    <div className="h-full w-[40vw] pl-15 overflow">
      <FilingTab />
    </div>
  );
}
