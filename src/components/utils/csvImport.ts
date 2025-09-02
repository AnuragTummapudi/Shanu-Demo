import { REQUIRED_FIELDS, VALIDATION_RULES, FIELD_DISPLAY_NAMES } from './csvConstants';

export interface ValidationError {
  row: number;
  field: string;
  value: any;
  message: string;
}

export interface ImportResult {
  success: boolean;
  data: any[];
  errors: ValidationError[];
  warnings: string[];
  summary: {
    totalRows: number;
    validRows: number;
    errorRows: number;
    processedRows: number;
  };
}

// Parse CSV content into array of objects
export const parseCSVContent = (content: string): any[] => {
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    throw new Error('CSV must contain at least a header row and one data row');
  }

  const headers = parseCSVLine(lines[0]);
  const data: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    if (values.length === 0) continue; // Skip empty lines
    
    const row: any = {};
    headers.forEach((header, index) => {
      const cleanHeader = header.trim();
      const value = values[index]?.trim() || '';
      
      // Convert display names back to field names
      const fieldName = getFieldNameFromDisplay(cleanHeader) || cleanHeader;
      
      // Handle nested objects
      if (fieldName.includes('.')) {
        setNestedValue(row, fieldName, value);
      } else {
        row[fieldName] = value;
      }
    });
    
    data.push(row);
  }

  return data;
};

// Parse a single CSV line handling quotes and commas
export const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i += 2;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current);
      current = '';
      i++;
    } else {
      current += char;
      i++;
    }
  }

  result.push(current);
  return result;
};

// Set nested object value
export const setNestedValue = (obj: any, path: string, value: any) => {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  const finalKey = keys[keys.length - 1];
  
  // Handle special data types
  if (path.includes('skills') || path.includes('responsibilities') || path.includes('systemAccess')) {
    // Convert semicolon-separated strings to arrays
    current[finalKey] = value ? value.split(';').map((s: string) => s.trim()).filter(Boolean) : [];
  } else if (path.includes('isActive') || path.includes('isRegistered')) {
    // Convert to boolean
    current[finalKey] = value.toLowerCase() === 'true' || value === '1';
  } else if (path.includes('year') || path.includes('semester') || path.includes('experience') || 
             path.includes('percentage') || path.includes('cgpa') || path.includes('annualIncome')) {
    // Convert to number
    current[finalKey] = value ? parseFloat(value) : null;
  } else {
    current[finalKey] = value;
  }
};

// Get field name from display name
export const getFieldNameFromDisplay = (displayName: string): string | null => {
  const entry = Object.entries(FIELD_DISPLAY_NAMES).find(([_, display]) => display === displayName);
  return entry ? entry[0] : null;
};

// Validate data according to rules
export const validateImportData = (
  data: any[], 
  dataType: keyof typeof REQUIRED_FIELDS
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const requiredFields = REQUIRED_FIELDS[dataType] || [];

  data.forEach((row, index) => {
    const rowNumber = index + 2; // +2 because index is 0-based and we skip header

    // Check required fields
    requiredFields.forEach(field => {
      const value = getNestedValue(row, field);
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors.push({
          row: rowNumber,
          field,
          value,
          message: `Required field '${FIELD_DISPLAY_NAMES[field] || field}' is missing or empty`
        });
      }
    });

    // Email validation
    if (row.email && !VALIDATION_RULES.email.test(row.email)) {
      errors.push({
        row: rowNumber,
        field: 'email',
        value: row.email,
        message: 'Invalid email format'
      });
    }

    // Phone validation
    if (row.phone && !VALIDATION_RULES.phone.test(row.phone)) {
      errors.push({
        row: rowNumber,
        field: 'phone',
        value: row.phone,
        message: 'Invalid phone number format'
      });
    }

    // CGPA validation
    if (row.cgpa !== undefined && row.cgpa !== null) {
      const cgpa = parseFloat(row.cgpa);
      if (isNaN(cgpa) || cgpa < VALIDATION_RULES.cgpa.min || cgpa > VALIDATION_RULES.cgpa.max) {
        errors.push({
          row: rowNumber,
          field: 'cgpa',
          value: row.cgpa,
          message: `CGPA must be between ${VALIDATION_RULES.cgpa.min} and ${VALIDATION_RULES.cgpa.max}`
        });
      }
    }

    // Percentage validations
    ['tenth.percentage', 'twelfth.percentage'].forEach(field => {
      const value = getNestedValue(row, `academicHistory.${field}`);
      if (value !== undefined && value !== null) {
        const percentage = parseFloat(value);
        if (isNaN(percentage) || percentage < VALIDATION_RULES.percentage.min || percentage > VALIDATION_RULES.percentage.max) {
          errors.push({
            row: rowNumber,
            field: `academicHistory.${field}`,
            value,
            message: `Percentage must be between ${VALIDATION_RULES.percentage.min} and ${VALIDATION_RULES.percentage.max}`
          });
        }
      }
    });

    // Year validation
    if (row.year !== undefined && row.year !== null) {
      const year = parseInt(row.year);
      if (isNaN(year) || year < VALIDATION_RULES.year.min || year > VALIDATION_RULES.year.max) {
        errors.push({
          row: rowNumber,
          field: 'year',
          value: row.year,
          message: `Academic year must be between ${VALIDATION_RULES.year.min} and ${VALIDATION_RULES.year.max}`
        });
      }
    }

    // Semester validation
    if (row.semester !== undefined && row.semester !== null) {
      const semester = parseInt(row.semester);
      if (isNaN(semester) || semester < VALIDATION_RULES.semester.min || semester > VALIDATION_RULES.semester.max) {
        errors.push({
          row: rowNumber,
          field: 'semester',
          value: row.semester,
          message: `Semester must be between ${VALIDATION_RULES.semester.min} and ${VALIDATION_RULES.semester.max}`
        });
      }
    }
  });

  return errors;
};

// Get nested value for validation
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? current[key] : undefined;
  }, obj);
};

// Main import function
export const importFromCSV = async (
  file: File,
  dataType: keyof typeof REQUIRED_FIELDS
): Promise<ImportResult> => {
  try {
    const content = await readFileContent(file);
    const data = parseCSVContent(content);
    const errors = validateImportData(data, dataType);
    
    const validRows = data.filter((_, index) => 
      !errors.some(error => error.row === index + 2)
    );

    const warnings: string[] = [];
    
    // Generate warnings for common issues
    if (data.length > 1000) {
      warnings.push('Large dataset detected. Import may take longer than usual.');
    }
    
    if (errors.length > 0) {
      warnings.push(`${errors.length} validation errors found. Only valid rows will be processed.`);
    }

    return {
      success: errors.length === 0,
      data: validRows,
      errors,
      warnings,
      summary: {
        totalRows: data.length,
        validRows: validRows.length,
        errorRows: data.length - validRows.length,
        processedRows: validRows.length
      }
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      errors: [{
        row: 0,
        field: 'file',
        value: file.name,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }],
      warnings: [],
      summary: {
        totalRows: 0,
        validRows: 0,
        errorRows: 0,
        processedRows: 0
      }
    };
  }
};

// Read file content as text
export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file content'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file, 'UTF-8');
  });
};

// Validate file before import
export const validateImportFile = (file: File): string[] => {
  const errors: string[] = [];
  
  if (!file) {
    errors.push('No file selected');
    return errors;
  }
  
  if (file.type !== 'text/csv' && !file.name.toLowerCase().endsWith('.csv')) {
    errors.push('File must be a CSV file');
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    errors.push('File size must be less than 10MB');
  }
  
  if (file.size === 0) {
    errors.push('File is empty');
  }
  
  return errors;
};