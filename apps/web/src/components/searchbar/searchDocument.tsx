"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { IoDocumentText } from "react-icons/io5";

import { FaFolder } from "react-icons/fa6";
import { InputAdornment } from "@mui/material";
import { mockFillings, mockProjects } from "@/src/mock/data";
import { MockFilling, MockProject } from "@/src/mock/type";
import { autocompleteStyles } from "@/src/styles/autocompleteStype";

//MOCK DATA
const documents: MockFilling[] = mockFillings;

export default function SearchDocument() {
  const [value, setValue] = useState<MockFilling | undefined>(undefined);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="min-w-[40vw] max-w-full">
      <Autocomplete
        disablePortal
        noOptionsText="ไม่พบเอกสาร"
        value={value}
        options={documents}
        disableClearable
        onChange={(event, newValue) => {
          if (typeof newValue !== "string") {
            setValue(newValue);
          }
        }}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : `${option.code}     ${option.name}`
        }
        renderOption={(props, option) => (
          <li {...props}>
            <div className="px-2 w-full flex text-sm font-sukhumvit space-x-6">
              <IoDocumentText size={20} color="#747474" />
              <span>{option.code}</span>
              <span>{option.name}</span>
            </div>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ shrink: true }}
            placeholder="ค้นหาเอกสาร"
            InputProps={{
              ...params.InputProps,
              type: "search",
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
