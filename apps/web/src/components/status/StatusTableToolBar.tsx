import { InputAdornment, TextField } from "@mui/material"
import { Search } from "lucide-react"
import { Table } from "@tanstack/react-table"
import { FilingType } from "@/src/interface/filing"
import { filterStatus } from "@/src/styles/enumMap"
import { DataTableFacetedFilter } from "./StatusTableFacetedFilter"

export default function StatusTableToolBar({ table }: { table: Table<FilingType> }) {
  return (
    <div className="flex items-center py-4 gap-4">
      <TextField
        InputLabelProps={{ shrink: true }}
        placeholder="รหัสเอกสาร"
        value={table.getColumn("รหัสเอกสาร")?.getFilterValue() as string}
        onChange={(event) => table.getColumn("รหัสเอกสาร")?.setFilterValue(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} strokeWidth={2} color="black" />
            </InputAdornment>
          ),
        }}
        className="w-full"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "100px",
            transition: "border-radius 0.1s",
            fontFamily: "var(--sukhumvit-set-font)",
            backgroundColor: "#e3e3e3",
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
              backgroundColor: "#FFFFFF",
              transition: "background-color 0.3s",
              boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
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
      <DataTableFacetedFilter
        column={table.getColumn("status")}
        title="สถานะ"
        options={filterStatus.filter((status) => status.value !== "all")}
      />
    </div>
  )
}
