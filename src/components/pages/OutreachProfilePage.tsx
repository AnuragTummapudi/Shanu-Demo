import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Edit, Save } from 'lucide-react';
import { toast } from 'sonner';
import { 
  defaultOutreachProfile, 
  defaultCompanyContacts, 
  defaultPartnerships, 
  defaultAchievements,
  CompanyContact,
  Partnership,
  Achievement
} from '../data/outreachProfileData';
import { 
  BasicInfoSection, 
  PerformanceMetricsSection, 
  CompanyContactsSection 
} from '../outreach/OutreachProfileSections';

interface OutreachProfilePageProps {
  profile?: any;
  onBack?: () => void;
}

export function OutreachProfilePage({ profile, onBack = () => window.history.back() }: OutreachProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(defaultOutreachProfile);
  const [companyContacts, setCompanyContacts] = useState<CompanyContact[]>(defaultCompanyContacts);
  const [partnerships, setPartnerships] = useState<Partnership[]>(defaultPartnerships);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);

  const handleSave = () => {
    toast.success('Outreach profile updated successfully!');
    setIsEditing(false);
  };

  const addContact = () => {
    const newContact: CompanyContact = {
      id: Date.now().toString(),
      companyName: '',
      contactPerson: '',
      designation: '',
      email: '',
      phone: '',
      relationship: 'potential',
      lastContact: '',
      notes: ''
    };
    setCompanyContacts([...companyContacts, newContact]);
  };

  const removeContact = (id: string) => {
    setCompanyContacts(companyContacts.filter(contact => contact.id !== id));
  };

  const addPartnership = () => {
    const newPartnership: Partnership = {
      id: Date.now().toString(),
      companyName: '',
      partnershipType: 'placement',
      startDate: '',
      status: 'pending',
      value: '',
      description: ''
    };
    setPartnerships([...partnerships, newPartnership]);
  };

  const removePartnership = (id: string) => {
    setPartnerships(partnerships.filter(partnership => partnership.id !== id));
  };

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
      impact: '',
      category: 'placement'
    };
    setAchievements([...achievements, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter(achievement => achievement.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Outreach Team Profile</h1>
              <p className="text-slate-600">Corporate partnerships and industry relations management</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <Button onClick={handleSave} className="bg-success text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <BasicInfoSection 
              profileData={profileData}
              setProfileData={setProfileData}
              isEditing={isEditing}
            />
            <PerformanceMetricsSection 
              profileData={profileData}
              setProfileData={setProfileData}
              isEditing={isEditing}
            />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <CompanyContactsSection 
              companyContacts={companyContacts}
              setCompanyContacts={setCompanyContacts}
              isEditing={isEditing}
              onAddContact={addContact}
              onRemoveContact={removeContact}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Partnerships and other sections would go here */}
            <div className="text-center text-muted-foreground">
              Additional sections: Partnerships, Skills, Networks, etc.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutreachProfilePage;