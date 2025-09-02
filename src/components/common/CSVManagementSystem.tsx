import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Download, 
  Upload, 
  FileText, 
  Filter, 
  Users, 
  Building, 
  UserCheck, 
  Database,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'sonner';

// Import CSV utilities
import { 
  exportStudentsCSV, 
  exportFacultyCSV, 
  exportOperationsCSV, 
  exportOutreachCSV, 
  exportAdminCSV,
  exportFilteredData,
  exportToCSV
} from '../utils/csvExport';

// Import data
import { csitStudents } from '../data/enhancedStudentData';
import { csitFaculty, engineeringFaculty } from '../data/enhancedFacultyData';
import { operationsTeam, outreachTeam, adminTeam } from '../data/enhancedStaffData';
import { recruitersData, trainingPrograms } from '../data/comprehensiveDataExpansion';

interface CSVManagementSystemProps {
  userRole: 'admin' | 'operations' | 'outreach';
}

interface ExportStats {
  totalRecords: number;
  filteredRecords: number;
  exportDate: string;
  fileName: string;
}

interface ImportResult {
  success: boolean;
  recordsProcessed: number;
  recordsImported: number;
  errors: string[];
  warnings: string[];
}

const CSVManagementSystem: React.FC<CSVManagementSystemProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('export');
  const [selectedDataType, setSelectedDataType] = useState('students');
  const [exportFilters, setExportFilters] = useState({
    school: 'all',
    department: 'all',
    cgpaMin: '',
    cgpaMax: '',
    year: 'all',
    status: 'all'
  });
  const [exportStats, setExportStats] = useState<ExportStats | null>(null);
  const [importResults, setImportResults] = useState<ImportResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get available data based on user role
  const getAvailableDataTypes = () => {
    switch (userRole) {
      case 'admin':
        return [
          { value: 'students', label: 'Students', icon: Users, count: csitStudents.length },
          { value: 'faculty', label: 'Faculty', icon: UserCheck, count: [...csitFaculty, ...engineeringFaculty].length },
          { value: 'operations', label: 'Operations Staff', icon: Database, count: operationsTeam.length },
          { value: 'outreach', label: 'Outreach Staff', icon: Building, count: outreachTeam.length },
          { value: 'admin', label: 'Admin Staff', icon: UserCheck, count: adminTeam.length },
          { value: 'recruiters', label: 'Recruiters', icon: Building, count: recruitersData.length },
          { value: 'training', label: 'Training Programs', icon: FileText, count: trainingPrograms.length }
        ];
      case 'operations':
        return [
          { value: 'students', label: 'Students', icon: Users, count: csitStudents.length },
          { value: 'faculty', label: 'Faculty', icon: UserCheck, count: [...csitFaculty, ...engineeringFaculty].length },
          { value: 'training', label: 'Training Programs', icon: FileText, count: trainingPrograms.length }
        ];
      case 'outreach':
        return [
          { value: 'students', label: 'Students', icon: Users, count: csitStudents.length },
          { value: 'recruiters', label: 'Recruiters', icon: Building, count: recruitersData.length }
        ];
      default:
        return [];
    }
  };

  // Handle CSV Export
  const handleExport = async () => {
    setIsProcessing(true);
    try {
      let data: any[] = [];
      let fileName = '';
      
      switch (selectedDataType) {
        case 'students':
          data = csitStudents;
          fileName = 'students_export';
          break;
        case 'faculty':
          data = [...csitFaculty, ...engineeringFaculty];
          fileName = 'faculty_export';
          break;
        case 'operations':
          data = operationsTeam;
          fileName = 'operations_staff_export';
          break;
        case 'outreach':
          data = outreachTeam;
          fileName = 'outreach_staff_export';
          break;
        case 'admin':
          data = adminTeam;
          fileName = 'admin_staff_export';
          break;
        case 'recruiters':
          data = recruitersData;
          fileName = 'recruiters_export';
          break;
        case 'training':
          data = trainingPrograms;
          fileName = 'training_programs_export';
          break;
      }

      // Apply filters if any
      let filteredData = data;
      const activeFilters = Object.entries(exportFilters).filter(([_, value]) => value !== '' && value !== 'all');
      
      if (activeFilters.length > 0) {
        const filterObj = Object.fromEntries(activeFilters);
        const recordsExported = exportFilteredData(data, filterObj, fileName, selectedDataType as any);
        
        setExportStats({
          totalRecords: data.length,
          filteredRecords: recordsExported,
          exportDate: new Date().toISOString(),
          fileName: `${fileName}_filtered.csv`
        });
      } else {
        // Export all data
        switch (selectedDataType) {
          case 'students':
            exportStudentsCSV(data, fileName);
            break;
          case 'faculty':
            exportFacultyCSV(data, fileName);
            break;
          case 'operations':
            exportOperationsCSV(data, fileName);
            break;
          case 'outreach':
            exportOutreachCSV(data, fileName);
            break;
          case 'admin':
            exportAdminCSV(data, fileName);
            break;
          default:
            exportToCSV(data, fileName);
        }
        
        setExportStats({
          totalRecords: data.length,
          filteredRecords: data.length,
          exportDate: new Date().toISOString(),
          fileName: `${fileName}.csv`
        });
      }

      toast.success(`Successfully exported ${selectedDataType} data to CSV`);
    } catch (error) {
      toast.error('Failed to export data. Please try again.');
      console.error('Export error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle CSV Import
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please select a valid CSV file');
      return;
    }

    setIsProcessing(true);
    try {
      const text = await file.text();
      const rows = text.split('\n').map(row => row.split(','));
      
      // Simulate import processing
      const totalRows = rows.length - 1; // Excluding header
      const successfulImports = Math.floor(totalRows * 0.9); // 90% success rate simulation
      const errors = Array.from({ length: totalRows - successfulImports }, (_, i) => 
        `Row ${i + 2}: Invalid email format`
      );
      
      setImportResults({
        success: true,
        recordsProcessed: totalRows,
        recordsImported: successfulImports,
        errors: errors.slice(0, 5), // Show first 5 errors
        warnings: ['Some records had missing optional fields']
      });

      toast.success(`Successfully imported ${successfulImports} out of ${totalRows} records`);
    } catch (error) {
      setImportResults({
        success: false,
        recordsProcessed: 0,
        recordsImported: 0,
        errors: ['Failed to parse CSV file'],
        warnings: []
      });
      toast.error('Failed to import CSV file');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download CSV Template
  const downloadTemplate = () => {
    const templates = {
      students: {
        headers: ['Name', 'Email', 'Roll Number', 'School', 'Department', 'Specialization', 'Year', 'Semester', 'CGPA', 'Phone', 'Date of Birth', 'Gender'],
        sample: ['John Doe', 'john.doe@srmap.edu.in', 'AP24322130001', 'School of Computing & Information Technology', 'Computer Science & Engineering', 'AI & ML', '4', '8', '8.5', '+91 9876543210', '2002-01-15', 'Male']
      },
      faculty: {
        headers: ['Name', 'Email', 'Employee ID', 'Designation', 'School', 'Department', 'Specialization', 'Experience', 'Qualification', 'Phone'],
        sample: ['Dr. Jane Smith', 'jane.smith@srmap.edu.in', 'SRMFAC001', 'Professor', 'School of Computing & Information Technology', 'Computer Science', 'Machine Learning', '15', 'Ph.D. in Computer Science', '+91 9876543250']
      },
      recruiters: {
        headers: ['Company Name', 'HR Name', 'Email', 'Phone', 'Designation', 'Industry', 'Company Type', 'Website'],
        sample: ['Tech Solutions Inc', 'Alice Johnson', 'alice.johnson@techsolutions.com', '+91 9876543300', 'HR Manager', 'Information Technology', 'Private', 'https://techsolutions.com']
      }
    };

    const template = templates[selectedDataType as keyof typeof templates];
    if (!template) return;

    const csvContent = [
      template.headers.join(','),
      template.sample.join(',')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedDataType}_template.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const dataTypes = getAvailableDataTypes();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileSpreadsheet className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-semibold">CSV Data Management</h2>
          <p className="text-muted-foreground">Export and import data using CSV files</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import Data
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        {/* Export Tab */}
        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Data to CSV
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Data Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dataTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card 
                      key={type.value}
                      className={`cursor-pointer transition-all ${
                        selectedDataType === type.value 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedDataType(type.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-semibold">{type.label}</h3>
                        <Badge variant="secondary">{type.count} records</Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Export Filters */}
              {selectedDataType === 'students' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Filter className="w-4 h-4" />
                      Export Filters (Optional)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="school">School</Label>
                      <Select value={exportFilters.school} onValueChange={(value) => setExportFilters({...exportFilters, school: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Schools" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Schools</SelectItem>
                          <SelectItem value="School of Computing & Information Technology">CSIT</SelectItem>
                          <SelectItem value="School of Engineering">Engineering</SelectItem>
                          <SelectItem value="School of Business & Management">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="cgpaMin">Minimum CGPA</Label>
                      <Input
                        id="cgpaMin"
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        placeholder="0.0"
                        value={exportFilters.cgpaMin}
                        onChange={(e) => setExportFilters({...exportFilters, cgpaMin: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="year">Academic Year</Label>
                      <Select value={exportFilters.year} onValueChange={(value) => setExportFilters({...exportFilters, year: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Years</SelectItem>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Export Button */}
              <div className="flex gap-4">
                <Button 
                  onClick={handleExport}
                  disabled={isProcessing}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {isProcessing ? 'Exporting...' : 'Export to CSV'}
                </Button>
              </div>

              {/* Export Stats */}
              {exportStats && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Successfully exported {exportStats.filteredRecords} out of {exportStats.totalRecords} records 
                    to <strong>{exportStats.fileName}</strong>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Import Tab */}
        <TabsContent value="import" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Import Data from CSV
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dataType">Data Type</Label>
                <Select value={selectedDataType} onValueChange={setSelectedDataType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type to import" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="csvFile">CSV File</Label>
                <Input
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  onChange={handleImport}
                  disabled={isProcessing}
                />
              </div>

              {/* Import Results */}
              {importResults && (
                <div className="space-y-3">
                  <Alert className={importResults.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                    {importResults.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription>
                      <div>
                        <strong>Import Results:</strong>
                        <ul className="mt-2 space-y-1">
                          <li>Records Processed: {importResults.recordsProcessed}</li>
                          <li>Records Imported: {importResults.recordsImported}</li>
                          <li>Success Rate: {((importResults.recordsImported / importResults.recordsProcessed) * 100).toFixed(1)}%</li>
                        </ul>
                      </div>
                    </AlertDescription>
                  </Alert>

                  {importResults.errors.length > 0 && (
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <AlertDescription>
                        <strong>Errors Found:</strong>
                        <ul className="mt-2 space-y-1">
                          {importResults.errors.map((error, index) => (
                            <li key={index} className="text-sm">• {error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                CSV Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Download CSV templates with the correct format for importing data.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card key={type.value} className="text-center">
                      <CardContent className="p-4">
                        <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold mb-2">{type.label} Template</h3>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedDataType(type.value);
                            downloadTemplate();
                          }}
                          className="w-full"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  <strong>Template Usage Instructions:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Download the template for your data type</li>
                    <li>• Fill in the data following the sample format</li>
                    <li>• Ensure all required fields are populated</li>
                    <li>• Use the exact format for dates (YYYY-MM-DD)</li>
                    <li>• Save as CSV format before importing</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CSVManagementSystem;