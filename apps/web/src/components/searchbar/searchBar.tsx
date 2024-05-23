"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { FaFolder } from "react-icons/fa6";
import { InputAdornment } from "@mui/material";
import { mockProjects } from "@/src/mock/data";
import { MockProject } from "@/src/mock/type";

//MOCK DATA
const projects: MockProject[] = mockProjects;

interface Film {
  title: string;
  year: string;
  filmId: string;
}

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
          <li {...props} className="flex flex-row px-5 space-x-10 mb-3">
            <FaFolder size={20} color="#747474" style={{ marginRight: 10 }} />
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "100px",
                transition: "border-radius 0.1s",
                border: "none",
                outline: "none",
                backgroundColor: "#E3E3E3",
                paddingLeft: "16px",
                boxShadow: "none",
                height: "40px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&.Mui-focused": {
                  borderRadius: "10px",
                  borderBottomRightRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  backgroundColor: "#FFFFFF",
                  transition: "background-color 0.3s",
                  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E3E3E3",
                    borderBottomColor: "#747474",
                  },
                },
                "& input::placeholder": {
                  color: "gray",
                  opacity: 1,
                  fontWeight: "semibold",
                  fontSize: "14px",
                },
              },
            }}
          />
        )}
      />
    </div>
  );
}
