// Main CSV utilities coordination file
export {
  // Export functions
  exportToCSV,
  exportStudentsCSV,
  exportFacultyCSV,
  exportOperationsCSV,
  exportOutreachCSV,
  exportAdminCSV,
  exportFilteredData,
  exportSummaryCSV,
  downloadCSVFile,
  formatCSVValue,
  getNestedValue
} from './csvExport';

export {
  // Import functions
  importFromCSV,
  parseCSVContent,
  validateImportData,
  validateImportFile,
  readFileContent,
  setNestedValue
} from './csvImport';

export {
  // Template functions
  generateCSVTemplate,
  downloadCSVTemplate,
  downloadAllTemplates,
  downloadValidationRules,
  downloadFieldMapping
} from './csvTemplates';

export {
  // Constants
  STUDENT_CSV_HEADERS,
  FACULTY_CSV_HEADERS,
  OPERATIONS_CSV_HEADERS,
  OUTREACH_CSV_HEADERS,
  ADMIN_CSV_HEADERS,
  DATA_TYPE_HEADERS,
  FIELD_DISPLAY_NAMES,
  REQUIRED_FIELDS,
  VALIDATION_RULES
} from './csvConstants';

export type {
  ValidationError,
  ImportResult
} from './csvImport';

// Convenience functions for common operations
export const quickExport = (data: any[], filename: string, type?: 'students' | 'faculty' | 'operations' | 'outreach' | 'admin') => {
  switch (type) {
    case 'students':
      return exportStudentsCSV(data, filename);
    case 'faculty':
      return exportFacultyCSV(data, filename);
    case 'operations':
      return exportOperationsCSV(data, filename);
    case 'outreach':
      return exportOutreachCSV(data, filename);
    case 'admin':
      return exportAdminCSV(data, filename);
    default:
      return exportToCSV(data, filename);
  }
};

export const quickImport = async (file: File, type: 'students' | 'faculty' | 'operations' | 'outreach' | 'admin') => {
  return await importFromCSV(file, type);
};

export const quickTemplate = (type: 'students' | 'faculty' | 'operations' | 'outreach' | 'admin', withSample = true) => {
  return downloadCSVTemplate(type, withSample);
};

// Data processing utilities
export const processImportResult = (result: ImportResult) => {
  const { success, data, errors, warnings, summary } = result;
  
  console.log(`Import Summary:
    Total Rows: ${summary.totalRows}
    Valid Rows: ${summary.validRows}
    Error Rows: ${summary.errorRows}
    Success Rate: ${((summary.validRows / summary.totalRows) * 100).toFixed(1)}%
  `);
  
  if (errors.length > 0) {
    console.warn('Import Errors:', errors);
  }
  
  if (warnings.length > 0) {
    console.warn('Import Warnings:', warnings);
  }
  
  return {
    isValid: success,
    processedData: data,
    errorCount: errors.length,
    warningCount: warnings.length,
    successRate: (summary.validRows / summary.totalRows) * 100
  };
};

// Batch processing utilities
export const processBatchImport = async (files: File[], type: 'students' | 'faculty' | 'operations' | 'outreach' | 'admin') => {
  const results = [];
  
  for (const file of files) {
    try {
      const result = await quickImport(file, type);
      results.push({
        filename: file.name,
        ...processImportResult(result)
      });
    } catch (error) {
      results.push({
        filename: file.name,
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        processedData: [],
        errorCount: 1,
        warningCount: 0,
        successRate: 0
      });
    }
  }
  
  return results;
};

// Data transformation utilities
export const transformDataForExport = (data: any[], transformations: Record<string, (value: any) => any>) => {
  return data.map(item => {
    const transformed = { ...item };
    Object.entries(transformations).forEach(([field, transformer]) => {
      if (field in transformed) {
        transformed[field] = transformer(transformed[field]);
      }
    });
    return transformed;
  });
};

// Common transformations
export const COMMON_TRANSFORMATIONS = {
  formatDate: (date: string | Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-IN');
  },
  
  formatCurrency: (amount: number) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  },
  
  formatBoolean: (value: boolean) => {
    return value ? 'Yes' : 'No';
  },
  
  formatArray: (array: any[]) => {
    if (!Array.isArray(array)) return '';
    return array.join('; ');
  },
  
  formatPhone: (phone: string) => {
    if (!phone) return '';
    // Format as +91 XXXXX XXXXX
    return phone.replace(/(\+91)(\d{5})(\d{5})/, '$1 $2 $3');
  }
};