import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import React, { useState } from 'react'
import UserService from '../../../Services/UserService';
import { User } from '../../../types/models/User.model';

interface props {
    tableData: User[]
}

const PaginatedUserTable = ({tableData}:props) => {
    const [page, setPage] = useState(0);
    const fetchData = (pageNumber:number) => {
        UserService.getAllUsers()
    };
    
    const tableHeaders: any[] = [
        "id",
        "email",
        "first name",
        "last name",
        "roles"
    ];
    
    return (
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.slice(page * 10, page * 10 + 10).map((row) => (
                <TableRow key={row.id}>
                  {/* TODO: define table cells here */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          count={tableData.length}
          page={page}
          rowsPerPage={10}
          onPageChange={(event, newPage) => {
            setPage(newPage);
            fetchData(newPage + 1);
          }}
        />
        {/* <TablePagination
          count={tableData.length}
          page={page}
          rowsPerPage={10}
          onChangePage={(event, newPage) => {
            setPage(newPage);
            fetchData(newPage + 1);
          }}
        /> */}
      </div>
    )
}

export default PaginatedUserTable