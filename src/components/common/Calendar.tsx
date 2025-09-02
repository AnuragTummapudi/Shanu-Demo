import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users, Filter } from 'lucide-react';
import { ScheduleEvent, getEventsByMonth, formatEventTime, getEventDuration } from '../data/scheduleData';

interface CalendarProps {
  role?: string;
  events: ScheduleEvent[];
  onEventClick?: (event: ScheduleEvent) => void;
  showFilters?: boolean;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Calendar: React.FC<CalendarProps> = ({ 
  role, 
  events, 
  onEventClick, 
  showFilters = true 
}) => {
  // Generate unique ID for this calendar instance
  const calendarId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const filteredEvents = events.filter(event => {
    const typeMatch = filterType === 'all' || event.type === filterType;
    const statusMatch = filterStatus === 'all' || event.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const monthEvents = getEventsByMonth(year, month);
  const currentMonthEvents = filteredEvents.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(month - 1);
    } else {
      newDate.setMonth(month + 1);
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return currentMonthEvents.filter(event => event.startDate === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'training': return 'bg-blue-500';
      case 'interview': return 'bg-green-500';
      case 'meeting': return 'bg-purple-500';
      case 'drive': return 'bg-orange-500';
      case 'presentation': return 'bg-cyan-500';
      case 'session': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'training': return 'Training';
      case 'interview': return 'Interview';
      case 'meeting': return 'Meeting';
      case 'drive': return 'Drive';
      case 'presentation': return 'Presentation';
      case 'session': return 'Session';
      default: return 'Event';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'info-light';
      case 'ongoing': return 'warning-light';
      case 'completed': return 'success-light';
      case 'cancelled': return 'error-light';
      default: return 'info-light';
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day;
  };

  const renderMonthView = () => {
    const days = getDaysInMonth();
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-slate-600 border-b">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}-${calendarId}`} className="p-2 h-24 border border-slate-100"></div>;
          }
          
          const dayEvents = getEventsForDay(day);
          const today = isToday(day);
          
          return (
            <div 
              key={`day-${day}-${month}-${year}-${calendarId}`} 
              className={`p-1 h-24 border border-slate-100 hover:bg-slate-50 transition-colors ${
                today ? 'bg-primary/10 border-primary/30' : ''
              }`}
            >
              <div className={`text-sm font-medium mb-1 ${
                today ? 'text-primary' : 'text-slate-800'
              }`}>
                {day}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    className={`text-xs p-1 rounded cursor-pointer truncate ${getEventTypeColor(event.type)} text-white hover:opacity-80 transition-opacity`}
                    title={`${event.title} - ${formatEventTime(event.startTime, event.endTime)}`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-slate-500 text-center">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderEventsList = () => {
    const upcomingEvents = currentMonthEvents
      .filter(event => event.status !== 'cancelled')
      .sort((a, b) => new Date(a.startDate + ' ' + a.startTime).getTime() - 
                      new Date(b.startDate + ' ' + b.startTime).getTime());

    return (
      <div className="space-y-4">
        {upcomingEvents.map(event => (
          <Card 
            key={event.id} 
            className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onEventClick?.(event)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                    <h4 className="font-medium text-slate-800">{event.title}</h4>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">{event.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{new Date(event.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatEventTime(event.startTime, event.endTime)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <Badge variant="outline" className="text-xs">
                    {getEventTypeLabel(event.type)}
                  </Badge>
                  {event.priority === 'high' && (
                    <Badge className="ml-1 text-xs error-light">
                      High Priority
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {upcomingEvents.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No events scheduled for this month</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigateMonth('prev')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-semibold text-slate-800">
            {monthNames[month]} {year}
          </h2>
          <Button variant="outline" onClick={() => navigateMonth('next')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          {showFilters && (
            <>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1 border border-primary/20 rounded-lg bg-white text-sm"
              >
                <option value="all">All Types</option>
                <option value="training">Training</option>
                <option value="interview">Interview</option>
                <option value="meeting">Meeting</option>
                <option value="drive">Drive</option>
                <option value="presentation">Presentation</option>
                <option value="session">Session</option>
              </select>
              
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 border border-primary/20 rounded-lg bg-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </>
          )}
          
          <div className="flex bg-slate-100 rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              onClick={() => setViewMode('month')}
              className="text-xs"
            >
              Month
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              onClick={() => setViewMode('week')}
              className="text-xs"
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-6">
          {viewMode === 'month' ? renderMonthView() : renderEventsList()}
        </CardContent>
      </Card>

      {/* Event Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: currentMonthEvents.length, color: 'blue' },
          { label: 'Scheduled', value: currentMonthEvents.filter(e => e.status === 'scheduled').length, color: 'green' },
          { label: 'High Priority', value: currentMonthEvents.filter(e => e.priority === 'high').length, color: 'red' },
          { label: 'This Week', value: currentMonthEvents.filter(e => {
            const eventDate = new Date(e.startDate);
            const today = new Date();
            const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
            const weekEnd = new Date(today.setDate(weekStart.getDate() + 6));
            return eventDate >= weekStart && eventDate <= weekEnd;
          }).length, color: 'purple' }
        ].map((stat, index) => (
          <Card key={`calendar-stat-${stat.label}-${index}-${calendarId}`} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 border-0 shadow-sm`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Calendar;