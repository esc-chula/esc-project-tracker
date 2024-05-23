"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { FaFolder } from "react-icons/fa6";
import { InputAdornment } from "@mui/material";

const top100Films: Film[] = [
  { title: "The Shawshank Redemption", year: "1994", filmId: "555" },
  { title: "The Godfather", year: "1972", filmId: "555s" },
  { title: "The Godfather: Part II", year: "1974", filmId: "555d" },
  { title: "The Dark Knight", year: "2008", filmId: "555f" },
  { title: "12 Angry Men", year: "1957", filmId: "555g" },
  { title: "Schindler's List", year: "1993", filmId: "555h" },
  { title: "Pulp Fiction", year: "1994", filmId: "555j" },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: "2003",
    filmId: "555k",
  },
];

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
    <div>
      <Autocomplete
        freeSolo
        value={value}
        options={top100Films}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : `${option.title}     ${option.year}`
        }
        disableClearable
        renderOption={(props, option) => (
          <li {...props} className="flex flex-row px-5 space-x-10">
            <FaFolder size={20} color="#747474" style={{ marginRight: 10 }} />
            <span>{option.title}</span>
            <span style={{ marginLeft: "auto", color: "gray" }}>
              {option.year}
            </span>
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
                  fontWeight: "bold",
                },
              },
            }}
          />
        )}
      />
    </div>
  );
}
