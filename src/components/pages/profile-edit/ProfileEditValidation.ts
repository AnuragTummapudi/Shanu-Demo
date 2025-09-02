import { VALIDATION_RULES, VALIDATION_MESSAGES } from './ProfileEditConstants';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateProfileForm = (formData: any): ValidationResult => {
  const errors: string[] = [];
  
  // Check required fields
  VALIDATION_RULES.REQUIRED_FIELDS.forEach(field => {
    if (!formData[field]?.trim()) {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
      errors.push(VALIDATION_MESSAGES.REQUIRED(fieldName));
    }
  });
  
  // Validate email format
  if (formData.email && !VALIDATION_RULES.EMAIL_PATTERN.test(formData.email)) {
    errors.push(VALIDATION_MESSAGES.INVALID_EMAIL);
  }
  
  // Validate phone format
  if (formData.phone && !VALIDATION_RULES.PHONE_PATTERN.test(formData.phone)) {
    errors.push(VALIDATION_MESSAGES.INVALID_PHONE);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateField = (fieldName: string, value: any): string | null => {
  if (VALIDATION_RULES.REQUIRED_FIELDS.includes(fieldName as any) && !value?.trim()) {
    const fieldLabel = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1');
    return VALIDATION_MESSAGES.REQUIRED(fieldLabel);
  }
  
  if (fieldName === 'email' && value && !VALIDATION_RULES.EMAIL_PATTERN.test(value)) {
    return VALIDATION_MESSAGES.INVALID_EMAIL;
  }
  
  if (fieldName === 'phone' && value && !VALIDATION_RULES.PHONE_PATTERN.test(value)) {
    return VALIDATION_MESSAGES.INVALID_PHONE;
  }
  
  return null;
};