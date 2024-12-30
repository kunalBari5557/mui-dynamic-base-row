import React, { useState } from "react";
import {
    Checkbox,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const RowSelect = () => {
    const [rows, setRows] = useState([
        { id: 1, name: "Row1", selected: true },
        { id: 2, name: "Row2", selected: false },
        { id: 3, name: "Row3", selected: false },
        { id: 4, name: "Row4", selected: false },
        { id: 5, name: "Row5", selected: false },
        { id: 6, name: "Row6", selected: false },
    ]);

    const [baseRow, setBaseRow] = useState("Row1");

    const handleRowSelection = (id) => {
        const updatedRows = rows.map((row) =>
            row.id === id ? { ...row, selected: !row.selected } : row
        );
        setRows(updatedRows);

        const selectedRows = updatedRows.filter((row) => row.selected);

        if (selectedRows.length > 0) {
            if (!selectedRows.some((row) => row.name === baseRow)) {
                setBaseRow(selectedRows[0].name);
            }
        } else {
            setBaseRow("");
        }
    };

    const handleBaseRowChange = (event) => {
        setBaseRow(event.target.value);
    };

    return (
        <div>
            <h1>Row Select Task</h1>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Select Rows</strong></TableCell>
                            <TableCell><strong>Base Row</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={row.selected}
                                        onChange={() => handleRowSelection(row.id)}
                                    />
                                    {row.name}
                                </TableCell>

                                <TableCell>
                                    {row.selected && (
                                        <Select
                                            value={baseRow}
                                            onChange={handleBaseRowChange}
                                            displayEmpty
                                            style={{ width: "100%" }}
                                        >
                                            {rows
                                                .filter((row) => row.selected)
                                                .map((selectedRow) => (
                                                    <MenuItem key={selectedRow.id} value={selectedRow.name}>
                                                        {selectedRow.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default RowSelect;
