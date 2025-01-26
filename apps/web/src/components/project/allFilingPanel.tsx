'use client';
import AllFilingCard from './allFilingCard';
import SelectType from '../filter/selectType';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { FilingType } from '@/src/interface/filing';
import {
  statusFilingItems,
  typeFilingItems,
} from '@/src/constant/filterFiling';

export default function AllFilingPanel({
  filings,
  setFilings,
}: {
  filings: FilingType[];
  setFilings: Dispatch<SetStateAction<FilingType[]>>;
}) {
  const [filteredFilings, setFilteredFilings] = useState<FilingType[]>(filings);
  const [status, setStatus] = useState<string>('ALL');
  const [type, setType] = useState<string>('ALL');

  useEffect(() => {
    if (status === 'ALL' && type === 'ALL') {
      setFilteredFilings(filings);
    } else if (status === 'ALL') {
      setFilteredFilings(
        filings.filter((filing) => filing.type.toString() === type),
      );
    } else if (type === 'ALL') {
      setFilteredFilings(filings.filter((filing) => filing.status === status));
    } else {
      setFilteredFilings(
        filings.filter(
          (filing) =>
            filing.status === status && filing.type.toString() === type,
        ),
      );
    }
  }, [status, type, filings]);

  return (
    <div className="space-y-5 pt-5 pb-10">
      <div className="flex flex-row space-x-5">
        <SelectType
          title="สถานะ"
          items={statusFilingItems}
          sendValue={(value) => {
            setStatus(value);
          }}
        />
        <SelectType
          title="ประเภท"
          items={typeFilingItems}
          sendValue={(value) => {
            setType(value);
          }}
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-col-2 gid-row-2 gap-x-4 gap-y-4 pr-8">
        {filteredFilings.map((filing) => (
          <AllFilingCard
            key={filing.id}
            filingId={filing.id}
            projectCode={filing.projectCode}
            filingCode={filing.filingCode}
            filingName={filing.name}
            filingStatus={filing.status}
            projectId={filing.projectId}
            deleteThisCardFunc={(id: string) => {
              setFilings((prevFilings) =>
                prevFilings.filter((prevFiling) => prevFiling.id !== id),
              );
            }}
            updateThisCardFunc={(id: string, newName: string) => {
              setFilings((prevFilings) =>
                prevFilings.map((prevFiling) =>
                  prevFiling.id === id
                    ? { ...prevFiling, name: newName }
                    : prevFiling,
                ),
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
