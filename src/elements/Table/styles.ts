import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: any) => ({
  wrapper: {
    width: "100%",
    display: "flex",
    "& .table-container": {
      alignItems: "stretch",
      width: "100%",
    },
    "& .rs-table": {
      borderRadius: "0.4em",
    },
    "& .rs-table-row-header": {
      "& .rs-table-cell": {
        background: theme.palette.secondary.dark,
        "& div": {
          color: "#fff",
          fontWeight: 700,
        }
      }
    },
    "& .rs-table-row-header.rs-table-row:hover": {
        background: "#0d0d0e",
        "& .rs-table-cell, .rs-table-cell-group": {
          background: "#413c69",
          "& div": {
            color: "#fff",
            fontWeight: 700,
          }
        }
      }
  },
}));
