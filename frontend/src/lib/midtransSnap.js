let loadPromise = null;

export function loadMidtransSnap() {
  if (window.snap) return Promise.resolve(window.snap);
  if (loadPromise) return loadPromise;

  const isProduction = import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true';
  const src = isProduction
    ? 'https://app.midtrans.com/snap/snap.js'
    : 'https://app.sandbox.midtrans.com/snap/snap.js';

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
    script.onload = () => resolve(window.snap);
    script.onerror = () => reject(new Error('Gagal memuat Midtrans Snap'));
    document.head.appendChild(script);
  });

  return loadPromise;
}
