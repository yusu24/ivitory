export default function FaqFormModal({ faq, onSave, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSave({
      id: faq?.id ?? `faq-${Date.now()}`,
      question: formData.get('question'),
      answer: formData.get('answer'),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{faq ? 'Edit FAQ' : 'Tambah FAQ Baru'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Pertanyaan</label>
            <input
              name="question"
              required
              defaultValue={faq?.question ?? ''}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Jawaban</label>
            <textarea
              name="answer"
              required
              rows={4}
              defaultValue={faq?.answer ?? ''}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 text-slate-600 font-semibold text-xs rounded-xl">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl">
              Simpan FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
