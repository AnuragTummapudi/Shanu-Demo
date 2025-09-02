import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  HelpCircle, 
  Send, 
  Upload, 
  X,
  Clock,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface RaiseTicketModalProps {
  userEmail: string;
  userRole: string;
  userName: string;
}

export const RaiseTicketModal: React.FC<RaiseTicketModalProps> = ({ 
  userEmail, 
  userRole, 
  userName 
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    priority: 'medium',
    subject: '',
    description: '',
    attachments: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Technical Issue',
    'Account Access',
    'Job Application Support',
    'Training Related',
    'Profile Management',
    'Company Information',
    'Report Generation',
    'System Bug',
    'Feature Request',
    'General Inquiry'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files].slice(0, 3) // Max 3 files
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const ticketId = `TKT-${Date.now().toString().slice(-6)}`;
    
    console.log('Ticket submitted:', {
      ticketId,
      userEmail,
      userRole,
      userName,
      ...formData
    });
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        category: '',
        priority: 'medium',
        subject: '',
        description: '',
        attachments: []
      });
      setOpen(false);
    }, 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error-light';
      case 'medium': return 'warning-light';
      case 'low': return 'info-light';
      default: return 'info-light';
    }
  };

  const isFormValid = formData.category && formData.subject && formData.description;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary/5">
          <HelpCircle className="w-4 h-4 mr-2" />
          Raise Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full success-light flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <DialogTitle className="text-success mb-2">Ticket Submitted Successfully!</DialogTitle>
            <DialogDescription className="mb-4">
              Your ticket has been sent to the operations team. You'll receive updates via email.
            </DialogDescription>
            <Badge className="success">
              Ticket ID: TKT-{Date.now().toString().slice(-6)}
            </Badge>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-primary" />
                Raise Support Ticket
              </DialogTitle>
              <DialogDescription>
                Submit your issue to the operations team. We'll get back to you within 24 hours.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* User Info */}
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Name:</span> {userName}</div>
                  <div><span className="font-medium">Email:</span> {userEmail}</div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Role:</span>
                    <Badge variant="outline" className="text-xs">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-info mr-2" />
                        Low Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-warning mr-2" />
                        Medium Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-error mr-2" />
                        High Priority
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Brief description of the issue"
                  maxLength={100}
                />
                <div className="text-xs text-muted-foreground">
                  {formData.subject.length}/100 characters
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide detailed information about your issue..."
                  rows={4}
                  maxLength={500}
                />
                <div className="text-xs text-muted-foreground">
                  {formData.description.length}/500 characters
                </div>
              </div>

              {/* File Attachments */}
              <div className="space-y-2">
                <Label>Attachments (Optional)</Label>
                <div className="space-y-2">
                  {formData.attachments.length < 3 && (
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          Click to upload files (Max 3 files, 10MB each)
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="text-sm truncate">
                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(index)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Expected Response Time */}
              <div className="p-3 rounded-lg info-light">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-info" />
                  <div>
                    <div className="font-medium text-info">Expected Response Time</div>
                    <div className="text-info/80">
                      {formData.priority === 'high' ? '4-8 hours' : 
                       formData.priority === 'medium' ? '12-24 hours' : 
                       '24-48 hours'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Ticket
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};