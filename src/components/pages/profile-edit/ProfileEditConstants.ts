export const VALIDATION_RULES = {
  REQUIRED_FIELDS: ['firstName', 'lastName', 'email', 'phone'],
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^[+]?[\d\s\-()]+$/,
} as const;

export const BLOOD_GROUPS = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
] as const;

export const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
  { value: 'Prefer not to say', label: 'Prefer not to say' }
] as const;

export const FORM_TABS = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'contact', label: 'Contact' },
  { id: 'academic', label: 'Academic' },
  { id: 'preferences', label: 'Preferences' }
] as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  UNSAVED_CHANGES: 'You have unsaved changes. Are you sure you want to cancel?'
} as const;