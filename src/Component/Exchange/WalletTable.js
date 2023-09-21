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
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import './WalletTable.css'

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
  createData('Cupcake', 0.0000000, 0.0000000, 0.0000000, 0.0000000, tokenone),
  createData('Donut', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokentwo),
  createData('Eclair', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenthree),
  createData('Frozen yoghurt', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenfour),
  createData('Gingerbread', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenone),
  createData('Honeycomb', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenone),
  createData('Ice cream sandwich', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokentwo),
  createData('Jelly Bean', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenthree),
  createData('KitKat', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenfour),
  createData('Lollipop', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenone),
  createData('Marshmallow', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokentwo),
  createData('Nougat', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenthree),
  createData('Oreo', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenfour),
  createData('Cupcake', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenone),
  createData('Donut', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokentwo),
  createData('Eclair', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenthree),
  createData('Frozen yoghurt', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenfour),
  createData('Gingerbread', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenone),
  createData('Honeycomb', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenone),
  createData('Ice cream sandwich', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokentwo),
  createData('Jelly Bean', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenthree),
  createData('KitKat', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenfour),
  createData('Lollipop', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenone),
  createData('Marshmallow', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokentwo),
  createData('Nougat', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenthree),
  createData('Oreo', 0.0000000, 0.0000000, 0.0000000,0.0000000, tokenfour),
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
    label: 'Coin',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Available',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'In Order',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'BTC Value',
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

const useStyles = makeStyles({

  searchboxwallet:{
    background :'transparent !important',
    border: '1px solid rgb(86 84 84)',
    marginBottom:'30px',
    color: '#fff',
    '& input': {
      color: '#fff',
    },
    '& button': {
      color: '#fff',
    }
  }

});



export default function WalletTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const classes = useStyles();

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
    
   <>

  <Paper className={classes.searchboxwallet}
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search Google Maps"
      inputProps={{ 'aria-label': 'search google maps' }}
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>


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
                      <TableCell align="center" style={{color:`${row.fat < 0? '#ca492f' : '#23d886'}!important `}} > {row.fat}</TableCell>
                      <TableCell align="center" style={{color:`${row.carbs < 0? '#ca492f' : '#23d886'}!important `}}>{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                      <TableCell align="center"><Link to='/deposit-crypto' className='action-btn'>Deposit</Link> <Link to='/withdraw-crypto' className='action-btn'>Withdraw</Link> <Link className='action-btn'>Trade</Link></TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
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

    </>
  );
}