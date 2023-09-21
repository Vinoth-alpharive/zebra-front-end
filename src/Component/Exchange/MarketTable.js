import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import tokenone from '../images/token-1.png'
import tokentwo from '../images/token-2.png'
import tokenthree from '../images/token-3.png'
import tokenfour from '../images/token-4.png'
import { Link } from 'react-router-dom';
import './MarketTable.css'

function createData(name, calories, fat, carbs, protein, image, action) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    image,
    action
  };
}

const rows = [
  createData('Cupcake', 'ARS$0.00025841', -3.7, -6.7, 'ARS$11,640.00M', tokenone),
  createData('Donut', 'ARS$0.00025841', 2.50, -5.1, 'ARS$11,640.00M', tokentwo),
  createData('Eclair', 'ARS$0.00025841', -1.60, 24, 'ARS$11,640.00M', tokenthree),
  createData('Frozen yoghurt', 'ARS$0.00025841', 6.0, -24.7, 'ARS$11,640.00M', tokenfour),
  createData('Gingerbread', 'ARS$0.00025841', -6.0, 14.9, 'ARS$11,640.00M', tokenone),
  createData('Honeycomb', 'ARS$0.00025841', -3.2, 28.7, 'ARS$11,640.00M', tokenone),
  createData('Ice cream sandwich', 'ARS$0.00025841', 9.0, 13.7, 'ARS$11,640.00M', tokentwo),
  createData('Jelly Bean', 'ARS$0.00025841', 0.1, 10.44, 'ARS$11,640.00M', tokenthree),
  createData('KitKat', 'ARS$0.00025841', -26.0, 65, 'ARS$11,640.00M', tokenfour),
  createData('Lollipop', 'ARS$0.00025841', 0.2, -9.8, 'ARS$11,640.00M', tokenone),
  createData('Marshmallow', 'ARS$0.00025841', 0, 81, 'ARS$11,640.00M', tokentwo),
  createData('Nougat', 'ARS$0.00025841', 19.0, 9, 'ARS$11,640.00M', tokenthree),
  createData('Oreo', 'ARS$0.00025841', -18.0, -6.3, 'ARS$11,640.00M', tokenfour),
  createData('Cupcake', 'ARS$0.00025841', -3.7, -6.7, 'ARS$11,640.00M', tokenone),
  createData('Donut', 'ARS$0.00025841', 2.50, -5.1, 'ARS$11,640.00M', tokentwo),
  createData('Eclair', 'ARS$0.00025841', -1.60, 24, 'ARS$11,640.00M', tokenthree),
  createData('Frozen yoghurt', 'ARS$0.00025841', 6.0, -24.7, 'ARS$11,640.00M', tokenfour),
  createData('Gingerbread', 'ARS$0.00025841', -6.0, 14.9, 'ARS$11,640.00M', tokenone),
  createData('Honeycomb', 'ARS$0.00025841', -3.2, 28.7, 'ARS$11,640.00M', tokenone),
  createData('Ice cream sandwich', 'ARS$0.00025841', 9.0, 13.7, 'ARS$11,640.00M', tokentwo),
  createData('Jelly Bean', 'ARS$0.00025841', 0.1, 10.44, 'ARS$11,640.00M', tokenthree),
  createData('KitKat', 'ARS$0.00025841', -26.0, 65, 'ARS$11,640.00M', tokenfour),
  createData('Lollipop', 'ARS$0.00025841', 0.2, -9.8, 'ARS$11,640.00M', tokenone),
  createData('Marshmallow', 'ARS$0.00025841', 0, 81, 'ARS$11,640.00M', tokentwo),
  createData('Nougat', 'ARS$0.00025841', 19.0, 9, 'ARS$11,640.00M', tokenthree),
  createData('Oreo', 'ARS$0.00025841', -18.0, -6.3, 'ARS$11,640.00M', tokenfour),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: '1h 4h 24h Change',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: '24h Volume',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Market Cap',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className='market-table-head-row'>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default function MarketTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className='body-table-contain-paper'>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer className='body-table-contain'>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            className='body-table'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        /> */}
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                      <div className='name-head-table'><img src={row.image}/>{row.name}</div>
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center" style={{color:`${row.fat < 0? '#ca492f' : '#23d886'}!important `}} > {row.fat}%</TableCell>
                      <TableCell align="center" style={{color:`${row.carbs < 0? '#ca492f' : '#23d886'}!important `}}>{row.carbs}M</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                      <TableCell align="center"><Link className='action-btn'>Detail</Link> <Link className='action-btn'>Trade</Link></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}