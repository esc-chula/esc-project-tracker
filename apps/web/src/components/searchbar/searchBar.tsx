'use client';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { FaFolder } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';

import { InputAdornment } from '@mui/material';
import { autocompleteStyles } from '@/src/styles/autocompleteStype';
import { Project } from '@/src/interface/project';
import { Filing } from '@/src/interface/filing';

export default function SearchBar({
  placeholder,
  projects,
  filings,
  projectFunc,
  filingFunc,
  clearFunc,
}: {
  placeholder: string;
  projects: Project[];
  filings: Filing[];
  projectFunc?: (project: Project) => void;
  filingFunc?: (filing: Filing) => void;
  clearFunc?: () => void;
}) {
  const [value, setValue] = useState<Project | Filing | null>(null);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleSelect = (option: Project | Filing | null) => {
    setValue(option);
    if (option !== null) {
      setValue(option);
      if (projectFunc && 'reserveDate' in option) {
        projectFunc(option);
      } else if (filingFunc && 'filingCode' in option) {
        filingFunc(option);
      } else {
        console.log('No function to call');
      }
    } else {
      if (clearFunc) {
        clearFunc();
      }
    }
  };

  return (
    <div className="max-w-full">
      <Autocomplete
        value={value}
        options={[...filings, ...projects]}
        noOptionsText="ไม่พบข้อมูล"
        onChange={(event, newValue) => {
          handleSelect(newValue);
        }}
        getOptionLabel={(option) =>
          typeof option === 'string'
            ? option
            : `${'filingCode' in option ? option.projectCode + '-' + option.filingCode : option.projectCode}     ${option.name}`
        }
        renderOption={(props, option) => (
          <li {...props}>
            {/* <Link
              href={
                'reserveDate' in option
                  ? `/project/${option.id}`
                  : `/project/${option.projectId}/${option.id}`
              }
            > */}
            <div className="px-2 w-full flex text-sm font-sukhumvit space-x-6">
              {'reserveDate' in option ? (
                <FaFolder size={20} color="#747474" />
              ) : (
                <IoDocumentText size={20} color="#747474" />
              )}
              <span className="w-20">
                {'filingCode' in option
                  ? option.projectCode + '-' + option.filingCode
                  : option.projectCode}
              </span>
              <span>{option.name}</span>
            </div>
            {/* </Link> */}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ shrink: true }}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} strokeWidth={2} color="black" />
                </InputAdornment>
              ),
            }}
            sx={autocompleteStyles}
          />
        )}
      />
    </div>
  );
}
