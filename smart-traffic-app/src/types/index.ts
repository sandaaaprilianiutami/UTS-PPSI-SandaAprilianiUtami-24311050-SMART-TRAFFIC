export type UserRole = 'public' | 'operator' | 'admin' | 'pimpinan';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agency?: string;
}

export type TrafficStatus = 'lancar' | 'ramai_lancar' | 'padat' | 'macet_total';

export interface RoadSegment {
  id: string;
  name: string;
  region: string;
  lengthKm: number;
  lanes: number;
  status: TrafficStatus;
  avgSpeed: number; // km/h
  vehicleCount: number; // per hour
  lastUpdated: string;
  cctvActive: boolean;
  cctvUrl?: string;
  coordinates: [number, number];
  description?: string;
}

export interface Region {
  id: string;
  name: string;
  code: string;
  districtCount: number;
  totalRoads: number;
  totalCctv: number;
  statusOverview: string;
}

export type IncidentCategory = 'kecelakaan' | 'kemacetan' | 'jalan_rusak' | 'lampu_lalin' | 'bencana_alam' | 'lainnya';
export type IncidentStatus = 'menunggu_verifikasi' | 'terverifikasi' | 'sedang_ditangani' | 'selesai' | 'ditolak';

export interface IncidentReport {
  id: string;
  title: string;
  category: IncidentCategory;
  roadName: string;
  region: string;
  reporterName: string;
  reporterPhone: string;
  description: string;
  status: IncidentStatus;
  urgency: 'rendah' | 'sedang' | 'tinggi' | 'kritis';
  createdAt: string;
  updatedAt: string;
  officerNotes?: string;
  assignedOfficer?: string;
  lat?: number;
  lng?: number;
}

export interface CCTVDevice {
  id: string;
  name: string;
  location: string;
  region: string;
  status: 'online' | 'offline' | 'maintenance';
  resolution: string;
  ipAddress: string;
  streamUrl: string;
  lastPing: string;
  fps: number;
}

export interface IoTDevice {
  id: string;
  code: string;
  type: 'speed_radar' | 'vehicle_counter' | 'weather_station' | 'air_quality';
  location: string;
  region: string;
  status: 'active' | 'warning' | 'error';
  batteryPct: number;
  lastReading: string;
  readingValue: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  target: string;
  ipAddress: string;
  details: string;
}

export interface RouteOption {
  id: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estMinutes: number;
  congestionLevel: 'Lancar' | 'Sedang' | 'Padat';
  viaRoads: string[];
  recommendationReason: string;
}
