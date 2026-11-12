import { Eye, Users, CheckCircle2 } from 'lucide-react';
import { useInvitation } from '../../../hooks/useAdminInvitations';
import { useGuestsList } from '../../../hooks/useGuests';
import { useAdminRsvpList } from '../../../hooks/useAdminRsvp';

export default function AnalyticsTab({ invitationId }) {
  const { data: invitation } = useInvitation(invitationId);
  const { data: guests } = useGuestsList(invitationId);
  const { data: rsvpData } = useAdminRsvpList(invitationId);

  const entries = rsvpData?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Statistik &amp; Trafik Pengunjung Undangan</h3>
          <p className="text-xs text-slate-500 mt-1">Pantau performa sebaran undangan digitalmu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2">
            <Eye className="w-8 h-8 text-indigo-500 mx-auto" />
            <div className="text-3xl font-semibold text-slate-800">{invitation?.views_count ?? 0}</div>
            <div className="text-xs text-slate-500 font-medium">Total Pengunjung Membuka Web</div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2">
            <Users className="w-8 h-8 text-emerald-500 mx-auto" />
            <div className="text-3xl font-semibold text-slate-800">{guests?.length ?? 0}</div>
            <div className="text-xs text-slate-500 font-medium">Tamu Dalam Daftar Broadcast</div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-purple-500 mx-auto" />
            <div className="text-3xl font-semibold text-slate-800">{entries.length}</div>
            <div className="text-xs text-slate-500 font-medium">Total Respon RSVP Masuk</div>
          </div>
        </div>
      </div>
    </div>
  );
}
