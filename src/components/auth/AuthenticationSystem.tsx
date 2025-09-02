import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  University,
  ArrowRight,
  User,
  GraduationCap,
  Users,
  Settings,
  UserCog,
  Chrome,
  Linkedin,
  QrCode,
  Fingerprint,
  Smartphone,
  RefreshCw,
  ArrowLeft,
  Key,
  Clock,
  Check,
  X,
  Globe,
  Zap,
  Sparkles,
  MousePointer,
  Camera,
  Scan,
  WifiOff,
  Star,
  Crown,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type UserRole = 'student' | 'faculty' | 'outreach' | 'operations' | 'admin';

interface User {
  email: string;
  role: UserRole;
  name: string;
  department: string;
  verified: boolean;
}

interface AuthSystemProps {
  onAuthenticated: (user: User) => void;
}

// Enhanced mock user database
const mockUsers: User[] = [
  // Students
  { email: 'rajesh.kumar@srmap.edu.in', role: 'student', name: 'Rajesh Kumar', department: 'Computer Science & Engineering', verified: true },
  { email: 'priya.sharma@srmap.edu.in', role: 'student', name: 'Priya Sharma', department: 'Information Technology', verified: true },
  { email: 'arun.reddy@srmap.edu.in', role: 'student', name: 'Arun Reddy', department: 'Electronics & Communication', verified: true },
  { email: 'meera.nair@srmap.edu.in', role: 'student', name: 'Meera Nair', department: 'Mechanical Engineering', verified: true },
  { email: 'student@srmap.edu.in', role: 'student', name: 'Demo Student', department: 'Computer Science & Engineering', verified: true },
  
  // Faculty
  { email: 'dr.lakshmi@srmap.edu.in', role: 'faculty', name: 'Dr. Lakshmi Venkatesh', department: 'Computer Science & Engineering', verified: true },
  { email: 'prof.krishna@srmap.edu.in', role: 'faculty', name: 'Prof. Krishna Murthy', department: 'Information Technology', verified: true },
  { email: 'dr.sangeetha@srmap.edu.in', role: 'faculty', name: 'Dr. Sangeetha Ravi', department: 'Electronics & Communication', verified: true },
  { email: 'faculty@srmap.edu.in', role: 'faculty', name: 'Demo Faculty', department: 'Computer Science & Engineering', verified: true },
  
  // Outreach Team
  { email: 'placement.ravi@srmap.edu.in', role: 'outreach', name: 'Ravi Teja', department: 'Placement Cell', verified: true },
  { email: 'outreach.divya@srmap.edu.in', role: 'outreach', name: 'Divya Prasad', department: 'Industry Relations', verified: true },
  { email: 'outreach@srmap.edu.in', role: 'outreach', name: 'Demo Outreach', department: 'Placement Cell', verified: true },
  
  // Operations Team
  { email: 'ops.suresh@srmap.edu.in', role: 'operations', name: 'Suresh Babu', department: 'Operations', verified: true },
  { email: 'coord.anitha@srmap.edu.in', role: 'operations', name: 'Anitha Reddy', department: 'Coordination', verified: true },
  { email: 'operations@srmap.edu.in', role: 'operations', name: 'Demo Operations', department: 'Operations', verified: true },
  
  // Admin
  { email: 'admin@srmap.edu.in', role: 'admin', name: 'System Administrator', department: 'IT Administration', verified: true },
  { email: 'superadmin@srmap.edu.in', role: 'admin', name: 'Super Administrator', department: 'IT Administration', verified: true }
];

const roleLabels = {
  student: 'Student',
  faculty: 'Faculty/Trainer',
  outreach: 'Outreach Team',
  operations: 'Operations Team',
  admin: 'Super Admin'
};

const roleIcons = {
  student: User,
  faculty: GraduationCap,
  outreach: Users,
  operations: Settings,
  admin: Shield
};

const roleDescriptions = {
  student: 'Access training sessions, job opportunities, and track your placement journey',
  faculty: 'Manage training sessions, track student attendance, and conduct evaluations',
  outreach: 'Connect with companies, manage partnerships, and drive placement opportunities',
  operations: 'Manage job postings, coordinate placements, and oversee recruitment drives',
  admin: 'Complete system oversight, analytics, reporting, and configuration management'
};

const departmentsBySchool = {
  'School of Engineering & Technology': [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering'
  ],
  'Paari School of Business': [
    'Master of Business Administration',
    'Finance & Accounting',
    'Marketing & Sales',
    'Human Resources'
  ],
  'School of Liberal Arts & Sciences': [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Economics',
    'English Literature'
  ]
};

// Role assignment logic based on email patterns
const determineRoleFromEmail = (email: string): UserRole => {
  const emailLower = email.toLowerCase();
  
  if (emailLower.includes('admin')) return 'admin';
  if (emailLower.includes('dr.') || emailLower.includes('prof.') || emailLower.includes('faculty')) return 'faculty';
  if (emailLower.includes('placement') || emailLower.includes('outreach')) return 'outreach';
  if (emailLower.includes('ops.') || emailLower.includes('coord.') || emailLower.includes('operations')) return 'operations';
  
  return 'student'; // Default role
};

// Password strength checker
const checkPasswordStrength = (password: string) => {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  strength = Object.values(checks).filter(Boolean).length;
  
  return {
    strength: Math.min((strength / 5) * 100, 100),
    checks,
    level: strength <= 2 ? 'weak' : strength <= 3 ? 'medium' : 'strong'
  };
};

// OTP input component
const OTPInput = ({ value, onChange, length = 6 }: { value: string; onChange: (value: string) => void; length?: number }) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, inputValue: string) => {
    const newValue = value.split('');
    newValue[index] = inputValue.slice(-1);
    const result = newValue.join('');
    onChange(result);

    // Auto-focus next input
    if (inputValue && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex space-x-2 justify-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          type="text"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-center text-lg font-semibold border-2 border-slate-200 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      ))}
    </div>
  );
};

// Social login button component
const SocialLoginButton = ({ 
  provider, 
  icon: Icon, 
  color, 
  onClick, 
  disabled = false 
}: { 
  provider: string; 
  icon: any; 
  color: string; 
  onClick: () => void; 
  disabled?: boolean; 
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center space-x-3 w-full p-3 border-2 border-slate-200 rounded-xl hover:border-${color}-300 hover:bg-${color}-50 transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <Icon className={`w-5 h-5 text-${color}-600`} />
    <span className="font-medium text-slate-700">Continue with {provider}</span>
  </motion.button>
);

export default function AuthenticationSystem({ onAuthenticated }: AuthSystemProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [step, setStep] = useState<'auth' | 'verify' | 'register' | 'forgot' | 'qr' | 'biometric'>('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [qrScanning, setQrScanning] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, checks: {}, level: 'weak' });
  
  const [registrationData, setRegistrationData] = useState({
    name: '',
    department: '',
    school: '',
    role: 'student' as UserRole,
    phone: '',
    dateOfBirth: '',
    agreeToTerms: false
  });
  
  const [predictedRole, setPredictedRole] = useState<UserRole | null>(null);

  // Check for biometric support
  useEffect(() => {
    if ('credentials' in navigator && 'create' in navigator.credentials) {
      setBiometricSupported(true);
    }
  }, []);

  // Update password strength in real-time
  useEffect(() => {
    if (password) {
      setPasswordStrength(checkPasswordStrength(password));
    }
  }, [password]);

  const validateEmail = (email: string) => {
    return email.endsWith('@srmap.edu.in');
  };

  // Update predicted role when email changes
  useEffect(() => {
    if (email && validateEmail(email)) {
      const role = determineRoleFromEmail(email);
      setPredictedRole(role);
    } else {
      setPredictedRole(null);
    }
  }, [email]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!validateEmail(email)) {
      setError('Please use your institutional email address (@srmap.edu.in)');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        if (twoFactorEnabled) {
          setStep('verify');
          setSuccess('Verification code sent to your email');
        } else {
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => onAuthenticated(user), 1000);
        }
      } else {
        setError('Account not found. Please check your email or sign up.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!validateEmail(email)) {
      setError('Please use your institutional email address (@srmap.edu.in)');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (passwordStrength.strength < 60) {
      setError('Password is too weak. Please choose a stronger password.');
      setLoading(false);
      return;
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setError('Account already exists. Please login instead.');
      setLoading(false);
      return;
    }

    // Proceed to registration
    setTimeout(() => {
      setStep('register');
      setRegistrationData(prev => ({ 
        ...prev, 
        role: determineRoleFromEmail(email),
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
      }));
      setLoading(false);
    }, 1500);
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      if (verificationCode === '123456' || verificationCode.length === 6) {
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          setSuccess('Verification successful! Welcome back.');
          setTimeout(() => onAuthenticated({ ...user, verified: true }), 1000);
        }
      } else {
        setError('Invalid verification code. Use 123456 for demo or any 6-digit code.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!registrationData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      const newUser: User = {
        email,
        role: registrationData.role,
        name: registrationData.name,
        department: registrationData.department,
        verified: true
      };
      setSuccess('Registration successful! Welcome to SRM University AP.');
      setTimeout(() => onAuthenticated(newUser), 1000);
      setLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    setSuccess(`Connecting to ${provider}...`);
    
    // Simulate social login
    setTimeout(() => {
      // For demo, create a user based on the provider
      const demoUser: User = {
        email: `demo.${provider.toLowerCase()}@srmap.edu.in`,
        role: 'student',
        name: `Demo ${provider} User`,
        department: 'Computer Science & Engineering',
        verified: true
      };
      setSuccess(`${provider} login successful!`);
      setTimeout(() => onAuthenticated(demoUser), 1000);
    }, 2000);
  };

  const handleQRLogin = () => {
    setStep('qr');
    setQrScanning(true);
    
    // Simulate QR scanning
    setTimeout(() => {
      setQrScanning(false);
      setSuccess('QR Code scanned successfully!');
      const demoUser: User = {
        email: 'qr.demo@srmap.edu.in',
        role: 'student',
        name: 'QR Demo User',
        department: 'Computer Science & Engineering',
        verified: true
      };
      setTimeout(() => onAuthenticated(demoUser), 1000);
    }, 3000);
  };

  const handleBiometricLogin = async () => {
    setStep('biometric');
    setLoading(true);
    
    try {
      // Simulate biometric authentication
      setTimeout(() => {
        setSuccess('Biometric authentication successful!');
        const demoUser: User = {
          email: 'biometric.demo@srmap.edu.in',
          role: 'student',
          name: 'Biometric Demo User',
          department: 'Computer Science & Engineering',
          verified: true
        };
        setTimeout(() => onAuthenticated(demoUser), 1000);
      }, 2000);
    } catch (error) {
      setError('Biometric authentication failed. Please try again.');
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setStep('forgot');
  };

  const resetPassword = () => {
    setLoading(true);
    setTimeout(() => {
      setSuccess('Password reset link sent to your email!');
      setLoading(false);
      setTimeout(() => setStep('auth'), 2000);
    }, 1500);
  };

  const renderHeader = () => (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-4"
    >
      <div className="inline-flex p-4 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-3xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 rounded-3xl animate-pulse" />
        <University className="w-16 h-16 text-primary relative z-10" />
      </div>
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          SRM University AP
        </h1>
        <h2 className="text-xl font-semibold text-slate-800 mt-2">
          {step === 'auth' ? (mode === 'login' ? 'Welcome Back' : 'Join Our Community') : 
           step === 'verify' ? 'Verify Your Account' :
           step === 'register' ? 'Complete Your Profile' :
           step === 'forgot' ? 'Reset Your Password' :
           step === 'qr' ? 'QR Code Login' :
           'Biometric Authentication'}
        </h2>
        <p className="text-slate-600 mt-1">
          {step === 'auth' ? (mode === 'login' ? 'Sign in to your account' : 'Create your new account') :
           step === 'verify' ? 'Enter the verification code sent to your email' :
           step === 'register' ? 'Set up your profile to get started' :
           step === 'forgot' ? 'We\'ll send you a reset link' :
           step === 'qr' ? 'Scan the QR code with your mobile device' :
           'Use your fingerprint or face to sign in'}
        </p>
      </div>
    </motion.div>
  );

  const renderModeToggle = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex bg-slate-100 rounded-xl p-1">
        <button
          onClick={() => setMode('login')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            mode === 'login' 
              ? 'bg-white text-primary shadow-sm' 
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            mode === 'signup' 
              ? 'bg-white text-primary shadow-sm' 
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Sign Up
        </button>
      </div>
    </div>
  );

  const renderQuickAccess = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <div className="text-center">
        <p className="text-sm text-slate-600 mb-4">Quick Access (Demo)</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(roleLabels).map(([key, label]) => {
            const email = key === 'admin' ? 'admin@srmap.edu.in' :
                         key === 'faculty' ? 'faculty@srmap.edu.in' :
                         key === 'outreach' ? 'outreach@srmap.edu.in' :
                         key === 'operations' ? 'operations@srmap.edu.in' :
                         'student@srmap.edu.in';
            
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setEmail(email);
                  setPassword('demo123');
                }}
                className="p-3 text-xs bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg hover:from-primary/5 hover:to-purple-50 hover:border-primary/20 transition-all"
              >
                <div className="flex items-center space-x-2">
                  {React.createElement(roleIcons[key as UserRole], { className: "w-4 h-4 text-primary" })}
                  <span className="font-medium">{label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  const renderAuthForm = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Institutional Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="your.name@srmap.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>
            <p className="text-xs text-slate-500">Use your official SRM University AP email address</p>
            
            {/* Role Prediction Display */}
            {predictedRole && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-3 bg-gradient-to-r from-primary/5 to-purple-50 border border-primary/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {React.createElement(roleIcons[predictedRole], { className: "w-5 h-5 text-primary" })}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-slate-800">Detected Role:</span>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {roleLabels[predictedRole]}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{roleDescriptions[predictedRole]}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-10 w-10 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Password Strength Indicator (for signup) */}
            {mode === 'signup' && password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Password Strength</span>
                  <span className={`text-xs font-medium ${
                    passwordStrength.level === 'strong' ? 'text-green-600' :
                    passwordStrength.level === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {passwordStrength.level.charAt(0).toUpperCase() + passwordStrength.level.slice(1)}
                  </span>
                </div>
                <Progress 
                  value={passwordStrength.strength} 
                  className={`h-2 ${
                    passwordStrength.level === 'strong' ? '[&>div]:bg-green-500' :
                    passwordStrength.level === 'medium' ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'
                  }`}
                />
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {Object.entries(passwordStrength.checks).map(([key, valid]) => (
                    <div key={key} className={`flex items-center space-x-1 ${valid ? 'text-green-600' : 'text-slate-400'}`}>
                      {valid ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      <span>
                        {key === 'length' ? '8+ chars' :
                         key === 'uppercase' ? 'Uppercase' :
                         key === 'lowercase' ? 'Lowercase' :
                         key === 'number' ? 'Number' : 'Special char'}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Confirm Password (for signup) */}
          {mode === 'signup' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-10 w-10 p-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-600 flex items-center">
                  <X className="w-3 h-3 mr-1" />
                  Passwords do not match
                </p>
              )}
            </motion.div>
          )}

          {/* Additional Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe} 
                onCheckedChange={setRememberMe} 
              />
              <Label htmlFor="remember" className="text-sm text-slate-600">
                {mode === 'login' ? 'Remember me' : 'I agree to the terms and conditions'}
              </Label>
            </div>
            
            {mode === 'login' && (
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={handleForgotPassword}
                className="text-xs text-primary hover:text-primary/80"
              >
                Forgot password?
              </Button>
            )}
          </div>

          {/* Two-Factor Authentication Toggle (for login) */}
          {mode === 'login' && (
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="twoFactor" 
                checked={twoFactorEnabled} 
                onCheckedChange={setTwoFactorEnabled} 
              />
              <Label htmlFor="twoFactor" className="text-sm text-slate-600">
                Enable two-factor authentication
              </Label>
              <Shield className="w-4 h-4 text-primary" />
            </div>
          )}

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        {/* Alternative Login Methods */}
        {mode === 'login' && (
          <div className="space-y-4">
            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-4 bg-white text-sm text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <SocialLoginButton
                provider="Google"
                icon={Chrome}
                color="red"
                onClick={() => handleSocialLogin('Google')}
                disabled={loading}
              />
              <SocialLoginButton
                provider="LinkedIn"
                icon={Linkedin}
                color="blue"
                onClick={() => handleSocialLogin('LinkedIn')}
                disabled={loading}
              />
              <SocialLoginButton
                provider="Microsoft"
                icon={Globe}
                color="blue"
                onClick={() => handleSocialLogin('Microsoft')}
                disabled={loading}
              />
            </div>

            {/* Advanced Login Options */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleQRLogin}
                disabled={loading}
                className="h-12 flex items-center space-x-2"
              >
                <QrCode className="w-4 h-4" />
                <span>QR Code</span>
              </Button>
              
              {biometricSupported && (
                <Button
                  variant="outline"
                  onClick={handleBiometricLogin}
                  disabled={loading}
                  className="h-12 flex items-center space-x-2"
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>Biometric</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  const renderVerification = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
          <Shield className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <p className="text-slate-600">
          Enter the 6-digit verification code sent to <br />
          <strong className="text-slate-800">{email}</strong>
        </p>
      </div>

      <form onSubmit={handleVerification} className="space-y-6">
        <div className="space-y-4">
          <Label className="text-center block">Verification Code</Label>
          <OTPInput value={verificationCode} onChange={setVerificationCode} />
          <p className="text-xs text-slate-500 text-center">
            Demo code: <span className="font-mono bg-slate-100 px-2 py-1 rounded">123456</span>
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Button type="submit" className="w-full h-12" disabled={loading || verificationCode.length !== 6}>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Verifying...
              </div>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Verify Account
              </>
            )}
          </Button>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-12"
            onClick={() => setStep('auth')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </div>

        <div className="text-center">
          <Button variant="link" size="sm" className="text-primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Resend Code
          </Button>
        </div>
      </form>
    </motion.div>
  );

  const renderRegistration = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex p-4 bg-success/10 rounded-full mb-4">
          <University className="w-8 h-8 text-success" />
        </div>
        <p className="text-slate-600">
          Complete your profile setup for <br />
          <strong className="text-slate-800">{email}</strong>
        </p>
        
        {/* Show assigned role */}
        <div className="mt-4 p-3 bg-gradient-to-r from-primary/5 to-purple-50 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-slate-800">Assigned Role:</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {roleLabels[registrationData.role]}
            </Badge>
          </div>
        </div>
      </div>

      <form onSubmit={handleRegistration} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={registrationData.name}
              onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={registrationData.phone}
              onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={registrationData.dateOfBirth}
              onChange={(e) => setRegistrationData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <select
              id="school"
              value={registrationData.school}
              onChange={(e) => setRegistrationData(prev => ({ ...prev, school: e.target.value, department: '' }))}
              className="w-full h-12 px-3 py-2 border border-input rounded-md bg-background"
              required
            >
              <option value="">Select School</option>
              {Object.keys(departmentsBySchool).map(school => (
                <option key={school} value={school}>{school}</option>
              ))}
            </select>
          </div>

          {registrationData.school && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                value={registrationData.department}
                onChange={(e) => setRegistrationData(prev => ({ ...prev, department: e.target.value }))}
                className="w-full h-12 px-3 py-2 border border-input rounded-md bg-background"
                required
              >
                <option value="">Select Department</option>
                {departmentsBySchool[registrationData.school as keyof typeof departmentsBySchool]?.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </motion.div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="agreeToTerms" 
            checked={registrationData.agreeToTerms} 
            onCheckedChange={(checked) => setRegistrationData(prev => ({ ...prev, agreeToTerms: checked as boolean }))} 
            required
          />
          <Label htmlFor="agreeToTerms" className="text-sm text-slate-600">
            I agree to the <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
          </Label>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Button type="submit" className="w-full h-12" disabled={loading || !registrationData.agreeToTerms}>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Creating Account...
              </div>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Complete Registration
              </>
            )}
          </Button>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-12"
            onClick={() => setStep('auth')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </div>
      </form>
    </motion.div>
  );

  const renderForgotPassword = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex p-4 bg-orange-100 rounded-full mb-4">
          <Key className="w-8 h-8 text-orange-600" />
        </div>
        <p className="text-slate-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resetEmail">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input
              id="resetEmail"
              type="email"
              placeholder="your.name@srmap.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Button onClick={resetPassword} className="w-full h-12" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Sending Reset Link...
              </div>
            ) : (
              <>
                <Mail className="mr-2 h-5 w-5" />
                Send Reset Link
              </>
            )}
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-12"
            onClick={() => setStep('auth')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderQRLogin = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
          <QrCode className="w-8 h-8 text-blue-600" />
        </div>
        <p className="text-slate-600">
          Scan the QR code with your mobile device to login instantly
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          <div className="w-64 h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
            {qrScanning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-4 border-primary border-t-transparent rounded-full"
              />
            ) : (
              <div className="text-center">
                <QrCode className="w-32 h-32 text-slate-400 mx-auto mb-4" />
                <p className="text-sm text-slate-600">QR Code</p>
              </div>
            )}
          </div>
          
          {qrScanning && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 border-4 border-primary rounded-2xl"
            >
              <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
            </motion.div>
          )}
        </div>
      </div>

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="text-center space-y-4">
        <p className="text-sm text-slate-500">
          {qrScanning ? 'Scanning for QR code...' : 'Waiting for scan...'}
        </p>
        
        <Button 
          variant="outline" 
          onClick={() => setStep('auth')}
          className="h-12"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>
      </div>
    </motion.div>
  );

  const renderBiometricLogin = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
          <Fingerprint className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-slate-600">
          Use your fingerprint or face to authenticate securely
        </p>
      </div>

      <div className="flex justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center border-4 border-green-300"
        >
          <Fingerprint className="w-16 h-16 text-green-600" />
        </motion.div>
      </div>

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="text-center space-y-4">
        <p className="text-sm text-slate-500">
          {loading ? 'Authenticating...' : 'Place your finger on the sensor'}
        </p>
        
        <Button 
          variant="outline" 
          onClick={() => setStep('auth')}
          className="h-12"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Badge variant="outline" className="px-4 py-2 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                University Portal
              </Badge>
            </div>
            {renderHeader()}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 'auth' && (
              <>
                {renderModeToggle()}
                {renderAuthForm()}
                {renderQuickAccess()}
              </>
            )}
            {step === 'verify' && renderVerification()}
            {step === 'register' && renderRegistration()}
            {step === 'forgot' && renderForgotPassword()}
            {step === 'qr' && renderQRLogin()}
            {step === 'biometric' && renderBiometricLogin()}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}