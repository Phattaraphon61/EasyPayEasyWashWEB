import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format, getDate } from 'date-fns';
import { getData ,updatestatus} from "../../api/api";
import { Upload as UploadIcon } from '../../icons/upload';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Tabs,
  Tab,
  TableContainer,
  Paper,
  styled,
  NativeSelect,
  tableCellClasses,
  FormControl,
  InputLabel,
  InputBase,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { width } from '@mui/system';
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  textAlign: 'center',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};
const columns = [
  {
    id: 'name',
    label: 'ชื่อ',
    minWidth: 170
  },
  {
    id: 'number',
    label: 'เลขบัญชี',
    minWidth: 100
  },
  {
    id: 'bank',
    label: 'ธนาคาร',
    minWidth: 170,
    // align: 'right',

  },
  {
    id: 'total',
    label: 'จำนวนเงิน',
    minWidth: 170,
    // align: 'right',

  },
  {
    id: 'status',
    label: 'สถานะ',
    minWidth: 170,
    // align: 'right',
  },
  {
    id: 'id',
    label: 'ยืนยัน',
    minWidth: 170,
    // align: 'right',
  },
];

function createData(name, number, bank, total, status, id) {
  return { name, number, bank, total, status, id };
}

const rows = [
  createData('ภัทรพล ผิวเรือง', '4078580533', 'ไทยพาณิชย์', "30001", "wait", 1),
  createData('ภัทรพล ผิวเรือง', '4078580533', 'ไทยพาณิชย์', "30002", "wait", 2),
  createData('ภัทรพล ผิวเรือง', '4078580533', 'ไทยพาณิชย์', "30003", "wait", 3),
];

export const CustomerListResults = ({ customers, ...rest }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [checkbtn, setCheckbtn] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState("");
  const [rejectdata, setRejectdata] = useState();
  const [value, setValue] = useState(0);


  useEffect(() => {
    getDatafromserver()
  }, []);

  const getDatafromserver = () => {
    setData([])
    const datasend = {
      status: "wait"
    }
    getData(datasend).then((res) => {
      console.log(res.data)
      res.data.map((t) => {
        console.log(t)
        setData(c => [...c, createData(t.bank.name, t.bank.number, t.bank.bank, t.amount, t.status, t.id)])
      })
    })
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };
  const updateItem = (id, whichvalue, newvalue) => {
    let index = data.findIndex(x => x.id === id);
    if (index !== -1) {
      let temporaryarray = data.slice();
      temporaryarray[index][whichvalue] = newvalue;
      setData(temporaryarray);
    }
    else {
      console.log('no match');
    }
  }
  const sendDatas = (datas) => {
    console.log(datas.status)
    setData(data.filter(item => item.id !== datas.id));
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            กรอกรายละเอียด
          </Typography>
          <TextField id="outlined-basic" sx={{ mt: 2, width: "100%" }} label="กรอกรายละเอียด" variant="outlined" onChange={(e) => setDetail(e.target.value)} />
          <Box sx={{ mt: 2 }}>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                setOpen(false)
              }}
            >
              ยกเลิก
            </Button>   <Button
              color="success"
              variant="contained"
              onClick={() => {
                console.log(detail)
                setOpen(false)
                sendDatas(rejectdata)
              }}
            >
              ยืนยัน
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >

        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setCheckbtn([])
              getDatafromserver()
            }}
          >
            รีโหลดข้อมูล
          </Button>
          {/* <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Export
        </Button> */}
          {/* <NextLink
          href="/customers"
        >
          <Button
            color="primary"
            variant="contained"
          >
            รีโหลดข้อมูล
          </Button>
        </NextLink> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          {/* <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="id"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent> */}
        </Card>
      </Box>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

              <Table stickyHeader aria-label="sticky table">
                <TableHead >
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>

                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow>
                          <TableCell>
                            {row.name}
                          </TableCell>
                          <TableCell>
                            {row.number}
                          </TableCell>
                          <TableCell>
                            {row.bank}
                          </TableCell>
                          <TableCell>
                            {row.total}
                          </TableCell>
                          <TableCell>
                            <FormControl key={row.id}>
                              <NativeSelect
                                input={<BootstrapInput />}
                                defaultValue={row.status}
                                onChange={(e) => {
                                  // console.log(e.target.value, row);\
                                  if (e.target.value == 'rejected') {
                                    setOpen(true)
                                    setRejectdata(row)
                                  }
                                  if (!checkbtn.includes(row.id)) {
                                    setCheckbtn(c => [...c, row.id])
                                  }
                                  if (e.target.value == 'wait') {
                                    setCheckbtn([
                                      ...checkbtn.slice(0, checkbtn.indexOf(row.id)),
                                      ...checkbtn.slice(checkbtn.indexOf(row.id) + 1)
                                    ]);
                                  }
                                  updateItem(row.id, 'status', e.target.value)

                                }}
                              >
                                <option value={'wait'}>wait</option>
                                <option value={'approve'}>approve</option>
                                <option value={'rejected'}>rejected</option>
                              </NativeSelect>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <Button variant="outlined" size="medium" disabled={!checkbtn.includes(row.id)} onClick={() => sendDatas(row)}>
                              ยืนยัน
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                      // return (
                      //   <TableRow>
                      //     {columns.map((column, index) => {
                      //       const value = row[column.id];
                      //       return (
                      //         <TableCell key={column.id}>
                      //           {column.id == 'id' ? <Button variant="outlined" size="medium" disabled={!checkbtn.includes(value)}>
                      //             ยืนยัน
                      //           </Button> : null}
                      //           {status.includes(value) ? <FormControl>
                      //             <NativeSelect
                      //               input={<BootstrapInput />}
                      //               defaultValue={value}
                      //               onChange={(e) => {
                      //                 console.log(e.target.value, value);
                      //                 setCheckbtn(c=>[...c,])
                      //               }}
                      //             >
                      //               <option value={'wait'}>wait</option>
                      //               <option value={'approve'}>approve</option>
                      //               <option value={'rejected'}>rejected</option>
                      //             </NativeSelect>
                      //           </FormControl>

                      //             : value}
                      //         </TableCell>
                      //       );
                      //     })}
                      //   </TableRow>
                      // );
                    })}
                </TableBody>
              </Table>

            </Paper>
            {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel> */}
            {/* <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                  </TableCell>
                  <TableCell>
                    {customer.phone}
                  </TableCell>
                  <TableCell>
                    {format(customer.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          </Box>
        </PerfectScrollbar>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
      </Card>
    </div>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}