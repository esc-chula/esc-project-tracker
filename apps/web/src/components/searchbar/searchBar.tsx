"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { FaFolder } from "react-icons/fa6";
import { InputAdornment } from "@mui/material";
import { mockProjects } from "@/src/mock/data";
import { MockProject } from "@/src/mock/type";
import { autocompleteStyles } from "@/src/styles/autocompleteStype";

//MOCK DATA
const projects: MockProject[] = mockProjects;

export default function SearchBar() {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="min-w-[40vw] max-w-full">
      <Autocomplete
        freeSolo
        value={value}
        options={mockProjects}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : `${option.code}     ${option.name}`
        }
        disableClearable
        renderOption={(props, option) => (
          <li
            {...props}
            className="flex flex-row px-3 py-1 space-x-4 hover:cursor-default hover:bg-gray-100 text-sm font-sukhumvit"
          >
            <FaFolder size={20} color="#747474" style={{ marginRight: 2 }} />
            <span>{option.code}</span>
            <span>{option.name}</span>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ shrink: true }}
            placeholder="ค้นหาโครงการหรือเอกสาร"
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
