import { CSV_CONFIG, DATA_TYPE_HEADERS, FIELD_DISPLAY_NAMES } from './csvConstants';

// Helper function to get nested object values
export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      const value = current[key];
      // Handle arrays by joining with semicolons
      if (Array.isArray(value)) {
        return value.join('; ');
      }
      return value;
    }
    return '';
  }, obj);
};

// Format CSV value for proper escaping
export const formatCSVValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  const stringValue = String(value);
  
  // Handle values with commas, quotes, or newlines
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
};

// Generate CSV content from data array
export const generateCSVContent = (data: any[], headers: string[]): string => {
  if (!data.length) {
    return '';
  }

  // Create display headers
  const displayHeaders = headers.map(header => 
    FIELD_DISPLAY_NAMES[header] || header
  );

  // Create CSV content
  const csvContent = [
    displayHeaders.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = getNestedValue(row, header);
        return formatCSVValue(value);
      }).join(',')
    )
  ].join('\n');

  return csvContent;
};

// Main export function
export const exportToCSV = (
  data: any[], 
  filename: string, 
  dataType?: keyof typeof DATA_TYPE_HEADERS,
  customHeaders?: string[]
) => {
  if (!data.length) {
    console.warn('No data to export');
    return;
  }

  // Determine headers to use
  let headers: string[];
  if (customHeaders) {
    headers = customHeaders;
  } else if (dataType && DATA_TYPE_HEADERS[dataType]) {
    headers = DATA_TYPE_HEADERS[dataType];
  } else {
    // Generate headers from first object
    headers = Object.keys(data[0]);
  }

  // Generate CSV content
  const csvContent = generateCSVContent(data, headers);
  
  // Add BOM for Excel compatibility
  const bomChar = CSV_CONFIG.bom ? '\uFEFF' : '';
  const finalContent = bomChar + csvContent;

  // Create and download file
  downloadCSVFile(finalContent, filename);
};

// Create and trigger file download
export const downloadCSVFile = (content: string, filename: string) => {
  const blob = new Blob([content], { 
    type: 'text/csv;charset=utf-8;' 
  });

  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
};

// Export functions for specific data types
export const exportStudentsCSV = (students: any[], filename = 'students') => {
  exportToCSV(students, filename, 'students');
};

export const exportFacultyCSV = (faculty: any[], filename = 'faculty') => {
  exportToCSV(faculty, filename, 'faculty');
};

export const exportOperationsCSV = (operations: any[], filename = 'operations_staff') => {
  exportToCSV(operations, filename, 'operations');
};

export const exportOutreachCSV = (outreach: any[], filename = 'outreach_staff') => {
  exportToCSV(outreach, filename, 'outreach');
};

export const exportAdminCSV = (admin: any[], filename = 'admin_staff') => {
  exportToCSV(admin, filename, 'admin');
};

// Export filtered data with custom filtering
export const exportFilteredData = (
  data: any[],
  filters: Record<string, any>,
  filename: string,
  dataType?: keyof typeof DATA_TYPE_HEADERS
) => {
  const filteredData = data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // Skip empty filters
      
      const itemValue = getNestedValue(item, key);
      
      if (Array.isArray(value)) {
        return value.includes(itemValue);
      }
      
      if (typeof value === 'string') {
        return itemValue?.toString().toLowerCase().includes(value.toLowerCase());
      }
      
      return itemValue === value;
    });
  });

  exportToCSV(filteredData, `${filename}_filtered`, dataType);
  return filteredData.length;
};

// Export summary statistics
export const exportSummaryCSV = (data: any[], summaryFields: string[], filename: string) => {
  const summary = summaryFields.map(field => {
    const values = data.map(item => getNestedValue(item, field)).filter(v => v !== null && v !== '');
    
    return {
      field: FIELD_DISPLAY_NAMES[field] || field,
      total_records: data.length,
      non_empty_records: values.length,
      unique_values: new Set(values).size,
      sample_values: Array.from(new Set(values)).slice(0, 5).join('; ')
    };
  });

  exportToCSV(summary, `${filename}_summary`);
};