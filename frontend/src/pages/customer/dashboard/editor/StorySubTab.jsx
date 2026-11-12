import { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import {
  useAddLoveStoryItem,
  useUpdateLoveStoryItem,
  useDeleteLoveStoryItem,
} from '../../../../hooks/useAdminChildResources';

export default function StorySubTab({ invitation, showToast }) {
  const addItem = useAddLoveStoryItem(invitation.id);
  const updateItem = useUpdateLoveStoryItem(invitation.id);
  const deleteItem = useDeleteLoveStoryItem(invitation.id);

  const handleAdd = () => {
    addItem.mutate({ item_date: '', title: 'Judul Momen', story: 'Ceritakan momen spesial ini...' });
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-slate-600">Linimasa Kisah Cinta</label>
        <button
          onClick={handleAdd}
          disabled={addItem.isPending}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Momen</span>
        </button>
      </div>

      <div className="space-y-3">
        {invitation.love_story_items?.map((item) => (
          <StoryItemCard key={item.id} item={item} onSave={updateItem.mutate} onDelete={deleteItem.mutate} showToast={showToast} />
        ))}
        {(!invitation.love_story_items || invitation.love_story_items.length === 0) && (
          <p className="text-slate-400 text-center py-6">Belum ada momen cerita. Tambahkan momen pertama kamu.</p>
        )}
      </div>
    </div>
  );
}

function StoryItemCard({ item, onSave, onDelete, showToast }) {
  const [form, setForm] = useState({ item_date: item.item_date ?? '', title: item.title, story: item.story });
  const [dirty, setDirty] = useState(false);

  const update = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setDirty(true);
  };

  const handleSave = () => {
    onSave({ id: item.id, ...form });
    setDirty(false);
    showToast('Momen cerita disimpan.');
  };

  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={form.item_date ?? ''}
          onChange={(e) => update({ item_date: e.target.value })}
          className="w-40 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-purple-600 font-semibold"
        />
        <input
          type="text"
          value={form.title}
          onChange={(e) => update({ title: e.target.value })}
          className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-semibold"
          placeholder="Judul Momen"
        />
        {dirty && (
          <button onClick={handleSave} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Simpan">
            <Check className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => onDelete(item.id)}
          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
          title="Hapus"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <textarea
        value={form.story}
        onChange={(e) => update({ story: e.target.value })}
        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-700"
        rows={2}
        placeholder="Ceritakan momen singkat ini..."
      />
    </div>
  );
}
