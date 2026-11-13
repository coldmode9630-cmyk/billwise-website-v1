// Maps icon names used in config files to Lucide components.
// To use a new icon in services.js, import it here and add it to the map.
import {
  FileCheck2, ClipboardList, ShieldAlert, Timer, BadgeCheck, Receipt, Mail, BarChart3,
  Stethoscope, Building2, HeartPulse, FileText, Layers, Activity, CircleHelp,
  UserCheck, FileSignature, Landmark,
} from 'lucide-react';

export const iconMap = {
  FileCheck2, ClipboardList, ShieldAlert, Timer, BadgeCheck, Receipt, Mail, BarChart3,
  Stethoscope, Building2, HeartPulse, FileText, Layers, Activity,
  UserCheck, FileSignature, Landmark,
};

export const getIcon = (name) => iconMap[name] || CircleHelp;
