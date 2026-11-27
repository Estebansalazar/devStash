import { ITEM_TYPE_ICONS, type ItemTypeName } from "@/lib/constants/item-types";
import { prisma } from "@/lib/prisma";

/**
 * There is no auth yet, so the dashboard reads the seeded demo user.
 * Replace this with the session user once NextAuth is wired up.
 */
const DEMO_USER_EMAIL = "demo@devstash.io";

const ownedByDemoUser = { user: { email: DEMO_USER_EMAIL } };

export interface CollectionCardData {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  /** Item types present in the collection, most used first. */
  typeNames: ItemTypeName[];
}

export interface CollectionStats {
  total: number;
  favorites: number;
}

function toItemTypeName(name: string): ItemTypeName | null {
  return name in ITEM_TYPE_ICONS ? (name as ItemTypeName) : null;
}

/** Item type names in the collection, ordered by how many items use each one. */
function typeNamesByUsage(names: string[]): ItemTypeName[] {
  const counts = new Map<ItemTypeName, number>();

  for (const name of names) {
    const typeName = toItemTypeName(name);
    if (typeName) counts.set(typeName, (counts.get(typeName) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort(([aName, aCount], [bName, bCount]) =>
      bCount - aCount || aName.localeCompare(bName),
    )
    .map(([name]) => name);
}

/**
 * Collections of the demo user, most recently touched first.
 * "Touched" is the last update of any item in the collection, falling back to
 * the collection itself when it has no items yet.
 */
export async function getRecentCollections(
  limit: number,
): Promise<CollectionCardData[]> {
  const collections = await prisma.collection.findMany({
    where: ownedByDemoUser,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      updatedAt: true,
      items: {
        select: {
          item: {
            select: {
              updatedAt: true,
              itemType: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  return collections
    .map((collection) => ({
      ...collection,
      lastUsedAt: Math.max(
        collection.updatedAt.getTime(),
        ...collection.items.map(({ item }) => item.updatedAt.getTime()),
      ),
    }))
    .sort((a, b) => b.lastUsedAt - a.lastUsedAt)
    .slice(0, limit)
    .map((collection) => ({
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isFavorite: collection.isFavorite,
      itemCount: collection.items.length,
      typeNames: typeNamesByUsage(
        collection.items.map(({ item }) => item.itemType.name),
      ),
    }));
}

export async function getCollectionStats(): Promise<CollectionStats> {
  const [total, favorites] = await Promise.all([
    prisma.collection.count({ where: ownedByDemoUser }),
    prisma.collection.count({ where: { ...ownedByDemoUser, isFavorite: true } }),
  ]);

  return { total, favorites };
}
