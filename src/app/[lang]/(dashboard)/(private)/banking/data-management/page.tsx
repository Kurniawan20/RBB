'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import CircularProgress from '@mui/material/CircularProgress'

// We'll use Remix icons instead of Material UI icons to match the project's styling

const DataManagementPage = () => {
  // States
  const [tabValue, setTabValue] = useState('1')
  const [dataSource, setDataSource] = useState('core-banking')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('5')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  
  // Available years and months for filtering
  const years = ['2021', '2022', '2023', '2024', '2025']
  
  const months = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' }
  ]

  // Data sources
  const dataSources = [
    { value: 'core-banking', label: 'Core Banking' },
    { value: 'lbu-antasena', label: 'LBU/ANTASENA' },
    { value: 'manual-input', label: 'Input Manual' }
  ]

  // Sample data for import history
  const importHistory = [
    { id: 1, source: 'Core Banking', dataType: 'Neraca', year: '2025', month: 'Mei', importDate: '2025-05-01', status: 'Success' },
    { id: 2, source: 'LBU/ANTASENA', dataType: 'Laba Rugi', year: '2025', month: 'April', importDate: '2025-04-15', status: 'Success' },
    { id: 3, source: 'Manual Input', dataType: 'Kredit/Pembiayaan', year: '2025', month: 'Maret', importDate: '2025-03-20', status: 'Success' },
    { id: 4, source: 'Core Banking', dataType: 'Dana Pihak Ketiga', year: '2025', month: 'Februari', importDate: '2025-02-10', status: 'Failed' },
    { id: 5, source: 'LBU/ANTASENA', dataType: 'Neraca', year: '2024', month: 'Desember', importDate: '2025-01-05', status: 'Success' }
  ]

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile) {
      setErrorMessage('Silakan pilih file terlebih dahulu')
      setUploadError(true)
      return
    }

    setIsUploading(true)
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setUploadSuccess(true)
      setSelectedFile(null)
      
      // Reset file input
      const fileInput = document.getElementById('file-upload')
      if (fileInput) {
        fileInput.value = ''
      }
    }, 2000)
  }

  // Handle close snackbar
  const handleCloseSnackbar = () => {
    setUploadSuccess(false)
    setUploadError(false)
  }

  // Handle edit mode
  const handleEditMode = () => {
    setIsEditing(!isEditing)
  }

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return dateString
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Manajemen Data' 
            subheader='Import dan kelola data realisasi bulanan dari Core Banking dan LBU/ANTASENA'
            action={
              <Button 
                variant='contained' 
                color='primary' 
                startIcon={<i className='ri-refresh-line' />}
                onClick={() => {}}
              >
                Refresh Data
              </Button>
            }
          />
          <CardContent>
            <TabContext value={tabValue}>
              <Box sx={{ mb: 4 }}>
                <TabList 
                  onChange={handleTabChange} 
                  aria-label='data management tabs'
                  variant='scrollable'
                  scrollButtons='auto'
                  sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                >
                  <Tab label='Import Data' value='1' />
                  <Tab label='Riwayat Import' value='2' />
                  <Tab label='Input Manual' value='3' />
                </TabList>
              </Box>
              <Divider />
              
              {/* Import Data Tab */}
              <TabPanel value='1'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 4, 
                        mb: 4, 
                        borderRadius: 2,
                        backgroundColor: theme => theme.palette.background.default
                      }}
                    >
                      <Typography variant='h6' sx={{ mb: 4 }}>Import Data dari Sistem External</Typography>
                      
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth>
                            <InputLabel id='data-source-label'>Sumber Data</InputLabel>
                            <Select
                              labelId='data-source-label'
                              value={dataSource}
                              label='Sumber Data'
                              onChange={(e) => setDataSource(e.target.value)}
                            >
                              {dataSources.map(source => (
                                <MenuItem key={source.value} value={source.value}>{source.label}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} md={3}>
                          <TextField
                            select
                            fullWidth
                            label='Tahun'
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          >
                            {years.map(year => (
                              <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        
                        <Grid item xs={12} md={3}>
                          <TextField
                            select
                            fullWidth
                            label='Bulan'
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                          >
                            {months.map(month => (
                              <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        
                        <Grid item xs={12} md={3}>
                          <Button
                            variant='outlined'
                            component='label'
                            fullWidth
                            startIcon={<i className='ri-file-upload-line' />}
                            sx={{ height: '56px' }}
                          >
                            {selectedFile ? selectedFile.name : 'Pilih File'}
                            <input
                              id='file-upload'
                              type='file'
                              hidden
                              accept='.xlsx,.csv,.json'
                              onChange={handleFileSelect}
                            />
                          </Button>
                        </Grid>
                      </Grid>
                      
                      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant='contained'
                          color='primary'
                          startIcon={isUploading ? <CircularProgress size={20} color='inherit' /> : <i className='ri-upload-cloud-2-line' />}
                          onClick={handleUpload}
                          disabled={isUploading || !selectedFile}
                        >
                          {isUploading ? 'Mengupload...' : 'Upload Data'}
                        </Button>
                      </Box>
                    </Paper>
                    
                    <Alert severity='info' sx={{ mb: 4 }}>
                      <AlertTitle>Informasi Format Data</AlertTitle>
                      <Typography variant='body2'>
                        Format file yang didukung: Excel (.xlsx), CSV (.csv), atau JSON (.json).<br />
                        Pastikan data memiliki format yang sesuai dengan template yang telah ditentukan.
                      </Typography>
                      <Button 
                        variant='text' 
                        color='info' 
                        sx={{ mt: 1 }}
                        onClick={() => {}}
                      >
                        Download Template
                      </Button>
                    </Alert>
                    
                    <Alert severity='warning'>
                      <AlertTitle>Perhatian</AlertTitle>
                      <Typography variant='body2'>
                        Data yang diimport akan menggantikan data yang sudah ada untuk periode yang sama.<br />
                        Pastikan data yang diimport sudah benar dan lengkap.
                      </Typography>
                    </Alert>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* Import History Tab */}
              <TabPanel value='2'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ backgroundColor: theme => theme.palette.primary.light }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>No</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Sumber Data</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Jenis Data</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Tahun</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Bulan</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Tanggal Import</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Aksi</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {importHistory.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell>{row.id}</TableCell>
                              <TableCell>{row.source}</TableCell>
                              <TableCell>{row.dataType}</TableCell>
                              <TableCell>{row.year}</TableCell>
                              <TableCell>{row.month}</TableCell>
                              <TableCell>{formatDate(row.importDate)}</TableCell>
                              <TableCell>
                                <Box
                                  sx={{
                                    backgroundColor: row.status === 'Success' ? 'success.light' : 'error.light',
                                    color: row.status === 'Success' ? 'success.dark' : 'error.dark',
                                    py: 0.5,
                                    px: 1.5,
                                    borderRadius: 1,
                                    display: 'inline-block'
                                  }}
                                >
                                  {row.status}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <IconButton color='primary'>
                                  <i className='ri-edit-line' style={{ fontSize: '1.2rem' }} />
                                </IconButton>
                                <IconButton color='error'>
                                  <i className='ri-delete-bin-line' style={{ fontSize: '1.2rem' }} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* Manual Input Tab */}
              <TabPanel value='3'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 4, 
                        mb: 4, 
                        borderRadius: 2,
                        backgroundColor: theme => theme.palette.background.default
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant='h6'>Input Data Manual</Typography>
                        <Box>
                          {isEditing ? (
                            <>
                              <Button 
                                variant='contained' 
                                color='success' 
                                startIcon={<i className='ri-save-line' />}
                                sx={{ mr: 2 }}
                                onClick={() => setIsEditing(false)}
                              >
                                Simpan
                              </Button>
                              <Button 
                                variant='outlined' 
                                color='error' 
                                startIcon={<i className='ri-close-circle-line' />}
                                onClick={() => setIsEditing(false)}
                              >
                                Batal
                              </Button>
                            </>
                          ) : (
                            <Button 
                              variant='contained' 
                              color='primary' 
                              startIcon={<i className='ri-edit-line' />}
                              onClick={handleEditMode}
                            >
                              Edit Data
                            </Button>
                          )}
                        </Box>
                      </Box>
                      
                      <Grid container spacing={4} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={4}>
                          <TextField
                            select
                            fullWidth
                            label='Jenis Data'
                            value='neraca'
                            disabled={!isEditing}
                          >
                            <MenuItem value='neraca'>Neraca</MenuItem>
                            <MenuItem value='laba-rugi'>Laba Rugi</MenuItem>
                            <MenuItem value='kredit'>Kredit/Pembiayaan</MenuItem>
                            <MenuItem value='dpk'>Dana Pihak Ketiga</MenuItem>
                          </TextField>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                          <TextField
                            select
                            fullWidth
                            label='Tahun'
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            disabled={!isEditing}
                          >
                            {years.map(year => (
                              <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                          <TextField
                            select
                            fullWidth
                            label='Bulan'
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            disabled={!isEditing}
                          >
                            {months.map(month => (
                              <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      
                      <Divider sx={{ my: 4 }} />
                      
                      <Typography variant='subtitle1' sx={{ mb: 3 }}>Data Neraca - {months.find(m => m.value === month)?.label} {year}</Typography>
                      
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                          <Typography variant='subtitle2' sx={{ mb: 2 }}>Aset</Typography>
                          <TextField
                            fullWidth
                            label='Kas'
                            type='number'
                            value='1250000000'
                            InputProps={{ readOnly: !isEditing }}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label='Penempatan pada Bank Indonesia'
                            type='number'
                            value='5600000000'
                            InputProps={{ readOnly: !isEditing }}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label='Penempatan pada Bank Lain'
                            type='number'
                            value='3200000000'
                            InputProps={{ readOnly: !isEditing }}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label='Kredit yang Diberikan'
                            type='number'
                            value='15700000000'
                            InputProps={{ readOnly: !isEditing }}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label='Pembiayaan Syariah'
                            type='number'
                            value='3200000000'
                            InputProps={{ readOnly: !isEditing }}
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <Typography variant='subtitle2' sx={{ mb: 2 }}>Liabilitas & Ekuitas</Typography>
                          <TextField
                            fullWidth
                            label='Giro'
                            type='number'
                            value='4200000000'
                            InputProps={{ readOnly: !isEditing }}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label='Tabungan'
                            type='number'
                            value='8500000000'
                            InputProps={{ readOnly: !isEditing }}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label='Deposito'
                            type='number'
                            value='6000000000'
                            InputProps={{ readOnly: !isEditing }}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label='Modal Disetor'
                            type='number'
                            value='5000000000'
                            InputProps={{ readOnly: !isEditing }}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label='Laba Ditahan'
                            type='number'
                            value='2400000000'
                            InputProps={{ readOnly: !isEditing }}
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Success Snackbar */}
      <Snackbar
        open={uploadSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
          Data berhasil diupload!
        </Alert>
      </Snackbar>
      
      {/* Error Snackbar */}
      <Snackbar
        open={uploadError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
          {errorMessage || 'Terjadi kesalahan saat mengupload data.'}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default DataManagementPage
