import { useInvitation } from '../../../hooks/useAdminInvitations';
import { getPrintSuiteForTemplate } from '../../../templates/printSuiteRegistry';
import MonochromePrintSuite from '../../../templates/monochrome-lineart/PhysicalPrintSuite';

export default function PhysicalPrintTab({ invitationId }) {
  const { data: invitation, isLoading } = useInvitation(invitationId);

  if (isLoading) {
    return <p className="text-sm text-slate-400 py-8 text-center">Memuat desain undangan fisik...</p>;
  }

  if (!invitation) return null;

  // Resolve template suite by invitation template slug or fallback to default
  const templateSlug = invitation?.template?.slug || invitation?.template_slug || 'monochrome-lineart';
  const SuiteComponent = getPrintSuiteForTemplate(templateSlug) || MonochromePrintSuite;

  return <SuiteComponent invitation={invitation} embeddedInDashboard />;
}
