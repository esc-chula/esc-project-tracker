import { User } from '@/src/interface/user';
import { findUserByUserId } from './findUserByUserId';
import { Document } from '@/src/interface/document';

export default async function getUsersMap(
  documents: Document[],
  userId: string,
) {
  const uniqueUserIds = new Set(
    documents.map((doc) =>
      doc.userId ? findUserByUserId(doc.userId) : undefined,
    ),
  );
  uniqueUserIds.add(findUserByUserId(userId));
  const users = await Promise.all(uniqueUserIds);

  const usersMap = new Map<string, User>();
  users.forEach((user) => {
    if (user) usersMap.set(user.id, user);
  });
  return usersMap;
}
