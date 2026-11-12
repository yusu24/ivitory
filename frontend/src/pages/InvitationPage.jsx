import { useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { usePublicInvitation } from '../hooks/usePublicInvitation';
import { TEMPLATE_REGISTRY, DEFAULT_TEMPLATE_KEY } from '../templates/registry';
import NotFoundPage from './NotFoundPage';

export default function InvitationPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to') ?? '';

  const { data: invitation, isLoading, isError } = usePublicInvitation(slug);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-cream text-sage-600">Memuat undangan...</div>;
  }

  if (isError || !invitation) {
    return <NotFoundPage />;
  }

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const TemplateComponent = TEMPLATE_REGISTRY[invitation.template?.slug] ?? TEMPLATE_REGISTRY[DEFAULT_TEMPLATE_KEY];

  return (
    <TemplateComponent
      invitation={invitation}
      slug={slug}
      guestName={guestName}
      isOpen={isOpen}
      isPlaying={isPlaying}
      onOpen={handleOpen}
      onToggleMusic={toggleMusic}
      audioRef={audioRef}
    />
  );
}
