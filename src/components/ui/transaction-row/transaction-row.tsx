import React, { useState } from "react";
import styles from "./transaction-row.module.scss";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

type TransactionRowProps = {
  title?: string;
  type: string;
  date: string;
  amount: string;
  eventTitle: string;
  referenceCode: string;
  orderItemsCount: number;
  status: string;
  text?: string;
  active?: boolean;
};

export function TransactionRow({
  title,
  text,
  eventTitle,
  referenceCode,
  orderItemsCount,
  amount,
  date,
  status,
  type,
  active,
}: TransactionRowProps) {
  const [open, setOpen] = useState(false);

  const transactionType =
    type === "SPRAY MONEY"
      ? `${styles["transaction-type"]}`
      : `${styles["transaction-type"]} ${styles["transaction-streampass"]}`;

  const orderItemDisplaySuffix =
    orderItemsCount > 1 ? "Items in order" : "Item in order";

  const orderItemCountDisplay =
    `${orderItemsCount}` + " " + orderItemDisplaySuffix;

  return (
    <React.Fragment>
      <TableRow style={{ borderBottom: ".3px solid rgba(230, 225, 225, 0.286)" }}>
        <TableCell className={styles["table-cell"]} component="th" scope="row">
          <div className={transactionType}>{type}</div>
        </TableCell>
        <TableCell className={styles["table-cell"]} align="left">
          {date}
        </TableCell>
        <TableCell className={styles["table-cell"]} align="left">
          {eventTitle}
        </TableCell>

        <TableCell className={styles["table-cell"]} align="left">
          {orderItemCountDisplay}
        </TableCell>
        <TableCell className={styles["table-cell"]} align="left">
          {formatCurrency(amount)}
        </TableCell>
        <TableCell className={styles["table-cell"]} align="left">
          {status === "SUCCESS" && (
            <IoIosCheckmarkCircle
              className={styles["transaction-status__success"]}
            />
          )}

          {status === "PENDING" && <IoIosCheckmarkCircle />}

          {status === "FAILED" && (
            <IoIosCheckmarkCircle
              className={styles["transaction-status__failed"]}
            />
          )}
        </TableCell>
        <TableCell className={styles["table-cell"]}>
          <IconButton
            aria-label="expand row"
            size="small"
            className={styles["table-cell"]}
            onClick={() => setOpen(!open)}
          >
            {open ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <div className={styles["more-details"]}>
                <div className={styles["details-container"]}>
                  <p>TRANSACTION ID: </p>
                  <p> {referenceCode}</p>
                </div>

                <div className={styles["details-container"]}>
                  <p>TRANSACTION BREAKDOWN:</p>
                  <p>{eventTitle}</p>
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );

  function formatCurrency(inputValue: any) {
    const rawValue = inputValue.replace(/\D/g, "");
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "₦ " + formattedValue;
  }
}
