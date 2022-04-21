import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Checkbox } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import transactions from '../src/data.json';

interface updateValueProps {
  name: string;
  value: any;
  id: number
};

interface handleChangeProps {
  event: any,
  index: number,
  id: number
};

interface deleteRowProps {
  id: number
};

interface editProps {
  id: number,
  index: number
};

function App() {
  const [transactionsData, setTransactions] = useState(transactions);
  const updateValue = (updateValueProps) => {
    let data;
    if (updateValueProps.name === 'email') {
      data = transactionsData.map(obj =>
        obj.id === updateValueProps.id ? { ...obj, "email": updateValueProps.value.target.value } : obj
      ) 
    } else if(updateValueProps.name === 'name') {
      data = transactionsData.map(obj =>
        obj.id === updateValueProps.id ? { ...obj, "name": updateValueProps.value.target.value } : obj
      )
    };
    setTransactions(data);
  };
  const handleChange = (handleChangeProps) => {
    const data = transactionsData.map(obj =>
        obj.id === handleChangeProps.id ?
          { ...obj, "complete": handleChangeProps.index !== -1, "isEditable": handleChangeProps.index } :
           obj
    );
    setTransactions(data);
  };
  const deleteRow = (deleteRowProps) => {
    setTransactions(transactionsData.filter(object => {
        return object.id !== deleteRowProps.id;
    }));
  };
  const addRow = () => {
    const data = {
        "id": 0,
        "name": "",
        "email": "",
        "adderss": "",
        "transaction_date": "2022-04-22T00:00:00.000Z	",
        "amount": 0,
        "points": 0,
        "isEditable": false,
        "complete": false
    };
    transactionsData.splice(transactionsData.length, 0, data);
    setTransactions(transactionsData);
  }
  const editFields = (editProps) => {
    const data = transactionsData.map(obj =>
      obj.id === editProps.id ?
        { ...obj, "isEditable": !obj.isEditable } :
         obj
  );
  }
  return (
    <React.Fragment>
      <h2>Transaction Table</h2>
      <TableContainer component={Paper} style={{ padding: 20 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ border: 1 }}>
            <TableRow sx={{ border: 1 }}>
              <TableCell align="right" sx={{ border: 1 }}>Id</TableCell>
              <TableCell align="right" sx={{ border: 1 }}>Date</TableCell>
              <TableCell align="right" sx={{ border: 1 }}>Name</TableCell>
              <TableCell align="right" sx={{ border: 1 }}>Email</TableCell>
              <TableCell align="right" sx={{ border: 1 }}>Delete</TableCell>
              <TableCell align="right" sx={{ border: 1 }}>Edit</TableCell>
              <TableCell align="right" sx={{ border: 1 }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionsData.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ border: 2 }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right" sx={{ border: 1 }}>
                  {/* {row.name} */}
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    value={row.name}
                    disabled={row.isEditable}
                    onChange={(event) => updateValue({name: 'name', value: event, id: row.id})}
                  />
                </TableCell>
                <TableCell align="right" sx={{ border: 1 }}>{row.transaction_date}</TableCell>
                <TableCell align="right" sx={{ border: 1 }}>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    value={row.email}
                    disabled={row.isEditable}
                    onChange={(event) => updateValue({name: 'email', value: event, id: row.id})}
                  />
                </TableCell>
                <TableCell align="right" sx={{ border: 1 }}>
                  <Button
                    onClick={() => deleteRow({id: row.id})}
                    disabled={row.isEditable}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
                <TableCell align="right" sx={{ border: 1 }}>
                  <Button 
                    disabled={row.isEditable}
                    onClick={() => editFields({id: row.id})}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Checkbox
                  checked={row.complete}
                  onChange={(e, ind) => handleChange({event: e, index: ind, id: row.id})}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => addRow()}>Add Row</Button>
    </React.Fragment>
  );
}

export default App;
