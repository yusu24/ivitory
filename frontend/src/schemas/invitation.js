import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const invitationSchema = z.object({
  template_id: z.any().optional(),
  slug: z
    .string()
    .min(3, 'Slug minimal 3 karakter')
    .max(100)
    .regex(slugRegex, 'Gunakan huruf kecil, angka, dan tanda hubung saja (contoh: budi-ani)'),
  groom_name: z.string().min(1, 'Nama mempelai pria wajib diisi').max(150),
  groom_nickname: z.string().max(50).optional().or(z.literal('')),
  groom_parents: z.string().optional().or(z.literal('')),

  bride_name: z.string().min(1, 'Nama mempelai wanita wajib diisi').max(150),
  bride_nickname: z.string().max(50).optional().or(z.literal('')),
  bride_parents: z.string().optional().or(z.literal('')),

  opening_text: z.string().optional().or(z.literal('')),

  akad_date: z.string().min(1, 'Tanggal akad wajib diisi'),
  akad_time: z.string().min(1, 'Waktu akad wajib diisi'),
  akad_location: z.string().min(1, 'Lokasi akad wajib diisi').max(255),
  akad_address: z.string().optional().or(z.literal('')),
  akad_map_url: z.string().optional().or(z.literal('')),

  resepsi_date: z.string().optional().or(z.literal('')),
  resepsi_time: z.string().optional().or(z.literal('')),
  resepsi_location: z.string().max(255).optional().or(z.literal('')),
  resepsi_address: z.string().optional().or(z.literal('')),
  resepsi_map_url: z.string().optional().or(z.literal('')),
});

export const loveStoryItemSchema = z.object({
  item_date: z.string().optional().or(z.literal('')),
  title: z.string().min(1, 'Judul wajib diisi').max(150),
  story: z.string().min(1, 'Cerita wajib diisi'),
});

export const bankAccountSchema = z.object({
  type: z.enum(['bank', 'ewallet']),
  bank_name: z.string().min(1, 'Nama bank/e-wallet wajib diisi').max(100),
  account_number: z.string().min(1, 'Nomor rekening wajib diisi').max(50),
  account_holder: z.string().min(1, 'Nama pemilik rekening wajib diisi').max(150),
});

export const rsvpSchema = z.object({
  guest_name: z.string().min(1, 'Nama wajib diisi').max(150),
  attendance: z.enum(['hadir', 'tidak_hadir', 'ragu'], {
    message: 'Pilih status kehadiran',
  }),
  guest_count: z.coerce.number().int().min(1).max(10).default(1),
  message: z.string().max(1000).optional().or(z.literal('')),
});
