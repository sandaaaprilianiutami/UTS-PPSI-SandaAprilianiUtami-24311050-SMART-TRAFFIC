import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  User,
  RoadSegment,
  Region,
  IncidentReport,
  CCTVDevice,
  IoTDevice,
  AuditLog,
  RouteOption
} from '../types';
import {
  INITIAL_ROADS,
  INITIAL_REGIONS,
  INITIAL_INCIDENTS,
  INITIAL_CCTV,
  INITIAL_IOT,
  INITIAL_AUDIT_LOGS,
  RECOMMENDED_ROUTES
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  setRole: (role: UserRole) => void;
  roads: RoadSegment[];
  regions: Region[];
  incidents: IncidentReport[];
  cctvs: CCTVDevice[];
  iots: IoTDevice[];
  auditLogs: AuditLog[];
  routes: RouteOption[];
  // Actions
  addIncident: (newInc: Omit<IncidentReport, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateIncidentStatus: (id: string, status: IncidentReport['status'], notes?: string, assigned?: string) => void;
  updateRoadStatus: (roadId: string, status: RoadSegment['status'], avgSpeed: number, vehicleCount: number) => void;
  addRoadSegment: (road: Omit<RoadSegment, 'id' | 'lastUpdated'>) => void;
  deleteRoadSegment: (roadId: string) => void;
  addRegion: (region: Omit<Region, 'id'>) => void;
  addAuditLog: (action: string, target: string, details: string) => void;
  selectedRoadId: string | null;
  setSelectedRoadId: (id: string | null) => void;
}

const DEFAULT_USERS: Record<UserRole, User> = {
  public: {
    id: 'usr-pub',
    name: 'Masyarakat / Pengendara',
    email: 'warga@lampungprov.go.id',
    role: 'public',
    agency: 'Warga Provinsi Lampung'
  },
  operator: {
    id: 'usr-ops',
    name: 'Bripka Hendra (Dishub & Lantas)',
    email: 'operator.its@dishub.lampungprov.go.id',
    role: 'operator',
    agency: 'Pusat Kendali ITS Dinas Perhubungan'
  },
  admin: {
    id: 'usr-adm',
    name: 'Sanda Apriliani Utami (Super Admin)',
    email: 'admin.smarttraffic@lampungprov.go.id',
    role: 'admin',
    agency: 'Diskominfotik & Dishub Prov. Lampung'
  },
  pimpinan: {
    id: 'usr-pim',
    name: 'Dr. Erliyan Redy Susanto, M.Kom (Dewan Pakar)',
    email: 'erliyan.redy@teknokrat.ac.id',
    role: 'pimpinan',
    agency: 'Tim Kolaborasi Teknokrat - Pemprov Lampung'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('smart_traffic_user');
    return saved ? JSON.parse(saved) : DEFAULT_USERS['public'];
  });

  const [roads, setRoads] = useState<RoadSegment[]>(() => {
    const saved = localStorage.getItem('smart_traffic_roads');
    return saved ? JSON.parse(saved) : INITIAL_ROADS;
  });

  const [regions, setRegions] = useState<Region[]>(() => {
    const saved = localStorage.getItem('smart_traffic_regions');
    return saved ? JSON.parse(saved) : INITIAL_REGIONS;
  });

  const [incidents, setIncidents] = useState<IncidentReport[]>(() => {
    const saved = localStorage.getItem('smart_traffic_incidents');
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  const [cctvs] = useState<CCTVDevice[]>(INITIAL_CCTV);
  const [iots] = useState<IoTDevice[]>(INITIAL_IOT);
  const [routes] = useState<RouteOption[]>(RECOMMENDED_ROUTES);
  const [selectedRoadId, setSelectedRoadId] = useState<string | null>(null);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('smart_traffic_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  useEffect(() => {
    localStorage.setItem('smart_traffic_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('smart_traffic_roads', JSON.stringify(roads));
  }, [roads]);

  useEffect(() => {
    localStorage.setItem('smart_traffic_regions', JSON.stringify(regions));
  }, [regions]);

  useEffect(() => {
    localStorage.setItem('smart_traffic_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('smart_traffic_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const setRole = (role: UserRole) => {
    setCurrentUser(DEFAULT_USERS[role]);
    addAuditLog('CHANGE_ROLE', role, `Beralih peran menjadi ${role.toUpperCase()}`);
  };

  const addAuditLog = (action: string, target: string, details: string) => {
    const newLog: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      target,
      ipAddress: '10.20.1.55',
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addIncident = (newInc: Omit<IncidentReport, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const id = `INC-2026-${String(incidents.length + 1).padStart(3, '0')}`;
    const report: IncidentReport = {
      ...newInc,
      id,
      status: 'menunggu_verifikasi',
      createdAt: now,
      updatedAt: now
    };
    setIncidents(prev => [report, ...prev]);
    addAuditLog('CREATE_INCIDENT', id, `Laporan insiden baru "${report.title}" di ${report.roadName}`);
  };

  const updateIncidentStatus = (id: string, status: IncidentReport['status'], notes?: string, assigned?: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setIncidents(prev =>
      prev.map(inc => {
        if (inc.id === id) {
          return {
            ...inc,
            status,
            updatedAt: now,
            officerNotes: notes !== undefined ? notes : inc.officerNotes,
            assignedOfficer: assigned !== undefined ? assigned : inc.assignedOfficer
          };
        }
        return inc;
      })
    );
    addAuditLog('UPDATE_INCIDENT_STATUS', id, `Status diubah menjadi: ${status}. Catatan: ${notes || '-'}`);
  };

  const updateRoadStatus = (roadId: string, status: RoadSegment['status'], avgSpeed: number, vehicleCount: number) => {
    setRoads(prev =>
      prev.map(r => {
        if (r.id === roadId) {
          return {
            ...r,
            status,
            avgSpeed,
            vehicleCount,
            lastUpdated: 'Baru saja diperbarui'
          };
        }
        return r;
      })
    );
    addAuditLog('UPDATE_ROAD_TRAFFIC', roadId, `Status: ${status}, Kecepatan: ${avgSpeed} km/j, Volume: ${vehicleCount} kend/j`);
  };

  const addRoadSegment = (roadData: Omit<RoadSegment, 'id' | 'lastUpdated'>) => {
    const newRoad: RoadSegment = {
      ...roadData,
      id: `rd-${String(roads.length + 1).padStart(2, '0')}`,
      lastUpdated: 'Baru saja'
    };
    setRoads(prev => [...prev, newRoad]);
    addAuditLog('ADD_ROAD_SEGMENT', newRoad.id, `Menambahkan ruas jalan baru: ${newRoad.name}`);
  };

  const deleteRoadSegment = (roadId: string) => {
    const target = roads.find(r => r.id === roadId);
    setRoads(prev => prev.filter(r => r.id !== roadId));
    addAuditLog('DELETE_ROAD_SEGMENT', roadId, `Menghapus ruas jalan: ${target?.name || roadId}`);
  };

  const addRegion = (regionData: Omit<Region, 'id'>) => {
    const newReg: Region = {
      ...regionData,
      id: `reg-${String(regions.length + 1).padStart(2, '0')}`
    };
    setRegions(prev => [...prev, newReg]);
    addAuditLog('ADD_REGION', newReg.id, `Menambahkan wilayah baru: ${newReg.name}`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setRole,
        roads,
        regions,
        incidents,
        cctvs,
        iots,
        auditLogs,
        routes,
        addIncident,
        updateIncidentStatus,
        updateRoadStatus,
        addRoadSegment,
        deleteRoadSegment,
        addRegion,
        addAuditLog,
        selectedRoadId,
        setSelectedRoadId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
