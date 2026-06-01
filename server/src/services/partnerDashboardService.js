import { loadCollection } from "../lib/loadJson.js";

const COMPLETED_STATUSES = new Set(["FINISHED", "EXAM_PASSED"]);

function parseAsOf(asOfParam) {
  if (asOfParam) {
    const d = new Date(asOfParam);
    if (!Number.isNaN(d.getTime())) return d;
  }
  if (process.env.DEMO_AS_OF) {
    const d = new Date(process.env.DEMO_AS_OF);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date();
}

function isSameCalendarMonth(a, b) {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
  );
}

function formatStudentName(user) {
  if (!user) return "Unknown";
  return `${user.firstName} ${user.lastName}`.trim();
}

export function getPartnerBySlug(slug) {
  const partners = loadCollection("partners");
  return partners.find((p) => p.slug === slug) ?? null;
}

export function buildPartnerDashboard(slug, asOfParam) {
  const asOf = parseAsOf(asOfParam);
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    return null;
  }

  const orders = loadCollection("orders");
  const users = loadCollection("users");
  const userPackages = loadCollection("userPackages");
  const userCourses = loadCollection("userCourses");
  const packages = loadCollection("packages");

  const userMap = new Map(users.map((u) => [u._id, u]));
  const packageMap = new Map(packages.map((p) => [p._id, p]));
  const userPackageMap = new Map(userPackages.map((up) => [up._id, up]));

  const partnerOrders = orders.filter(
    (o) => o.partnerSlug === slug && o.status === "paid",
  );
  const partnerUserIds = new Set(partnerOrders.map((o) => o.userId));

  const partnerCourses = userCourses.filter((uc) =>
    partnerUserIds.has(uc.userId),
  );

  const completions = partnerCourses.filter((uc) =>
    COMPLETED_STATUSES.has(uc.status),
  ).length;

  const totalCourses = partnerCourses.length;
  const completionRate =
    totalCourses === 0
      ? 0
      : Math.round((completions / totalCourses) * 1000) / 10;

  const mtdOrders = partnerOrders.filter((o) =>
    isSameCalendarMonth(new Date(o.createdAt), asOf),
  );

  const commissionMtd = mtdOrders.reduce((sum, o) => {
    return sum + o.totalValue * (partner.commissionRate / 100);
  }, 0);

  const activeCeAgents = new Set(
    partnerCourses
      .filter((uc) => {
        if (!COMPLETED_STATUSES.has(uc.status)) return false;
        if (!uc.expiresAt) return true;
        return new Date(uc.expiresAt) > asOf;
      })
      .map((uc) => uc.userId),
  ).size;

  const studentsEnrolled =
    partner.studentsEnrolled ?? partnerUserIds.size;

  const recentActivity = partnerCourses
    .map((uc) => {
      const user = userMap.get(uc.userId);
      const userPackage = userPackageMap.get(uc.userPackageId);
      const pkg = userPackage
        ? packageMap.get(userPackage.packageId)
        : null;

      return {
        userId: uc.userId,
        studentName: formatStudentName(user),
        courseTitle: pkg?.title ?? "Unknown course",
        enrolledAt: userPackage?.createdAt ?? uc.purchasedAt,
        progress: uc.courseProgress ?? 0,
        status: uc.status,
        sortKey: new Date(uc.purchasedAt).getTime(),
      };
    })
    .sort((a, b) => b.sortKey - a.sortKey)
    .slice(0, 10)
    .map(({ sortKey: _sortKey, ...row }) => row);

  return {
    partner: {
      slug: partner.slug,
      name: partner.name,
      state: partner.state,
      description: partner.description,
      brandColor: partner.brandColor,
      brandInitials: partner.brandInitials,
      contactName: partner.contactName,
      contactEmail: partner.contactEmail,
      seatAllocation: partner.seatAllocation,
      commissionRate: partner.commissionRate,
    },
    stats: {
      studentsEnrolled,
      activeCeAgents,
      commissionMtd: Math.round(commissionMtd * 100) / 100,
      courseCompletions: completions,
      completionRate,
      totalCourses,
      asOf: asOf.toISOString(),
    },
    recentActivity,
  };
}
