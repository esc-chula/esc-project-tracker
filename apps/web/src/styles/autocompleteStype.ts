export const autocompleteStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "100px",
    transition: "border-radius 0.1s",
    border: "none",
    outline: "none",
    backgroundColor: "#E3E3E3",
    fontFamily: "var(--sukhumvit-set-font)",
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
};
