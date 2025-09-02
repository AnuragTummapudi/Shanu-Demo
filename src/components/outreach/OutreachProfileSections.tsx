import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  User, 
  Building, 
  TrendingUp, 
  Network, 
  Plus,
  Trash2,
  Upload
} from 'lucide-react';
import { CompanyContact, Partnership, Achievement } from '../data/outreachProfileData';

interface BasicInfoSectionProps {
  profileData: any;
  setProfileData: (data: any) => void;
  isEditing: boolean;
}

export function BasicInfoSection({ profileData, setProfileData, isEditing }: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Basic Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src="" />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-purple-600 text-white">
              {profileData.firstName[0]}{profileData.lastName[0]}
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              disabled
              className="bg-muted"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={profileData.address}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              disabled={!isEditing}
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface PerformanceMetricsSectionProps {
  profileData: any;
  setProfileData: (data: any) => void;
  isEditing: boolean;
}

export function PerformanceMetricsSection({ profileData, setProfileData, isEditing }: PerformanceMetricsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Performance Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-primary/10 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">{profileData.companiesConnected}</div>
            <div className="text-sm text-muted-foreground">Companies Connected</div>
          </div>
          <div className="p-3 bg-success/10 rounded-lg text-center">
            <div className="text-2xl font-bold text-success">{profileData.activePartnerships}</div>
            <div className="text-sm text-muted-foreground">Active Partnerships</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-purple-100 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-700">{profileData.placementTargetsAchieved}</div>
            <div className="text-sm text-muted-foreground">Target Achievement</div>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-700">{profileData.averagePlacementPackage}</div>
            <div className="text-sm text-muted-foreground">Avg. Package</div>
          </div>
        </div>

        {isEditing && (
          <div className="space-y-3">
            <Label>Update Metrics</Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Companies Connected"
                value={profileData.companiesConnected}
                onChange={(e) => setProfileData({...profileData, companiesConnected: e.target.value})}
              />
              <Input
                placeholder="Active Partnerships"
                value={profileData.activePartnerships}
                onChange={(e) => setProfileData({...profileData, activePartnerships: e.target.value})}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface CompanyContactsSectionProps {
  companyContacts: CompanyContact[];
  setCompanyContacts: (contacts: CompanyContact[]) => void;
  isEditing: boolean;
  onAddContact: () => void;
  onRemoveContact: (id: string) => void;
}

export function CompanyContactsSection({ 
  companyContacts, 
  setCompanyContacts, 
  isEditing, 
  onAddContact, 
  onRemoveContact 
}: CompanyContactsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Network className="w-5 h-5" />
            <span>Company Contacts</span>
          </CardTitle>
          {isEditing && (
            <Button onClick={onAddContact} size="sm" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {companyContacts.map((contact) => (
          <div key={contact.id} className="p-4 border rounded-lg space-y-3">
            {isEditing && (
              <div className="flex justify-end">
                <Button onClick={() => onRemoveContact(contact.id)} size="sm" variant="destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Company Name</Label>
                <Input
                  value={contact.companyName}
                  onChange={(e) => {
                    const updated = companyContacts.map(item => 
                      item.id === contact.id ? {...item, companyName: e.target.value} : item
                    );
                    setCompanyContacts(updated);
                  }}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>Contact Person</Label>
                <Input
                  value={contact.contactPerson}
                  onChange={(e) => {
                    const updated = companyContacts.map(item => 
                      item.id === contact.id ? {...item, contactPerson: e.target.value} : item
                    );
                    setCompanyContacts(updated);
                  }}
                  disabled={!isEditing}
                />
              </div>
            </div>
            {!isEditing && (
              <Badge 
                className={
                  contact.relationship === 'primary' ? 'bg-success/10 text-success' :
                  contact.relationship === 'secondary' ? 'bg-warning/10 text-warning' :
                  'bg-muted text-muted-foreground'
                }
              >
                {contact.relationship.charAt(0).toUpperCase() + contact.relationship.slice(1)} Contact
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}