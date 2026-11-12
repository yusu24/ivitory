import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { XCircle } from 'lucide-react';
import { invitationSchema } from '../../../schemas/invitation';
import { useCreateInvitation } from '../../../hooks/useAdminInvitations';
import { useTemplatesList } from '../../../hooks/useTemplates';

export default function CreateInvitationModal({ onClose, onCreated }) {
  const createInvitation = useCreateInvitation();
  const { data: templates } = useTemplatesList();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      template_id: 1,
      slug: '',
      groom_name: '',
      bride_name: '',
      akad_date: '',
      akad_time: '',
      akad_location: '',
    },
  });

  const onSubmit = async (values) => {
    const invitation = await createInvitation.mutateAsync({
      ...values,
      template_id: Number(values.template_id) || 1,
    });
    onCreated(invitation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100">
          <XCircle className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-semibold text-slate-800 mb-1">Buat Undangan Baru</h3>
        <p className="text-xs text-slate-500 mb-6">
          Pilih tema undangan di awal dan isi data dasar — detail kata-kata, foto, cerita, dan rekening bisa dilengkapi setelah ini.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Pilih Tema Desain</label>
              <select
                {...register('template_id')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              >
                {templates?.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                )) || <option value={1}>Monochrome Line-Art (Nor &amp; Yusuf)</option>}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Alamat Link (slug)</label>
              <input
                {...register('slug')}
                placeholder="misal: yusuf-nabilla"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
              {errors.slug && <p className="mt-1 text-xs text-rose-600">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Mempelai Pria</label>
              <input
                {...register('groom_name')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
              {errors.groom_name && <p className="mt-1 text-xs text-rose-600">{errors.groom_name.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Mempelai Wanita</label>
              <input
                {...register('bride_name')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
              {errors.bride_name && <p className="mt-1 text-xs text-rose-600">{errors.bride_name.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Tanggal Akad</label>
              <input
                type="date"
                {...register('akad_date')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
              {errors.akad_date && <p className="mt-1 text-xs text-rose-600">{errors.akad_date.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Waktu Akad</label>
              <input
                type="time"
                {...register('akad_time')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
              {errors.akad_time && <p className="mt-1 text-xs text-rose-600">{errors.akad_time.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Lokasi Akad</label>
            <input
              {...register('akad_location')}
              placeholder="misal: Masjid Agung Lamongan"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
            />
            {errors.akad_location && <p className="mt-1 text-xs text-rose-600">{errors.akad_location.message}</p>}
          </div>

          {createInvitation.isError && (
            <p className="text-xs text-rose-600">
              {createInvitation.error?.response?.data?.errors
                ? Object.values(createInvitation.error.response.data.errors).flat().join(' ')
                : 'Gagal membuat undangan. Coba lagi.'}
            </p>
          )}

          <div className="pt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-slate-100 text-slate-600 font-semibold rounded-xl text-xs">
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-purple-600/20 disabled:opacity-50"
            >
              {isSubmitting ? 'Membuat...' : 'Buat Undangan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
