"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { FaFolder } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";

import { InputAdornment } from "@mui/material";
import { autocompleteStyles } from "@/src/styles/autocompleteStype";
import { ProjectType, DocumentType, FilingType } from "../../../../shared/type";

//MOCK DATA
//const projects: ProjectType[] = ProjectTypes;
//const fillings: FilingType[] = FilingTypes;

export default function SearchBar({
  placeholder,
  projects,
  fillings,
  projectFunc,
  fillingFunc,
}: {
  placeholder: string;
  projects: ProjectType[];
  fillings: FilingType[];
  projectFunc: (project: ProjectType | FilingType) => any;
  fillingFunc: (filling: ProjectType | FilingType) => any;
}) {
  const [value, setValue] = useState<ProjectType | FilingType | null>(null);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleSelect = (option: ProjectType | FilingType | null) => {
    setValue(option);
    if (option !== null) {
      setValue(option);
      if (option.objectType == "project") {
        projectFunc(option);
      } else if (option.objectType == "filling") {
        fillingFunc(option);
      }
    }
  };

  return (
    <div className="min-w-[40vw] max-w-full">
      <Autocomplete
        value={value}
        options={[...fillings, ...projects]}
        noOptionsText="ไม่พบข้อมูล"
        onChange={(event, newValue) => handleSelect(newValue)}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : `${option.code}     ${option.name}`
        }
        renderOption={(props, option) => (
          <li {...props}>
            <div className="px-2 w-full flex text-sm font-sukhumvit space-x-6">
              {option.objectType == "filling" ? (
                <IoDocumentText size={20} color="#747474" />
              ) : (
                <FaFolder size={20} color="#747474" />
              )}
              <span className="w-20">{option.code}</span>
              <span>{option.name}</span>
            </div>
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
